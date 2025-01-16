import { Column, DeepPartial, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AssetFor } from '../enum/asset.enum';
import { Movie } from './movie.entity';
import { AssetProvider } from '../enum/provider.enum';

@Entity()
export class Asset extends BaseEntity {
  constructor(input?: DeepPartial<Asset>) {
    super(input);
  }

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  identifier: string;

  @Column({ type: String })
  url: string;

  @Column({ type: 'enum', enum: AssetFor, enumName: 'AssetFor' })
  for: AssetFor;

  @Column({ type: 'enum', enum: AssetProvider, enumName: 'AssetProvider' })
  provider: AssetProvider;

  @Column({ type: Number })
  size: number;

  @OneToOne(() => Movie, (movie) => movie.image)
  movie: Movie;
}
