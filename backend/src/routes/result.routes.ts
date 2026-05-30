import { Router } from 'express';
import { submitExam, getResults } from '../controllers/result.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getResults);
router.post('/:exam_id/submit', authenticate, submitExam);

export default router;
