import * as Router from 'express';
// import validationLogin from '../middlewares/loginMiddleware';
import UserController from '../controllers/UserController';
import UserService from '../services/UsersService';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', (req, res) => userController.register(req, res));
// router.get('/login/validate', userController.validate);

export default router;