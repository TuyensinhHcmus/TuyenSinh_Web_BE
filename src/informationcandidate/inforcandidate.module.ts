import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InforCandidatesController } from './inforcandidate.controller';
import { inforcandidate } from './inforcandidate.entity';
import { InforCandidatesService } from './inforcandidate.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([inforcandidate])
  ],
  controllers: [InforCandidatesController],
  providers: [InforCandidatesService],
})

export class InforCandidatesModule {}