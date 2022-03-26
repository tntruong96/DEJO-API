import { Injectable } from '@nestjs/common';
import { BaseService } from '../../interfaces/ibase.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User , UserRepository> {
  constructor(
        readonly repository: UserRepository
  ) {
    super(repository);
  }

  getByUsername = async (username: string): Promise<User> => {
      return this.repository.findOne({userName: username});
  }
}
