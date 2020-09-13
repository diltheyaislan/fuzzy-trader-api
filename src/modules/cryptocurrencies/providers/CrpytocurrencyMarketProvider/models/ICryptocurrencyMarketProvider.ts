export interface CrpytocurrencyMarket {
  symbol: string;
  price: number;
}

export default interface ICryptocurrencyMarketProvider {
  getPrices(...symbols: string[]): Promise<CrpytocurrencyMarket[]>;
}
