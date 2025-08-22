# Learning Management System (LMS)

A comprehensive Learning Management System built with Next.js 14, TypeScript, and Tailwind CSS. This platform supports three user roles: Admin, Teacher, and Student, each with their own dedicated dashboard and functionality.

## 🚀 Features

### Admin Features

- **Dashboard**: System overview with user statistics and activity monitoring
- **User Management**: Create, edit, and manage all system users
- **Class Management**: Oversee all classes and their configurations
- **System Analytics**: Monitor platform usage and performance
- **Role-based Access Control**: Secure access management

### Teacher Features

- **Dashboard**: Personal teaching overview with class statistics
- **Lesson Management**: Create and organize lesson content
- **Assignment Creation**: Build quizzes and assignments with multiple question types
- **Grade Management**: Review and grade student submissions
- **Student Management**: Track student progress and performance
- **Class Management**: Create and manage classes with schedules

### Student Features

- **Dashboard**: Personal learning overview with progress tracking
- **Assignment Taking**: Interactive assignment interface with timer
- **Grade Viewing**: Track academic performance and feedback
- **Class Enrollment**: View enrolled classes and schedules
- **Progress Tracking**: Monitor learning progress across subjects

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Authentication**: JWT (middleware-based)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard and pages
│   ├── teacher/           # Teacher dashboard and pages
│   ├── student/           # Student dashboard and pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── navigation/       # Navigation components
├── lib/                  # Utility functions
└── middleware.ts         # Authentication middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd learning-management-system
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication & Roles

The system uses middleware-based authentication with role-based access control:

- **Admin**: Full system access (`/admin/*`)
- **Teacher**: Teaching tools and student management (`/teacher/*`)
- **Student**: Learning interface and progress tracking (`/student/*`)

### Demo Access

- Visit `/homie` for the main landing page
- Login page: `/login`
- Registration: `/register`

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark Mode Support**: Automatic theme switching
- **Smooth Animations**: Framer Motion powered transitions
- **Accessible**: WCAG compliant components
- **Interactive Elements**: Hover effects and micro-interactions

## 🔧 Key Components

### Dashboard Components

- Statistics cards with real-time data
- Activity feeds and notifications
- Progress tracking visualizations
- Quick action buttons

### Assignment System

- Multiple question types (Multiple Choice, Short Answer, Essay, True/False)
- Timer functionality with auto-submit
- Progress saving and resume capability
- Comprehensive grading interface

### Class Management

- Schedule management with calendar integration
- Student enrollment tracking
- Resource sharing capabilities
- Performance analytics

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds

### Other Platforms

The app can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
