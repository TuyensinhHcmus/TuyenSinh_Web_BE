import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { admissionsgroup } from 'src/admissionGroup/admissionGroup.entity';
import { major } from 'src/majors/major.entity';
import { typeProgram } from 'src/typePrograms/typeProgram.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { applytemp } from './applytemp.entity';
import { AddApplyTempDto } from './dto/add-applytemp.dto';
import { UpdateApplyTempDto } from './dto/update-applytemp.dto';
const { v4: uuidv4 } = require('uuid')


@Injectable()
export class ApplyTempService {
  constructor(
    @InjectRepository(applytemp)
    private readonly applyTempRepo: Repository<applytemp>,
  ) { }

  private async findApplyTemp(applyTempId: string): Promise<applytemp> {
    let applyTemp;

    try {
      applyTemp = await this.applyTempRepo.findOne({ applyTempId: applyTempId });
    } catch (error) {
      throw new NotFoundException('Could not find this apply temp.');
    }

    if (!applyTemp) {
      throw new NotFoundException('Could not find this apply temp.');
    }

    return applyTemp;
  }

  async checkInfor(applyTempUserId: string, applyTempMajorId: string) {
    const res = await this.applyTempRepo.findOne(
      {
        applyTempUserId: applyTempUserId,
        applyTempMajorId: applyTempMajorId
      })

    //console.log(res);

    if (res) {
      throw new NotImplementedException("Bạn đã apply vào ngành này rồi")
    }
  }

  async insertTemp(applyTempUserId: string, addApplyTempDto: AddApplyTempDto) {
    const {
      applyTempMajorId,
      applyTempTotalScore,
      applyTempMajorName,
      applyTempScore1,
      applyTempScore2,
      applyTempScore3,
      applyTempGroupId,
    } = addApplyTempDto;
    // Kiểm tra user đã nộp với MajorId lần nào chưa
    await this.checkInfor(applyTempUserId, applyTempMajorId);

    const newApplyTemp = await this.applyTempRepo.create({
      applyTempId: uuidv4(),
      applyTempUserId: applyTempUserId,
      applyTempMajorId: applyTempMajorId,
      applyTempTotalScore: applyTempTotalScore,

      //applyTempMajorName: applyTempMajorName,
      applyTempScore1: applyTempScore1,
      applyTempScore2: applyTempScore2,
      applyTempScore3: applyTempScore3,
      applyTempGroupId: applyTempGroupId,
      applyTempTime: new Date()
    });

    const result = await this.applyTempRepo.save(newApplyTemp);
    return result;
  }

  async getRankUserByMajorId(applyTempId: string, dataFilered: Array<applytemp>) {
    const dataSorted = dataFilered.sort(function (a, b) {
      return a.applyTempTotalScore - b.applyTempTotalScore;
    });

    let rank, applyTempTotalScore, applyTempScore1, applyTempScore2, applyTempScore3 = -1;
    let applyTempUserId, applyTempMajorId, applyTempGroupId = "";
    let applyTempTime;

    dataSorted.forEach((value, key) => {
      if (value.applyTempId === applyTempId) {
        applyTempUserId = value.applyTempUserId;
        applyTempMajorId = value.applyTempMajorId;
        applyTempTotalScore = value.applyTempTotalScore;

        applyTempScore1 = value.applyTempScore1;
        applyTempScore2 = value.applyTempScore2;
        applyTempScore3 = value.applyTempScore3;
        applyTempGroupId = value.applyTempGroupId;
        applyTempTime = value.applyTempTime;

        rank = key + 1;
        for (let i = key - 1; i >= 0; i--) {
          if (dataSorted[i].applyTempTotalScore === dataSorted[key].applyTempTotalScore) {
            rank = i + 1;
          }
        }
      }
    })

    // Kết bảng major và admissionsgroup
    let listApplyTemp = await createQueryBuilder('applytemp')
      .where('applytemp.applyTempId = :applyTempId', { applyTempId: applyTempId })
      .leftJoinAndMapMany('applytemp.applyTempMajorId', major, 'major', 'major.majorId = applytemp.applyTempMajorId')
      .leftJoinAndMapMany('applytemp.applyTempGroupId', admissionsgroup, 'ag', 'ag.agId = applytemp.applyTempGroupId')
      .leftJoinAndMapMany('major.majorTypeProgram', typeProgram, 'tp', 'tp.typeProgramId = major.majorTypeProgram')
      .select([
        'tp.typeProgramName',
        'major.majorName',

        'ag.agFirstSubject',
        'ag.agSecondSubject',
        'ag.agThirdSubject',
      ])
      .getRawMany();

    console.log(listApplyTemp);

    const res = {
      "applyTempId": applyTempId,
      "applyTempUserId": applyTempUserId,
      "applyTempMajorId": applyTempMajorId,
      "applyTempTotalScore": applyTempTotalScore,

      "applyTempScore1": applyTempScore1,
      "applyTempScore2": applyTempScore2,
      "applyTempScore3": applyTempScore3,
      "applyTempGroupId": applyTempGroupId,
      "applyTempTime": applyTempTime,

      "applyTempTypeProgramName": listApplyTemp[0].tp_typeProgramName,
      "applyTempMajorName": listApplyTemp[0].major_majorName,
      "applyTempSubject1": listApplyTemp[0].ag_agFirstSubject,
      "applyTempSubject2": listApplyTemp[0].ag_agSecondSubject,
      "applyTempSubject3": listApplyTemp[0].ag_agThirdSubject,

      "rank": rank,
      "total": dataSorted.length
    }

    return res;
  }

  async getRankUser(applyTempUserId: string, data: Array<applytemp>) {
    // Tìm tất cả data của user
    const userData = await this.applyTempRepo.find({ applyTempUserId: applyTempUserId });
    // const userData = data.filter(obj => {
    //   if (obj.applyTempUserId === applyTempUserId) {
    //     return obj;
    //   }
    // })

    // Tìm rank của user theo applyTempMajorId
    let dataFilered = [];
    const res = [];

    for (let i = 0; i < userData.length; i++) {
      dataFilered = [];
      data.filter(value => {
        if (value.applyTempMajorId === userData[i].applyTempMajorId) {
          dataFilered.push(value);
        }
      })

      //console.log(dataFilered);

      res.push(await this.getRankUserByMajorId(userData[i].applyTempId, dataFilered));
    }

    return res;
  }

  async applytemp(applyTempUserId: string, addApplyTempDto: AddApplyTempDto) {
    const { applyTempMajorId, applyTempTotalScore } = addApplyTempDto;


    // Insert into database
    await this.insertTemp(applyTempUserId, addApplyTempDto);

    // Data all
    let data = await this.applyTempRepo.find({});
    // let data = [
    //   {
    //     applyTempId: "1",
    //     applyTempUserId: "6e05bcaf-a1a9-4b9b-af0d-fcbd49539964",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "2",
    //     applyTempUserId: "2",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 5.5
    //   },
    //   {
    //     applyTempId: "3",
    //     applyTempUserId: "3",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.8
    //   },
    //   {
    //     applyTempId: "4",
    //     applyTempUserId: "4",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "5",
    //     applyTempUserId: "5",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "6",
    //     applyTempUserId: "6",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 6.8
    //   },
    //   {
    //     applyTempId: "7",
    //     applyTempUserId: "7",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 4.2
    //   },
    //   {
    //     applyTempId: "8",
    //     applyTempUserId: "8",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.6
    //   },
    //   {
    //     applyTempId: "9",
    //     applyTempUserId: "6e05bcaf-a1a9-4b9b-af0d-fcbd49539964",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 5.2
    //   },
    //   {
    //     applyTempId: "10",
    //     applyTempUserId: "10",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 8.3
    //   }
    // ]

    // Find rank of user in database
    const res = await this.getRankUser(applyTempUserId, data);

    let result;
    res.forEach(applyTempObj => {
      if (applyTempObj.applyTempMajorId === applyTempMajorId) {
        result = applyTempObj;
      }
    })


    return result;
  }

  async getList(applyTempUserId: string) {
    // Data all
    let data = await this.applyTempRepo.find({});
    // let data = [
    //   {
    //     applyTempId: "1",
    //     applyTempUserId: "6e05bcaf-a1a9-4b9b-af0d-fcbd49539964",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "2",
    //     applyTempUserId: "2",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 5.5
    //   },
    //   {
    //     applyTempId: "3",
    //     applyTempUserId: "3",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.8
    //   },
    //   {
    //     applyTempId: "4",
    //     applyTempUserId: "4",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "5",
    //     applyTempUserId: "5",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "6",
    //     applyTempUserId: "6",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 6.8
    //   },
    //   {
    //     applyTempId: "7",
    //     applyTempUserId: "7",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 4.2
    //   },
    //   {
    //     applyTempId: "8",
    //     applyTempUserId: "8",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.6
    //   },
    //   {
    //     applyTempId: "9",
    //     applyTempUserId: "6e05bcaf-a1a9-4b9b-af0d-fcbd49539964",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 5.2
    //   },
    //   {
    //     applyTempId: "10",
    //     applyTempUserId: "10",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 8.3
    //   }
    // ]

    // let dataFileredByUser = [];
    // data.forEach(value => {
    //   dataFileredByUser.push(value.applyTempUserId);
    // })

    // dataFileredByUser = Array.from(new Set(dataFileredByUser));

    //console.log(dataFileredByUser)

    // Find rank of user in database
    let result = [];
    let res = []

    //console.log(dataFileredByUser[i])
    res = await this.getRankUser(applyTempUserId, data);
    //console.log(res);
    for (let j = 0; j < res.length; j++) {
      result.push(res[j]);
    }

    //const result = await this.getRankUser(applyTempUserId, data);

    return result;
  }

  async updateApplyTemp(applyTempUserId: string, updateApplyTempDto: UpdateApplyTempDto) {
    const {
      applyTempId,
      applyTempMajorId,
      applyTempTotalScore,

      applyTempScore1,
      applyTempScore2,
      applyTempScore3,
      applyTempGroupId,
    } = updateApplyTempDto;

    // Find apply temp by applyTempId
    const applyTemp = await this.findApplyTemp(applyTempId);
    // Update apply temp
    applyTemp.applyTempMajorId = applyTempMajorId;
    applyTemp.applyTempTotalScore = applyTempTotalScore;

    applyTemp.applyTempScore1 = applyTempScore1;
    applyTemp.applyTempScore2 = applyTempScore2;
    applyTemp.applyTempScore3 = applyTempScore3;
    applyTemp.applyTempGroupId = applyTempGroupId;

    await this.applyTempRepo.update({ applyTempId: applyTempId }, applyTemp);

    // Data all
    let data = await this.applyTempRepo.find({});
    // let data = [
    //   {
    //     applyTempId: "1",
    //     applyTempUserId: "6e05bcaf-a1a9-4b9b-af0d-fcbd49539964",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "2",
    //     applyTempUserId: "2",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 5.5
    //   },
    //   {
    //     applyTempId: "3",
    //     applyTempUserId: "3",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.8
    //   },
    //   {
    //     applyTempId: "4",
    //     applyTempUserId: "4",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "5",
    //     applyTempUserId: "5",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.2
    //   },
    //   {
    //     applyTempId: "6",
    //     applyTempUserId: "6",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 6.8
    //   },
    //   {
    //     applyTempId: "7",
    //     applyTempUserId: "7",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 4.2
    //   },
    //   {
    //     applyTempId: "8",
    //     applyTempUserId: "8",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 7.6
    //   },
    //   {
    //     applyTempId: "9",
    //     applyTempUserId: "6e05bcaf-a1a9-4b9b-af0d-fcbd49539964",
    //     applyTempMajorId: "7420201",
    //     applyTempTotalScore: 5.2
    //   },
    //   {
    //     applyTempId: "10",
    //     applyTempUserId: "10",
    //     applyTempMajorId: "7420101",
    //     applyTempTotalScore: 8.3
    //   }
    // ]

    // Find rank of user in database
    const res = await this.getRankUser(applyTempUserId, data);

    let result;
    res.forEach(applyTempObj => {
      if (applyTempObj.applyTempMajorId === applyTempMajorId) {
        result = applyTempObj;
      }
    })

    return result;
  }

  async deleteApplyTemp(applyTempId: string) {
    try {
      await this.findApplyTemp(applyTempId);

      await this.applyTempRepo.delete({ applyTempId: applyTempId });

      return {
        messaage: "Đã xóa thành công"
      }
    } catch (error) {
      throw new NotImplementedException("Không thể xóa apply temp này");
    }

  }
}
