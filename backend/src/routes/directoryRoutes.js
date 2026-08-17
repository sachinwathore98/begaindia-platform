import express from 'express';
import { searchDirectory } from '../controllers/directoryController.js';

const router = express.Router();

// Public search endpoint
router.get('/search', searchDirectory);

export default router;