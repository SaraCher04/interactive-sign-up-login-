/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Lock, 
  Facebook, 
  Twitter,
  LayoutDashboard
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from './lib/utils';

// --- Schemas ---

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

// --- Components ---

const SocialIcons = () => (
  <div className="flex gap-4 justify-center my-6">
    <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
      <Facebook size={18} className="text-slate-600" />
    </button>
    <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-600">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.74-4.01-8.74-8.91s3.9-8.91 8.74-8.91c2.76 0 4.6 1.17 5.66 2.18l2.59-2.49c-1.66-1.55-3.82-2.5-8.25-2.5-6.72 0-12.21 5.49-12.21 12.21s5.49 12.21 12.21 12.21c7.01 0 11.67-4.93 11.67-11.89 0-.81-.08-1.41-.2-2.01h-11.47z"/>
      </svg>
    </button>
    <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
      <Twitter size={18} className="text-slate-600" />
    </button>
  </div>
);

export default function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login:', data);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    console.log('Register:', data);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#38B2AC]/5 -skew-x-12 transform origin-top translate-x-20" />
      </div>

      <div className="w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden relative flex">
        
        {/* Sign Up Container */}
        <div className={cn(
          "w-1/2 h-full p-12 transition-all duration-700 flex flex-col justify-center",
          isSignUp ? "translate-x-full opacity-100 z-20" : "opacity-0 z-10"
        )}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="text-center">
            <h1 className="text-4xl font-display font-black text-[#38B2AC] mb-2">Create Account</h1>
            <SocialIcons />
            <p className="text-slate-400 text-xs mb-8">or use your email for registration:</p>
            
            <div className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...registerForm.register('name')} placeholder="Name" className="auth-input" />
              </div>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...registerForm.register('email')} placeholder="Email" className="auth-input" />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...registerForm.register('password')} type="password" placeholder="Password" className="auth-input" />
              </div>
              <button type="submit" disabled={isLoading} className="submit-btn mt-6">
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>

        {/* Sign In Container */}
        <div className={cn(
          "w-1/2 h-full p-12 transition-all duration-700 flex flex-col justify-center",
          isSignUp ? "translate-x-full opacity-0 z-10" : "opacity-100 z-20"
        )}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="text-center">
            <h1 className="text-4xl font-display font-black text-[#38B2AC] mb-2">Sign in to Aura</h1>
            <SocialIcons />
            <p className="text-slate-400 text-xs mb-8">or use your account:</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...loginForm.register('email')} placeholder="Email" className="auth-input" />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...loginForm.register('password')} type="password" placeholder="Password" className="auth-input" />
              </div>
              <button type="button" className="text-sm text-slate-500 hover:underline">Forgot your password?</button>
              <div className="pt-4">
                <button type="submit" disabled={isLoading} className="submit-btn">
                  {isLoading ? "Loading..." : "Sign In"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Overlay Container */}
        <motion.div 
          initial={false}
          animate={{ x: isSignUp ? '-100%' : '0%' }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="absolute left-1/2 top-0 w-1/2 h-full bg-[#38B2AC] skew-x-[-1.5deg] z-50 overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#38B2AC] to-[#2D3748]/10" />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center p-12 text-white skew-x-[1.5deg]">
            
            <div className="absolute top-10 left-10 flex items-center gap-2">
              <LayoutDashboard size={24} />
              <span className="font-display font-bold">Diprella</span>
            </div>

            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.div
                  key="up"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-4xl font-display font-black mb-4">Welcome Back!</h2>
                  <p className="text-sm opacity-80 mb-10 max-w-[280px]">To keep connected with us please login with your personal info</p>
                  <button onClick={() => setIsSignUp(false)} className="panel-btn">Sign In</button>
                </motion.div>
              ) : (
                <motion.div
                  key="in"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-4xl font-display font-black mb-4">Hello, Friend!</h2>
                  <p className="text-sm opacity-80 mb-10 max-w-[280px]">Enter your personal details and start journey with us</p>
                  <button onClick={() => setIsSignUp(true)} className="panel-btn">Sign Up</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background floating shapes */}
            <div className="absolute top-1/4 right-[-10%] w-32 h-32 bg-white/10 rounded-2xl rotate-45 pointer-events-none" />
            <div className="absolute bottom-1/4 left-[-10%] w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
