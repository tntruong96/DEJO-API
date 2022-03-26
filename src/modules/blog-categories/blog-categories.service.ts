import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { BaseService } from '../../interfaces/ibase.interface';
import { State } from '../../interfaces/state.interface';
import { BlogCategoriesCreateDTO } from './blog-categories.dto';
import { BlogCategoriesEntity } from './blog-categories.entity';
import { BlogCategoriesRepository } from './blog-categories.repository';

@Injectable()
export class BlogCategoriesService extends BaseService<
  BlogCategoriesEntity,
  BlogCategoriesRepository
> {
  constructor(readonly repository: BlogCategoriesRepository) {
    super(repository);
  }

  async createBlogCategory(createDTO: BlogCategoriesCreateDTO){
      try {
          const entity = plainToClass(BlogCategoriesEntity,createDTO);
          entity.status = State.Enable;
          const createdEntity = await super.createEntity(entity);
          return createdEntity;
      } catch (error) {
          console.log(error);
          throw new HttpException("CAN'T CREATE NEW BLOG CATEGORY", HttpStatus.BAD_REQUEST);
      }
  }

  async getBlogCategories(): Promise<BlogCategoriesEntity[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new HttpException(
        "CAN'T GET BLOG CATEGORIES",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateBlogCategories(
    id: number,
    updateDTO: BlogCategoriesCreateDTO,
  ): Promise<boolean> {
    const searchedCategory = await this.repository.findOne(id);
    if (!searchedCategory) {
      throw new HttpException('NOT FOOUND CATEGORY', HttpStatus.NOT_FOUND);
    }

    searchedCategory.name = updateDTO.name;
    const updated = await this.repository.save(searchedCategory);
    return updated ? true : false;
  }

  async updateStatus(id: number, status: boolean): Promise<boolean> {
    const searchedCategory = await this.repository.findOne(id);
    if (!searchedCategory) {
      throw new HttpException('NOT FOUND ANY CATEGORY', HttpStatus.NOT_FOUND);
    }
    searchedCategory.status = status ? State.Enable : State.Disabled;
    const updated = await this.repository.save(searchedCategory);
    return updated ? true : false;
  }
}
