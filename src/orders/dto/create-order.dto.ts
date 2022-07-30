import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'src/common/interfaces/mongoose.interface';
class CreateOrderItemDto {
  @IsNotEmpty()
  @IsMongoId()
  item: ObjectId;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  extras: ObjectId[];
}
export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateOrderItemDto)
  @ValidateNested()
  items: CreateOrderItemDto[];
}
