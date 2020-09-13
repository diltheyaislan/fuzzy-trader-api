import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICryptocurrenciesRepository from '@modules/cryptocurrencies/repositories/ICryptocurrenciesRepository';

@injectable()
class DeleteCryptocurrencyService {
  constructor(
    @inject('CryptocurrenciesRepository')
    private cryptocurrenciesRepository: ICryptocurrenciesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const cryptocurrency = await this.cryptocurrenciesRepository.findById(id);

    if (!cryptocurrency) {
      throw new AppError(locale.resources.cryptocurrencies.notFound, 404);
    }

    if (cryptocurrency.image) {
      await this.storageProvider.deleteFile(cryptocurrency.image);
    }

    await this.cryptocurrenciesRepository.delete(cryptocurrency.id);
  }
}

export default DeleteCryptocurrencyService;
