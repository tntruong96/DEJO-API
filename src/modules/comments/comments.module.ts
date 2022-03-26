import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
