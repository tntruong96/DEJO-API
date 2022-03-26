import {Repository, EntityRepository} from 'typeorm'
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    getUsers(): Promise<User[]> {
        return this.createQueryBuilder().getMany();
    }
}