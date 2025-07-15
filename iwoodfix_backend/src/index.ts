import express from 'express';
import path from 'path';
import customerRoutes from './routes/customer.routes';
import pool from './config/db';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', customerRoutes);

// 👇 Serve the form.html file
app.use(express.static(path.join(__dirname, '..', 'public')));

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL successfully!');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
