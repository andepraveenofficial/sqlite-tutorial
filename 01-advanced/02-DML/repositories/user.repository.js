import { getDB } from '../config/sqlite.config.js';

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


/* -----> DML <----- */


// 1. Insert User
export const insert = async (name, email, phone) => {
  const db = getDB();
  const params = [name, email, phone];
  const query = `INSERT INTO users (name, email, phone) VALUES (?, ?, ?)`;
  
  try {
    const result = await db.run(query, params);
    return result.lastID; // Return the last inserted ID
  } catch (error) {
    throw new Error(`Error inserting user: ${error.message}`);
  }
};

// 2. Update User by ID
export const update = async (id, name, email, phone) => {
  const db = getDB();
  const params = [name, email, phone, id];
  const query = `UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?`;

  try {
    const result = await db.run(query, params);
    return result.changes; // Return number of rows affected
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// 3. Delete User by ID
export const softDelete = async (id) => {
  const db = getDB();
  const currentDate = new Date();
  const params = [currentDate, id];
  const query = `UPDATE users SET deletedAt = ? WHERE id = ?`;

  try {
    const result = await db.run(query, params);
    return result.changes; // Return number of rows affected
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
