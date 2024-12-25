import {
  Entity,
  Column,
  DeepPartial,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Asset } from './asset.entity';
import { User } from './user.entity';

@Entity()
export class Movie extends BaseEntity {
  constructor(input?: DeepPartial<Movie>) {
    super(input);
  }

  @Column({ type: String })
  title: string;

  @Column({ type: String, default: '' })
  description: string;

  @OneToOne(() => Asset, (asset) => asset.movie)
  @JoinColumn({ name: 'imageId' })
  image: Asset;

  @Column({ type: String })
  imageId: string;

  @ManyToOne(() => User, (user) => user.movie, { onDelete: 'CASCADE' })
  user: User;
  @JoinColumn({ name: 'userId' })
  userId: string;
}
