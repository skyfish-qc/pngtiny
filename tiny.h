/*
* Copyright (c) 2021,skyfish
* All rights reserved.
*/
#include "string.h"
#include "stdlib.h"
#include "png.h"
#include "libimagequant.h"
#include "jpeglib.h"
#include "lcdfgif/gif.h"
#include "gifsicle.h"

#include <emscripten.h>

#define kPngSignatureLength 8

typedef enum {
    SUCCESS = 0,
    OUT_OF_MEMORY_ERROR = 1,
} pngquant_error;

typedef enum {
  MYPNG_NONE,
  MYPNG_SRGB,
  MYPNG_ICCP,
  MYPNG_ICCP_WARN_GRAY,
  MYPNG_GAMA_CHRM,
  MYPNG_GAMA_ONLY,
  MYPNG_COCOA,
} mypng_color_transform;

typedef struct mypng_rgba {
  unsigned char r,g,b,a;
} mypng_rgba;

struct mypng_chunk {
    struct mypng_chunk *next;
    unsigned char *data;
    size_t size;
    unsigned char name[5];
    unsigned char location;
};
typedef struct {
    uint32_t width;
    uint32_t height;
    size_t file_size;
    double gamma;
    unsigned char *rgba_data;
    struct mypng_chunk *chunks;
    mypng_color_transform input_color;
    mypng_color_transform output_color;
} png24_image;

typedef struct {
    uint32_t width;
    uint32_t height;
    size_t maximum_file_size;
    size_t metadata_size;
    double gamma;
    unsigned int num_palette;
    mypng_rgba palette[256];
    png_bytepp row_pointers;
    struct mypng_chunk *chunks;
    unsigned char *indexed_data;
    mypng_color_transform output_color;
} png8_image;

typedef struct {
    unsigned char* data;
    int maxsize;
    int size;
    int offset;
}ImageSource;
static void failSet(unsigned char* retdata) {
    int size = 0;
    memcpy(retdata,&size,sizeof(size));
}