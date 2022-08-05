import { EntityRepository, Repository } from "typeorm";
import { ProductCategoriesEntity } from "./product-categories.entity";

@EntityRepository(ProductCategoriesEntity)
export class ProductCategoriesRepository extends Repository<ProductCategoriesEntity>{

}