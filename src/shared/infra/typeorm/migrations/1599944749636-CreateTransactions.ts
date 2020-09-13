import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransactions1599944749636
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'quantity',
            type: 'decimal',
            precision: 9,
            scale: 4,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 9,
            scale: 4,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 9,
            scale: 4,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['cryptocurrency', 'shares'],
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'company_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'cryptocurrency_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            columnNames: ['company_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            referencedTableName: 'cryptocurrencies',
            referencedColumnNames: ['id'],
            columnNames: ['cryptocurrency_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
