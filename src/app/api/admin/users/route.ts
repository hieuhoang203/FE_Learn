import { NextRequest, NextResponse } from 'next/server';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@school.edu',
    phone: '+1234567890',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20 14:30'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1234567891',
    role: 'teacher',
    status: 'active',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-20 09:15'
  },
  {
    id: '3',
    name: 'Alice Brown',
    email: 'alice.brown@school.edu',
    role: 'student',
    status: 'active',
    createdAt: '2024-01-08',
    lastLogin: '2024-01-19 16:45'
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filteredUsers = mockUsers;

    // Apply filters
    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (status && status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        users: filteredUsers,
        total: filteredUsers.length,
        stats: {
          total: mockUsers.length,
          admin: mockUsers.filter(u => u.role === 'admin').length,
          teacher: mockUsers.filter(u => u.role === 'teacher').length,
          student: mockUsers.filter(u => u.role === 'student').length,
          active: mockUsers.filter(u => u.status === 'active').length,
        }
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, password } = body;

    // Validate required fields
    if (!name || !email || !role || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Hash the password
    // 2. Check if email already exists
    // 3. Save to database
    // 4. Send welcome email

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || null,
      role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: null,
    };

    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
