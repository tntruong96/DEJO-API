import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Image } from 'src/interfaces/image.interface';
import { BaseService } from '../../interfaces/ibase.interface';
import { ImageCreateDTO, ImageResponstDTO } from './image.dto';
import ImagesEntity from './image.entity';
import { ImageReopository } from './image.repository';

@Injectable()
export class ImageService extends BaseService<ImagesEntity, ImageReopository> {
  constructor(repository: ImageReopository) {
    super(repository);
  }

  createNew = async (createDto: ImageCreateDTO): Promise<ImageResponstDTO> => {
    try {
      const entity = plainToClass(ImagesEntity, createDto);
      const responseEntity = await this.repository.save(entity);
      return plainToClass(ImageResponstDTO, responseEntity);
      
    } catch (error) {
      console.log(error);
    }
  }

  async createNews(images: ImageCreateDTO[]): Promise<ImageResponstDTO[]>{
    const response: ImageResponstDTO[]= await this.repository.save(plainToClass(ImagesEntity ,images));
  
    return response;
  }


  getImageById = async (id: number) => {
    const image = await  super.findById(id);
    return image;
  }

  getImageByIds = async (arrId: number[]) => {
    const images = await super.findByIds(arrId);
    return images;
  }
}
