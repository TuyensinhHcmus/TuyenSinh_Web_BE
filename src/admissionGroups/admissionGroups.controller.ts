import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { AdmissionGroupsSerivce } from './admissionGroups.service';
  
  @Controller('admissionGroups')
  export class AdmissionGroupsController {
    constructor(private readonly admissionGroupsService: AdmissionGroupsSerivce) {}
  
    // @Post()
    // async addProduct(
    //   @Body('idGroup') idGroup: string,
    //   @Body('nameGroup') nameGroup: string,
    // ) {
    //   const generatedId = await this.admissionGroupsService.insertUser(
    //     idGroup,
    //     nameGroup,
    //   );
    //   return { id: generatedId };
    // }

    @Get()
    async getAllAdmissionGroup() {
      const admissionGroups = await this.admissionGroupsService.getAdmissionGroups();  
      return admissionGroups;
    }
  }  