import { Injectable } from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { TransactionalConnection } from '../connecion/connection.service';
import { User } from 'common/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly connection: TransactionalConnection) {}
  async create(ctx: RequestContext, userDetails: CreateUserDTO) {
    const userRepo = this.connection.getRepository(User);
    const user = new User({
      name: userDetails.name,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      address: userDetails.address,
      role: userDetails.role,
    });

    return await userRepo.save(user);
  }
}
