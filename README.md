# image-compressor
这个 Node.js 包提供了一种在服务器端压缩 JPEG 和 PNG 图片的方法。使用该包，用户可以方便地压缩图片以减少其大小，并提高页面加载速度。  对于 JPEG 图片，我们使用名为 MozJPEG 的压缩工具进行压缩。MozJPEG 是经过优化的 JPEG 压缩算法，具有很好的压缩效果和较少的失真。对于含有透明通道的 PNG 图片，我们使用名为 OxiPNG 的压缩工具进行压缩。OxiPNG 能够保留 PNG 图片中的透明通道，并生成较小的文件。对于不属于以上两种类型的图片，我们将跳过不处理。  如果使用上述方法压缩后的图片文件比原图大，我们将放弃压缩并使用原图，以保证压缩后的图片质量不会降低。此外，我们还将使用一组关键词（keywords）来方便用户搜索和识别该包的功能。

This Node.js package provides a way to compress JPEG and PNG images on the server side. With this package, users can easily compress images to reduce their size and improve page loading speed.

For JPEG images, we use a compression tool called MozJPEG for compression. MozJPEG is an optimized JPEG compression algorithm with good compression effect and less distortion. For PNG images with transparent channels, we use a compression tool called OxiPNG for compression. OxiPNG can preserve the transparent channels in PNG images and generate smaller files. For images that do not belong to the above two types, we will skip them without processing.

If the compressed image file using the above method is larger than the original image, we will give up compression and use the original image to ensure that the quality of the compressed image is not reduced. In addition, we will use a set of keywords to facilitate users to search and identify the functionality of this package.
