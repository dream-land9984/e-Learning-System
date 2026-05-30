'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import Link from 'next/link';
import { PlusCircle, Book, Edit, Trash2 } from 'lucide-react';

export default function CoursesPage() {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        setCourses(courses.filter(c => c.id !== id));
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
        {(user?.role === 'TEACHER' || user?.role === 'ADMIN') && (
          <Link
            href="/courses/create"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Create Course
          </Link>
        )}
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-xl bg-card">
          <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-sm text-muted-foreground mt-1">Check back later or create a new course.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-40 bg-muted flex items-center justify-center border-b">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <Book className="w-12 h-12 text-muted-foreground opacity-20" />
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-secondary text-secondary-foreground rounded uppercase tracking-wider">
                    {course.category || 'General'}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${course.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    {course.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1 leading-tight">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t">
                  <div className="text-sm font-medium">
                    {course.teacher?.first_name} {course.teacher?.last_name}
                  </div>
                  
                  {/* Actions for Teachers/Admins */}
                  {(user?.role === 'ADMIN' || (user?.role === 'TEACHER' && course.teacher_id === user?.id)) && (
                    <div className="flex gap-2">
                      <Link href={`/courses/${course.id}/edit`} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(course.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Actions for Students */}
                  {user?.role === 'STUDENT' && (
                    <Link href={`/courses/${course.id}`} className="text-sm font-medium text-primary hover:underline">
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
