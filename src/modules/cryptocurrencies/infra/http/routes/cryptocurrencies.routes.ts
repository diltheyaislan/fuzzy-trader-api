import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CryptocurrenciesController from '@modules/cryptocurrencies/infra/http/controllers/CryptocurrenciesController';

const cryptocurrenciesRouter = Router();
const cryptocurrenciesController = new CryptocurrenciesController();

cryptocurrenciesRouter.use(ensureAuthenticated);

cryptocurrenciesRouter.get('/', cryptocurrenciesController.index);

cryptocurrenciesRouter.get('/:id', cryptocurrenciesController.show);

cryptocurrenciesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      symbol: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  cryptocurrenciesController.create,
);

cryptocurrenciesRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      symbol: Joi.string(),
      description: Joi.string(),
    },
  }),
  cryptocurrenciesController.update,
);

cryptocurrenciesRouter.delete('/:id', cryptocurrenciesController.delete);

export default cryptocurrenciesRouter;
