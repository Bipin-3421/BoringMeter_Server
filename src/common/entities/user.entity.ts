import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from '@common/enum/role.enum';
import { Movie } from './movie.entity';
import { Wishlist } from './whishlist.entity';
import { Review } from './review.entity';

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
  password: string;

  @Column({ type: String })
  phoneNumber: string;

  @Column({ type: 'enum', enumName: 'Role', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Movie, (movie) => movie.user)
  movie: Movie[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];
}
