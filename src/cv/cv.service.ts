import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddCVDto } from './dto/add-cv.dto';

import { cv } from './cv.entity';
import { AspirationService } from 'src/aspiration/aspiration.service';
import { AddAspirationDto } from 'src/aspiration/dto/add-aspiration.dto';
import { AddListCVDto } from './dto/add-listcv.dto';

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

  //Promise<cv>  
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
        message: "Đã lưu thành công !"
      };
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeStateCv(addListCVData: AddListCVDto) {
    const { userId } = addListCVData;
    // await this.cvsRepo.createQueryBuilder("cv")
    // .update(
      
    // )

    // Find all cv have cvUserId is userId
    const listCv = await this.cvsRepo.find({ cvUserId: userId });

    // Update state of cv
    for (let i = 0; i < listCv.length; i++) {
      if(listCv[i].cvState === "Đã lưu"){
        await this.cvsRepo.update({cvId: listCv[i].cvId}, {cvState: "Đã nộp"})
      }
    }

    return "";
  }

  async getCvs(): Promise<cv[]> {
    const contacts = await this.cvsRepo.find({});
    return contacts;
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
