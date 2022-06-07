import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { AddImageDto } from './dto/add-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { imageData } from './image.entity';
import { ImageService } from './image.service';


@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    // [GET] /image/getList
    @Get('getList')
    async getListImage(): Promise<imageData[]> {
        const listImage = await this.imageService.getListImage();
        return listImage;
    }

    // [GET] /image/getOne
    @Get('getOne')
    async getOneImage(
        @Query('imageId') imageId: number
    ): Promise<imageData> {
        const image = await this.imageService.getOneImage(imageId);
        return image;
    }

    // [GET] /image/getImageByType
    @Get('getImageByType')
    async getImageByType(
        @Query('imageType') imageType: string
    ): Promise<imageData[]> {
        const image = await this.imageService.getImageByType(imageType);
        return image;
    }


    // [Post] /image/addImage
    @Post('addImage')
    async addImage(
        @Body() addImageDto: AddImageDto
    ): Promise<any> {
        const result = await this.imageService.addImage(addImageDto);
        return result;
    }

    // [Put] /image/updateImage
    @Put('updateImage')
    async updateImage(
        @Body() updateImageDto: UpdateImageDto,
        @Body('imageId') imageId: number
    ): Promise<any> {
        const result = await this.imageService.updateImage(imageId, updateImageDto);
        return result;
    }

    // [Delete] /image/deleteImage
    @Delete('deleteImage')
    async deleteImage(
        @Body('imageId') imageId: number
    ): Promise<any> {
        const result = await this.imageService.deleteImage(imageId);
        return result;
    }
}