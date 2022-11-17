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
  debitedAccountId: {
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
  modelName: 'Transactions',
  timestamps: true,
  updatedAt: false,
});

Transactions.belongsTo(Accounts,
    { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Transactions.belongsTo(Accounts,
    { foreignKey: 'creditedAccountId', as: 'creditedAccount' });


export default Transactions;
