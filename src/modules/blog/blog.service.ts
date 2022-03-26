import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import slugify from 'slugify';
import { State } from '../../interfaces/state.interface';
import { BaseService } from '../../interfaces/ibase.interface';
import { User } from '../user/user.entity';
import { BlogCreateDTO, BlogResponseDTO } from './blog.dto';
import { BlogEntity } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { ImageService } from '../image/image.service';
import { MappingBlogData } from './mapping-blog-data';
import { Like, Repository } from 'typeorm';
import { PaginateResponse } from 'src/interfaces/paginate.interface';

@Injectable()
export class BlogService extends BaseService<BlogEntity, BlogRepository>{

    constructor(repository: BlogRepository, private mappingBlogData: MappingBlogData){
        super(repository);
    }

    createNewBlog = async (blogCreateDTO: BlogCreateDTO) => {
        try {
            const entity = plainToClass(BlogEntity, blogCreateDTO);
            entity.status = State.Enable;
            entity.slug = slugify(entity.title.toLowerCase());
           

            const createdBlog = await super.createEntity(entity);
            return createdBlog;
        } catch (error) {
            console.log(error);
            throw new HttpException("Can't create new blog!", HttpStatus.BAD_REQUEST);
        }
    }

    update = async (id: number, updateDTO: BlogCreateDTO) => {
        const needItem = await this.repository.findOne(id);
        if(!needItem){
            throw new HttpException("Not Found This Item In Database", HttpStatus.NOT_FOUND)
        }

        needItem.content = updateDTO.content,
        needItem.title = updateDTO.title,
        needItem.status = updateDTO.status

        const entity = super.updateEntity(needItem);
        return entity ? entity : null;
    }

    getBlogs = async (option): Promise<PaginateResponse<BlogResponseDTO>> => {
        try {
            const [blogs, total] = await this.repository.findAndCount({
                take: option.limit,
                skip: option.limit* (option.page -1),
                cache: true
            });

            //mapping thumb path for blog
            const response = await this.mappingBlogData.multipleMap(blogs);
            return {
                items: response,
                total
            };
        } catch (error) {
            throw new HttpException("NOT FOUND ANY BLOG", HttpStatus.NOT_FOUND);
        }
    }

    updateStatus = async (id: number, status: boolean): Promise<boolean> => {
        const entity = await this.repository.findOne(id);
        if(!entity){
            throw new HttpException("NOT FOUND ANY BLOG", HttpStatus.NOT_FOUND);
        }

        entity.status = status ? State.Enable : State.Disabled;
        const updatedEntity = await this.repository.save(entity);
        return updatedEntity ? true : false;
    }


    async findBySlug(slug): Promise<BlogResponseDTO> {
        try {
            const blog = await this.repository.findOne({where:{slug}});
            const responseDTO = await this.mappingBlogData.singleMap(blog);
            return responseDTO;
        } catch (error) {
            console.log(error);
        }

    }



}
