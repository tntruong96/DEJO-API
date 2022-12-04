import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { classToPlain, plainToClass } from "class-transformer";
import slugify from "slugify";
import { ICampaign, IDataCreateDTO, IDataUpdateDTO, IResponseCampaign } from "src/interfaces/campaign.interface";
import { IOptionsGetData } from "src/interfaces/common.interface";
import { Repository } from "typeorm";
import { CampaignCreateDTO } from "./campaign.dto";
import { CampaignEntity } from "./campaign.entity";
import { MappingCampaignData } from "./mapping-campaign-data";

@Injectable()
export class CampaignService {
  constructor(
    private logger: Logger,
    private mapping: MappingCampaignData,
    @InjectRepository(CampaignEntity)
    private campaignRepository: Repository<CampaignEntity>
  ) {}

  async createCampaign(dataDTO: IDataCreateDTO): Promise<ICampaign> {
    try {
      const createDTO = plainToClass(CampaignEntity, dataDTO);
      const entity = await this.campaignRepository.create(createDTO);
      entity.slug = slugify(dataDTO.name);
      const response = await this.campaignRepository.save(entity);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getCampaigns(options: IOptionsGetData): Promise<IResponseCampaign> {
    try {
      const listCampaign = await this.campaignRepository.findAndCount({
        take: options.limit,
        skip: options.limit * (options.page - 1),
      });

      const mappedCampaign =  await this.mapping.mapImagesForCampaign(listCampaign[0])
      
      return {campaigns: mappedCampaign, total: listCampaign[1]};
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateCampaigns(id: string, updateDto: IDataUpdateDTO) {
    const [findEntity] = await this.campaignRepository.find({id});
    if(findEntity){
      const updateEntity: ICampaign = {
        ...findEntity,
        name: updateDto.name,
        items: updateDto.items,
        thumbnail: updateDto.thumbnail,
        slug: slugify(updateDto.name)
      }
      return  await this.campaignRepository.save(updateEntity);
    }
    return findEntity;
  }

  async deleteCampaign(ids: string[]) {
    try {
      return await this.campaignRepository.delete(ids);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCampaign(slug: string){
    try {
      const campaign = await this.campaignRepository.findOne({slug});
      const mappedCampaign = await this.mapping.mapImagesForCampaign([campaign]);
      return {campaign: mappedCampaign[0]};
    } catch (error) {
      this.logger.error(error)
    }
  }
}
