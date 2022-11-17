import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import Users from '../database/models/Users';
import IUser from '../Interfaces/IUser';
import AccountService from './AccountsService';


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

  private doToken = (username: string): string => {
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

  public async login(obj: IUser): Promise<string> {
    const { username, password } =  obj;
    const result = await Users.findOne({ where: { username } });
    if (result) {
      const hash = bcrypt.compareSync(password, result.password)
      if (hash == true) {
        const token = this.doToken(username);
        return token;
      } else {
        throw new Error("UnauthorizedError");
      }
    }
    throw new Error("UnauthorizedError"); 
  }

  public async readBalance(token: string, id: number): Promise<number> {
    const { data } = this.decriptToken(token);
    const result = await Users.findOne({ where: { username: data } });   
    if (!result) {
      throw new Error("NotFoundError");
    }
    if (result.accountId !== id) {
      throw new Error("UnauthorizedError");
    } else {
      return this._accounts.readOne(id);
    }
  }

  public async validate(token: string): Promise<IUser> {
    const { data } = this.decriptToken(token);
    if (!data) {
      throw new Error("TokenError");
      
    }
    const result = await Users.findOne({ where: { username: data } });
    if (!result) {
      throw new Error("NotFoundError"); 
    }
    return result;
  }

  public async readOne(username: string): Promise<IUser> {
    const result = await Users.findOne({ where: { username } });
    if (!result) {
      throw new Error("NotFoundError"); 
    }
    return result;
  }
}

export default UserService;
