#ifndef PNG_COMPRESS
#define PNG_COMPRESS

static png_bytepp mypng_create_row_pointers(png_infop info_ptr, png_structp png_ptr, unsigned char *base, size_t height, png_size_t rowbytes) {
    if (!rowbytes) {
        rowbytes = png_get_rowbytes(png_ptr, info_ptr);
    }

    png_bytepp row_pointers = malloc(height * sizeof(row_pointers[0]));
    if (!row_pointers) return NULL;
    for(size_t row = 0; row < height; row++) {
        row_pointers[row] = base + row * rowbytes;
    }
    return row_pointers;
}
static void readFromBuf(png_structp png_ptr, png_bytep outBytes,png_size_t length) {
    ImageSource* isource = (ImageSource*)png_get_io_ptr(png_ptr);
    if(isource == NULL){
        return;
    }
    if(isource->offset + length <= isource->size) {
        memcpy(outBytes, isource->data + isource->offset, length);
        isource->offset += length;
    } else {
        return;
    }
}
static void writeToBuf(png_structp png_ptr, png_bytep data, png_size_t length) {
    ImageSource* isource = (ImageSource*)png_get_io_ptr(png_ptr);
    if(isource == NULL){
        return;
    }
    isource->size += length;
    if(isource->size>isource->maxsize) {
        return;
    }
    memcpy(isource->data + isource->offset, data,length);
    isource->offset += length;
}
static int read_chunk_callback(png_structp png_ptr, png_unknown_chunkp in_chunk){
    if (0 == memcmp("iCCP", in_chunk->name, 5) || 0 == memcmp("cHRM", in_chunk->name, 5) || 0 == memcmp("gAMA", in_chunk->name, 5)) {
        return 0;
    }

    if (in_chunk->location == 0 ) {
        return 1;
    }

    struct mypng_chunk **head = (struct mypng_chunk **)png_get_user_chunk_ptr(png_ptr);

    struct mypng_chunk *chunk = malloc(sizeof(struct mypng_chunk));
    memcpy(chunk->name, in_chunk->name, 5);
    chunk->size = in_chunk->size;
    chunk->location = in_chunk->location;
    chunk->data = in_chunk->size ? malloc(in_chunk->size) : NULL;
    if (in_chunk->size) {
        memcpy(chunk->data, in_chunk->data, in_chunk->size);
    }

    chunk->next = *head;
    *head = chunk;

    return 1;
}
static void set_palette(liq_result *result, png8_image *output_image){
    const liq_palette *palette = liq_get_palette(result);

    output_image->num_palette = palette->count;
    for(unsigned int i=0; i < palette->count; i++) {
        const liq_color px = palette->entries[i];
        output_image->palette[i] = (mypng_rgba){.r=px.r, .g=px.g, .b=px.b, .a=px.a};
    }
}
static pngquant_error prepare_output_image(liq_result *result, liq_image *input_image, mypng_color_transform output_color, png8_image *output_image) {
    output_image->width = liq_image_get_width(input_image);
    output_image->height = liq_image_get_height(input_image);
    output_image->gamma = liq_get_output_gamma(result);
    output_image->output_color = output_color;
    output_image->indexed_data = malloc((size_t)output_image->height * (size_t)output_image->width);
    output_image->row_pointers = malloc((size_t)output_image->height * sizeof(output_image->row_pointers[0]));

    if (!output_image->indexed_data || !output_image->row_pointers) {
        return OUT_OF_MEMORY_ERROR;
    }

    for(size_t row = 0; row < output_image->height; row++) {
        output_image->row_pointers[row] = output_image->indexed_data + row * output_image->width;
    }

    const liq_palette *palette = liq_get_palette(result);
    output_image->num_palette = palette->count;

    return SUCCESS;
}

static void mypng_free_chunks(struct mypng_chunk *chunk) {
    if (!chunk) {
        return;
    }
    mypng_free_chunks(chunk->next);
    free(chunk->data);
    free(chunk);
}

static void mypng_free_image24(png24_image *image) {
    free(image->rgba_data);
    image->rgba_data = NULL;

    mypng_free_chunks(image->chunks);
    image->chunks = NULL;
}

static void mypng_free_image8(png8_image *image) {
    free(image->indexed_data);
    image->indexed_data = NULL;

    free(image->row_pointers);
    image->row_pointers = NULL;

    mypng_free_chunks(image->chunks);
    image->chunks = NULL;
}
static void png_compress(unsigned char* buf,int bufsize,unsigned char* retdata) {
    ImageSource outpic;
    png24_image srcpic = {.width=0};
    png8_image output_image = {.width=0};
    int quality_percent = 80;
    png_size_t   rowbytes;
    png_structp png_ptr = NULL;
    png_ptr = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);

    if(png_ptr == NULL) {
        failSet(retdata);
        return;
    }

    png_infop info_ptr = NULL;
    info_ptr = png_create_info_struct(png_ptr);
    if(info_ptr == NULL) {
        png_destroy_read_struct(&png_ptr, NULL, NULL);
        failSet(retdata);
        return;
    }
    ImageSource imgsource;
    imgsource.data = buf;
    imgsource.size = bufsize;
    imgsource.offset = 0;
    png_set_read_user_chunk_fn(png_ptr, &output_image.chunks, read_chunk_callback);
    png_set_read_fn(png_ptr, &imgsource, readFromBuf);
    png_read_info(png_ptr, info_ptr);
    png_uint_32 width = 0;
    png_uint_32 height = 0;
    int bitDepth = 0;
    int colorType = -1;
    png_uint_32 retval = png_get_IHDR(png_ptr, info_ptr,&width,&height,&bitDepth,&colorType,NULL, NULL, NULL);

    if(retval != 1) {
        failSet(retdata);
        return;
    }
    srcpic.width = width;
    srcpic.height = height;
    if (!(colorType & PNG_COLOR_MASK_ALPHA)) {
        #ifdef PNG_READ_FILLER_SUPPORTED
            png_set_expand(png_ptr);
            png_set_filler(png_ptr, 65535L, PNG_FILLER_AFTER);
        #else
        mypng_free_image24(&srcpic);
        failSet(retdata);
        return;
        #endif
    }
    if (bitDepth == 16) {
        png_set_strip_16(png_ptr);
    }
    if (!(colorType & PNG_COLOR_MASK_COLOR)) {
        png_set_gray_to_rgb(png_ptr);
    }
    double gamma = 0.45455;
    if (png_get_valid(png_ptr, info_ptr, PNG_INFO_sRGB)) {
        srcpic.input_color = MYPNG_SRGB;
        srcpic.output_color = MYPNG_SRGB;
    } else {
        png_get_gAMA(png_ptr, info_ptr, &gamma);
        if (gamma > 0 && gamma <= 1.0) {
            srcpic.input_color = MYPNG_GAMA_ONLY;
            srcpic.output_color = MYPNG_GAMA_ONLY;
        } else {
            srcpic.input_color = MYPNG_NONE;
            srcpic.output_color = MYPNG_NONE;
            gamma = 0.45455;
        }
    }
    srcpic.gamma = gamma;

    png_set_interlace_handling(png_ptr);
    png_read_update_info(png_ptr, info_ptr);
    rowbytes = png_get_rowbytes(png_ptr, info_ptr);

    if (rowbytes > INT_MAX/srcpic.height) {
        png_destroy_read_struct(&png_ptr, &info_ptr, NULL);
        mypng_free_image24(&srcpic);
        failSet(retdata);
        return;
    }

    if ((srcpic.rgba_data = malloc(rowbytes * srcpic.height)) == NULL) {
        mypng_free_image24(&srcpic);
        failSet(retdata);
        return;
    }

    png_bytepp row_pointers = mypng_create_row_pointers(info_ptr, png_ptr, srcpic.rgba_data, srcpic.height, 0);
    png_read_image(png_ptr, row_pointers);
    png_read_end(png_ptr, NULL);
    
    liq_attr *attr = liq_attr_create();
    liq_set_speed(attr, 2);
    liq_set_quality(attr, 0, 80);
    liq_image *image = liq_image_create_rgba_rows(attr, (void **)row_pointers, width, height, 0);
    liq_result *remap;
    liq_error remap_error;
    remap_error = liq_image_quantize(image, attr, &remap);
    if(LIQ_QUALITY_TOO_LOW==remap_error) {
        liq_attr *attr = liq_attr_create();
        liq_set_speed(attr, 2);
        liq_image *image = liq_image_create_rgba_rows(attr, (void **)row_pointers, width, height, 0);
        remap_error = liq_image_quantize(image, attr, &remap);
    }
    if (LIQ_OK == remap_error) {
        liq_set_output_gamma(remap, 0.45455);
        liq_set_dithering_level(remap, 1.0f);

        retval = prepare_output_image(remap, image, srcpic.output_color, &output_image);
        if (SUCCESS == retval) {
            if (LIQ_OK != liq_write_remapped_image_rows(remap, image, output_image.row_pointers)) {
                free(row_pointers);
                mypng_free_image24(&srcpic);
                failSet(retdata);
                return;
            }

            set_palette(remap, &output_image);

            double palette_error = liq_get_quantization_error(remap);
            if (palette_error >= 0) {
                quality_percent = liq_get_quantization_quality(remap);
            }
        }
        liq_result_destroy(remap);
        png_structp png_ptr_p = NULL;
        png_ptr_p = png_create_write_struct(PNG_LIBPNG_VER_STRING, &srcpic, NULL, NULL);

        if (!png_ptr_p) {
            free(row_pointers);
            mypng_free_image24(&srcpic);
            failSet(retdata);
            return;
        }

        png_infop info_ptr_p = NULL;
        info_ptr_p = png_create_info_struct(png_ptr_p);
        if (!info_ptr_p) {
            free(row_pointers);
            mypng_free_image24(&srcpic);
            failSet(retdata);
            return;
        }
        png_set_compression_level(png_ptr_p, 9);
        png_set_compression_mem_level(png_ptr_p, 5);

        outpic.data = buf;
        outpic.maxsize = bufsize;
        outpic.size = 0;
        outpic.offset = 0;
        png_set_write_fn(png_ptr_p, &outpic, writeToBuf, NULL);
        png_set_filter(png_ptr_p, PNG_FILTER_TYPE_BASE, PNG_FILTER_VALUE_NONE);
        if (output_image.output_color != MYPNG_GAMA_ONLY && output_image.output_color != MYPNG_NONE) {
            png_set_gAMA(png_ptr_p, info_ptr_p, output_image.gamma);
        }
        if (output_image.output_color == MYPNG_SRGB) {
            png_set_sRGB(png_ptr_p, info_ptr_p, 0);
        }
        int sample_depth;
        if (output_image.num_palette <= 2)
            sample_depth = 1;
        else if (output_image.num_palette <= 4)
            sample_depth = 2;
        else if (output_image.num_palette <= 16)
            sample_depth = 4;
        else
            sample_depth = 8;

        struct mypng_chunk *chunk = output_image.chunks;
        output_image.metadata_size = 0;
        int chunk_num=0;
        while(chunk) {
            png_unknown_chunk pngchunk = {
                .size = chunk->size,
                .data = chunk->data,
                .location = chunk->location,
            };
            memcpy(pngchunk.name, chunk->name, 5);
            png_set_unknown_chunks(png_ptr_p, info_ptr_p, &pngchunk, 1);

            output_image.metadata_size += chunk->size + 12;
            chunk = chunk->next;
            chunk_num++;
        }
        png_set_IHDR(png_ptr_p, info_ptr_p, output_image.width, output_image.height,sample_depth, PNG_COLOR_TYPE_PALETTE, 0, PNG_COMPRESSION_TYPE_DEFAULT, PNG_FILTER_TYPE_BASE);

        png_color palette[256];
        png_byte trans[256];
        unsigned int num_trans = 0;
        for(unsigned int i = 0; i < output_image.num_palette; i++) {
            palette[i] = (png_color){
                .red   = output_image.palette[i].r,
                .green = output_image.palette[i].g,
                .blue  = output_image.palette[i].b,
            };
            trans[i] = output_image.palette[i].a;
            if (output_image.palette[i].a < 255) {
                num_trans = i+1;
            }
        }
        png_set_PLTE(png_ptr_p, info_ptr_p, palette, output_image.num_palette);

        if (num_trans > 0) {
            png_set_tRNS(png_ptr_p, info_ptr_p, trans, num_trans, NULL);
        }

        png_write_info(png_ptr_p, info_ptr_p);
        png_set_packing(png_ptr_p);
        png_write_image(png_ptr_p, output_image.row_pointers);
        png_write_end(png_ptr_p, NULL);
        free(row_pointers);
        mypng_free_image24(&srcpic);
        mypng_free_image8(&output_image);
        if(outpic.size>outpic.maxsize) {
            failSet(retdata);
            return;
        }
        int size = (int)outpic.size;
        memcpy(retdata,&size,sizeof(size));
    } else {
        failSet(retdata);
    }
}
#endif