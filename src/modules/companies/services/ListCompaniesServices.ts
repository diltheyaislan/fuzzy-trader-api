import { injectable, inject } from 'tsyringe';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IStockMarketProvider from '../providers/StockMarketProvider/models/IStockMarketProvider';

@injectable()
class ListCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('StockMarketProvider')
    private stockMarketProvider: IStockMarketProvider,
  ) {}

  public async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.find();

    const symbols = companies.map(company => company.symbol);

    const prices = await this.stockMarketProvider.getPrices(...symbols);

    companies.forEach(company => {
      const price = prices.find(p => p.symbol === company.symbol);
      company.price = price?.price || 0;
    });

    return companies;
  }
}

export default ListCompaniesService;
