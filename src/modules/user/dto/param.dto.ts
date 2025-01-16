import { IsUUID } from 'class-validator';

export class UserParamDTO {
  @IsUUID()
  userId: string;
}
