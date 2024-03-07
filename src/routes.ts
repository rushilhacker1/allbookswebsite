import { serveStatic } from 'hono/bun'
import { getBooks } from './databaseManagement'

async function createPdfRoutes(app:any) {
    const books = await getBooks()
    let book:any = books[0]
    for (book of books) {
      app.use(`/${book.name}`, serveStatic({ path: book.url }))
    }
  }
export async function create_routes(app:any){
    //routes
app.use('/favcon.ico', serveStatic({ path: './public/icons/favicon.ico' }))
app.use('/dummy.pdf', serveStatic({ path: './public/pdf/dummy.pdf' }))
app.use('/', serveStatic({ path: './public/static/html/index.htm' }))
app.get('/listBooks', async (c:any) =>{
  const books = await getBooks()
  c.status(201)
  return new Response(JSON.stringify(books))
})
createPdfRoutes(app)

}