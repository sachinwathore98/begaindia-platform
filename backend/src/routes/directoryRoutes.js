// backend/src/routes/directoryRoutes.js
import express from 'express';
import { searchDirectory } from '../controllers/directoryController.js';

const router = express.Router();

// Public search endpoints:
// Matches: GET /api/directory/search?page=1&limit=12
router.get('/search', searchDirectory);

// Also matches: GET /api/directory?page=1&limit=12
router.get('/', searchDirectory);

export default router;