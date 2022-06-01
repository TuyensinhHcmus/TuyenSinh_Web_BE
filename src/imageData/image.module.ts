import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller';
import { imageData } from './image.entity';
import { ImageService } from './image.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([imageData])
  ],
  controllers: [ImageController],
  providers: [ImageService],
})

export class ImageModule {}