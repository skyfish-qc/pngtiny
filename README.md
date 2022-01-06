#js版png压缩工具
---
  - 2021.10.14 添加jpg图片压缩
  - 2021.10.19 添加GIF图片压缩
  - 2022.01.06 添加demo地址
---
## 使用

部署web文件夹到服务器访问即可(需要在支持webassembly的浏览器访问，比如Chrome，edge)

可以访问 [demo](https://h5.skyfish.me/pngtiny/)

## 说明

- 本项目使用了 https://github.com/ImageOptim/libimagequant , https://github.com/glennrp/libpng, https://github.com/kohler/gifsicle 以及 https://www.ijg.org/ 库
- libimagequant是png24压缩成png8的库，压缩效果很好。libpng是读取png以及生成png的库。libjpeg是读取以及压缩jpg的库。gifsicle是读取以及压缩gif的库。
- 如果需要编译自己的压缩代码，电脑环境先安装好新版的emsdk环境，然后运行build.bat文件即可。
- 然后把编译出来的pngtiny.js和pngtiny.wasm文件覆盖web文件夹里面的文件。
