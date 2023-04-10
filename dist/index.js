"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressAndConvertToWebP = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const imagemin_1 = __importDefault(require("imagemin"));
const imagemin_mozjpeg_1 = __importDefault(require("imagemin-mozjpeg"));
const imagemin_oxipng_include_oxipng_bin_1 = __importDefault(require("imagemin-oxipng-include-oxipng-bin"));
const imagemin_webp_1 = __importDefault(require("imagemin-webp"));
// 压缩并转换为WebP格式
async function compressAndConvertToWebP(inputFilePath, outputFilePath) {
    const extname = path_1.default.extname(inputFilePath).toLowerCase();
    if (extname !== '.jpg' && extname !== '.jpeg' && extname !== '.png') {
        return; // 非图片文件不做处理
    }
    let image = (0, sharp_1.default)(inputFilePath); // 使用 sharp 对图片进行处理
    // PNG 格式的图片判断是否含透明通道，如果是就使用 OxiPNG 压缩，否则使用 MozJPEG 压缩
    if (extname === '.png') {
        const hasAlpha = await image.metadata().then((metadata) => metadata.hasAlpha);
        if (hasAlpha) {
            // 使用 OxiPNG 压缩
            image = image.png({ compressionLevel: 9, adaptiveFiltering: true, force: true });
            image = await imagemin_1.default.buffer(await image.toBuffer(), {
                plugins: [(0, imagemin_oxipng_include_oxipng_bin_1.default)({})],
            }).then(buffer => (0, sharp_1.default)(buffer));
        }
        else {
            // 使用 MozJPEG 压缩
            image = image.jpeg({ quality: 80 });
            image = await imagemin_1.default.buffer(await image.toBuffer(), {
                plugins: [(0, imagemin_mozjpeg_1.default)({ quality: 80 })],
            }).then(buffer => (0, sharp_1.default)(buffer));
        }
    }
    // JPEG 格式的图片直接使用 MozJPEG 压缩
    if (extname === '.jpg' || extname === '.jpeg') {
        image = image.jpeg({ quality: 80 });
        image = await imagemin_1.default.buffer(await image.toBuffer(), {
            plugins: [(0, imagemin_mozjpeg_1.default)({ quality: 80 })],
        }).then(buffer => (0, sharp_1.default)(buffer));
    }
    // 将压缩后的图片转换为 WebP 格式
    const webpData = await imagemin_1.default.buffer(await image.toBuffer(), {
        plugins: [(0, imagemin_webp_1.default)({ quality: 80 })]
    });
    // 判断图片压缩后的大小是否比原图小，如果不是则使用原图
    const stats = await fs_1.promises.stat(inputFilePath);
    if (stats.size <= webpData.length) {
        return;
    }
    // 将压缩后的图片保存到文件系统，并以 .webp 后缀命名
    await fs_1.promises.writeFile(outputFilePath, webpData);
}
exports.compressAndConvertToWebP = compressAndConvertToWebP;
