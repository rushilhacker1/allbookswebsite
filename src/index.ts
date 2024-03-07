//imports
import { log } from "console"
const hono = require('hono')
import { serveStatic } from 'hono/bun'
import { getBooks, createTable, insertBook, db } from './databaseManagement'

//db init
try {
  db.query("select * from books").run()
} catch (error) {
  createTable()
}

//enviroment variables
const port = process.env.PORT

//inits
const app = new hono.Hono()

//routes
app.use('/favicon.ico', serveStatic({ path: './public/icons/favicon.ico' }))
app.use('/dummy.pdf', serveStatic({ path: './public/pdf/dummy.pdf' }))
app.use('/', serveStatic({ path: './public/static/html/index.htm' }))
//write code to server every pdf here from db automatically from table called books it has url 
async function name() {
  const books = await getBooks()
  for (const book of books) {
    app.use(`/${book.name}`, serveStatic({ path: book.url }))
  }
}

//server
const server = Bun.serve({
  port: port,
  fetch: app.fetch
})

log(`app running on port ${port}`)

