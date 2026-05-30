'use client';

import { Book, Clock, Trophy, PlayCircle } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Enrolled Courses</h3>
            <Book className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">4</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Hours Learned</h3>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">24.5</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Exams Passed</h3>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">2</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Continue Learning</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-xl p-4 flex gap-4 items-center bg-card hover:bg-accent cursor-pointer transition-colors">
            <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
              <PlayCircle className="text-primary h-8 w-8" />
            </div>
            <div>
              <h4 className="font-semibold">Introduction to React</h4>
              <p className="text-sm text-muted-foreground">Frontend Development • 60% complete</p>
            </div>
          </div>
          <div className="border rounded-xl p-4 flex gap-4 items-center bg-card hover:bg-accent cursor-pointer transition-colors">
            <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
              <PlayCircle className="text-primary h-8 w-8" />
            </div>
            <div>
              <h4 className="font-semibold">Advanced Node.js</h4>
              <p className="text-sm text-muted-foreground">Backend Development • 15% complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
