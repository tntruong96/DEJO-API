import { Injectable } from '@nestjs/common';
import { PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import { ResponseUserDTO } from '../user/user.dto';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({
            usernameField: 'userName'
        });
    }

    async validate(userName: string, password: string): Promise<ResponseUserDTO>{
        return this.authService.login({userName, password})
    }
    
    
}