import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as mime from 'mime';
import { StorageFolder } from './constants/StorageFolder.enum';

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {}
  static BASE_PATH = 'Storage';

  update(
    folder: StorageFolder,
    fileName: string,
    file: { buffer: Buffer; mimetype: string },
  ) {
    const folderPath = `${StorageService.BASE_PATH}/${folder}`;
    const filePath = `${folderPath}/${Date.now()}-${fileName}.${(
      mime as any
    ).getExtension(file.mimetype)}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    fs.writeFileSync(filePath, file.buffer);
    return `${this.configService.get('API.URL')}/${filePath}`;
  }
}
