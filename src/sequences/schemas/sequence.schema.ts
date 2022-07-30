import mongoose from 'mongoose';
import { SequenceI } from '../entities/sequence.entity';

export const SequenceSchema = new mongoose.Schema<SequenceI>({
  _id: { type: String },
  current: { type: Number, required: true },
});
