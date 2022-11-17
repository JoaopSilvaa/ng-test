import IUser from '../Interfaces/IUser';
import Accounts from '../database/models/Accounts';
import IAccount from '../Interfaces/IAccount';

class AccountService {
  constructor() {
  }

  public async create(): Promise<number> {
    const result = await Accounts.create();
    return result.id;
  }

  public async readOne(id: number): Promise<number> {
    const result = await Accounts.findByPk(id);
    if (!result) {
      throw new Error("NotFoundError");
    }
    return result.balance;
  }

  public async update(user: IUser, balance: number): Promise<IAccount | null> {
    const { id } = user;
    await Accounts.update({ balance }, { where: { id } });
    const account = await Accounts.findByPk(id);
    return account;
  }
}

export default AccountService;
