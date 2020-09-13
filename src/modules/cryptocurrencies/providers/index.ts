import { container } from 'tsyringe';

import ICryptocurrencyMarketProvider from './CrpytocurrencyMarketProvider/models/ICryptocurrencyMarketProvider';
import BlockChainCryptocurrencyMarketProvider from './CrpytocurrencyMarketProvider/implementations/BlockChainCryptocurrencyMarketProvider';

container.registerSingleton<ICryptocurrencyMarketProvider>(
  'CryptocurrencyMarketProvider',
  BlockChainCryptocurrencyMarketProvider,
);
