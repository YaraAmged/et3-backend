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
import { ResponseMessage } from 'src/common/constants/ResponseMessage.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return { message: ResponseMessage.CREATED_SUCCESSFULLY, order };
  }

  @Get()
  async findAll(@Query() query: GetOrdersDto) {
    const orders = await this.ordersService.findAll(query);
    return { orders };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);
    return { order };
  }

  @Put(':id/fulfilled')
  async markAsFulfilled(@Param('id') id: string) {
    const order = await this.ordersService.markAsFulfilled(id);
    return { message: ResponseMessage.UPDATED_SUCCESSFULLY, order };
  }

  @Delete(':id')
  async cancel(@Param('id') id: string) {
    const order = await this.ordersService.cancel(id);
    return { message: ResponseMessage.UPDATED_SUCCESSFULLY, order };
  }
}
