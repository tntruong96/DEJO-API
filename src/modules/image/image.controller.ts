import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createDatePath, editFileName, imageFileFilter } from '../../utils/image.util';
import { Image as IImage} from '../../interfaces/image.interface'
import { State } from '../../interfaces/state.interface';
import { ImageService } from './image.service';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { TransformBlogRespone } from 'src/common/interceptors/transform-blog-data.interceptor';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('upload-image')
export class ImageController {

  constructor(private readonly imageService: ImageService) {
    
  }
  

  @UseGuards(JwtAuthenticationGuard)
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
    }

    const respone = this.imageService.createNew(createDto);

    return respone;
  }

  @UseGuards(JwtAuthenticationGuard)
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
          }
          createDtos.push(createDto);
      });
     return  this.imageService.createNews(createDtos);
     

  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(":id")
  async getImage(@Param() id){
    return this.imageService.getImageById(id);
  }
}
