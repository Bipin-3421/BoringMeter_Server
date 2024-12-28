import { ConfigService } from '@nestjs/config';
import { User } from 'common/entities/user.entity';
import { Role } from 'common/enum/role.enum';
import { AppConfig } from 'config/configuration';
import { TransactionalConnection } from 'modules/connecion/connection.service';
import * as bcrypt from 'bcrypt';

export const seedSuperAdmin = async (
  connection: TransactionalConnection,
  configService: ConfigService<AppConfig, true>,
): Promise<void> => {
  const { email, phoneNumber, password } = configService.get('user', {
    infer: true,
  });

  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(password, salt);

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
      password: hashedPassword,
      phoneNumber,
      role: Role.SUPERADMIN,
    });
    await userRepo.save(user);
  }
};
