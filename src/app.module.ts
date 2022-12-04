import { Logger, Module } from '@nestjs/common';
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
import { AllExceptionFilter } from './common/exception/AllExceptionFilter';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductModule } from './modules/product/product.module';
import { CampaignModule } from './modules/campaign/campaign.module';

const getEnvironment = () => {
  return `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [getEnvironment()]
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
    ImageModule,
    ProductCategoriesModule,
    ProductModule,
    CampaignModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
    Logger
  ],
})
export class AppModule {}
