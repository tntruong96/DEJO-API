import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { BaseService } from '../../interfaces/ibase.interface';
import { CommentCreateDTO } from './comments.dto';
import { CommentEntity } from './comments.entity';
import { CommentRepository } from './comments.repository';

@Injectable()
export class CommentsService extends BaseService<
  CommentEntity,
  CommentRepository
> {
  constructor(readonly repository: CommentRepository) {
    super(repository);
  }

  async createComment(createDTO: CommentCreateDTO){
      try {
          const entity = plainToClass(CommentEntity, createDTO);
          const createdEntity = await super.createEntity(entity);
          return createdEntity;
          
      } catch (error) {
          throw new HttpException("CAN'T CREATE NEW COMMENT", HttpStatus.BAD_REQUEST);
      }
  }

  async getComments () {
      try {
        const comments = await this.repository.find();
        return comments;
      } catch (error) {
          throw new HttpException("NOT FOUND ANY COMMENTS", HttpStatus.NOT_FOUND)
      }
  }

  async updateComment(id: number, updateDTO: CommentCreateDTO) {
      try {
          const searchedEntity = await super.findById(id);
          if(!searchedEntity){
              throw new HttpException("NOT FOUND!", HttpStatus.NOT_FOUND)
          }
          searchedEntity.content = updateDTO.content;
          const updatedItem = await this.repository.save(searchedEntity);
          return updatedItem ? updatedItem : null;
      } catch (error) {
          throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
      }

  }
}
