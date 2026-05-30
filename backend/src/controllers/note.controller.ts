import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export const uploadNoteFile = async (req: AuthRequest, res: Response) => {
  try {
    const { course_id, title } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No note file provided' });
    }

    const file_url = `/uploads/notes/${req.file.filename}`;

    const note = await prisma.note.create({
      data: {
        course_id,
        title,
        file_url,
      },
    });

    res.status(201).json({ message: 'Note uploaded successfully', note });
  } catch (error) {
    console.error('Error uploading note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.query;

    const whereClause = course_id ? { course_id: String(course_id) } : {};

    const notes = await prisma.note.findMany({
      where: whereClause,
      orderBy: { uploaded_at: 'asc' },
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findUnique({ where: { id }, include: { course: true } });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.course.teacher_id !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    await prisma.note.delete({ where: { id } });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
