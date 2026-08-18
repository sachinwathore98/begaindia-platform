import express from 'express';
import { sendB2BInquiry, getReceivedInquiries, updateInquiryStatus } from '../controllers/b2bController.js';

const router = express.Router();

router.post('/inquiries', sendB2BInquiry);
router.get('/inquiries/received', getReceivedInquiries);
router.put('/inquiries/:id/status', updateInquiryStatus);

export default router;