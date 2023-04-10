import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import imagemin from 'imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import oxipng from '@vheemstra/imagemin-oxipng';
import webp from 'imagemin-webp';
// 压缩并转换为WebP格式
export async function compressAndConvertToWebP(inputFilePath: string, outputFilePath: string): Promise<void> {
  const extname = path.extname(inputFilePath).toLowerCase();
  if (extname !== '.jpg' && extname !== '.jpeg' && extname !== '.png') {
    return; // 非图片文件不做处理
  }

  let image = sharp(inputFilePath); // 使用 sharp 对图片进行处理

  // PNG 格式的图片判断是否含透明通道，如果是就使用 OxiPNG 压缩，否则使用 MozJPEG 压缩
  if (extname === '.png') {
    const hasAlpha = await image.metadata().then((metadata) => metadata.hasAlpha);
    if (hasAlpha) {
      // 使用 OxiPNG 压缩
      image = image.png({ compressionLevel: 9, adaptiveFiltering: true, force: true });
      image = await imagemin.buffer(await image.toBuffer(), {
        plugins: [oxipng({})],
      }).then(buffer => sharp(buffer));
    } else {
      // 使用 MozJPEG 压缩
      image = image.jpeg({ quality: 80 });
      image = await imagemin.buffer(await image.toBuffer(), {
        plugins: [mozjpeg({ quality: 80 })],
      }).then(buffer => sharp(buffer));
    }
  }

  // JPEG 格式的图片直接使用 MozJPEG 压缩
  if (extname === '.jpg' || extname === '.jpeg') {
    image = image.jpeg({ quality: 80 });
    image = await imagemin.buffer(await image.toBuffer(), {
      plugins: [mozjpeg({ quality: 80 })],
    }).then(buffer => sharp(buffer));
  }

  // 将压缩后的图片转换为 WebP 格式
  const webpData = await imagemin.buffer(await image.toBuffer(), {
    plugins: [webp({ quality: 80 })]
  });

  // 判断图片压缩后的大小是否比原图小，如果不是则使用原图
  const stats = await fs.stat(inputFilePath);
  if (stats.size <= webpData.length) {
    return;
  }

  // 将压缩后的图片保存到文件系统，并以 .webp 后缀命名
  await fs.writeFile(outputFilePath, webpData);
}
