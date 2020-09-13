import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowInvestmentPortfolioServices from '@modules/investmentPortfolio/services/ShowInvestmentPortfolioServices';

export default class InvestmentPortifolioController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showInvestmentPortfolio = container.resolve(
      ShowInvestmentPortfolioServices,
    );

    const userId = request.user.id;

    const portfolio = await showInvestmentPortfolio.execute(userId);

    return response.json(classToClass(portfolio));
  }
}
