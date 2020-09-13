import { getRepository, Repository } from 'typeorm';

import ICreateUserHasCompanyDTO from '@modules/transactions/dtos/ICreateUserHasCompanyDTO';
import IUserHasCompaniesRepository from '@modules/transactions/repositories/IUserHasCompaniesRepository';
import IFindUserHasCompanyDTO from '@modules/transactions/dtos/IFindUserHasCompanyDTO';
import UserHasCompany from '../entities/UserHasCompany';

class UserHasCompaniesRepository implements IUserHasCompaniesRepository {
  private ormRepository: Repository<UserHasCompany>;

  constructor() {
    this.ormRepository = getRepository(UserHasCompany);
  }

  public async find({
    user_id,
    company_id,
  }: IFindUserHasCompanyDTO): Promise<UserHasCompany | undefined> {
    const company = await this.ormRepository.findOne({
      where: { user_id, company_id },
    });
    return company;
  }

  public async findByUser(user_id: string): Promise<UserHasCompany[]> {
    const companies = await this.ormRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
      relations: ['company'],
    });
    return companies;
  }

  public async create(data: ICreateUserHasCompanyDTO): Promise<UserHasCompany> {
    const company = this.ormRepository.create(data);
    await this.ormRepository.save(company);

    return company;
  }

  public async save(company: UserHasCompany): Promise<UserHasCompany> {
    return this.ormRepository.save(company);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserHasCompaniesRepository;
