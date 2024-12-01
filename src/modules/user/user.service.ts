import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { TransactionalConnection } from '../connecion/connection.service';
import { User } from 'common/entities/user.entity';
import { seedSuperAdmin } from 'common/seeds/superadmin.seed';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'config/configuration';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly configService: ConfigService<AppConfig, true>,
  ) {}

  async onApplicationBootstrap() {
    await seedSuperAdmin(this.connection, this.configService);
  }

  async create(ctx: RequestContext, userDetails: CreateUserDTO) {
    const userRepo = this.connection.getRepository(ctx, User);
    const user = new User({
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      phoneNumber: userDetails.phoneNumber,
    });

    return await userRepo.save(user);
  }
}
