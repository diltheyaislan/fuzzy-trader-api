export interface IStockMarket {
  symbol: string;
  price: number;
}

export default interface IStockMarketProvider {
  getPrices(...symbols: string[]): Promise<IStockMarket[]>;
}
