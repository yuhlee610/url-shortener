import { Url } from 'src/urls/entities/url.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Visitors')
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Url, (url) => url.visitors)
  url: Url;

  @Column()
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
