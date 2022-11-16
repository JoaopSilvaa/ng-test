import { Model, INTEGER, DOUBLE } from 'sequelize';
import db from '.';

class Accounts extends Model {
  public id!: number;
  public balance!: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DOUBLE,
    defaultValue: 100,
  }
}, {
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});


export default Accounts;