import { EntityRepository, Repository } from "typeorm";
import { CommentEntity } from "./comments.entity";

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity>{}