import { IsNotEmpty, IsString } from "class-validator";

export class CampaignCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    thumbnail: string;

    @IsNotEmpty()
    @IsString()
    items: string;
}