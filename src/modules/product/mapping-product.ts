import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { IMappingProductData } from "src/interfaces/mapping-blog.interface";
import { ImageService } from "../image/image.service"
import { ResponeProductDTO } from "./product.dto";
import { ProductEntity } from "./product.entity";


@Injectable()
export class MappingProduct implements IMappingProductData<ProductEntity, ResponeProductDTO>{

    constructor(private imgServie: ImageService) {
        
    }
    
    async multipleMap(products: ProductEntity[]){
        // console.log(product);
        const entitys = await Promise.all(products.map( async (item) => {
            const arrPath: string[] = []
            await (await this.imgServie.getImageByIds(JSON.parse(item.images))).forEach(image => arrPath.push(image.path));
            item.images = JSON.stringify(arrPath);
            return plainToClass(ResponeProductDTO, item);
        }))
        const respone = new Promise<ResponeProductDTO[]>((resolve)=> {resolve(entitys)})
        return respone;
    }

    async singleMap(product: ProductEntity){
        const arrPath: string[] = [];
        await (await this.imgServie.getImageByIds(JSON.parse(product.images))).map(image => arrPath.push(image.path));
        product.images = JSON.stringify(arrPath);
        const plainedItem = plainToClass(ResponeProductDTO, product); 
        return new Promise<ResponeProductDTO>((resolve) => resolve(plainedItem))
    };
}