import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { aspiration } from './aspiration.entity';
import { AddAspirationDto } from './dto/add-aspiration.dto';
import { UpdateAspirationDto } from './dto/update-aspiration.dto';



@Injectable()
export class AspirationService {
    constructor(
        @InjectRepository(aspiration)
        private readonly aspirationRepo: Repository<aspiration>,
    ) { }

    async insertAspiration(addAspirationDto: AddAspirationDto): Promise<aspiration> {
        const { aspirationMajor, aspirationCvId } = addAspirationDto;

        const admissionProcess = await this.aspirationRepo.create({
            aspirationMajor: aspirationMajor,
            aspirationState: "Đã lưu",
            aspirationCvId: aspirationCvId
        })

        const result = await this.aspirationRepo.save(admissionProcess);

        return result;
    }

    // async getAdmissionProcess(): Promise<admissionProcess[]> {
    //     const admissionProcess = await this.admissionProcessRepo.find({});
    //     return admissionProcess;
    // }

    // async deleteAdmissionProcess(admissionProcessId: string): Promise<void> {
    //     try {
    //         await this.admissionProcessRepo.delete({ apId: parseInt(admissionProcessId) })
    //     } catch (err) {
    //         throw new NotFoundException('Could not delete admission process.', err);
    //     }
    // }

    // async getSingleAdmissionProcess(admissionProcessId: string): Promise<admissionProcess> {
    //     const admissionProcess = await this.findAdmissionProcess(admissionProcessId);
    //     return admissionProcess;
    // }

    async updateAspiration(id: string, updateAspirationDto: UpdateAspirationDto): Promise<aspiration> {

        const { aspirationMajor, aspirationState, aspirationCvId } = updateAspirationDto;

        const aspiration = await this.findAspiration(id);

        aspiration.aspirationMajor = aspirationMajor ? aspirationMajor: aspiration.aspirationMajor;
        aspiration.aspirationState = aspirationState ? aspirationState: aspiration.aspirationState;
        aspiration.aspirationCvId = aspirationCvId ? aspirationCvId: aspiration.aspirationCvId;

        await this.aspirationRepo.update({ aspirationId: parseInt(id) }, aspiration);

        return aspiration;
    }

    private async findAspiration(id: string): Promise<aspiration> {
        let aspiration;

        try {
            aspiration = await this.aspirationRepo.findOne({ aspirationId: parseInt(id) });
        } catch (error) {
            throw new NotFoundException('Could not find aspiration.');
        }

        if (!aspiration) {
            throw new NotFoundException('Could not find aspiration.');
        }

        return aspiration;
    }
}
