export const hono = require('hono')
export const app = new hono.Hono({ strict: false })
//server
export async function createServer(port:string | undefined) {
    const server = Bun.serve({
        port: port,
        fetch: app.fetch
      })
      
      console.log(`app running on port ${port}`)
      return server
}
