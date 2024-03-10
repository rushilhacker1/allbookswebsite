import { serveStatic } from 'hono/bun'
import { getBooks } from './databaseManagement'

async function createPdfRoutes(app:any) {
    const books = await getBooks()
    let book:any
    for (book of books) {
      let name = book.name
      app.use(`/${name}`, serveStatic({ path: `./public/pdf/${name}.pdf`.toString() }))
      console.log(name)
    }
  }
export async function create_routes(app:any){
    //routes
app.use('/favcon.ico', serveStatic({ path: './public/icons/favicon.ico' }))
app.use('/dummy.pdf', serveStatic({ path: './public/pdf/dummy.pdf' }))
app.use('/', serveStatic({ path: './public/static/html/index.htm' }))
app.use('/css/index', serveStatic({path : './public/static/css/index.css' }))
app.get('/listBooks', async (c:any) =>{
  const books = await getBooks()
  c.status(201)
  return new Response(JSON.stringify(books))
})
createPdfRoutes(app)

}