/*
* Copyright (c) 2021,skyfish
* All rights reserved.
*/
#include "tiny.h"
#include "png_compress.h"
#include "jpg_compress.h"

void EMSCRIPTEN_KEEPALIVE tiny(unsigned char* buf,int bufsize,unsigned char* retdata) {
    unsigned char* pngSignature;
    pngSignature = malloc(kPngSignatureLength);
    memcpy(pngSignature,buf,kPngSignatureLength);
    if(png_check_sig(pngSignature, kPngSignatureLength)) {
        png_compress(buf,bufsize,retdata);
        return;
    }
    unsigned short jpgSignature1;
    unsigned short jpgSignature2;
    memcpy(&jpgSignature1,buf,2);
    memcpy(&jpgSignature2,buf+bufsize-2,2);
    if(jpgSignature1==0xd8ff&&jpgSignature2==0xd9ff) {
        myjpg_compress(buf,bufsize,retdata);
        return;
    }
}