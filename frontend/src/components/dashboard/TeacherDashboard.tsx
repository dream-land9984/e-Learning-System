'use client';

import { Users, BookOpen, Video, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <Link href="/courses/create" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-medium">
          Create New Course
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Courses</h3>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Students</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">128</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Videos</h3>
            <Video className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Exams Created</h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">6</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="border rounded-xl bg-card">
          <div className="p-4 border-b text-sm">
            <span className="font-semibold text-primary">Alex Smith</span> enrolled in <span className="font-medium">Introduction to React</span>
          </div>
          <div className="p-4 border-b text-sm">
            <span className="font-semibold text-primary">Sarah Connor</span> completed the exam for <span className="font-medium">Advanced Node.js</span> (Score: 85%)
          </div>
          <div className="p-4 text-sm">
            <span className="font-semibold text-primary">John Doe</span> enrolled in <span className="font-medium">Advanced Node.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}
