import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { StorageReaderService } from './storage-reader.service';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [ConfigModule, MulterModule.register({ dest: './uploads' })],
  controllers: [StorageController],
  providers: [StorageService, StorageReaderService],
  exports: [StorageService, StorageReaderService],
})
export class StorageModule {}
