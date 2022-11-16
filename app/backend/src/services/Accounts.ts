import Accounts from '../database/models/Accounts';
import IAccount from '../Interfaces/IAccount';

class AccountService {
  constructor() {
  }

  public async create(): Promise<number> {
    const result = await Accounts.create();
    return result.id;
  }

}

export default AccountService;