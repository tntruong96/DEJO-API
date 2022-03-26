import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserCreateDTO, LoginDTO, ResponseUserDTO } from '../user/user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import {decrypt, encrypt} from '../../utils/encryption'
import { ConfigService } from '@nestjs/config';
import { JwtService} from '@nestjs/jwt';
import { TokenPayload } from 'src/interfaces/token-payload.interface';
import { State } from '../../interfaces/state.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private  userService: UserService, private configService: ConfigService, private jwtService: JwtService) {}

  registerUser =  (userInfo: UserCreateDTO): Promise<number> => {
    const hashedPassword =  encrypt(userInfo.password).toString();
    // const checkUserExist = await this.userService.getByUsername(userInfo.userName);
    userInfo.status = State.Enable;
    try {
      return this.userService.createEntity({
        ...userInfo,
        role: "user",
        password: hashedPassword.toString(),
      });
    } catch (error) {
      throw new HttpException("Register Fail!", HttpStatus.BAD_REQUEST);
    }
  };

  login = async (loginDTO: LoginDTO): Promise<ResponseUserDTO> => {
    try {
      const user = await this.userService.getByUsername(loginDTO.userName);
      this.verifyPassword(loginDTO.password, user.password);
      return plainToClass(ResponseUserDTO, user);
    } catch (error) {
      console.log(error);
      throw new HttpException('Login Failed!', HttpStatus.BAD_REQUEST);
    }
  };

  private verifyPassword =  (password: string, encryptedPass) => {
    const passwordMatching = password === decrypt(encryptedPass);
    if (!passwordMatching) {
      throw new HttpException('Wrong Password!', HttpStatus.BAD_REQUEST);
    }
  }; s

  getCookieWithJWT = (userId: number) => {
    const payload: TokenPayload = {userId}; 
    const token = this.jwtService.sign(payload,{
      expiresIn:1000*60*15
    });
    return {
      access_token: token,
      expires_in: 1000*60*15
    }
  };

  getProfile = async (id) => {
    return await this.userService.findById(id);
  }

}
