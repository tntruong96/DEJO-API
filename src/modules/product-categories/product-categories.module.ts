import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoriesRepository } from './product-categories.repository';
import { ProductCategoriesService } from './product-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoriesRepository]) ],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService]
})
export class ProductCategoriesModule {}
