import { NextRequest, NextResponse } from 'next/server';

// Mock assignments data
const mockAssignments = [
  {
    id: '1',
    title: 'Physics Lab Report',
    description: 'Complete analysis of pendulum motion experiment',
    subject: 'Physics',
    class: 'Grade 11B',
    teacher: 'Prof. Brown',
    dueDate: '2024-01-25',
    dueTime: '23:59',
    points: 100,
    status: 'pending',
    attempts: 0,
    maxAttempts: 1,
    timeLimit: 120
  },
  {
    id: '2',
    title: 'Math Quiz 2',
    description: 'Quadratic equations and functions',
    subject: 'Mathematics',
    class: 'Grade 11A',
    teacher: 'Dr. Johnson',
    dueDate: '2024-01-27',
    dueTime: '14:00',
    points: 50,
    status: 'pending',
    attempts: 0,
    maxAttempts: 2,
    timeLimit: 60
  },
  {
    id: '3',
    title: 'Chemistry Quiz 1',
    description: 'Atomic structure and periodic table',
    subject: 'Chemistry',
    class: 'Grade 11B',
    teacher: 'Dr. Wilson',
    dueDate: '2024-01-20',
    dueTime: '23:59',
    points: 100,
    status: 'graded',
    submittedAt: '2024-01-19 15:30',
    grade: 92,
    maxGrade: 100,
    attempts: 1,
    maxAttempts: 1,
    timeLimit: 45
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filteredAssignments = mockAssignments;

    // Apply filters
    if (subject && subject !== 'all') {
      filteredAssignments = filteredAssignments.filter(assignment => assignment.subject === subject);
    }

    if (status && status !== 'all') {
      filteredAssignments = filteredAssignments.filter(assignment => assignment.status === status);
    }

    if (search) {
      filteredAssignments = filteredAssignments.filter(assignment => 
        assignment.title.toLowerCase().includes(search.toLowerCase()) ||
        assignment.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    const stats = {
      total: mockAssignments.length,
      pending: mockAssignments.filter(a => a.status === 'pending').length,
      submitted: mockAssignments.filter(a => a.status === 'submitted').length,
      graded: mockAssignments.filter(a => a.status === 'graded').length,
      overdue: mockAssignments.filter(a => a.status === 'overdue').length,
    };

    return NextResponse.json({
      success: true,
      data: {
        assignments: filteredAssignments,
        stats,
      },
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}
