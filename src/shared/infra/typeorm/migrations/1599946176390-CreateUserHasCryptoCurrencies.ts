import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserHasCryptoCurrencies1599946176390
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_has_cryptocurrencies',
        columns: [
          {
            name: 'quantity',
            type: 'decimal',
            precision: 9,
            scale: 4,
          },
          {
            name: 'user_id',
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
            referencedTableName: 'cryptocurrencies',
            referencedColumnNames: ['id'],
            columnNames: ['cryptocurrency_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_has_cryptocurrencies');
  }
}
