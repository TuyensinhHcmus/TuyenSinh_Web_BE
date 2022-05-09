import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cvapplyinformation } from './cvapplyinformation.entity';
import { CvaisService } from './cvapplyinformation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([cvapplyinformation]),
  ],
  
  providers: [CvaisService],
  exports: [CvaisService],
})

export class CvaisModule {}