import React from 'react';
import Sidebar from '@/components/navigation/sidebar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userRole="student" />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
