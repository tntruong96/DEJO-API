import { EntityRepository, Repository } from "typeorm";
import { BlogCategoriesEntity } from "./blog-categories.entity";

@EntityRepository(BlogCategoriesEntity)
export class BlogCategoriesRepository extends Repository<BlogCategoriesEntity>{

}