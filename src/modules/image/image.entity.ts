import { beforeInsert, beforeUpdate } from "../../utils/entity";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "../blog/blog.entity";



@Entity('images')
class ImagesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    status: number;


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