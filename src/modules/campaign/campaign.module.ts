import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '../image/image.module';
import { ImageService } from '../image/image.service';
import { CampaignController } from './campaign.controller';
import { CampaignEntity } from './campaign.entity';
import { CampaignService } from './campaign.service';
import { MappingCampaignData } from './mapping-campaign-data';

@Module({
    imports: [TypeOrmModule.forFeature([CampaignEntity]),ImageModule],
    controllers: [CampaignController],
    providers: [CampaignService, Logger , MappingCampaignData],
    exports: []
})
export class CampaignModule {}
