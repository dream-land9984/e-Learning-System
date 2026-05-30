import { Router } from 'express';
import { createExam, getExams, addQuestion, deleteExam } from '../controllers/exam.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getExams);
router.post('/', authenticate, authorize(['TEACHER', 'ADMIN']), createExam);
router.post('/:exam_id/questions', authenticate, authorize(['TEACHER', 'ADMIN']), addQuestion);
router.delete('/:id', authenticate, authorize(['TEACHER', 'ADMIN']), deleteExam);

export default router;
