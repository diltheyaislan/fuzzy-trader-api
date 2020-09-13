import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCryptocurrencies1599944648582
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cryptocurrencies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'symbol',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'image',
            type: 'varchar',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cryptocurrencies');
  }
}
