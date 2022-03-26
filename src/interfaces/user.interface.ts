import { User } from "src/modules/user/user.entity";
import { Request } from 'express';

export interface RequestIterface extends Request{
    user: User
}