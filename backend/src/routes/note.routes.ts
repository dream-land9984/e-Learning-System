import { Router } from 'express';
import { uploadNoteFile, getNotes, deleteNote } from '../controllers/note.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { uploadNote } from '../middleware/upload.middleware.js';

const router = Router();

router.get('/', authenticate, getNotes);
router.post('/upload', authenticate, authorize(['TEACHER', 'ADMIN']), uploadNote.single('note'), uploadNoteFile);
router.delete('/:id', authenticate, authorize(['TEACHER', 'ADMIN']), deleteNote);

export default router;
