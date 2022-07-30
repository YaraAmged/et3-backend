import {
  MongooseEntity,
  ObjectId,
} from 'src/common/interfaces/mongoose.interface';

export class ItemI extends MongooseEntity {
  price: number;
  name: string;
  images: string[];
  extras: { _id: ObjectId; name: string; price: number }[];
  active: boolean;
}
