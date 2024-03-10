//imports
import { log } from "console"
import { getBooks, createTable, insertBook, db } from './databaseManagement'
import { create_routes } from './routes'
import { app, createServer } from './honoInits'
import { readdir } from 'node:fs/promises';


//enviroment variables
let port = process.env.PORT
port = port?.toString()

//inits
function removeElements(array1:Array<any>, array2:Array<any>) {
  return array2.filter(element => array1.indexOf(element) === -1);
}


//db init
try {
  db.query("select * from books").run()
} catch (error) {
  createTable()
}

try {
  create_routes(app)
} catch (error) {
  log(`${error} is occurred as a unexpected`)
}

async function addAllPdfs(){
let fileNames = await readdir("./public/pdf"); // returns a JS array of just short/local file-names, not paths.
let current = await getBooks();

current = current.map(item => item.name)
fileNames = removeElements(current, fileNames)

if (fileNames.length != 0){
  for (let index = 0; index <= fileNames.length - 1; index++ ){
      insertBook(fileNames[index])
  }
}
}

setInterval(addAllPdfs, 0)


const server = createServer(port)





