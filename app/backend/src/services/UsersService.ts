import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import Users from '../database/models/Users';
import IUser from '../Interfaces/IUser';
import AccountService from './Accounts';


class UserService {
  private saltRounds = 10;
  private _accounts;

  private secret = process.env.JWT_SECRET || 'jwt_secret';

  constructor() {
    this._accounts = new AccountService();
  }

  public async register(obj: IUser): Promise<IUser> {
    const { username, password } = obj;
    const regex = /(?=.*[A-Z])(?=.*[0-9]).*$/;
    const response = await Users.findOne({ where: { username } });
    if (!response) {
      if (username.length < 3 || password.length < 8 || !regex.test(password)) {
        throw new Error("ValidationError");
      }
      const hash = bcrypt.hashSync(password, this.saltRounds);
      const accountId = await this._accounts.create();
      return this.create({ username, password: hash, accountId });
    }
      throw new Error("ConflictError");
  }

  public async create(obj: IUser): Promise<IUser> {
    const user = await Users.create(obj);
    return user;
  }

  private doToken = (response: IUser): string => {
    const { username } = response;
    const token = jwt.sign(
      { data: username },
      this.secret,
      { expiresIn: '1d', algorithm: 'HS256' },
    );
    return token;
  };

  private decriptToken = (token: string): undefined | any => {
    const decode = jwt.verify(token, this.secret);
    return decode;
  };
}

export default UserService;

// export default class UserService {
  
  // register = async (username: string, password: string): Promise<boolean | null> => {
    
    // const result = bcrypt.compareSync(password, response.password);
    // if (!result) return null;
    // const token = doToken(response);
    // return token;
  // };

  // validate = async (token: string): Promise<string | null> => {
  //   const { data } = decriptToken(token);
  //   if (!data) return null;
  //   const response = await user.findOne({ where: { email: data } });
  //   if (!response) return null;
  //   const { role } = response;
  //   return role;
  // };
// }
