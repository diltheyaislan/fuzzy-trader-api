import UserHasCompany from '@modules/transactions/infra/typeorm/entities/UserHasCompany';
import UserHasCryptocurrency from '@modules/transactions/infra/typeorm/entities/UserHasCryptocurrency';

export default class InvestmentPortfolioDTO {
  amount: number;

  shares: UserHasCompany[];

  cryptocurrency: UserHasCryptocurrency[];
}
