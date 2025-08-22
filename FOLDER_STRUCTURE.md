# Cấu trúc Folder của Dự án Next.js

## Tổng quan
Dự án này được tổ chức theo chuẩn Next.js 13+ với App Router và TypeScript.

## Cấu trúc thư mục

```
fe_learn_tl/
├── public/                     # Static files
│   ├── images/
│   └── icons/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin routes
│   │   │   ├── dashboard/
│   │   │   ├── class/
│   │   │   ├── subject/
│   │   │   └── teacher/
│   │   ├── home/              # Home page
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   ├── user/              # User routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── auth/             # Authentication components
│   │   ├── admin/            # Admin-specific components
│   │   ├── layout/           # Layout components
│   │   └── common/           # Common components
│   ├── context/              # React Context providers
│   │   └── AuthContext.tsx   # Authentication context
│   ├── hooks/                # Custom React hooks
│   │   └── index.ts          # Hook exports
│   ├── services/             # API service functions
│   │   ├── api.ts            # Base API service
│   │   └── auth.ts           # Authentication services
│   ├── store/                # State management
│   │   └── index.ts          # Global store
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Common types
│   ├── constants/            # Application constants
│   │   └── index.ts          # Constants export
│   ├── utils/                # Utility functions
│   │   ├── auth.ts           # Auth utilities
│   │   └── validation.ts     # Validation utilities
│   ├── config/               # Configuration files
│   │   ├── env.ts            # Environment config
│   │   └── database.ts       # Database config
│   └── lib/                  # External library configurations
│       └── utils.ts          # Utility functions
├── middleware.ts             # Next.js middleware
├── .env.example             # Environment variables example
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Mô tả các thư mục

### `/src/app`
- **Mục đích**: Next.js App Router - định nghĩa routes và pages
- **Quy tắc**: Mỗi folder tương ứng với một route
- **File quan trọng**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

### `/src/components`
- **Mục đích**: Chứa tất cả React components
- **Cấu trúc**:
  - `ui/`: Components UI tái sử dụng (buttons, inputs, modals)
  - `auth/`: Components liên quan đến authentication
  - `admin/`: Components dành riêng cho admin
  - `layout/`: Components layout (Header, Sidebar, Footer)
  - `common/`: Components dùng chung

### `/src/context`
- **Mục đích**: React Context providers cho state management
- **Ví dụ**: AuthContext, ThemeContext

### `/src/hooks`
- **Mục đích**: Custom React hooks
- **Ví dụ**: useAuth, useLocalStorage, useApi

### `/src/services`
- **Mục đích**: API calls và external services
- **Cấu trúc**: Mỗi service một file riêng

### `/src/store`
- **Mục đích**: Global state management (Zustand/Redux)
- **Sử dụng**: Cho state phức tạp cần share giữa nhiều components

### `/src/types`
- **Mục đích**: TypeScript type definitions
- **Quy tắc**: Định nghĩa types cho toàn bộ ứng dụng

### `/src/constants`
- **Mục đích**: Hằng số của ứng dụng
- **Ví dụ**: API endpoints, routes, user roles

### `/src/utils`
- **Mục đích**: Utility functions
- **Ví dụ**: Validation, formatting, helper functions

### `/src/config`
- **Mục đích**: Configuration files
- **Ví dụ**: Environment config, database config

## Best Practices

1. **Import paths**: Sử dụng absolute imports với `@/` prefix
2. **Component naming**: PascalCase cho components
3. **File naming**: camelCase cho utilities, kebab-case cho pages
4. **Type definitions**: Tập trung trong `/types` folder
5. **Constants**: Sử dụng `as const` cho type safety

## Quy tắc đặt tên

- **Components**: PascalCase (VD: `UserProfile.tsx`)
- **Hooks**: camelCase với prefix "use" (VD: `useAuth.ts`)
- **Services**: camelCase (VD: `authService.ts`)
- **Types**: PascalCase (VD: `User`, `ApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (VD: `API_ENDPOINTS`)

## Environment Variables

Tham khảo file `.env.example` để biết các biến môi trường cần thiết.
