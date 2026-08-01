import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

// Route Imports (Deduplicated)
import authRoutes from './routes/authRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed origins configuration
const allowedOrigins = [
  'https://begaindia-platform.vercel.app',
  'https://begaindia.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.trim().replace(/\/$/, '');

    if (
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith('.vercel.app') ||
      (process.env.CLIENT_URL && cleanOrigin === process.env.CLIENT_URL.trim().replace(/\/$/, ''))
    ) {
      return callback(null, true);
    }

    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Security & Helmet Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve Uploaded Files Statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Base Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'BEGAINDIA API Server Running' });
});

// API Routes Mounted
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/payments', paymentRoutes); // Support both singular & plural endpoint conventions
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventRoutes);

// Base Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'BEGAINDIA API is online and healthy!' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found - ${req.originalUrl}` });
});

// Global Centralized Error Middleware
app.use((err, req, res, next) => {
  console.error(`❌ Global Error: ${err.stack || err.message}`);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BEGAINDIA Server running on port ${PORT}`);
});