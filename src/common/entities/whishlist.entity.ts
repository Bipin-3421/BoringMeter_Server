import { Column, DeepPartial, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Wishlist extends BaseEntity {
  constructor(input?: DeepPartial<Wishlist>) {
    super(input);
  }

  @ManyToOne(() => User, (user) => user.wishlist, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: String })
  userId: string;

  @ManyToOne(() => Movie, (movie) => movie.wishlist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column({ type: String })
  movieId: string;
}
