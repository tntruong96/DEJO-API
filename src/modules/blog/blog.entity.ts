import { IEntity } from 'src/interfaces/entity.interface';
import { beforeInsert, beforeUpdate } from '../../utils/entity';
import {PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity, OneToOne, Entity, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { User } from '../user/user.entity';
import ImagesEntity from '../image/image.entity';
import { BlogCategoriesEntity } from '../blog-categories/blog-categories.entity';

@Entity({name: "blogs"})
export class BlogEntity extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @Column()
    shortContent: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "createdBy" ,referencedColumnName: "id"})
    createdBy: User;

    @Column()
    thumbnail: string;

    @OneToOne(() => BlogCategoriesEntity)
    @JoinColumn({name: 'categoryId', referencedColumnName: 'id'})
    category: string

    @BeforeInsert()
    onInsert(){
        beforeInsert(this);
    }

    @BeforeUpdate()
    onUpdate(){
        beforeUpdate(this);
    }
    
}