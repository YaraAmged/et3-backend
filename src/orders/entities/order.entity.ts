import {
  ObjectId,
  MongooseEntity,
} from 'src/common/interfaces/mongoose.interface';
import { ItemI } from 'src/items/entities/item.entity';
import { OrderStatus } from '../constants/order-status.enum';

export class OrderI extends MongooseEntity {
  _id: string;
  items: {
    item: ItemI | ObjectId;
    extras: ItemI['extras'];
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: OrderStatus;
}
