import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export const submitExam = async (req: AuthRequest, res: Response) => {
  try {
    const { exam_id } = req.params;
    const { answers } = req.body; // Array of { question_id, answer }

    if (!req.user || req.user.role !== 'STUDENT') {
      return res.status(403).json({ message: 'Only students can submit exams' });
    }

    const exam = await prisma.exam.findUnique({
      where: { id: exam_id },
      include: { questions: true },
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Evaluate answers
    let score = 0;
    let totalMarks = 0;

    for (const question of exam.questions) {
      totalMarks += question.marks;
      const studentAnswer = answers.find((a: any) => a.question_id === question.id);
      
      if (studentAnswer && studentAnswer.answer === question.correct_answer) {
        score += question.marks;
      }
    }

    const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
    const status = percentage >= exam.passing_mark ? 'PASS' : 'FAIL';

    const result = await prisma.result.upsert({
      where: {
        student_id_exam_id: {
          student_id: req.user.id,
          exam_id,
        },
      },
      update: {
        score,
        percentage,
        status,
      },
      create: {
        student_id: req.user.id,
        exam_id,
        score,
        percentage,
        status,
      },
    });

    res.status(200).json({ message: 'Exam submitted successfully', result });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getResults = async (req: AuthRequest, res: Response) => {
  try {
    const { exam_id } = req.query;

    const whereClause: any = {};
    if (exam_id) whereClause.exam_id = String(exam_id);
    
    // Students can only see their own results
    if (req.user?.role === 'STUDENT') {
      whereClause.student_id = req.user.id;
    }

    const results = await prisma.result.findMany({
      where: whereClause,
      include: {
        exam: { select: { title: true, course: { select: { title: true } } } },
        student: { select: { first_name: true, last_name: true, email: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
