'use client';
// Refreshed dashboard imports

import { useAuthStore } from '@/store/useAuthStore';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <DashboardLayout>
      {user.role === 'STUDENT' && <StudentDashboard />}
      {user.role === 'TEACHER' && <TeacherDashboard />}
      {user.role === 'ADMIN' && <AdminDashboard />}
    </DashboardLayout>
  );
}
