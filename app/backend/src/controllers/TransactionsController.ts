import { Request, Response } from 'express';
import TransactionsService from '../services/TransactionsService';

export default class TransactionsController {
    private _service;

    constructor(private transactionsService: TransactionsService) {
        this._service = transactionsService;
    }

    public async create(req: Request, res: Response) {
        const token = req.headers.authorization;
        const { creditedAccountUser, value } = req.body;
        if (!token) {
            throw new Error("TokenError");
        }
        const transaction = await this._service.create(token, creditedAccountUser, value);
        return res.status(201).json({ transaction });
    }

    public async readByUser(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("TokenError");
        }
        const transactions = await this._service.readByUser(token);
        return res.status(201).json(transactions);
    }

    public async readCashOut(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("TokenError");
        }
        const transactions = await this._service.readCashOut(token);
        return res.status(201).json(transactions);
    }

    public async readCashIn(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("TokenError");
        }
        const transactions = await this._service.readCashIn(token);
        return res.status(201).json(transactions);
    }

    public async readByDate(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("TokenError");
        }
        const { date } = req.body;
        const transactions = await this._service.readByDate(token, date);
        return res.status(201).json(transactions);
    }
}
