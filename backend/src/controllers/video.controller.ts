import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export const uploadVideoFile = async (req: AuthRequest, res: Response) => {
  try {
    const { course_id, title, description, duration } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No video file provided' });
    }

    const video_url = `/uploads/videos/${req.file.filename}`;

    const video = await prisma.video.create({
      data: {
        course_id,
        title,
        description,
        video_url,
        duration: duration ? parseInt(duration) : null,
      },
    });

    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.query;

    const whereClause = course_id ? { course_id: String(course_id) } : {};

    const videos = await prisma.video.findMany({
      where: whereClause,
      orderBy: { upload_date: 'asc' },
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteVideo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const video = await prisma.video.findUnique({ where: { id }, include: { course: true } });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.course.teacher_id !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    // In a real app, also delete the file from disk using fs.unlink
    await prisma.video.delete({ where: { id } });

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
