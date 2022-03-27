import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddTuitionDto } from './dto/add-tuition.dto';
import { UpdateTuitionDto } from './dto/update-tuition.dto';

import { Tuition } from './tuition.model';

@Injectable()
export class TuitionsService {
  constructor(
    @InjectModel('Tuition') private readonly tuitionModel: Model<Tuition>,
  ) {}

  async insertTuition(addTuitionDto: AddTuitionDto): Promise<Tuition> {
    const { majorId, fee, feeIncRate, documentary } = addTuitionDto;

    const tuition = new this.tuitionModel({
      tuitionMajorId: majorId,
      tuitionFee: fee,
      tuitionFeeIncRate: feeIncRate,
      tuitionDocumentary: documentary,
    });

    const result = await tuition.save();
    return result;
  }

  async getTuitions(): Promise<Tuition[]> {
    const res = await this.tuitionModel.aggregate([
      {
        $lookup: {
          from: 'majors',
          localField: 'tuitionMajorId',
          foreignField: 'majorId',
          as: 'major',
        },
      },
    ]);

    if (res.length > 0) {
      res.forEach(item => {
        item.major = item.major[0].majorName;
      })
    }
    
    return res;

    // const tuitions = await this.tuitionModel.find({});

    // return tuitions;
  }

  async deleteTuition(tuitionId: string): Promise<void> {
    try {
      await this.tuitionModel.deleteOne({ _id: tuitionId }).exec();
    } catch (err) {
      throw new NotFoundException('Could not delete tuition.', err);
    }
  }

  async getSingleTuition(tuitionId: string): Promise<Tuition> {
    const tuition = await this.findTuition(tuitionId);
    return tuition;
  }

  async updateTuition(
    id: string,
    updateTuitionDto: UpdateTuitionDto,
  ): Promise<Tuition> {
    const { majorId, fee, feeIncRate, documentary } = updateTuitionDto;

    const tuition = await this.findTuition(id);

    tuition.tuitionMajorId = majorId;
    (tuition.tuitionFee = fee),
      (tuition.tuitionFeeIncRate = feeIncRate),
      (tuition.tuitionDocumentary = documentary),
      tuition.save();

    return tuition;
  }

  private async findTuition(id: string): Promise<Tuition> {
    let tuition;

    try {
      tuition = await this.tuitionModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find tuition.');
    }

    if (!tuition) {
      throw new NotFoundException('Could not find tuition.');
    }

    return tuition;
  }
}
