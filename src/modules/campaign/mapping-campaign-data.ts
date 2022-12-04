import { Injectable } from "@nestjs/common";
import { ICampaign } from "src/interfaces/campaign.interface";
import { ImageService } from "../image/image.service";


@Injectable()
export class MappingCampaignData {
    constructor(private imageService: ImageService) {}

    async mapImagesForCampaign(campaigns){
        return await Promise.all(campaigns.map(async campaign => ({
            ...campaign,
            items: await this.imageService.findByIds(JSON.parse(campaign.items)),
            thumbnail: await this.imageService.findById(campaign.thumbnail)
        })))

    }
    
}