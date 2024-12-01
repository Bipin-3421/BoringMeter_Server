import { ConfigService } from '@nestjs/config';
import { User } from 'common/entities/user.entity';
import { Role } from 'common/enum/role.enum';
import { AppConfig } from 'config/configuration';
import { TransactionalConnection } from 'modules/connecion/connection.service';

export const seedSuperAdmin = async (
  connection: TransactionalConnection,
  configService: ConfigService<AppConfig, true>,
): Promise<void> => {
  const { email, phoneNumber, password } = configService.get('user', {
    infer: true,
  });

  const userRepo = connection.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    const user = userRepo.create({
      name: 'Lee',
      email,
      password,
      phoneNumber,
      role: Role.SUPERADMIN,
    });
    await userRepo.save(user);
  }
};
