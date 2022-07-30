import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { StorageFolder } from './constants/StorageFolder.enum';
import { StorageReaderService } from './storage-reader.service';

@Controller('Storage')
export class StorageController {
  constructor(private readonly storageReaderService: StorageReaderService) {}
  @Get(`:folder/:filePath`)
  async findOne(
    @Param('folder') folderPath: StorageFolder,
    @Param('filePath') filePath,
    @Res({ passthrough: true }) res,
  ) {
    return new StreamableFile(
      await this.storageReaderService.findOne(folderPath, filePath),
    );
  }
}
