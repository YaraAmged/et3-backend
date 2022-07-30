import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { GetListDto } from 'src/common/dto/get-list.dto';

export class GetItemsDto extends GetListDto {
  static getQuery(query: GetItemsDto) {
    const queryConditions = [];
    if (query.ids) {
      queryConditions.push({ _id: { $in: query.ids } });
    }
    return queryConditions.length > 0 ? { $and: queryConditions } : {};
  }
}
