import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { CustomExceptionFilter } from './common/exception/custom-exception-filter';
import { BlogModule } from './modules/blog/blog.module';
import { BlogCategoriesModule } from './modules/blog-categories/blog-categories.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ImageModule } from './modules/image/image.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"]
    }),
    TypeOrmModule.forRootAsync(
      {
        useFactory: async (configService: ConfigService) => {
          return {
            type: 'mysql',
            url: configService.get<string>('DATABASE_URL'),
            autoLoadEntities: true
          }
        },
        inject: [ConfigService]
      }
    ),
    MulterModule.register({
      dest:'./files'
    }),
    UserModule,
    AuthModule,
    BlogCategoriesModule,
    CommentsModule,
    BlogModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter
    }
  ],
})
export class AppModule {}
