import * as Router from 'express';
import TransactionController from '../controllers/TransactionsController';
import TransactionService from '../services/TransactionsService';

const router = Router();

const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService);

router.post('/', (req, res) => transactionController.create(req, res));
router.get('/', (req, res) => transactionController.readByUser(req, res));
router.get('/cash-out', (req, res) => transactionController.readCashOut(req, res));
router.get('/cash-in', (req, res) => transactionController.readCashIn(req, res));
router.post('/bydate', (req, res) => transactionController.readByDate(req, res));

export default router;
