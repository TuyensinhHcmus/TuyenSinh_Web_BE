import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddCVDto } from './dto/add-cv.dto';

import { cv } from './cv.entity';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(cv)
    private readonly cvsRepo: Repository<cv>,
  ) {}

  async insertCv(addCVDto: AddCVDto): Promise<cv> {
    const { cvMethodId, cvUserId, cvFile, cvState } = addCVDto;

    const cv = await this.cvsRepo.create({
      cvMethodId: cvMethodId,
      cvUserId: cvUserId,
      cvFile: cvFile,
      cvDateCreate: new Date(),
      cvState: cvState
    })

    const result = await this.cvsRepo.save(cv);

    return result;
  }

  async getCvs(): Promise<cv []> {
    const contacts = await this.cvsRepo.find({});
    return contacts;
  }
  async getCvByUserId(userId: string) {
    const listCV = await this.cvsRepo.find({cvUserId: userId});
    return listCV;
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
