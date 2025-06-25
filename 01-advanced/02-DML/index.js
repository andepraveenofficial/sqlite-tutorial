import express from 'express'
const app = express()
const port = 5000;

/* -----> db configuration <----- */
import { initializeDB, getDB } from './config/sqlite.config.js';
import {userRepository} from "./repositories/index.js"

/* -----> Middlewares <-----  */
app.use(express.json());

// Initialize database first
const dbConnected = await initializeDB();

if (dbConnected) {
  // Start server only if DB connected
  app.listen(port, () => {
      console.log(`Server running on port ${port}`);
  });
}

/* -----> APIs <----- */
app.get('/health', (req, res) => {
  res.status(200).send(    
    {
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
    }
  );
})


  // Database connection test
  app.get('/test', async (req, res) => {
    try {
        const db = getDB();
        const result = await db.get('SELECT sqlite_version() AS version');
        res.json({ database: 'connected', version: result.version });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* -----> DML Operations <----- */

// Insert User
app.post('/users', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const userId = await userRepository.insert(name, email, phone);
    res.status(201).json({ message: 'User created', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const rowsAffected = await userRepository.update(id, name, email, phone);
    if (rowsAffected > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Soft Delete User by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await userRepository.softDelete(id);
    if (rowsAffected > 0) {
      res.status(200).json({ message: 'User soft deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});