import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import HttpStatusCodes from 'http-status-codes'

import { indexRouter } from './routes/index'
import { usersRouter } from './routes/users';


export const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/usrs', usersRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(HttpStatusCodes.NOT_FOUND))
})

app.use((err: any, req :Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message
  res.locals.error = err

  res.status(err.status ?? 500)
  res.render('error')
})
