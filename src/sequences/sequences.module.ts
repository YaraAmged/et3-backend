import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBModel } from 'src/common/constants/DBModel.enum';
import { SequenceSchema } from './schemas/sequence.schema';
import { SequencesService } from './sequences.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DBModel.Sequence, schema: SequenceSchema },
    ]),
  ],
  providers: [SequencesService],
  exports: [SequencesService],
})
export class SequencesModule {}
