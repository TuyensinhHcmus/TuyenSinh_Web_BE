import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { applytemp } from './applytemp.entity';
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

  async insertTemp(applyTempUserId: string, applyTempMajorId: string, applyTempTotalScore: number) {
    // Kiểm tra user đã nộp với MajorId lần nào chưa
    await this.checkInfor(applyTempUserId, applyTempMajorId);

    const newApplyTemp = await this.applyTempRepo.create({
      applyTempId: uuidv4(),
      applyTempUserId: applyTempUserId,
      applyTempMajorId: applyTempMajorId,
      applyTempTotalScore: applyTempTotalScore
    });

    const result = await this.applyTempRepo.save(newApplyTemp);
    return result;
  }

  async getRankUserByMajorId(applyTempId: string, dataFilered: Array<applytemp>) {
    const dataSorted = dataFilered.sort(function (a, b) {
      return a.applyTempTotalScore - b.applyTempTotalScore;
    });

    let rank, applyTempTotalScore = -1;
    let applyTempUserId, applyTempMajorId = "";


    dataSorted.forEach((value, key) => {
      if (value.applyTempId === applyTempId) {
        applyTempUserId = value.applyTempUserId,
          applyTempMajorId = value.applyTempMajorId,
          applyTempTotalScore = value.applyTempTotalScore
        rank = key + 1;
      }
    })

    const res = {
      "applyTempId": applyTempId,
      "applyTempUserId": applyTempUserId,
      "applyTempMajorId": applyTempMajorId,
      "applyTempTotalScore": applyTempTotalScore,
      "rank": rank
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

  async applytemp(applyTempUserId: string, applyTempMajorId: string, applyTempTotalScore: number) {

    // Insert into database
    await this.insertTemp(applyTempUserId, applyTempMajorId, applyTempTotalScore);

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

  async updateApplyTemp(applyTempUserId: string, applyTempId: string, applyTempMajorId: string, applyTempTotalScore: number) {
    // Find apply temp by applyTempId
    const applyTemp = await this.findApplyTemp(applyTempId);
    // Update apply temp
    applyTemp.applyTempMajorId = applyTempMajorId;
    applyTemp.applyTempTotalScore = applyTempTotalScore;

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
}