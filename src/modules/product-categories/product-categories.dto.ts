import { IsNotEmpty, IsString} from "class-validator";

export class createProductCategoryDTO {
    @IsNotEmpty()
    @IsString()
    name: string
}