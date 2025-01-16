import { DeepPartial, Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity()
export class Review extends BaseEntity {
  constructor(input?: DeepPartial<Review>) {
    super(input);
  }

  @Column({ type: 'float', default: 0 })
  score: number;

  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: String })
  userId: string;
}
