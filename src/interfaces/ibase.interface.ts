import { IEntity } from './entity.interface';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DeepPartial, BaseEntity } from 'typeorm';

export interface IBaseService<T> {
  //Query//

  findById: (id: number | string) => Promise<T>;

  findByIds: (ids: number[] | string[]) => Promise<T[]>;

  //mutation

  createEntity: (entity: DeepPartial<T>) => Promise<number>;

  updateEntity: (entity: DeepPartial<T>) => Promise<boolean>;

  deleteEntity: (id: number | string) => Promise<boolean>;
}

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
    protected readonly repository: R
  
    constructor(repository: R) {
      this.repository = repository
    }

  logger = new Logger(BaseService.name);

  async findById(id: number | string) {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new HttpException('Entity Not Exists', HttpStatus.BAD_REQUEST);
    }
    return entity;
  }


  async findByIds(ids: number[] | string[]) {
    const entity = await this.repository.findByIds(ids);
    if (!entity) {
      throw new HttpException('Entity not Exists!', HttpStatus.BAD_REQUEST);
    }
    return entity;
  }

  async createEntity(entity: DeepPartial<T>) {
    const insertedElement = await this.repository.insert(entity);
    if (insertedElement.identifiers.length === 0) {
      throw new HttpException('Created Fail!', HttpStatus.BAD_REQUEST);
    }

    const id: number = insertedElement.identifiers[0].id;
    this.logger.log(`Created Successfully! ${id}`);

    return id;
  }


  async updateEntity(entity: DeepPartial<T>){
    return this.repository.save(entity).then(() => {
        this.logger.log("Updated Successfully!");
        return true;
    }).catch(error => {
        this.logger.error(error);
        return false;
    });
  };


  async deleteEntity(id: number | string){
      return this.repository.delete(id).then(() => {
        this.logger.log('Deleted Successfully!');
        return true
      }).catch((error) => {
        {
            this.logger.log(error);
            return false;
        }
      })
  };

  async deleteMultiEntity(ids: number[] | string[]){
      return await this.repository.delete(ids).then(() => {
        this.logger.log('Deleted Successfully!');
        return true
      }).catch((error) => {
        {
            this.logger.log(error);
            return false;
        }
      })
  }
}
