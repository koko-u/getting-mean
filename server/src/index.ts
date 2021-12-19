import { config } from 'dotenv'
import { app } from './app'
import http from 'http'

config()

const port = process.env.PORT ?? 3000
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
server.on('error', (err: any) => {
  if (err.syscall !== 'listen') { throw err }
  if (err.code === 'EACCES') {
    console.error('requires elevated privileges')
    process.exit(1)
    return
  }
  if (err.code === 'EADDRINUSE') {
    console.error('port is already in use')
    process.exit(1)
    return
  }
  throw err
})
server.on('listening', () => {
  console.log('start server...')
})
