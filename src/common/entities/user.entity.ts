import { Column, DeepPartial, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from '../enum/role.enum';

@Entity()
export class User extends BaseEntity {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  email: string;

  @Column({ type: String })
  phoneNumber: string;

  @Column({ type: String, nullable: true })
  address: string;

  @Column({ type: 'enum', enum: Role, enumName: 'Role' })
  role: Role;
}
