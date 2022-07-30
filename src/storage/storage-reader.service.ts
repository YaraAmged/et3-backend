import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { StorageFolder } from './constants/StorageFolder.enum';
import { StorageService } from './storage.service';

@Injectable()
export class StorageReaderService {
  constructor() {}

  async findOne(folderPath: StorageFolder, filePath: string) {
    const path = `${StorageService.BASE_PATH}/${folderPath}/${filePath}`;
    return this.retrieveFile(path);
  }

  retrieveFile(path: string) {
    if (!fs.existsSync(path)) {
      throw new NotFoundException();
    }
    return fs.readFileSync(path);
  }
}
