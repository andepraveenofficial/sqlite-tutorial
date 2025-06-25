/* -----> DDL <----- */

// Create Table
export const createTableQuery = `CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP DEFAULT NULL
);`;

// Alter Table
export const alterTableQuery = `ALTER TABLE users ADD COLUMN phone TEXT;`;

// Drop Table
export const dropTableQuery = `DROP TABLE users;`;