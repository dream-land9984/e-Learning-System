import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Basic route for health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Root API URL message to prevent Cannot GET /
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px;">
      <h2 style="color: #6366f1;">LMS Platform Backend API</h2>
      <p>The backend API is running successfully on port 5000.</p>
      <p>Please visit the Frontend User Interface at: <a href="http://localhost:3000" style="color: #4f46e5; font-weight: bold; text-decoration: none;">http://localhost:3000</a></p>
    </div>
  `);
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Import routes
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import videoRoutes from './routes/video.routes.js';
import noteRoutes from './routes/note.routes.js';
import examRoutes from './routes/exam.routes.js';
import resultRoutes from './routes/result.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
