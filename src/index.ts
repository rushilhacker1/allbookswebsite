//imports
import { log } from "console"
const hono = require('hono')
import { serveStatic } from 'hono/bun'


//enviroment variables
const port = process.env.PORT

//inits
const app = new hono.Hono()

//routes
app.use('/favicon.ico', serveStatic({ path: './public/icons/favicon.ico' }))
app.use('/dummy.pdf', serveStatic({ path: './public/static/dummy.pdf' }))
app.use('/', serveStatic({ path: './public/static/index.html' }))

//server
const server = Bun.serve({
    port:port,
    fetch: app.fetch
})

log(`app running on port ${port}`)

