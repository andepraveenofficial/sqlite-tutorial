/* -----> Third Party packages <----- */
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";

/* -----> Database Path <----- */
// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);

// Extract the directory name from the file path
const __dirname = path.dirname(__filename);

// Construct the absolute path to the SQLite database file
const dbPath = path.join(__dirname, "../database/mydb.db");

/* -----> Database Configuration <----- */
let db = null;

const initializeDB = async () => {
    try {

        // Attempt database connection
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        // Verify connection with simple query
        await db.get('SELECT 1');  // checks if the database is responding
        console.log('✅ Database connection verified');
        return true;
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
};

// database instance getter
 const getDB = () => {
  if (!db) throw new Error('Database not initialized');
  return db;
};

export {initializeDB, getDB}