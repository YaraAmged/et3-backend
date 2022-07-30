import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { ResponseMessage } from 'src/common/constants/ResponseMessage.enum';
import { ObjectId } from 'src/common/interfaces/mongoose.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsDto } from './dto/get-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @FormDataRequest()
  async create(@Body() createItemDto: CreateItemDto) {
    const item = await this.itemsService.create(createItemDto);
    return { message: ResponseMessage.CREATED_SUCCESSFULLY, item };
  }

  @Get()
  async findAll(@Query() query: GetItemsDto) {
    const items = await this.itemsService.findAll(query);
    return { items };
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    const item = await this.itemsService.findOne(id);
    return { item };
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    const item = await this.itemsService.update(id, updateItemDto);
    return { message: ResponseMessage.UPDATED_SUCCESSFULLY, item };
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    await this.itemsService.remove(id);
    return { message: ResponseMessage.DELETED_SUCCESSFULLY };
  }
}
