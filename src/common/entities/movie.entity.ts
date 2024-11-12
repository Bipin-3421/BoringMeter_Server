import { Entity, Column, DeepPartial } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Movies extends BaseEntity {
  constructor(input: DeepPartial<Movies>) {
    super(input);
  }

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  image: string;

  @Column({ type: String, default: '' })
  description: string;
}
