import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompaniesRepository {
  find(): Promise<Company[]>;
  findById(id: string): Promise<Company | undefined>;
  findBySymbol(symbol: string): Promise<Company | undefined>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  save(data: Company): Promise<Company>;
  delete(id: string): Promise<void>;
}
