import { Model, INTEGER, DECIMAL } from 'sequelize';
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
    type: DECIMAL(10,2),
    defaultValue: "100.00",
  }
}, {
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});


export default Accounts;