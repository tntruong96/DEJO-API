import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import path from "path";

export class ImageCreateDTO {
    @IsNotEmpty()
    path: string
 
}

export class ImageResponstDTO{
    @Expose()
    id: number;

    @Expose()
    path: string;

    @Expose()
    status: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}