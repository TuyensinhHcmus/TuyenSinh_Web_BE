import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, LessThan, Repository } from 'typeorm';

import { AddCVDto } from './dto/add-cv.dto';

import { cv } from './cv.entity';
import { AspirationService } from 'src/aspiration/aspiration.service';
import { AddAspirationDto } from 'src/aspiration/dto/add-aspiration.dto';
import { AddListCVDto } from './dto/add-listcv.dto';
import { aspiration } from 'src/aspiration/aspiration.entity';
import { major } from 'src/majors/major.entity';
import { typeProgram } from 'src/typePrograms/typeProgram.entity';
import { method } from 'src/methods/method.entity';
import { UpdateCVDto } from './dto/update-cv.dto';
import { UpdateAspirationDto } from 'src/aspiration/dto/update-aspiration.dto';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(cv)
    private readonly cvsRepo: Repository<cv>,
    private readonly aspirationService: AspirationService
  ) { }

  async addCv(cvMethodId: string, cvUserId: string, cvFile: string): Promise<cv> {
    const cv = await this.cvsRepo.create({
      cvMethodId: cvMethodId,
      cvUserId: cvUserId,
      cvFile: cvFile,
      cvDateCreate: new Date(),
      cvState: "Đã lưu"
    })

    const result = await this.cvsRepo.save(cv);

    return result;
  }

  async addAspiration(CvId: number, typeProgram: string, major: string) {
    const aspirationData = new AddAspirationDto();
    aspirationData.aspirationCvId = CvId;
    aspirationData.aspirationMajor = major;
    aspirationData.aspirationState = "";

    await this.aspirationService.insertAspiration(aspirationData);
  }

  async insertCv(addCVDto: AddCVDto) {
    try {
      const { userId, method, listAspiration, fileUrl } = addCVDto;

      // Save cv into cv database
      const { cvId } = await this.addCv(method, userId, fileUrl);

      for (let i = 0; i < listAspiration.length; i++) {

        // Save aspiration into aspiration database
        await this.addAspiration(cvId, listAspiration[i].typeProgram, listAspiration[i].major);
      }

      return {
        cvId: cvId,
        message: "Đã lưu thành công !"
      };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeStateCv(addListCVData: AddListCVDto) {
    const { userId } = addListCVData;
    // Find all cv have cvUserId is userId
    const listCv = await this.cvsRepo.find({ cvUserId: userId });

    // Update state of cv
    for (let i = 0; i < listCv.length; i++) {
      if (listCv[i].cvState === "Đã lưu") {
        await this.cvsRepo.update({ cvId: listCv[i].cvId }, { cvState: "Đã nộp" })
      }
    }

    return "";
  }

  async unique(arr) {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
      if (!newArr.includes(arr[i])) {
        newArr.push(arr[i])
      }
    }
    return newArr
  }

  async getListCVByUserId(userId: string): Promise<any[]> {
    let listcvs = await createQueryBuilder('cv')
      .where('cv.cvUserId = :cvUserId', { cvUserId: userId })
      .leftJoinAndMapMany('cv.cvId', aspiration, 'aspiration', 'aspiration.aspirationCvId = cv.cvId')
      .leftJoinAndMapMany('cv.cvMethodId', method, 'method', 'method.methodId = cv.cvMethodId')
      .leftJoinAndMapMany('aspiration.aspirationMajor', major, 'major', 'major.majorId = aspiration.aspirationMajor')
      .leftJoinAndMapMany('major.majorTypeProgram', typeProgram, 'typeProgram', 'typeProgram.typeProgramId = major.majorTypeProgram')
      .select([
        'cv.cvId',
        'method.methodName',
        'aspiration.aspirationId',
        'major.majorName',
        'typeProgram.typeProgramName',
        'cv.cvFile'
      ])
      .getRawMany();

    const cvs = await this.cvsRepo.createQueryBuilder('cv')
      .where('cv.cvUserId = :cvUserId', { cvUserId: userId })
      .leftJoinAndMapMany('cv.cvMethodId', method, 'method', 'method.methodId = cv.cvMethodId')
      .select([
        'cv.cvId',
        'method.methodName',
        'cv.cvFile'
      ])
      .getRawMany()

    let result = cvs.map(cv => {
      return {
        cvId: cv.cv_cvId,
        method: cv.method_methodName,
        fileUrl: cv.cv_cvFile,
        listAspiration: []
      }
    })

    result.map((cvId, index) => {
      listcvs.forEach(cv => {
        if (cv.cv_cvId === cvId.cvId) {
          result[index].listAspiration.push({
            aspirationId: cv.aspiration_aspirationId,
            typeProgram: cv.typeProgram_typeProgramName,
            major: cv.major_majorName
          })
        }
      })
    })

    return result;
  }

  // Update
  async updateCv(updateCVData: UpdateCVDto){
    try {
      const { userId, cvId, method, listAspiration, fileUrl } = updateCVData;

      // Find cv by cvId
      let cv = await this.cvsRepo.findOne({cvId: cvId});

      cv.cvMethodId = method;
      cv.cvFile = fileUrl;

      // Update cv
      await this.cvsRepo.update({cvId: cvId}, cv);

      // Update list aspiration
      for (let i = 0; i < listAspiration.length; i++) {

        // Save aspiration into aspiration database
        let aspiration = new UpdateAspirationDto();
        aspiration.aspirationMajor = listAspiration[i].major;
        aspiration.aspirationCvId = cvId;

        let updateAspiration = await this.aspirationService.updateAspiration(listAspiration[i].aspirationId, aspiration);
      }

      return {
        cvId: cvId,
        message: "Đã cập nhật thành công !"
      };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   async deleteContact(contactId: string): Promise<void> {
  //     try {
  //       await this.contactsRepo.delete({contactId: parseInt(contactId)})
  //     } catch (err) {
  //       throw new NotFoundException('Could not delete contact.', err);
  //     }
  //   }

  //   async getSingleContact(contactId: string): Promise<contact> {
  //     const contact = await this.findContact(contactId);
  //     return contact;
  //   }

  //   async updateContact(id: string, updateContactDto: UpdateContactDto): Promise<contact> {

  //     const { department, room, address, phone, email, page } = updateContactDto;

  //     const contact = await this.findContact(id);

  //     contact.contactDepartment = department;
  //     contact.contactRoom = room;
  //     contact.contactAddress = address;
  //     contact.contactPhone = phone;
  //     contact.contactEmail = email;
  //     contact.contactPage = page;

  //     await this.contactsRepo.update({contactId: parseInt(id)}, contact);

  //     return contact;
  //   }

  //   private async findContact(id: string): Promise<contact> {
  //     let contact;

  //     try {
  //       contact = await this.contactsRepo.findOne({contactId: parseInt(id)});
  //     } catch (error) {
  //       throw new NotFoundException('Could not find contact.');
  //     }

  //     if (!contact) {
  //       throw new NotFoundException('Could not find contact.');
  //     }

  //     return contact;
  //   }
}
