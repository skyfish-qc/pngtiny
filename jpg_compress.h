#ifndef JPG_COMPRESS
#define JPG_COMPRESS

static void myjpg_compress(unsigned char* buf,int bufsize,unsigned char* retdata) {
    unsigned char *raw_image;
    int bytes_per_pixel = 3;
    int color_space = JCS_RGB;
    JSAMPROW row_pointer[1];
    unsigned long location = 0;
    int width=0;
    int height=0;
    int i = 0;
    struct jpeg_decompress_struct cinfo;
    struct jpeg_error_mgr jerr;
    cinfo.err = jpeg_std_error( &jerr );
    jpeg_create_decompress( &cinfo );
    cinfo.two_pass_quantize=TRUE;
    cinfo.dct_method=JDCT_DEFAULT;
    jpeg_mem_src( &cinfo, buf, bufsize );
    jpeg_read_header( &cinfo, TRUE );
    jpeg_start_decompress( &cinfo );
    raw_image = (unsigned char*)malloc( cinfo.output_width*cinfo.output_height*cinfo.num_components );
    row_pointer[0] = (unsigned char *)malloc( cinfo.output_width*cinfo.num_components );
    while( cinfo.output_scanline < cinfo.image_height ) {
        jpeg_read_scanlines( &cinfo, row_pointer, 1 );
        for( i=0; i<cinfo.image_width*cinfo.num_components;i++) {
            raw_image[location++] = row_pointer[0][i];
        }
    }
    width = cinfo.image_width;
    height = cinfo.image_height;
    jpeg_finish_decompress( &cinfo );
    jpeg_destroy_decompress( &cinfo );

    if(width<1) {
        free( row_pointer[0] );
        failSet(retdata);
        free(raw_image);
        return;
    }
    unsigned char *outputBuff;
    unsigned long outSize=0;
    struct jpeg_compress_struct cinfo2;
    struct jpeg_error_mgr jerr2;
    JSAMPROW row_pointer2[1];
    cinfo2.err = jpeg_std_error( &jerr2 );
    jpeg_create_compress(&cinfo2);
    jpeg_mem_dest(&cinfo2, &outputBuff,&outSize);
    cinfo2.image_width = width;
    cinfo2.image_height = height;
    cinfo2.input_components = bytes_per_pixel;
    cinfo2.in_color_space = color_space;
    jpeg_set_defaults( &cinfo2 );
    cinfo2.optimize_coding = TRUE;
    cinfo2.smoothing_factor = 0;
    jpeg_set_quality(&cinfo2, 80, TRUE);
    jpeg_start_compress( &cinfo2, TRUE );
    int row_num = 0;
    row_num = cinfo2.image_width * cinfo2.input_components;
    while( cinfo2.next_scanline < cinfo2.image_height ) {
        row_pointer2[0] = &raw_image[ cinfo2.next_scanline * row_num];
        jpeg_write_scanlines( &cinfo2, row_pointer2, 1 );
    }
    jpeg_finish_compress( &cinfo2 );
    if(outSize>=bufsize) {
        jpeg_destroy_compress( &cinfo2 );
        free( row_pointer[0] );
        free(raw_image);
        failSet(retdata);
        return;
    }
    for(i=0;i<outSize;i++) {
        buf[i]=outputBuff[i];
    }
    int size = (int)outSize;
    memcpy(retdata,&size,sizeof(size));
    jpeg_destroy_compress( &cinfo2 );
    free( row_pointer[0] );
    free(raw_image);
}
#endif