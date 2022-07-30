import mongoose from 'mongoose';
import { DBModel } from 'src/common/constants/DBModel.enum';
import { ItemExtraSchema } from 'src/items/schemas/item.schema';
import { OrderStatus } from '../constants/order-status.enum';
import { OrderI } from '../entities/order.entity';

export const OrderSchema = new mongoose.Schema<OrderI>(
  {
    _id: { type: String },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: DBModel.Item,
        },
        extras: [ItemExtraSchema],
        quantity: { type: Number, min: 1, required: true },
        price: { type: Number, min: 1, required: true },
      },
    ],
    totalPrice: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      required: true,
      default: OrderStatus.CREATED,
      enum: Object.values(OrderStatus),
    },
  },
  { timestamps: true },
);
