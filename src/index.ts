//imports
import { log } from "console"
const hono = require('hono')
import { serveStatic } from 'hono/bun'
import { Database } from "bun:sqlite";

//db init
const db = new Database("./db/database.db", { create: true });
db.exec("PRAGMA journal_mode = WAL;");
async function createTable() {
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        url TEXT NOT NULL
      );
    `);
    console.log('Table "books" created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}
try{
  db.query("select * from books").run()
} catch(error){
  createTable()
}

async function insertBook(name:string, url:string) {
  try {
    await db.run('INSERT INTO books (name, url) VALUES (?, ?)', [name, url]);
    console.log(`Book "${name}" added to database`);
  } catch (error) {
    console.error('Error adding book:', error);
  }
}

async function getBooks() {
  try {
    const rows = await db.query('SELECT * FROM books').all();
    return rows;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}


//enviroment variables
const port = process.env.PORT

//inits
const app = new hono.Hono()

//routes
app.use('/favicon.ico', serveStatic({ path: './public/icons/favicon.ico' }))
app.use('/dummy.pdf', serveStatic({ path: './public/static/html/dummy.pdf' }))
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

