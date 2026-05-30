'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'STUDENT',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      setAuth(response.data.user, response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 py-12">
      <div className="w-full max-w-md bg-card border rounded-xl shadow-sm p-8">
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Join our LMS platform today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full h-10 px-3 rounded-md border bg-background text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full h-10 px-3 rounded-md border bg-background text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="w-full h-10 px-3 rounded-md border bg-background text-sm"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              {/* Note: Admin creation should usually be restricted, but included for demo purposes */}
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
