import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import hasPermission from '@modules/permissions/infra/http/middlewares/hasPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get(
  '/',
  ensureAuthenticated,
  hasPermission('users.all'),
  usersController.index,
);

usersRouter.get(
  '/:id',
  ensureAuthenticated,
  hasPermission('users.all'),
  usersController.show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/:id',
  ensureAuthenticated,
  hasPermission('users.all'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      active: Joi.boolean(),
    },
  }),
  usersController.update,
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  hasPermission('users.all'),
  usersController.delete,
);

export default usersRouter;
