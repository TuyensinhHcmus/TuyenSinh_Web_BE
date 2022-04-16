import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactsService } from './contacts.service';
import { contact } from './contact.entity';
import { ContactsController } from './contacts.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([contact]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})

export class ContactsModule {}