import { Model, INTEGER, DOUBLE } from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Transactions extends Model {
  public id!: number;
  public debitedAccountId!: number;
  public creditedAccountId!: number;
  public value!: number;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountI: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: DOUBLE,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: true,
  updatedAt: false,
});

Transactions.belongsToMany(Accounts, {
  foreignKey: 'id',
  as: 'accountId',
  through: 'accountId'
});

export default Transactions;