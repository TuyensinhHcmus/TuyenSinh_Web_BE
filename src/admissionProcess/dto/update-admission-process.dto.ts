import { PartialType } from '@nestjs/swagger';
import { AddAdmissionProcessDto } from './add-admission-process.dto';

export class UpdateAdmissionProcessDto extends PartialType(AddAdmissionProcessDto) {}