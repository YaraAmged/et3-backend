export type ObjectId = string;

export class MongooseEntity {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
