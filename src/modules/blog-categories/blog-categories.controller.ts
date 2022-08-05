import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { BlogCategoriesCreateDTO } from './blog-categories.dto';
import { BlogCategoriesService } from './blog-categories.service';

@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(private readonly blogCategoriesService: BlogCategoriesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('/create-new')
  create(@Body() createDTO: BlogCategoriesCreateDTO) {
    return this.blogCategoriesService.createBlogCategory(createDTO);
  }

  @Put('/update/:id')
  updateBlogCategory(@Param() id: number, @Body() updateDTO: BlogCategoriesCreateDTO){
    return this.blogCategoriesService.updateBlogCategories(id, updateDTO);
  }

  @Get('/:id')
  getBlogCategory(@Param() id: number){
    return this.blogCategoriesService.findById(id);
  }

  @Patch('/update-status/:id')
  updateStatus(@Param() id: number, status: boolean){
    return this.blogCategoriesService.updateStatus(id, status);
  }

  @Get()
  getBlogCategories(){
      return this.blogCategoriesService.getBlogCategories();
  }

  @Delete('/delete-id/:id')
  delete(@Param() id: number){
    return this.blogCategoriesService.deleteEntity(id);
  }

  @Delete("/delete-all")
  deleteAll(@Body() body: []){
    return this.blogCategoriesService.deleteAll(body);
  }
}
