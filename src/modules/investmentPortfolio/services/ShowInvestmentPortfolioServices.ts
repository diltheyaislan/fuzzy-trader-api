import { container, injectable } from 'tsyringe';
import InvestmentPortfolioDTO from '../dto/InvestmentPortfolioDTO';
import ListUserCryptocurrenciesService from './ListUserCryptocurrenciesService';
import ListUserSharesService from './ListUserSharesService';

@injectable()
class ShowInvestmentPortfolioServices {
  public async execute(userId: string): Promise<InvestmentPortfolioDTO> {
    const portfolio: InvestmentPortfolioDTO = new InvestmentPortfolioDTO();
    portfolio.amount = 0;
    portfolio.shares = [];
    portfolio.cryptocurrency = [];

    const listShares = container.resolve(ListUserSharesService);

    portfolio.shares = await listShares.execute(userId);

    portfolio.shares.forEach(share => {
      share.amount = Number((share.quantity * share.company.price).toFixed(4));
    });

    const sharesAmount =
      portfolio.shares.length === 0
        ? 0
        : portfolio.shares
            .map(share => share.quantity * share.company.price)
            .reduce((acc, curr) => acc + curr);

    const listCryptocurrencies = container.resolve(
      ListUserCryptocurrenciesService,
    );

    portfolio.cryptocurrency = await listCryptocurrencies.execute(userId);

    portfolio.cryptocurrency.forEach(currency => {
      currency.amount = Number(
        (currency.quantity * currency.cryptocurrency.price).toFixed(4),
      );
    });

    const currencyAmount =
      portfolio.cryptocurrency.length === 0
        ? 0
        : portfolio.cryptocurrency
            .map(currency => currency.quantity * currency.cryptocurrency.price)
            .reduce((acc, curr) => acc + curr);

    portfolio.amount = sharesAmount + currencyAmount;

    portfolio.amount = Number(portfolio.amount.toFixed(2));

    return portfolio;
  }
}

export default ShowInvestmentPortfolioServices;
