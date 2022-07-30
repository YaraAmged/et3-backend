import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';
import mongoose from 'mongoose';

export class GetListDto {
  static getOptions(
    query: GetListDto = { limit: 5, page: 5 },
  ): mongoose.QueryOptions {
    return { limit: query.limit, skip: query.page * query.limit };
  }
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  limit?: number;

  @IsOptional()
  @IsMongoId({ each: true })
  ids?: Object[];
}
