import { NextRequest, NextResponse } from 'next/server';

// Mock data for teacher dashboard
const mockTeacherStats = {
  totalClasses: 5,
  totalStudents: 127,
  totalLessons: 23,
  pendingGrades: 8,
};

const mockRecentSubmissions = [
  { 
    id: 1, 
    student: 'Alice Johnson', 
    assignment: 'Math Quiz 1', 
    submittedAt: '2 hours ago', 
    status: 'pending' 
  },
  { 
    id: 2, 
    student: 'Bob Smith', 
    assignment: 'Physics Lab Report', 
    submittedAt: '4 hours ago', 
    status: 'pending' 
  },
  { 
    id: 3, 
    student: 'Carol Davis', 
    assignment: 'Chemistry Homework', 
    submittedAt: '1 day ago', 
    status: 'graded' 
  },
];

const mockUpcomingClasses = [
  { 
    id: 1, 
    subject: 'Mathematics', 
    class: 'Grade 10A', 
    time: '09:00 AM', 
    date: 'Today' 
  },
  { 
    id: 2, 
    subject: 'Physics', 
    class: 'Grade 11B', 
    time: '11:00 AM', 
    date: 'Today' 
  },
  { 
    id: 3, 
    subject: 'Chemistry', 
    class: 'Grade 12A', 
    time: '02:00 PM', 
    date: 'Tomorrow' 
  },
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would:
    // 1. Verify the user's authentication token
    // 2. Check if the user has teacher role
    // 3. Fetch data from database based on teacher ID
    
    const dashboardData = {
      stats: mockTeacherStats,
      recentSubmissions: mockRecentSubmissions,
      upcomingClasses: mockUpcomingClasses,
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error('Error fetching teacher dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
