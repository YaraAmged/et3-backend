import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DBModel } from 'src/common/constants/DBModel.enum';
import { ObjectId } from 'src/common/interfaces/mongoose.interface';
import { StorageFolder } from 'src/storage/constants/StorageFolder.enum';
import { StorageService } from 'src/storage/storage.service';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsDto } from './dto/get-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemI } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(DBModel.Item) private readonly Item: mongoose.Model<ItemI>,
    private readonly storageService: StorageService,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const item = new this.Item(createItemDto);
    item.images = createItemDto.images.map((image) =>
      this.storageService.update(StorageFolder.ITEM_IMAGE, item._id, image),
    );
    await item.save();
    return item;
  }

  async findAll(query: GetItemsDto) {
    const items = await this.Item.find({}).setOptions(
      GetItemsDto.getOptions(query),
    );
    return items;
  }

  async findOne(id: ObjectId) {
    const item = await this.Item.findById(id);
    if (!item) throw new NotFoundException({ error: 'Item Not Found' });
    return item;
  }

  async update(id: ObjectId, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    for (let key in updateItemDto) {
      item[key] = updateItemDto[key];
    }
    await item.save();
    return item;
  }

  async remove(id: ObjectId) {
    await this.Item.findByIdAndDelete(id);
  }
}
