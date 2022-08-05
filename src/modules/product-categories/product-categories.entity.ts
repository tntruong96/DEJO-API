import { beforeInsert, beforeUpdate } from "../../utils/entity";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('product-categories')
export class ProductCategoriesEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    status: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @BeforeInsert()
    onInsert(){
        beforeInsert(this);
    }

    @BeforeUpdate()
    onUpdate(){
        beforeUpdate(this);
    }
}