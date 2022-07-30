import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsFile } from 'nestjs-form-data';

class CreateItemExtraDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;
}

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsFile({ each: true })
  images: Express.Multer.File[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateItemExtraDto)
  extras: CreateItemExtraDto[];

  @IsNotEmpty()
  @IsBoolean()
  @Transform((o) => (o.value == 'true' || o.value === true ? true : false))
  active: boolean;
}
