import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions, PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategoriesController } from './blog-categories.controller';
import { BlogCategoriesRepository } from './blog-categories.repository';
import { BlogCategoriesService } from './blog-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategoriesRepository]),
  PassportModule.register({
    useFactory: async () => ({
      defaultStrategy: 'jwt',
    }),
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get<string>('JWT_EXPIRATION_TIME')}s`,
      },
    }),
    inject: [ConfigService],
  }),
],
  controllers: [BlogCategoriesController],
  providers: [BlogCategoriesService],
  exports: [BlogCategoriesService]
})
export class BlogCategoriesModule {}
