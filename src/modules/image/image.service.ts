import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { unlink } from "fs";
import { Image } from "src/interfaces/image.interface";
import { BaseService } from "../../interfaces/ibase.interface";
import { ImageCreateDTO, ImageResponstDTO } from "./image.dto";
import ImagesEntity from "./image.entity";
import { ImageReopository } from "./image.repository";

interface Options {
  limit;
  page;
}
@Injectable()
export class ImageService extends BaseService<ImagesEntity, ImageReopository> {
  constructor(repository: ImageReopository) {
    super(repository);
  }

  createNew = async (createDto: ImageCreateDTO): Promise<ImageResponstDTO> => {
    try {
      const entity = plainToClass(ImagesEntity, createDto);
      const responseEntity = await this.repository.save(entity);
      return plainToClass(ImageResponstDTO, responseEntity);
    } catch (error) {
      console.log(error);
    }
  };

  async createNews(images: ImageCreateDTO[]): Promise<ImageResponstDTO[]> {
    try {
      const plainToClassArr = images.map(i => plainToClass(ImagesEntity, i));
      const response = this.repository.save(plainToClassArr);
      return response;
    } catch (error) {
      this.logger.error(error)
    }

  }

  getImageById = async (id: string | number) => {
    const image = await super.findById(id);
    return image;
  };

  getImageByIds = async (arrId: string[] | number[]) => {
    const images = await super.findByIds(arrId);
    return images;
  };

  getImagesByPage = async (option: Options) => {
    try {
      const images = await this.repository.findAndCount({
        take: option.limit,
        skip: option.limit * (option.page - 1),
        cache: true
      });
      return images;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  };

  /* Delete data image in database */

  deleteMultiImage = async (ids: number[]) => {
    try {
      const imagesPath = await (
        await this.repository.findByIds(ids)
      ).reduce((prev, cur) => {
        prev.push(cur.path);
        return prev;
      }, []);
      await super.deleteMultiEntity(ids);
      this.deleteFileLocal(imagesPath);
      return true;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  };

  deleteFileLocal = async (paths: string[]) => {
    for (let path of paths) {
      unlink(path, (error) => {
        if (error) throw error;
        this.logger.log("was deleted");
      });
    }
  };
}
