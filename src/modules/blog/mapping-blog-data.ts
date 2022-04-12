import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ImageService } from '../image/image.service';
import { BlogResponseDTO } from './blog.dto';
import { BlogEntity } from './blog.entity';
import {IMappingBlogData} from '../../interfaces/mapping-blog.interface'

// type MappingResponseType<T extends BlogResponseDTO | BlogResponseDTO[]> = T extends BlogResponseDTO ? BlogResponseDTO : BlogResponseDTO[];

@Injectable()
export class MappingBlogData implements IMappingBlogData<BlogEntity, BlogResponseDTO>{
  constructor(private readonly imageService: ImageService) {}

  //GET IMAGE THUMB AND MAP TO BLOG
 
  async multipleMap(blogData: BlogEntity[]): Promise<BlogResponseDTO[]> {
    const response = [];
    const imageIds = new Set<number>();
    blogData.forEach((blog) => {
      const imageId: number[] = JSON.parse(blog.images);
      if (imageId.length > 0) {
        imageIds.add(imageId[0]);
      }
    });
    const images = await this.imageService.getImageByIds([...imageIds]);
    blogData.map((blog) => {
      const blogResponse = plainToClass(BlogResponseDTO, blog);
      blogResponse.thumb = images.find((image) => {
        const imageId = JSON.parse(blog.images)[0];
        return image.id === imageId;
      }).path;
      response.push(blogResponse);
    });
    return response;
  }

  async singleMap(blogData: BlogEntity): Promise<BlogResponseDTO> {
  const imageId: number[] = JSON.parse(blogData.images);
    const image = await this.imageService.findById(imageId[0]);
    const response = plainToClass(BlogResponseDTO, blogData);
    response.thumb = image.path;
    return response;
  }
}
