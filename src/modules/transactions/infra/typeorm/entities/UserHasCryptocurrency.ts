import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import ColumnNumericTransformer from '@shared/infra/transformers/ColumnNumericTransformer';
import Cryptocurrency from '@modules/cryptocurrencies/infra/typeorm/entities/Cryptocurrency';

@Entity('user_has_cryptocurrencies')
class UserHasCryptocurrency {
  @Column('numeric', {
    precision: 9,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  quantity: number;

  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  cryptocurrency_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(_type => Cryptocurrency)
  @JoinColumn({ name: 'cryptocurrency_id', referencedColumnName: 'id' })
  cryptocurrency: Cryptocurrency;

  @Expose()
  amount: number;
}

export default UserHasCryptocurrency;
