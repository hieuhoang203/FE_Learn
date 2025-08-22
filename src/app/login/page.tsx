'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, Loader2, BookOpen, GraduationCap, Users, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Handle successful login
      console.log('Login successful', { email, password });
      router.push('/home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Educational Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Books */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          animate={{ opacity: 0.1, x: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-20 left-10"
        >
          <BookOpen className="w-24 h-24 text-green-600 dark:text-green-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 15 }}
          animate={{ opacity: 0.1, x: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute top-32 right-16"
        >
          <GraduationCap className="w-20 h-20 text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100, rotate: -10 }}
          animate={{ opacity: 0.1, y: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 0.9 }}
          className="absolute bottom-20 left-20"
        >
          <PenTool className="w-16 h-16 text-teal-600 dark:text-teal-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -100, rotate: 20 }}
          animate={{ opacity: 0.1, y: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 1.1 }}
          className="absolute bottom-32 right-10"
        >
          <Users className="w-18 h-18 text-green-500 dark:text-green-300" />
        </motion.div>

        {/* Additional decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 3, delay: 1.3 }}
          className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
          className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-200 to-green-200 dark:from-teal-800 dark:to-green-800" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:border-green-500 transition-all duration-200 ${
                      errors.email ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500' : ''
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:border-green-500 transition-all duration-200 ${
                      errors.password ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between"
              >
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-3"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </motion.div>
          </CardContent>

          <CardFooter>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-sm text-gray-600 dark:text-gray-300 w-full"
            >
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium hover:underline transition-colors"
              >
                Sign up
              </Link>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}