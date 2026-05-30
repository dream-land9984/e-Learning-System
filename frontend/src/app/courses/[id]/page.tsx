'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';
import { useAuthStore } from '../../../store/useAuthStore';
import { useParams } from 'next/navigation';
import { PlayCircle, FileText, Upload, PlusCircle, Video } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [course, setCourse] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const [courseRes, examsRes] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get(`/exams?course_id=${id}`)
      ]);
      setCourse(courseRes.data);
      setExams(examsRes.data);
    } catch (error) {
      console.error('Failed to fetch course details:', error);
    } finally {
      setLoading(false);
    }
  };

  const isTeacherOrAdmin = user?.role === 'ADMIN' || (user?.role === 'TEACHER' && course?.teacher_id === user?.id);

  if (loading) return <DashboardLayout><div className="p-8">Loading...</div></DashboardLayout>;
  if (!course) return <DashboardLayout><div className="p-8">Course not found</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="bg-card border rounded-xl overflow-hidden mb-8">
        <div className="h-48 bg-muted flex items-center justify-center border-b">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl font-bold text-muted-foreground opacity-30">{course.title.substring(0, 2).toUpperCase()}</div>
          )}
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-semibold px-2 py-1 bg-secondary text-secondary-foreground rounded uppercase tracking-wider mb-3 inline-block">
                {course.category || 'General'}
              </span>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
            {isTeacherOrAdmin && (
              <div className="flex gap-2">
                <Link href={`/courses/${id}/exam/create`} className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-medium flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Create Exam
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Videos Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Video Lessons
            </h2>
            {isTeacherOrAdmin && (
              <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                <Upload className="w-4 h-4" /> Upload Video
              </button>
            )}
          </div>
          
          <div className="bg-card border rounded-xl p-4 space-y-3">
            {course.videos?.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground text-sm">
                No videos available for this course.
              </div>
            ) : (
              course.videos?.map((video: any) => (
                <div key={video.id} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer border">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{video.title}</h4>
                    <p className="text-xs text-muted-foreground">{video.duration ? `${video.duration} min` : 'Video Lesson'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Course Notes
            </h2>
            {isTeacherOrAdmin && (
              <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                <Upload className="w-4 h-4" /> Upload Note
              </button>
            )}
          </div>
          
          <div className="bg-card border rounded-xl p-4 space-y-3">
            {course.notes?.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground text-sm">
                No notes available for this course.
              </div>
            ) : (
              course.notes?.map((note: any) => (
                <a key={note.id} href={`http://localhost:5000${note.file_url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors border">
                  <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{note.title}</h4>
                    <p className="text-xs text-muted-foreground">PDF Document</p>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Exams Section */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Exams & Assessments
          </h2>
        </div>
        
        <div className="bg-card border rounded-xl p-4 space-y-3">
          {exams.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground text-sm">
              No exams available for this course.
            </div>
          ) : (
            exams.map((exam: any) => (
              <div key={exam.id} className="flex items-center gap-4 p-4 hover:bg-muted rounded-lg transition-colors border">
                <div className="w-12 h-12 bg-destructive/10 rounded flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{exam.title}</h4>
                  <p className="text-sm text-muted-foreground">Duration: {exam.duration} mins • Pass mark: {exam.passing_mark}%</p>
                </div>
                {user?.role === 'STUDENT' && (
                  <Link href={`/exams/${exam.id}`} className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-medium">
                    Take Exam
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
