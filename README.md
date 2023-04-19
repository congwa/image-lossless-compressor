# 图片压缩工具 image-lossless-compressor

一个简单的 npm 包，专门用于**无损**压缩图片并转换为 WebP 格式。

## document

[English](/docs/english.md)

版本使用:

- 1.0.3版本为测试过无问题版本-请使用原生esm的方式
- 1.0.4-commonjs版本为commonjs版本

### 压缩效果

![Alt text](/imgs/result.png)
**5.2MB -> 223KB**

## 功能

- 压缩图片以减小文件大小
- 将图片转换为高效的 [WebP 格式](https://developers.google.com/speed/webp)，加快加载速度
- 支持 `.jpg` 和 `.png` 两种图片格式

## 使用方法

一定要在node上**原生ESM的方式使用**

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

## 其它语言版本

[go版本](https://github.com/congwa/imageCompressor)

## 未来计划

由于时间关系，目前正在公司搬砖中

1. 发布一个nestjs包
2. 发布一个wasm包模块
3. 单独导出png或者jpg

## 许可证

[MIT](https://opensource.org/licenses/MIT)