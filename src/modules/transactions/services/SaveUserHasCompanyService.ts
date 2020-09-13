import { injectable, inject } from 'tsyringe';

import UserHasCompany from '../infra/typeorm/entities/UserHasCompany';
import IUserHasCompaniesRepository from '../repositories/IUserHasCompaniesRepository';

interface IRequest {
  quantity: number;
  user_id: string;
  company_id: string;
}

@injectable()
class SaveUserHasCompanyService {
  constructor(
    @inject('UserHasCompaniesRepository')
    private userHasCompaniesRepository: IUserHasCompaniesRepository,
  ) {}

  public async execute({
    quantity,
    user_id,
    company_id,
  }: IRequest): Promise<UserHasCompany> {
    const foundUserHasCompany = await this.userHasCompaniesRepository.find({
      user_id,
      company_id,
    });

    if (foundUserHasCompany) {
      foundUserHasCompany.quantity += quantity;

      const userHasCompany = await this.userHasCompaniesRepository.save(
        foundUserHasCompany,
      );

      return userHasCompany;
    }
    const userHasCompany = await this.userHasCompaniesRepository.create({
      quantity,
      user_id,
      company_id,
    });

    return userHasCompany;
  }
}

export default SaveUserHasCompanyService;
