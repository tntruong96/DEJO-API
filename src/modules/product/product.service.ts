import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import slugify from 'slugify';
import { State } from '../../interfaces/state.interface';
import { BaseService } from '../../interfaces/ibase.interface';
import { MappingProduct } from './mapping-product';
import { createProductDTO } from './product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService  extends BaseService<ProductEntity, ProductRepository>{
    constructor(repository: ProductRepository, private mappingProduct: MappingProduct) {
        super(repository);  
    }

    async createNewProduct(dto: createProductDTO) {
        try {
            const entity = plainToClass(ProductEntity, dto);
            entity.status = State.Enable;
            entity.slug = slugify(entity.name.toLocaleLowerCase());
            const createdEntity = await this.createEntity(entity);
            return createdEntity;
        } catch (error) {
            this.logger.error(error)
            return error;
        }
    }


    async getProducts(option){
        try {
            const [products, total] = await this.repository.findAndCount({
                order: {
                    createdAt: "ASC"
                },
                take: option.limit,
                skip: option.limit* (option.page -1),
                cache: true,
                relations: [
                    "categoryId"
                ],
                where: option.category ? {
                    categoryId: {
                        slug: option.category
                    }
                } : {}
            });
            products.map(entity => {
                entity.price = Number(entity.price);
                return entity
            })
            const finishedMapping = await this.mappingProduct.multipleMap(products)
            return {items:finishedMapping, total};
        } catch (error) {
            this.logger.error(error);
            return error;
        }
    }
    
    async getProductById(id: number){
        try {

            const entity = await this.repository.findOne(id);
            const finishedMapping = await this.mappingProduct.singleMap(entity);
            return finishedMapping;
        } catch (error) {
            this.logger.error(error);
            return error
        }
    }

    
    async findProductBySlug(slug){
        try {
            const entity =  await this.repository.findOne({where:{slug}});
            const finishedMapping = await this.mappingProduct.singleMap(entity);
            return finishedMapping;
        } catch (error) {
            this.logger.error(error);
            return error
        }
    }


    async deleteMulti(ids: string[]){
        try {
            const result = await super.deleteMultiEntity(ids);
            return result;
        } catch (error) {
            this.logger.error(error);
            return error
        }
    }

    async getProductFilterByCategory(category: string) {
        try {
            const respone = await this.repository.find({
                relations:["categoryId"],
                where: {
                    category: {
                        slug: category
                    }
                },
                order: {
                    createdAt: "ASC"
                }
            })
            return respone;
        } catch (error) {
            this.logger.error(error);
            return error
        }
    }
}
