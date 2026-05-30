import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { BookOpen, LogOut, LayoutDashboard, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
            <BookOpen className="h-6 w-6" />
            <span>LMS Hub</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground text-sm font-medium">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/courses" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            Courses
          </Link>
          {user.role === 'ADMIN' && (
            <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground text-sm font-medium">
              <Settings className="h-4 w-4" />
              Manage Users
            </Link>
          )}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.first_name.charAt(0)}{user.last_name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium">{user.first_name} {user.last_name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 px-3 py-2 rounded-md text-destructive hover:bg-destructive/10 text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b h-16 flex items-center px-8">
          <h2 className="text-lg font-semibold">Welcome back, {user.first_name}</h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
