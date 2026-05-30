'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';
import { useAuthStore } from '../../../store/useAuthStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateCoursePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user?.role === 'STUDENT') {
    return <div className="p-8">Access Denied</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        duration: formData.duration ? parseInt(formData.duration) : null,
      };
      const response = await api.post('/courses', payload);
      router.push(`/courses/${response.data.course.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create course');
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/courses" className="p-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Create New Course</h1>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          {error && (
            <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                placeholder="e.g. Advanced TypeScript"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full min-h-[120px] p-3 rounded-md border bg-background text-sm resize-y"
                placeholder="Describe what this course covers..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (Hours)</label>
                <input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                  placeholder="e.g. 10"
                />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <Link
                href="/courses"
                className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
