import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TransactionsController from '@modules/transactions/infra/http/controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.get('/', transactionsController.index);

transactionsRouter.get('/:id', transactionsController.show);

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().required(),
      company_id: Joi.string(),
      cryptocurrency_id: Joi.string(),
    },
  }),
  transactionsController.create,
);

transactionsRouter.delete('/:id', transactionsController.delete);

export default transactionsRouter;
