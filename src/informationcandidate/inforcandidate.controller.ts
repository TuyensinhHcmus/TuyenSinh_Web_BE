import {
    Controller,
    Get,
    Param,
    Query,
  } from '@nestjs/common';
import { inforcandidate } from './inforcandidate.entity';
import { InforCandidatesService } from './inforcandidate.service';

  @Controller('inforcandidates')
  export class InforCandidatesController {
    constructor(private readonly inforCandidatesService: InforCandidatesService) {}
  
    // [GET] /inforcandidates/getListCandidate
    @Get('getListCandidate')
    async getAllFaculties(): Promise<inforcandidate[]> {
      const listCandidate = await this.inforCandidatesService.getInforCandidate();
      return listCandidate;
    }
  
    // [GET] /inforcandidates/getSingleCandidate
    @Get('getSingleCandidate')
    async getFaculty(@Query('icIdentity') icIdentity: string): Promise<inforcandidate> {
      const inforCandidate = await this.inforCandidatesService.getSingleInforCandidate(icIdentity);
      return inforCandidate;
    }

  }
  