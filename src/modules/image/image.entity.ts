import { beforeInsert, beforeUpdate } from "../../utils/entity";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "../blog/blog.entity";



@Entity('images')
class ImagesEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    status: number;

    @Column()
    name: string;

    @Column()
    type: string;


    @BeforeInsert()
    onInsert(){
        beforeInsert(this);
    }

    @BeforeUpdate()
    onUpdate(){
        beforeUpdate(this);
    }
}

export default ImagesEntity;