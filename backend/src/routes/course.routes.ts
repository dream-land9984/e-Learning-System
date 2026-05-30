import { Router } from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../controllers/course.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);

router.post('/', authenticate, authorize(['TEACHER', 'ADMIN']), createCourse);
router.put('/:id', authenticate, authorize(['TEACHER', 'ADMIN']), updateCourse);
router.delete('/:id', authenticate, authorize(['TEACHER', 'ADMIN']), deleteCourse);

export default router;
