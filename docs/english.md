# image-lossless-compressor

A simple npm package for compressing images and converting them to WebP format.

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
