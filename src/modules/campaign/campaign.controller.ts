import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaign')
export class CampaignController {
    constructor(private campaignService: CampaignService){}

    @Post()
    async createNewCampaign(@Body() createDto){
        return this.campaignService.createCampaign(createDto);
    }

    @Get()
    async getCampaigns(@Request() req){
        return this.campaignService.getCampaigns({page: req.query.hasOwnProperty('page') ? req.query.page : 1, limit: req.query.hasOwnProperty('limit') ? req.query.limit : 10})
    }

    @Put()
    async updateCampaign(@Body() updateDto, @Param() id){
        return this.campaignService.updateCampaigns(id, updateDto);
    }

    @Delete()
    async deleteCampaigns(@Body() ids){
        return this.campaignService.deleteCampaign(ids);
    }

    @Get('single/:slug')
    async getCampaign(@Param('slug') slug:string ){
        return this.campaignService.getCampaign(slug);
    }
}
