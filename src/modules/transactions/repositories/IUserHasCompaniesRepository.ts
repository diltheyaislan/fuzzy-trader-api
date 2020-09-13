import ICreateUserHasCompanyDTO from '../dtos/ICreateUserHasCompanyDTO';
import IFindUserHasCompanyDTO from '../dtos/IFindUserHasCompanyDTO';
import UserHasCompany from '../infra/typeorm/entities/UserHasCompany';

export default interface IUserHasCompaniesRepository {
  find(data: IFindUserHasCompanyDTO): Promise<UserHasCompany | undefined>;
  findByUser(id: string): Promise<UserHasCompany[]>;
  create(data: ICreateUserHasCompanyDTO): Promise<UserHasCompany>;
  save(data: UserHasCompany): Promise<UserHasCompany>;
  delete(id: string): Promise<void>;
}
