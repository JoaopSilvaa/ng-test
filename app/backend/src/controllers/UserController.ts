import { Request, Response } from 'express';
import UserService from '../services/UsersService';

export default class UserController {
    private _service;

    constructor(private userService: UserService) {
        this._service = userService;
    }

  public async register(req: Request, res: Response) {
    const user = await this._service.register(req.body);
    return res.status(201).json(user);
  };

  public async login(req: Request, res: Response) {
    const token = await this._service.login(req.body);
    return res.status(200).json({ token });
  }

  public async readBalance(req:Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("TokenError");
    }
    const balance = await this._service.readBalance(token, Number(id));
    return res.status(200).json({ balance });
  }

  public async readOne(req: Request, res: Response) {
    const { username } = req.body;
    const user = await this._service.readOne(username);
    return res.status(200).json(user);
  }

  public async readByAccountId(req: Request, res: Response) {
    const { accountId } = req.params;
    const user = await this._service.readByAccountId(Number(accountId));
    return res.status(200).json(user);
  }
}
