import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose()
  price: number;

  @Expose({ name: 'logo_url' })
  get logoUrl(): string | null {
    if (!this.image) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/images/companies/${this.image}`;
      default:
        return null;
    }
  }
}

export default Company;
