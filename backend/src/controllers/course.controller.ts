import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export const createCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, category, thumbnail, duration } = req.body;
    
    if (!req.user || req.user.role !== 'TEACHER') {
      return res.status(403).json({ message: 'Only teachers can create courses' });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        thumbnail,
        duration,
        teacher_id: req.user.id,
      },
    });

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          select: { first_name: true, last_name: true },
        },
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          select: { first_name: true, last_name: true },
        },
        videos: true,
        notes: true,
      },
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, thumbnail, duration, status } = req.body;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacher_id !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { title, description, category, thumbnail, duration, status },
    });

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacher_id !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await prisma.course.delete({ where: { id } });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
