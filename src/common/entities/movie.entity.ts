import { Entity, Column, DeepPartial, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Asset } from './asset.entity';

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
}
