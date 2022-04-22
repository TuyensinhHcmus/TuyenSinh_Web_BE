import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inforcandidate } from './inforcandidate.entity';


@Injectable()
export class InforCandidatesService {
    constructor(
        @InjectRepository(inforcandidate)
        private readonly inforCandidatesRepo: Repository<inforcandidate>,
    ) { }


    async getInforCandidate(): Promise<inforcandidate[]> {
        const informationCandidates = await this.inforCandidatesRepo.find({});
        return informationCandidates;
    }


    async getSingleInforCandidate(icIdentity: string): Promise<inforcandidate> {
        const informationCandidates = await this.findInforCandidate(icIdentity);
        return informationCandidates;
    }

    private async findInforCandidate(id: string): Promise<inforcandidate> {
        let informationCandidates;

        try {
            informationCandidates = await this.inforCandidatesRepo.findOne({ icIdentity: id });
        } catch (error) {
            throw new NotFoundException('Could not find information of candidate.');
        }

        if (!informationCandidates) {
            throw new NotFoundException('Could not find information of candidate.');
        }

        return informationCandidates;
    }
}
