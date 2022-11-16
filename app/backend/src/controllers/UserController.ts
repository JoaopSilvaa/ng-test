import { Request, Response } from 'express';
import UserService from '../services/UsersService';

export default class UserController {
    private _service;

    constructor(private userService: UserService) {
        this._service = userService;
    }

  public async register(req: Request, res: Response) {
    const result = await this.userService.register(req.body);
    return res.status(201).json(result);
  };

//   validate = async (req: Request, res: Response) => {
//     const token = req.headers.authorization;
//     if (!token) return res.status(401).json({ message: 'Token not found' });
//     const role = await this.userService.validate(token);
//     return res.status(200).json({ role });
//   };
}