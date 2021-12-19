import { Request, Response } from 'express'

export const homeController = {
  index: (req: Request, res: Response) => {
    res.render('index', { title: 'Express' });
  }
}


