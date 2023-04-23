# 图片压缩工具 image-lossless-compressor

一个简单的 npm 包，专门用于**无损**压缩图片并转换为 WebP 格式。

## document

[English](/docs/english.md)

版本使用:

- 1.0.3版本为测试过无问题版本-请使用原生esm的方式
- 1.0.5-commonjs版本为commonjs版本

### 压缩效果

![Alt text](/imgs/result.png)
**5.2MB -> 223KB**

## 功能

- 压缩图片以减小文件大小
- 将图片转换为高效的 [WebP 格式](https://developers.google.com/speed/webp)，加快加载速度
- 支持 `.jpg` 和 `.png` 两种图片格式

## 使用方法

一定要在node上**原生ESM的方式使用**

```bash
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

### nextjs中的使用

```bash
  npm install image-lossless-compressor@1.0.5-commonjs

```

```javascript
import { compressAndConvertToWebP } from 'image-lossless-compressor';

// 示例用法
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';

import { compressAndConvertToWebP } from 'image-lossless-compressor';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '上传相册图片' })
  @ApiResponse({ status: 200, description: '文件上传成功' })
  @ApiResponse({ status: 400, description: '文件上传失败' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传文件',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('album')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file): Promise<any> {
    console.log(JSON.stringify(file));

    const uuid = uuidv4(); // 生成唯一的uuid作为文件名
    const filename = `${uuid}.webp`; // 拼接文件名

    // 返回上传结果，包含文件路径等相关信息
    Logger.log('upload: ' + JSON.stringify(file));

    const outputFilePath = `${file.destination}/${filename}`;
    // 调用图片处理函数处理并压缩图片
    await compressAndConvertToWebP(file.path, outputFilePath);
  
    Logger.log('upload-End: ' + JSON.stringify(file));
    // 返回上传成功信息及处理好的图片 URL
    return {
      url: `/uploads/${filename}`, // 文件路径
      notCompress: file.filename, // 未压缩图盘路径
      originalname: file.originalname, // 文件原名
    };
  }
}
```

## 注意事项

- 图片必须以文件路径的形式提供。
- 输出文件的扩展名始终为 `.webp`。
- 要求 Node.js 版本为 v16 或更高。
- commonjs版本要求10版本以或更高

## 其它语言版本

[go版本](https://github.com/congwa/imageCompressor)

## 未来计划

由于时间关系，目前正在公司搬砖中，以后编写

1. 发布一个wasm包模块
2. 单独导出png或者jpg

## 许可证

[MIT](https://opensource.org/licenses/MIT)