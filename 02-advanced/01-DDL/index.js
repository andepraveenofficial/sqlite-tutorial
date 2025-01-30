import express from 'express'
const app = express()
const port = 5000;

/* -----> db configuration <----- */
import { initializeDB, getDB } from './config/sqlite.config.js';

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


