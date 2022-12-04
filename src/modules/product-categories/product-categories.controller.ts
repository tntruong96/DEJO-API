import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { createProductCategoryDTO } from './product-categories.dto';
import { ProductCategoriesService } from './product-categories.service';

@Controller('product-categories')
export class ProductCategoriesController {
    constructor(private productCategoriesService: ProductCategoriesService) {
        
    }
    
    @UseGuards(JwtAuthenticationGuard)
    @Post('/new')
     async createNewProductCategory(@Body() dto: createProductCategoryDTO) {
        return await this.productCategoriesService.createNewProductCategory(dto);
     }


     @Get('')
     async getProductCategory(@Req() req){
         return await this.productCategoriesService.getProductCategory({limit:req.query.hasOwnProperty('limit') ? req.query.limit : 10, page: req.query.hasOwnProperty('page') ? req.query.page : 1});
     }

    @Delete('/delete:/id')
    async deleteProductCategory(@Param() id: number){
        try {
            return await this.productCategoriesService.deleteEntity(id);
        } catch (error) {
            this.productCategoriesService.logger.error(error);
        }
    }

    @Delete('/delete-all')
    async  deleteAll(@Body() ids: string[]) {
        return this.productCategoriesService.deleteMultiEntity(ids);
    }

}
