import { IEntity } from 'src/interfaces/entity.interface';
import { beforeInsert, beforeUpdate } from '../../utils/entity';
import {PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity, OneToOne, Entity, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { User } from '../user/user.entity';
import ImagesEntity from '../image/image.entity';
import { BlogCategoriesEntity } from '../blog-categories/blog-categories.entity';

@Entity({name: "blogs"})
export class BlogEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    content: string;

    @Column()
    status: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({name: "createdBy" ,referencedColumnName: "id"})
    createdBy: User;

    @Column()
    images: string;

    @OneToOne(() => BlogCategoriesEntity)
    @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
    categoryId: number

    @BeforeInsert()
    onInsert(){
        beforeInsert(this);
    }

    @BeforeUpdate()
    onUpdate(){
        beforeUpdate(this);
    }
    
}