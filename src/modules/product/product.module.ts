import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '../image/image.module';
import { MappingProduct } from './mapping-product';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), ImageModule],
  controllers:[ProductController],
  providers: [ProductService, MappingProduct]
})
export class ProductModule {}
