'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditCoursePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        const course = response.data;
        setFormData({
          title: course.title || '',
          description: course.description || '',
          category: course.category || '',
          duration: course.duration ? String(course.duration) : '',
        });
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (user?.role === 'STUDENT') {
    return <div className="p-8 text-center font-semibold text-destructive">Access Denied</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const payload = {
        ...formData,
        duration: formData.duration ? parseInt(formData.duration) : null,
      };
      await api.put(`/courses/${id}`, payload);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/courses/${id}`);
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update course');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link href={`/courses/${id}`} className="p-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Edit Course</h1>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          {error && (
            <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-md bg-green-500/10 text-green-500 text-sm font-medium">
              Course updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                className="w-full min-h-[120px] p-3 rounded-md border bg-background text-sm resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  className="w-full h-10 px-3 rounded-md border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="e.g. 10"
                />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <Link
                href={`/courses/${id}`}
                className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
