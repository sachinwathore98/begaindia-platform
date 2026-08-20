import express from 'express';
import { getStallGrid, bookStall, registerVisitorPass } from '../controllers/expoController.js';

const router = express.Router();

router.get('/stalls', getStallGrid);
router.post('/stalls/book', bookStall);
router.post('/passes/register', registerVisitorPass);

export default router;