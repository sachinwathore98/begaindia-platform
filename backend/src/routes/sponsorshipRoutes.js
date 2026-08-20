import express from 'express';
import { submitSponsorshipPledge, getDonorRoll } from '../controllers/sponsorshipController.js';

const router = express.Router();

router.post('/pledge', submitSponsorshipPledge);
router.get('/donor-roll', getDonorRoll);

export default router;