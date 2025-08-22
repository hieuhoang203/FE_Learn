'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, Loader2, BookOpen, GraduationCap, Users, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Educational Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-gray-600">
                We've sent a password reset link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-green-600 hover:text-green-700 font-medium hover:underline"
                >
                  try again
                </button>
              </p>
              <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Educational Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 ${
                      error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  asChild
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
