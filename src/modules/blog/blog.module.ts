import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '../image/image.module';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { BlogService } from './blog.service';
import { MappingBlogData } from './mapping-blog-data';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository]), ImageModule],
  controllers: [BlogController],
  providers: [BlogService, MappingBlogData],
  exports: [BlogService]
})
export class BlogModule {}
