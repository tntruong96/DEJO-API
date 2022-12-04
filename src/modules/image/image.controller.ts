import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createDatePath, editFileName, imageFileFilter } from '../../utils/image.util';
import { Image as IImage} from '../../interfaces/image.interface'
import { State } from '../../interfaces/state.interface';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService) {
    
  }
  

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: createDatePath,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file) {
    const createDto: IImage = {
      path: file.path,
      status: State.Enable,
      name: file.name,
      type: file.type
    }

    const respone = this.imageService.createNew(createDto);

    return respone;
  }


  @Post('multi')
  @UseInterceptors(
    FilesInterceptor('file', 20,{
      storage: diskStorage({
        destination: createDatePath,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultiImage(@UploadedFiles() files) {
      const createDtos: IImage[] = [];
      files.map(file => {
          const createDto = {
              path: file.path,
              status: State.Enable,
              name: file.originalname,
              type: file.mimetype
          }
          createDtos.push(createDto);
      });
     return  this.imageService.createNews(createDtos);
     

  }

  @Get(":id")
  async getImage(@Param() id){
    return this.imageService.getImageById(id);
  }


  @Get()
  async getImages(@Req() req){
    return this.imageService.getImagesByPage({limit:req.query.hasOwnProperty('limit') ? req.query.limit : 50, page: req.query.hasOwnProperty('page') ? req.query.page : 1})
  }

  @Get()
  async getAllImages() {
    // return this.imageService.getAllImages();
  }

  @Delete("delete")
  async deleteImages(@Body() data){
    return this.imageService.deleteMultiImage(data.ids);
  }

  
}
