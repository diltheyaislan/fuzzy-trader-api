import ICreateCryptocurrencyDTO from '../dtos/ICreateCryptocurrencyDTO';
import Cryptocurrency from '../infra/typeorm/entities/Cryptocurrency';

export default interface ICryptocurrenciesRepository {
  find(): Promise<Cryptocurrency[]>;
  findById(id: string): Promise<Cryptocurrency | undefined>;
  findBySymbol(symbol: string): Promise<Cryptocurrency | undefined>;
  create(data: ICreateCryptocurrencyDTO): Promise<Cryptocurrency>;
  save(data: Cryptocurrency): Promise<Cryptocurrency>;
  delete(id: string): Promise<void>;
}
