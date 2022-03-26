import { forwardRef, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy} from '@nestjs/passport'
import { Strategy} from 'passport-jwt'
import { TokenPayload } from 'src/interfaces/token-payload.interface';
import { AuthService } from '../auth/auth.service';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject(forwardRef(() => AuthService))
        private authenService: AuthService,
        private  configService: ConfigService,
    ) {
        super({
            jwtFromRequest: (req) => {
                let token = null;
                if(req && req.cookies){
                    token = req.cookies['jwt'];
                }
                return token;
            },
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }
    
    async validate (payload: TokenPayload) {
        // console.log(this.authenService);
        const userProfile=  await this.authenService.getProfile(payload.userId);
        if(!userProfile){
            throw new HttpException("Failed to authenticate user", HttpStatus.NOT_ACCEPTABLE);
        }
        return userProfile;
        // return true;
    }
}