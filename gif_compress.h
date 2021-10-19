#ifndef GIF_COMPRESS
#define GIF_COMPRESS

static void mygif_compress(unsigned char* buf,int bufsize,unsigned char* retdata) {
    Gif_CompressInfo gif_write_info;
    Gif_Record imgsource;
    imgsource.data=buf;
    imgsource.length=bufsize;
    Gif_Stream *gfs;
    gfs=Gif_ReadRecord(&imgsource);
    if (!gfs || (Gif_ImageCount(gfs) == 0 && gfs->errors > 0)) {
        failSet(retdata);
        return;
    }
    Gif_InitCompressInfo(&gif_write_info);
    gif_write_info.loss=40;
    Gt_OutputData def_output_data;
    def_output_data.output_name = 0;

    def_output_data.screen_width = -1;
    def_output_data.screen_height = -1;
    def_output_data.background.haspixel = 0;
    def_output_data.loopcount = -2;

    def_output_data.colormap_size = 0;
    def_output_data.colormap_fixed = 0;
    def_output_data.colormap_algorithm = COLORMAP_DIVERSITY;
    def_output_data.dither_type = dither_none;
    def_output_data.dither_name = "none";
    def_output_data.colormap_gamma_type = KC_GAMMA_SRGB;
    def_output_data.colormap_gamma = 2.2;

    def_output_data.optimizing = 3;
    def_output_data.scaling = GT_SCALING_NONE;
    def_output_data.scale_method = SCALE_METHOD_MIX;
    def_output_data.scale_colors = 0;

    def_output_data.conserve_memory = 0;
    unsigned char* outbuf=NULL;
    unsigned long outsize=0;
    outbuf=Gif_writeMem(gfs,&gif_write_info,&outsize);
    if(outsize>=bufsize) {
        Gif_DeleteStream(gfs);
        free(outbuf);
        failSet(retdata);
        return;
    }
    memcpy(buf,outbuf,outsize);
    int size = (int)outsize;
    memcpy(retdata,&size,sizeof(size));
    free(outbuf);
    Gif_DeleteStream(gfs);
}
#endif