import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DBModel } from 'src/common/constants/DBModel.enum';
import { ItemsService } from 'src/items/items.service';
import { SequencesService } from 'src/sequences/sequences.service';
import { OrderStatus } from './constants/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderI } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(DBModel.Order) private readonly Order: mongoose.Model<OrderI>,
    private readonly sequencesService: SequencesService,
    private readonly itemsService: ItemsService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const id = await this.sequencesService.next(DBModel.Order);
    const order = new this.Order({ _id: id, status: OrderStatus.CREATED });
    const items = await this.itemsService.findAll({
      ids: order.items.map((item) => item.item),
    });

    for (let item of createOrderDto.items) {
      const index = items.findIndex(
        (originalItem) => originalItem._id.toString() == item.item.toString(),
      );
      if (index == -1)
        throw new BadRequestException({ error: 'Item not found' });
      const originalItem = items[index];
      const itemEntry: OrderI['items'][number] = {
        item: originalItem._id,
        extras: originalItem.extras.filter((extra) =>
          item.extras.some(
            (selectedItem) => selectedItem.toString() == extra._id.toString(),
          ),
        ),
        price: 0,
        quantity: item.quantity,
      };
      itemEntry.price =
        +originalItem.price +
        itemEntry.extras.reduce((total, extra) => +total + extra.price, 0);

      order.items.push(itemEntry);
    }

    order.totalPrice = order.items.reduce(
      (total, item) => +total + item.price * item.quantity,
      0,
    );
    await order.save();
    return order;
  }

  async findAll(query: GetOrdersDto) {
    const orders = await this.Order.find({}).setOptions({
      ...GetOrdersDto.getOptions(query),
      populate: [{ path: 'items.item' }],
    });
    return orders;
  }

  async findOne(id: string) {
    const order = await this.Order.findById({ _id: id });
    if (!order) throw new NotFoundException({ error: 'Order Not Found' });
    return order;
  }

  async markAsFulfilled(id: string) {
    const order = await this.findOne(id);
    switch (order.status) {
      case OrderStatus.CANCELLED:
        throw new PreconditionFailedException({
          error: 'Order is cancelled',
        });
      default:
        break;
    }
    order.status = OrderStatus.FULFILLED;
    await order.save();
    return order;
  }

  async cancel(id: string) {
    const order = await this.findOne(id);

    switch (order.status) {
      case OrderStatus.FULFILLED:
        throw new PreconditionFailedException({
          error: 'Order Already FulFilled',
        });
      default:
        break;
    }
    order.status = OrderStatus.CANCELLED;
    await order.save();
  }
}
