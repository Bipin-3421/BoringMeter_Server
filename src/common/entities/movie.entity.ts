import {
  Entity,
  Column,
  DeepPartial,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Asset } from './asset.entity';
import { User } from './user.entity';
import { Wishlist } from './whishlist.entity';
import { Review } from './review.entity';

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

  @ManyToOne(() => User, (user) => user.movie)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: String })
  userId: string;

  @OneToMany(() => Movie, (movie) => movie.wishlist)
  wishlist: Wishlist[];

  @Column({ type: 'float', default: 0 })
  metaScore: number;

  @Column({ type: 'float', default: 0 })
  userScore: number;

  @OneToMany(() => Review, (review) => review.movie)
  review: Review[];
}
