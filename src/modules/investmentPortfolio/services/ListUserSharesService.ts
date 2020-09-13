import { injectable, inject } from 'tsyringe';

import UserHasCompany from '@modules/transactions/infra/typeorm/entities/UserHasCompany';
import IUserHasCompaniesRepository from '@modules/transactions/repositories/IUserHasCompaniesRepository';
import IStockMarketProvider from '@modules/companies/providers/StockMarketProvider/models/IStockMarketProvider';

@injectable()
class ListUserSharesService {
  constructor(
    @inject('UserHasCompaniesRepository')
    private userHasCompaniesRepository: IUserHasCompaniesRepository,

    @inject('StockMarketProvider')
    private stockMarketProvider: IStockMarketProvider,
  ) {}

  public async execute(user_id: string): Promise<UserHasCompany[]> {
    const companies = await this.userHasCompaniesRepository.findByUser(user_id);

    const symbols = companies.map(company => company.company.symbol);

    if (symbols.length > 0) {
      const prices = await this.stockMarketProvider.getPrices(...symbols);

      companies.forEach(company => {
        const price = prices.find(p => p.symbol === company.company.symbol);
        company.company.price = price?.price || 0;
      });
    }

    return companies;
  }
}

export default ListUserSharesService;
