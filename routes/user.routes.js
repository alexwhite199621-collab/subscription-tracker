import { Router } from 'express';

import authorize from '../middlewares/auth.middleware.js';

import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = Router();

// GET /users -> get all users
// GET /users/:id -> get user by id // 123 4123 321

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser); // authorize needs to go in the middle before getUser becasue it's the middleware

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user'}));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE use'}));

export default userRouter;