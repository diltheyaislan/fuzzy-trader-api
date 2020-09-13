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
import Company from '@modules/companies/infra/typeorm/entities/Company';

@Entity('user_has_companies')
class UserHasCompany {
  @Column('numeric', {
    precision: 9,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  quantity: number;

  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  company_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(_type => Company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @Expose()
  amount: number;
}

export default UserHasCompany;
