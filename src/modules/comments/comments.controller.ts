import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentCreateDTO } from './comments.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('/create-new')
  create(@Body() createDTO: CommentCreateDTO) {
    return this.commentService.createComment(createDTO);
  }

  @Get()
  getComments(){
      return this.commentService.getComments();
  }

  @Put('update/:id')
  update(@Body() updateDTO: CommentCreateDTO, @Param() id: number){
    this.commentService.updateComment(id, updateDTO);
  }

  @Delete("/:id")
  delete(@Param() id: number){
    return this.commentService.deleteEntity(id);
  }
}
