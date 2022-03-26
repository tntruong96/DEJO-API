import { EntityRepository, Repository } from "typeorm";
import ImagesEntity from "./image.entity";

@EntityRepository(ImagesEntity)
export class ImageReopository extends Repository<ImagesEntity>{

}