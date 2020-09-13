import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/companies/providers';
import '@modules/cryptocurrencies/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/permissions/infra/typeorm/repositories/PermissionsRepository';

import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';
import RolesRepository from '@modules/permissions/infra/typeorm/repositories/RolesRepository';

import IUserPermissionsRepository from '@modules/users/repositories/IUserPermissionsRepository';
import UserPermissionsRepository from '@modules/users/infra/typeorm/repositories/UserPermissionsRepository';

import IUserPermissionRepository from '@modules/permissions/repositories/IUserPermissionRepository';
import UserPermissionRepository from '@modules/permissions/infra/typeorm/repositories/UserPermissionRepository';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';

import ICryptocurrenciesRepository from '@modules/cryptocurrencies/repositories/ICryptocurrenciesRepository';
import CryptocurrenciesRepository from '@modules/cryptocurrencies/infra/typeorm/repositories/CryptocurrenciesRepository';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';

import IUserHasCompaniesRepository from '@modules/transactions/repositories/IUserHasCompaniesRepository';
import UserHasCompaniesRepository from '@modules/transactions/infra/typeorm/repositories/UserHasCompaniesRepository';

import IUserHasCryptocurrenciesRepository from '@modules/transactions/repositories/IUserHasCryptocurrenciesRepository';
import UserHasCryptocurrenciesRepository from '@modules/transactions/infra/typeorm/repositories/UserHasCryptocurrenciesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IUserPermissionsRepository>(
  'UserPermissionsRepository',
  UserPermissionsRepository,
);

container.registerSingleton<IUserPermissionRepository>(
  'UserPermissionRepository',
  UserPermissionRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<ICryptocurrenciesRepository>(
  'CryptocurrenciesRepository',
  CryptocurrenciesRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IUserHasCompaniesRepository>(
  'UserHasCompaniesRepository',
  UserHasCompaniesRepository,
);

container.registerSingleton<IUserHasCryptocurrenciesRepository>(
  'UserHasCryptocurrenciesRepository',
  UserHasCryptocurrenciesRepository,
);
