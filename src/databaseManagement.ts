import { Database } from "bun:sqlite";


//db init
const db = new Database("./db/database.db", { create: true });

db.exec("PRAGMA journal_mode = WAL;");
export async function createTable() {
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


export async function insertBook(name:string, url:string) {
  try {
    await db.run('INSERT INTO books (name, url) VALUES (?, ?)', [name, url]);
    console.log(`Book "${name}" added to database`);
  } catch (error) {
    console.error('Error adding book:', error);
  }
}

export async function getBooks() {
  try {
    const rows = await db.query('SELECT * FROM books').all();
    return rows;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}