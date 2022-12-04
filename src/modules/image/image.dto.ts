import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import path from "path";

export class ImageCreateDTO {
    @IsNotEmpty()
    path: string;

    name: string;

    type: string;
 
}

export class ImageResponstDTO{
    @Expose()
    id: string;

    @Expose()
    path: string;

    @Expose()
    status: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}