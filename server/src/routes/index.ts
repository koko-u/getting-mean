import { Router, Request, Response } from 'express';
import { homeController } from '../controllers/home.controller';

export const indexRouter = Router()

/* GET home page. */
indexRouter.get('/', homeController.index)

