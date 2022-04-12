import { IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator'
import {Expose} from 'class-transformer'
import { User } from '../user/user.entity';
import { BlogCategoriesEntity } from '../blog-categories/blog-categories.entity';

export class BlogCreateDTO  {
    
    @IsString()
    content: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    createdBy: User;

    @IsNotEmpty()
    category: number;

    @IsNotEmpty()
    @IsString()
    images: string;

    status: number;
}


export class BlogResponseDTO {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    slug: string;

    @Expose()
    content: string;

    @Expose()
    createdBy: number;

    @Expose()
    createdAt: Date;

    @Expose()
    status: number;

    @Expose()
    images: string[];

    @Expose()
    thumb: string;

    @Expose()
    updatedAt: Date;

    @Expose()
    category: BlogCategoriesEntity;
}