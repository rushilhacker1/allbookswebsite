//imports
import { log } from "console"
import { getBooks, createTable, insertBook, db } from './databaseManagement'
import { create_routes } from './routes'
import {app, createServer} from './honoInits'

//enviroment variables
let port = process.env.PORT
port = port?.toString()

//inits

//db init
try {
  db.query("select * from books").run()
} catch (error) {
  createTable()
}

try{
  create_routes(app)
} catch (error) {
  log(`${error} is occurred as a unexpected`)
}

const server = createServer(port)





