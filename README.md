# 图片压缩工具 image-lossless-compressor

一个简单的 npm 包，专门用于**无损**压缩图片并转换为 WebP 格式。

## document

[English](/docs/english.md)

## 写这个包的原因

1. 场景1：上传图片，让后端进行压缩，后端压缩出来的有损、像素改变、部分颜色发生色变，非常不理想
2. 场景2：每次设计小姐姐给出图片并不给前端压缩，导致项目上线后，发现图片加载慢，最终找到前端
3. 场景3：老板说这个月的cdn花费怎么这么高？
4. 场景4：tinyPNG上传太慢了、有额度限制、不能直接导出webP格式

### 压缩效果

![Alt text](/imgs/result.png)
**5.2MB -> 223KB**

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

## 未来计划

由于时间关系，目前正在公司搬砖中

1. 发布一个nestjs包
2. 使用golang进行重写
3. 发布一个wasm包模块
4. 单独导出png或者jpg

## 许可证

[MIT](https://opensource.org/licenses/MIT)