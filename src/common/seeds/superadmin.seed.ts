import { ConfigService } from '@nestjs/config';
import { User } from 'common/entities/user.entity';
import { AppConfig } from 'config/configuration';
import { TransactionalConnection } from 'modules/connecion/connection.service';

const superAdmin = async (
  connection: TransactionalConnection,
  configService: ConfigService<AppConfig, true>,
) => {
  const { email, phoneNumber } = configService.get('user', { infer: true });
  const userRepo = connection.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    const user = userRepo.create({
      name: 'Superadmin',
      email,
      phoneNumber,
    });
    return await userRepo.save(user);
  }
};
