import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DBModel } from 'src/common/constants/DBModel.enum';
import { SequenceI } from './entities/sequence.entity';

@Injectable()
export class SequencesService {
  constructor(
    @InjectModel(DBModel.Sequence)
    private readonly Sequence: mongoose.Model<SequenceI>,
  ) {}
  async next(id: DBModel) {
    let sequence = await this.Sequence.findOneAndUpdate(
      { _id: id },
      { $inc: { current: 1 } },
    );
    if (!sequence) {
      sequence = new this.Sequence({ _id: id, current: 1 });
      await sequence.save();
    }
    return sequence.current;
  }
}
