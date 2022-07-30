import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import development from './common/config/development';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { SequencesModule } from './sequences/sequences.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    { module: SequencesModule, global: true },
    { module: NestjsFormDataModule, global: true },
    ConfigModule.forRoot({ load: [development] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
      }),
    }),
    ItemsModule,
    OrdersModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
