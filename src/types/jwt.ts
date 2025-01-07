import { Role } from 'common/enum/role.enum';

export interface AuthPayload {
  userId: string;
  role: Role;
}
