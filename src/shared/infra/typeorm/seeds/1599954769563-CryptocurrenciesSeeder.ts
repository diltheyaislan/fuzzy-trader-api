/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { MigrationInterface, QueryRunner } from 'typeorm';
import Cryptocurrency from '@modules/cryptocurrencies/infra/typeorm/entities/Cryptocurrency';

interface ICryptocurrency {
  name: string;
  symbol: string;
  image: string;
  description: string;
}

export default class CryptocurrenciesSeeder1599954769563
  implements MigrationInterface {
  cryptocurrencies: ICryptocurrency[] = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      image: 'bitcoin.png',
      description: `Bitcoin is arguably one of the most liquid investment assets due to the worldwide establishment of trading platforms, exchanges and online brokerages. You can easily trade bitcoin for cash or assets like gold instantly with incredibly low fees. The high liquidity associated with bitcoin makes it a great investment vessel if you’re looking for short-term profit. Digital currencies may also be a long-term investment due to their high market demand.`,
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const cryptocurrency of this.cryptocurrencies) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Cryptocurrency)
        .values({
          name: cryptocurrency.name,
          symbol: cryptocurrency.symbol,
          image: cryptocurrency.image,
          description: cryptocurrency.description,
        })
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const cryptocurrency of this.cryptocurrencies) {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Cryptocurrency)
        .where('symbol = :symbol', { symbol: cryptocurrency.symbol })
        .execute();
    }
  }
}
