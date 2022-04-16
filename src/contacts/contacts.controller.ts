import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AddContactDto } from './dto/add-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsService } from './contacts.service';
import { contact } from './contact.entity';
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // [GET] /contacts
  @Get()
  async getAllContacts(): Promise<contact[]> {
    const contacts = await this.contactsService.getContacts();
    return contacts;
  }

  // [POST] /contacts
  @Post()
  async addContact(@Body() addContactDto: AddContactDto): Promise<contact> {
    return await this.contactsService.insertContact(addContactDto);
  }

  // [DELETE] /contacts/:id
  @Delete(':id')
  async removeContact(@Param('id') contactId: string): Promise<void> {
    return await this.contactsService.deleteContact(contactId);
  }

  // [GET] /contacts/:id
  @Get(':id')
  async getContact(@Param('id') contactId: string): Promise<contact> {
    const contact = await this.contactsService.getSingleContact(contactId);
    return contact;
  }

  // [PATCH] /contacts/:id
  @Patch(':id')
  async updateFaculty(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<contact> {
    return await this.contactsService.updateContact(id, updateContactDto);
  }
}
