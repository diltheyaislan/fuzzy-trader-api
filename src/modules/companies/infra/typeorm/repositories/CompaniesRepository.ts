import { getRepository, Repository } from 'typeorm';

import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import Company from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async find(): Promise<Company[]> {
    const companies = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return companies;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const companies = await this.ormRepository.findOne(id);
    return companies;
  }

  public async findBySymbol(symbol: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({ where: { symbol } });
    return company;
  }

  public async create(companyData: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create(companyData);
    await this.ormRepository.save(company);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CompaniesRepository;
