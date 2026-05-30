import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export const createExam = async (req: AuthRequest, res: Response) => {
  try {
    const { course_id, title, duration, passing_mark, start_date, end_date } = req.body;

    const course = await prisma.course.findUnique({ where: { id: course_id } });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacher_id !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to create exams for this course' });
    }

    const exam = await prisma.exam.create({
      data: {
        course_id,
        title,
        duration: parseInt(duration),
        passing_mark: parseInt(passing_mark),
        start_date: start_date ? new Date(start_date) : null,
        end_date: end_date ? new Date(end_date) : null,
      },
    });

    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getExams = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.query;

    const whereClause = course_id ? { course_id: String(course_id) } : {};

    const exams = await prisma.exam.findMany({
      where: whereClause,
      include: {
        questions: true,
      },
      orderBy: { created_at: 'desc' },
    });

    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const { exam_id } = req.params;
    const { question_text, question_type, marks, options, correct_answer } = req.body;

    const exam = await prisma.exam.findUnique({ where: { id: exam_id }, include: { course: true } });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (exam.course.teacher_id !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to add questions to this exam' });
    }

    const question = await prisma.question.create({
      data: {
        exam_id,
        question_text,
        question_type,
        marks: parseInt(marks),
        options: options || null,
        correct_answer: correct_answer || null,
      },
    });

    res.status(201).json({ message: 'Question added successfully', question });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteExam = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const exam = await prisma.exam.findUnique({ where: { id }, include: { course: true } });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (exam.course.teacher_id !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this exam' });
    }

    await prisma.exam.delete({ where: { id } });

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
