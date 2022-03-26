import { isString,  IsNotEmpty, IsMobilePhone, IsEmail, MaxLength } from "class-validator";
import { Expose} from "class-transformer";

export class  UserCreateDTO {
    @IsNotEmpty({
        message: 'It is required'
    })
    @MaxLength(50,{
        message: "Max length is 50"
    })
    userName: string

    @IsNotEmpty({
        message: 'It is required'
    })
    @MaxLength(50,{
        message: "Max length is 50"
    })
    firstName: string

    @IsNotEmpty({
        message: 'It is required'
    })
    @MaxLength(50,{
        message: "Max length is 50"
    })
    lastName: string;
    
    @IsMobilePhone()
    phone: string;

    @IsEmail({
        message: "It not email type"
    })
    email: string;

    @IsNotEmpty({
        message: "It is required"
    })
    @MaxLength(50,{
        message: "Max length is 50"
    })
    password: string;

    status: number;
}

export class ResponseUserDTO {
    @Expose()
    id: number;

    @Expose()
    userName: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phone: string;
    
    @Expose()
    email: string;

    @Expose()
    createdDate: Date;

    @Expose()
    updatedDate: Date;
}

export class LoginDTO {
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    password: string;
}