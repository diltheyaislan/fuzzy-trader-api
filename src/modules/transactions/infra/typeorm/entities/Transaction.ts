import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import Cryptocurrency from '@modules/cryptocurrencies/infra/typeorm/entities/Cryptocurrency';

export enum Type {
  cryptocurrency,
  shares,
}

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: Type })
  type: Type | string;

  @Column()
  user_id: string;

  @Column()
  company_id: string;

  @Column()
  cryptocurrency_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(_type => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(_type => Cryptocurrency)
  @JoinColumn({ name: 'cryptocurrency_id' })
  cryptocurrency: Cryptocurrency;
}

export default Transaction;
