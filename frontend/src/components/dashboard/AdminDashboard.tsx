'use client';

import { Users, Server, ShieldCheck, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Users</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Teachers</h3>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">45</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">System Health</h3>
            <Server className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold text-green-500">99.9%</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Sessions</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">342</div>
        </div>
      </div>
    </div>
  );
}
