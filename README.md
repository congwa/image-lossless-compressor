# image-lossless-compressor

A simple npm package for compressing images and converting them to WebP format.

一个简单的npm包，专门用于**无损**压缩图片并转换为WebP格式。

## Features

- Compresses images to reduce file size
- Converts images to the highly efficient [WebP format](https://developers.google.com/speed/webp) for faster loading times
- Supports both `.jpg` and `.png` image formats

## Reasons for Developing This Package

1. Situation 1: When uploading images and asking the backend to compress them, the backend always finds various reasons not to do it, and the compressed images are lossy, have changed pixels, and some colors have changed, which is very unsatisfactory.
2. Situation 2: Every time a designer gives an image and does not compress it for the frontend, it results in slow loading of images after the project goes online, and ultimately finding the frontend responsible.
3. Situation 3: The boss complains about the high cost of CDN this month.
4. Situation 4: tinyPNG uploads too slowly, has quota limits, and cannot export images in WebP format directly.

## Future Plans

Due to time constraints, I am currently working at the company.

1. Publish a NestJS package.
2. Rewrite it in Golang.
3. Publish a WASM package module.
4. export png or jpg

### Effect

![Alt text](/imgs/result.png)
**5.2MB -> 223KB**

## 使用方法 (Usage)

```js
npm install image-lossless-compressor
```

```javascript
import { compressAndConvertToWebP } from 'image-lossless-compressor';

// Example usage
compressAndConvertToWebP('path/to/image.jpg', 'path/to/destination/webp').then(() => {
  console.log('Image compressed and converted!');
}).catch((error) => {
  console.error('Error:', error);
});
```

## 注意事项 (Notes)

- Images must be provided as file paths.
- The output file extension will always be `.webp`.
- Requires Node.js v16 or later.

## License

[MIT](https://opensource.org/licenses/MIT)

---


# 图片压缩工具 image-lossless-compressor

一个简单的 npm 包，专门用于**无损**压缩图片并转换为 WebP 格式。


## 写这个包的原因

1. 场景1：上传图片，让后端进行压缩，后端压缩出来的有损、像素改变、部分颜色发生色变，非常不理想
2. 场景2：每次设计小姐姐给出图片并不给前端压缩，导致项目上线后，发现图片加载慢，最终找到前端
3. 场景3：老板说这个月的cdn花费怎么这么高？
4. 场景4：tinyPNG上传太慢了、有额度限制、不能直接导出webP格式

## 未来计划

由于时间关系，目前正在公司搬砖中

1. 发布一个nestjs包
2. 使用golang进行重写
3. 发布一个wasm包模块
4. 单独导出png或者jpg

## 功能

- 压缩图片以减小文件大小
- 将图片转换为高效的 [WebP 格式](https://developers.google.com/speed/webp)，加快加载速度
- 支持 `.jpg` 和 `.png` 两种图片格式

## 使用方法

```js

npm install image-lossless-compressor

```

```javascript
import { compressAndConvertToWebP } from 'image-lossless-compressor';

// 示例用法
compressAndConvertToWebP('path/to/image.jpg', 'path/to/destination/webp').then(() => {
  console.log('图片已压缩并转换格式！');
}).catch((error) => {
  console.error('发生错误：', error);
});
```

## 注意事项

- 图片必须以文件路径的形式提供。
- 输出文件的扩展名始终为 `.webp`。
- 要求 Node.js 版本为 v16 或更高。

## 许可证

[MIT](https://opensource.org/licenses/MIT)