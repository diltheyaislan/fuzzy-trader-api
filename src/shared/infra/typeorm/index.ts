import path from 'path';

import { createConnections } from 'typeorm';

createConnections([
  {
    name: 'default',
    url: process.env.HEROKU_PSQL_URL,
    type: 'postgres',
    synchronize: true,
    entities: [
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'modules/**/infra/typeorm/entities/*.ts',
      ),
    ],
    ssl: {
      rejectUnauthorized: false,
    },
  },
]);
