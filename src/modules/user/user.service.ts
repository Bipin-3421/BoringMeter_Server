import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { TransactionalConnection } from '../connecion/connection.service';
import { User } from 'common/entities/user.entity';
import { seedSuperAdmin } from 'common/seeds/superadmin.seed';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'config/configuration';
import { LoginUserDTO } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { signToken } from 'utils/jwt.utils';
import { AuthPayload } from 'types/jwt';

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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);
    const userRepo = this.connection.getRepository(ctx, User);
    const user = new User({
      name: userDetails.name,
      email: userDetails.email,
      password: hashedPassword,
      phoneNumber: userDetails.phoneNumber,
    });

    return await userRepo.save(user);
  }

  async login(ctx: RequestContext, userDetails: LoginUserDTO) {
    const userRepo = this.connection.getRepository(ctx, User);

    const user = await userRepo.findOne({
      where: {
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      },
    });

    if (user) {
      const isMatch = await bcrypt.compare(userDetails.password, user.password);
      if (!isMatch) {
        throw new ConflictException('Password not matched');
      }
      const payload: AuthPayload = {
        userId: user.id,
        role: user.role,
      };

      const jwtSecret = this.configService.get('jwt.jwtSecret', {
        infer: true,
      });
      const jwtTimeout = this.configService.get('jwt.jwtTimeout', {
        infer: true,
      });

      const accessToken = signToken(payload, jwtSecret, jwtTimeout);

      return { accessToken, user };
    }
  }

  async activeUser(ctx: RequestContext, userId: string) {
    const userRepo = this.connection.getRepository(ctx, User);
    const user = await userRepo.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
