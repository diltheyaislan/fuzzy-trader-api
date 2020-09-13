import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import InvestmentPortifolioController from '../controllers/InvestmentPortifolioController';

const investmentPortfolioRouter = Router();
const investmentPortfolioController = new InvestmentPortifolioController();

investmentPortfolioRouter.use(ensureAuthenticated);

investmentPortfolioRouter.get('/', investmentPortfolioController.index);

export default investmentPortfolioRouter;
