import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import slugify from 'slugify';
import { State } from '../../interfaces/state.interface';
import { BaseService } from '../../interfaces/ibase.interface';
import { createProductCategoryDTO } from './product-categories.dto';
import { ProductCategoriesEntity } from './product-categories.entity';
import { ProductCategoriesRepository } from './product-categories.repository';

@Injectable()
export class ProductCategoriesService extends BaseService<ProductCategoriesEntity, ProductCategoriesRepository> {
    constructor(repository: ProductCategoriesRepository) {
        super(repository);
    }
    
    async  createNewProductCategory(dto: createProductCategoryDTO) {
        try {
            const entity = plainToClass(ProductCategoriesEntity, dto);
            entity.slug = slugify(dto.name);
            entity.status = State.Enable;
            const createdEntity = await this.createEntity(entity);
            return createdEntity;
        } catch (error) {
            this.logger.error(error);
        }

    }

    async getProductCategory(){
        try {
            return await this.repository.find();
        } catch (error) {
            this.logger.error(error);
            
        }
    }

    
}
