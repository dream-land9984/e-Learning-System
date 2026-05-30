import { Router } from 'express';
import { uploadVideoFile, getVideos, deleteVideo } from '../controllers/video.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { uploadVideo } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/', authenticate, getVideos);
router.post('/upload', authenticate, authorize(['TEACHER', 'ADMIN']), uploadVideo.single('video'), uploadVideoFile);
router.delete('/:id', authenticate, authorize(['TEACHER', 'ADMIN']), deleteVideo);

export default router;
