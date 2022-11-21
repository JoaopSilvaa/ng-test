import * as Router from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UsersService';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/:accountId', (req, res) => userController.readByAccountId(req, res));
router.get('/balance/:id', (req, res) => userController.readBalance(req, res));
router.post('/user', (req, res) => userController.readOne(req, res));

export default router;
