import multer, { Multer } from 'multer';

export interface CloudinaryFile extends Express.Multer.File {
    buffer: Buffer;
  }
