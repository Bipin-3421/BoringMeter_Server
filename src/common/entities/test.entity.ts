import { Entity, DeepPartial, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('test')
export class Test extends BaseEntity {
  constructor(input?: DeepPartial<Test>) {
    super(input);
  }

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;
}
