import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

@injectable()
class DeleteCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError(locale.resources.companies.notFound, 404);
    }

    if (company.image) {
      await this.storageProvider.deleteFile(company.image);
    }

    await this.companiesRepository.delete(company.id);
  }
}

export default DeleteCompanyService;
