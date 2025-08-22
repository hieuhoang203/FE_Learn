// Environment configuration
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
} as const;

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
