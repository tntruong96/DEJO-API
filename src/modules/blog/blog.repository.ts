import { EntityRepository, Repository } from "typeorm";
import { BlogEntity } from "./blog.entity";


@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity>{

}