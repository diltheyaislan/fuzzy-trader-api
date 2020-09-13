import { container } from 'tsyringe';

import IStockMarketProvider from './StockMarketProvider/models/IStockMarketProvider';
import MarketStackStockMarketProvider from './StockMarketProvider/implementations/MarketStackStockMarketProvider';

container.registerSingleton<IStockMarketProvider>(
  'StockMarketProvider',
  MarketStackStockMarketProvider,
);
