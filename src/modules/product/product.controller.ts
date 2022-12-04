import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { createProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    
    constructor(private productService: ProductService) {}
    
    @UseGuards(JwtAuthenticationGuard)
    @Post('/new')
    async createNewProduct(@Body() dto: createProductDTO){ 
        return await this.productService.createNewProduct(dto);
    }
    @Get()
    async getProducts(@Req() req){
        // const order;
        // if(re){

        // }
        return await this.productService.getProducts({limit:req.query.hasOwnProperty('limit') ? req.query.limit : 10, page: req.query.hasOwnProperty('page') ? req.query.page : 1, category: req.query.hasOwnProperty('category') ? req.query.category : ''});
    }

    // @Get(`:id`)
    // async getProductById(@Param() id: number){
    //     return await this.productService.findById(id);
    // }


    @Get('/:slug')
    async getProductBySlug(@Param() param){
        // console.log(slug)
        return  await this.productService.findProductBySlug(param.slug);
    }

    @Delete('/delete-multi')
    async deleteProducts(@Body() body:string[]){
        return await this.productService.deleteMulti(body);
    }

    @Get('filter/:slug_category')
    async getProductFilterByCategory(@Param() param){
        return await this.productService.getProductFilterByCategory(param.slug_category)
    }
}
