import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import permissionsdRouter from '@modules/permissions/infra/http/routes/permissions.routes';
import rolesdRouter from '@modules/permissions/infra/http/routes/roles.routes';

import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';

import cryptocurrenciesRouter from '@modules/cryptocurrencies/infra/http/routes/cryptocurrencies.routes';

import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';

import investmentPortfolioRouter from '@modules/investmentPortfolio/infra/http/routes/investmentPortfolio.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/permissions', permissionsdRouter);
routes.use('/roles', rolesdRouter);

routes.use('/companies', companiesRouter);
routes.use('/cryptocurrencies', cryptocurrenciesRouter);

routes.use('/transactions', transactionsRouter);

routes.use('/investment-portfolio', investmentPortfolioRouter);

export default routes;
