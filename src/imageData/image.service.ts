import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddImageDto } from './dto/add-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { imageData } from './image.entity';



@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(imageData)
        private readonly imageRepo: Repository<imageData>,
    ) { }

    async getListImage(): Promise<imageData[]> {
        const listImage = await this.imageRepo.find({});
        return listImage;
    }

    async getOneImage(imageId: number): Promise<imageData> {
        const image = await this.imageRepo.findOne({ imageId: imageId });
        return image;
    }

    async getImageByType(imageType: string): Promise<imageData[]> {
        const image = await this.imageRepo.find({ imageType: imageType });
        return image;
    }

    async addImage(addImageDto: AddImageDto): Promise<any> {
        try {
            console.log(addImageDto);
            const { imagePath,
                imageTypeOfTrainingId,
                imageType,
                imageStartDate,
                imageEndDate,
                imageFacultyId } = addImageDto;

            const image = await this.imageRepo.create({
                imagePath: imagePath,
                imageTypeOfTrainingId: imageTypeOfTrainingId,
                imageType: imageType,
                imageStartDate: imageStartDate,
                imageEndDate: imageEndDate,
                imageFacultyId: imageFacultyId
            })

            const result = await this.imageRepo.save(image);

            return {
                message: "Đã thêm ảnh thành công.",
                imageId: result.imageId,
                imageFacultyId: result.imageFacultyId
            };
        } catch (error) {
            throw new NotImplementedException("Không thể thêm ảnh!");
        }
    }

    private async findImage(imageId: number): Promise<imageData> {
        let image;

        try {
            image = await this.imageRepo.findOne({ imageId: imageId });
        } catch (error) {
            throw new NotFoundException('Could not find image.');
        }

        if (!image) {
            throw new NotFoundException('Could not find image.');
        }

        return image;
    }

    async updateImage(imageId: number, updateImageDto: UpdateImageDto): Promise<any> {
        try {
            console.log(updateImageDto);
            const { imagePath,
                imageTypeOfTrainingId,
                imageType,
                imageStartDate,
                imageEndDate } = updateImageDto;

            let image = await this.findImage(imageId);

            image.imagePath = imagePath;
            image.imageTypeOfTrainingId = imageTypeOfTrainingId;
            image.imageType = imageType;
            image.imageStartDate = imageStartDate;
            image.imageEndDate = imageEndDate;

            await this.imageRepo.update({ imageId: imageId }, image);

            return {
                message: "Đã cập nhật ảnh thành công.",
                imageId: image.imageId,
                imageFacultyId: image.imageFacultyId
            };
        } catch (error) {
            throw new NotImplementedException("Không thể cập nhật ảnh!");
        }
    }

    async deleteImage(imageId: number): Promise<any> {
        try {
            await this.findImage(imageId);

            await this.imageRepo.delete({ imageId: imageId });
            return {
                message: "Đã xóa ảnh thành công."
            };
        } catch (error) {
            throw new NotImplementedException("Không thể xóa ảnh!");
        }
    }
}
