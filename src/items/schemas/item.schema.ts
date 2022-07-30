import mongoose from 'mongoose';
import { ItemI } from '../entities/item.entity';

export const ItemExtraSchema = new mongoose.Schema<ItemI['extras'][number]>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ItemSchema = new mongoose.Schema<ItemI>(
  {
    name: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    active: { type: Boolean },
    extras: [ItemExtraSchema],
  },
  { timestamps: true },
);
