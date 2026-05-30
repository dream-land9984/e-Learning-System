import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const uploadDir = 'uploads';
const videosDir = path.join(uploadDir, 'videos');
const notesDir = path.join(uploadDir, 'notes');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir);
if (!fs.existsSync(notesDir)) fs.mkdirSync(notesDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') {
      cb(null, videosDir);
    } else if (file.fieldname === 'note') {
      cb(null, notesDir);
    } else {
      cb(null, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit for videos
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Not a video file'));
    }
  },
});

export const uploadNote = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit for notes
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/msword'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF or DOCX files are allowed'));
    }
  },
});
