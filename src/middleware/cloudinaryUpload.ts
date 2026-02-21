import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';
import { UploadApiResponse } from 'cloudinary';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const streamUpload = (req: Request): Promise<UploadApiResponse> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'satesma-products',
              resource_type: 'auto',
            },
            (error: any, result?: UploadApiResponse) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

          Readable.from(req.file!.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);
      req.body.image = result.secure_url;
    }
    next();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
};

export { upload };
