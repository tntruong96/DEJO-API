import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TransformBlogRespone } from 'src/common/interceptors/transform-blog-data.interceptor';
import { PaginateResponse } from 'src/interfaces/paginate.interface';
import { ImageService } from '../image/image.service';
import { BlogCreateDTO, BlogResponseDTO } from './blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService, private imageService: ImageService) {}

  @Post('create-new')
  createBlog(@Body() blogCreateDTO: BlogCreateDTO) {
    return this.blogService.createNewBlog(blogCreateDTO);
  }

  @Put('update/:id')
  updateBlog(@Body() blogUpdateDTO: BlogCreateDTO, @Param() id: number) {
    return this.blogService.update(id, blogUpdateDTO);
  }

  @Delete('delete/:id')
  deleteBlog(@Param() id: number){
      return this.blogService.deleteEntity(id);
  }

  @Get()
  // @UseInterceptors(TransformBlogRespone)
  getBlogs(@Req() req):Promise<PaginateResponse<BlogResponseDTO>>{
    return this.blogService.getBlogs({limit:req.query.hasOwnProperty('limit') ? req.query.limit : 10, page: req.query.hasOwnProperty('page') ? req.query.page : 1});
  }

  @Get("/:slug")
  async getBlog(@Param('slug') slug: string): Promise<BlogResponseDTO>{
    const blog = await this.blogService.findBySlug(slug); 
    return blog;
  }

  @Put('/update-status/:id')
  updateStatus(@Param() id: number, status: boolean){
    return this.blogService.updateStatus(id, status);
  }

}
