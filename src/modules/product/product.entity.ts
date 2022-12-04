import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { beforeInsert, beforeUpdate } from "../../utils/entity";
import { ProductCategoriesEntity } from "../product-categories/product-categories.entity";



@Entity('product')
export class ProductEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    status: number;

    @Column()
    detail: string;

    @Column()
    discount: number;

    @Column()
    sizes: string;

    @Column()
    colors: string;

    @Column()
    thumbnail: string;

    @Column()
    images: string;

    @OneToOne(() => ProductCategoriesEntity)
    @JoinColumn({name:'categoryId', referencedColumnName: 'id'})
    categoryId: number

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