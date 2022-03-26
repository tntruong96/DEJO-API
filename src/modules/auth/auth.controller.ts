import { Body, Controller, Get, HttpCode, Post, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { UserCreateDTO, LoginDTO } from '../user/user.dto';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private configService: ConfigService) {
        
    }
    

    @Post('register')
    async register(@Body() userCreateDTO: UserCreateDTO){
        return  await this.authService.registerUser(userCreateDTO);
    }

    @HttpCode(200)
    // @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async login (@Request() request, @Res({passthrough: true}) response: Response){
        const user = await this.authService.login(request.body);
        const cookie = this.authService.getCookieWithJWT(user.id);
        response.cookie('jwt', cookie.access_token);
        // return response.send(user);
        return cookie;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    logout(@Res() response: Response){
        response.clearCookie('jwt');
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('profile')
    async getProfile(@Request() request){
        request.user.password = undefined;
        return request.user;
    }
}
