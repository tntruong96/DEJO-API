import { IsNotEmpty, IsString } from "class-validator";


export class BlogCategoriesCreateDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
  
}