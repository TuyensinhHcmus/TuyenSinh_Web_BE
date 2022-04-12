import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddContactDto } from './dto/add-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(contact)
    private readonly contactsRepo: Repository<contact>,
  ) {}

  async insertContact(addContactDto: AddContactDto): Promise<contact> {
    const { department, room, address, phone, email, page } = addContactDto;

    const contact = await this.contactsRepo.create({
      contactDepartment: department,
      contactRoom: room,
      contactAddress: address,
      contactPhone: phone,
      contactEmail: email,
      contactPage: page
    })

    const result = await this.contactsRepo.save(contact);

    return result;
  }

  async getContacts(): Promise<contact []> {
    const contacts = await this.contactsRepo.find({});
    return contacts;
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      await this.contactsRepo.delete({contactId: parseInt(contactId)})
    } catch (err) {
      throw new NotFoundException('Could not delete contact.', err);
    }
  }

  async getSingleContact(contactId: string): Promise<contact> {
    const contact = await this.findContact(contactId);
    return contact;
  }

  async updateContact(id: string, updateContactDto: UpdateContactDto): Promise<contact> {

    const { department, room, address, phone, email, page } = updateContactDto;

    const contact = await this.findContact(id);

    contact.contactDepartment = department;
    contact.contactRoom = room;
    contact.contactAddress = address;
    contact.contactPhone = phone;
    contact.contactEmail = email;
    contact.contactPage = page;
    
    await this.contactsRepo.update({contactId: parseInt(id)}, contact);

    return await this.findContact(id);
  }

  private async findContact(id: string): Promise<contact> {
    let contact;

    try {
      contact = await this.contactsRepo.findOne({contactId: parseInt(id)});
    } catch (error) {
      throw new NotFoundException('Could not find contact.');
    }

    if (!contact) {
      throw new NotFoundException('Could not find contact.');
    }

    return contact;
  }
}
