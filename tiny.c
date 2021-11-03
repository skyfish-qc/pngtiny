/*
* Copyright (c) 2021,skyfish
* All rights reserved.
*/
#include "tiny.h"
#include "png_compress.h"
#include "jpg_compress.h"
#include "gif_compress.h"

void EMSCRIPTEN_KEEPALIVE tiny(unsigned char* buf,int bufsize,unsigned char* retdata) {
    unsigned char* pngSignature;
    pngSignature = malloc(kPngSignatureLength);
    memcpy(pngSignature,buf,kPngSignatureLength);
    if(png_check_sig(pngSignature, kPngSignatureLength)) {
        png_compress(buf,bufsize,retdata);
        return;
    }
    unsigned short jpgSignature1;
    memcpy(&jpgSignature1,buf,2);
    if(jpgSignature1==0xd8ff) {
        myjpg_compress(buf,bufsize,retdata);
        return;
    }
    unsigned char gifSig1;
    unsigned char gifSig2;
    unsigned char gifSig3;
    memcpy(&gifSig1,buf,1);
    memcpy(&gifSig2,buf+1,1);
    memcpy(&gifSig3,buf+2,1);
    if(gifSig1==0x47&&gifSig2==0x49&&gifSig3==0x46) {
        mygif_compress(buf,bufsize,retdata);
        return;
    }
    failSet(retdata);
}