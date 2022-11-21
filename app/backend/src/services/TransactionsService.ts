import 'dotenv/config';
import AccountService from './AccountsService';
import UserService from './UsersService';
import Transactions from '../database/models/Transactions';
import ITransaction from '../Interfaces/ITransaction';
import { Op } from 'sequelize';
import sequelize = require('sequelize');


class TransactionsService {
  private _accounts;
  private _users;

  constructor() {
    this._accounts = new AccountService();
    this._users = new UserService();
  }

  public async create(token: string, creditedAccountUser: string, value: number): Promise<ITransaction | null> {
    const debitedAccount = await this._users.validate(token);
    const creditedAccount = await this._users.readOne(creditedAccountUser);
    if (!debitedAccount) {
        throw new Error("TokenError");
    } else {
        if (debitedAccount.id == creditedAccount.id) {
          throw new Error("UnauthorizedError");
        } else {
          const balance = await this._accounts.readOne(debitedAccount.accountId);
          if (balance < value) {
              throw new Error("UnauthorizedError");
          } else {
              await this._accounts.update(debitedAccount, (Number(balance) - value));
              const balanceCredited = await this._accounts.readOne(creditedAccount.accountId);
              await this._accounts.update(creditedAccount, (Number(balanceCredited) + value));
              const debitedAccountId = debitedAccount.id;
              const creditedAccountId = creditedAccount.id;

              const result = await Transactions.create({ debitedAccountId, creditedAccountId, value });
              const dataId = result.getDataValue('id');
              const transaction = Transactions.findByPk(dataId);
              if (!transaction) return null;
              return transaction;
            }
          }
        } 
  }
  
  public async readByUser(token: string): Promise<ITransaction[]> {
    const user = await this._users.validate(token);
    const result = await Transactions.findAll({
      where: { [Op.or]: [
        {'debitedAccountId': user.id },
        {'creditedAccountId': user.id},
      ]
      },
    });
    if (result.length == 0) {
      throw new Error("NotFoundError");
    }
    return result;
  }

  public async readCashOut(token: string): Promise<ITransaction[]> {
    const user = await this._users.validate(token);
    const result = await Transactions.findAll({
      where: { 'debitedAccountId': user.id },
    });
    if (result.length == 0) {
      throw new Error("NotFoundError");
    }
    return result;
  }

  public async readCashIn(token: string): Promise<ITransaction[]> {
    const user = await this._users.validate(token);
    const result = await Transactions.findAll({
      where: { 'creditedAccountId': user.id },
    });
    if (result.length == 0) {
      throw new Error("NotFoundError");
    }
    return result;
  }

  // public async readByDate(token: string, date: string): Promise<ITransaction[]> {
  //   await this._users.validate(token);
  //   const result = await Transactions.findAll({
  //     where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', date)
  //   });  
  //   if (result.length == 0) {
  //     throw new Error("NotFoundError");
  //   }
  //   return result;
  // }

  public async readByDate(token: string): Promise<ITransaction[]> {
    const user = await this._users.validate(token);
    const result = await Transactions.findAll({
      where: { [Op.or]: [
        {'debitedAccountId': user.id },
        {'creditedAccountId': user.id},
      ],
      },
      order: [['createdAt', 'DESC']],
    });  
    if (result.length == 0) {
      throw new Error("NotFoundError");
    }
    return result;
  }
}

export default TransactionsService;
