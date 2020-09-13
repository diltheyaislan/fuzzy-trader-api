import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CompaniesController from '@modules/companies/infra/http/controllers/CompaniesController';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.get('/', companiesController.index);

companiesRouter.get('/:id', companiesController.show);

companiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      symbol: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  companiesController.create,
);

companiesRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      symbol: Joi.string(),
      description: Joi.string(),
    },
  }),
  companiesController.update,
);

companiesRouter.delete('/:id', companiesController.delete);

export default companiesRouter;
