import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    // @Post()
    // createUser(@Body() userEntity: CreateUserDTO): Promise<number>{
    //     return this.userService.createEntity(userEntity);
    // }

}
