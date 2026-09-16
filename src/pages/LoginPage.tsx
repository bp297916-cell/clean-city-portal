import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import {
  Building2,
  Mail,
  Lock,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  X
} from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export const LoginPage: React.FC = () => {
  const {
    loginWithCredentials,
    loginAsAdmin,
    loginAsCitizen,
    setCurrentView,
    addToast,
    language
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  const t = (key: any) => getTranslation(language, key);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      addToast(
        'Missing Credentials',
        'Please enter your registered email and password.',
        'error'
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      loginWithCredentials(email.trim(), password);
    }, 400);
  };

  // Firebase Password Reset
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = resetEmail.trim().toLowerCase();

    if (!cleanEmail) {
      addToast(
        'Email Required',
        'Please enter your registered email address.',
        'error'
      );
      return;
    }

    if (!cleanEmail.includes('@')) {
      addToast(
        'Invalid Email',
        'Please enter a valid email address.',
        'error'
      );
      return;
    }

    setIsResettingPassword(true);

    try {
      await sendPasswordResetEmail(auth, cleanEmail);

      addToast(
        'Reset Email Sent',
        'A password reset link has been sent to your registered email address. Please check your inbox and spam folder.',
        'success'
      );

      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error: any) {
      console.error('Password reset error:', error);

      if (error?.code === 'auth/user-not-found') {
        addToast(
          'Account Not Found',
          'No account is registered with this email address.',
          'error'
        );
      } else if (error?.code === 'auth/invalid-email') {
        addToast(
          'Invalid Email',
          'Please enter a valid email address.',
          'error'
        );
      } else if (error?.code === 'auth/too-many-requests') {
        addToast(
          'Too Many Attempts',
          'Too many reset requests. Please try again later.',
          'error'
        );
      } else {
        addToast(
          'Reset Failed',
          'Unable to send the password reset email. Please try again.',
          'error'
        );
      }
    } finally {
      setIsResettingPassword(false);
    }
  };

  const openForgotPassword = () => {
    setResetEmail(email.trim());
    setShowForgotPassword(true);
  };

  const closeForgotPassword = () => {
    if (isResettingPassword) return;

    setShowForgotPassword(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50">
      <div className="w-full max-w-md">

        {/* Centered Login Card */}
        <div
          id="login-card"
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 space-y-6 animate-in fade-in zoom-in-95"
        >

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-700/20 mb-3">
              <Building2 className="w-7 h-7" />
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Welcome Back
            </h1>

            <p className="text-xs text-slate-500 font-medium">
              Log in to your Clean City Portal account
            </p>
          </div>

          {/* Quick Demo Login Bar */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-2">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block text-center">
              Login As
            </span>

            <div className="grid grid-cols-2 gap-2">

              {/* Citizen */}
              <button
                id="quick-login-citizen-btn"
                type="button"
                onClick={loginAsCitizen}
                className="py-2 px-2.5 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Citizen</span>
              </button>

              {/* Admin */}
              <button
                id="quick-login-admin-btn"
                type="button"
                onClick={loginAsAdmin}
                className="py-2 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                <span>Admin</span>
              </button>

            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>

                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">

                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>

                <button
                  type="button"
                  onClick={openForgotPassword}
                  className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>

                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-10 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>

              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
              />

              <label
                htmlFor="remember-me"
                className="ml-2 block text-xs text-slate-600 select-none cursor-pointer"
              >
                Remember this device for 30 days
              </label>
            </div>

            {/* Sign In */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </span>

              {!isLoading && (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>

          </form>

          {/* Footer link to Register */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}

              <button
                id="login-goto-register-btn"
                type="button"
                onClick={() => setCurrentView('register')}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Register here
              </button>
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          FORGOT PASSWORD MODAL
         ===================================================== */}
      {showForgotPassword && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/50 backdrop-blur-sm"
          onMouseDown={closeForgotPassword}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-7 animate-in fade-in zoom-in-95"
            onMouseDown={e => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between mb-5">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Reset Password
                  </h2>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Recover your Clean City Portal account
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeForgotPassword}
                disabled={isResettingPassword}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Instructions */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl mb-5">
              <p className="text-xs text-emerald-900 leading-relaxed">
                Enter the email address registered with your account.
                We will send you a secure password reset link.
              </p>
            </div>

            {/* Reset Form */}
            <form onSubmit={handleForgotPassword} className="space-y-4">

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Email Address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>

                  <input
                    id="forgot-password-email"
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>
              </div>

              {/* Send Button */}
              <button
                id="send-password-reset-btn"
                type="submit"
                disabled={isResettingPassword}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {isResettingPassword
                    ? 'Sending Reset Link...'
                    : 'Send Reset Link'}
                </span>

                {!isResettingPassword && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>

              {/* Cancel */}
              <button
                type="button"
                onClick={closeForgotPassword}
                disabled={isResettingPassword}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>

            </form>

            {/* Security Note */}
            <div className="flex items-start gap-2 mt-5 pt-4 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />

              <p className="text-[10px] text-slate-500 leading-relaxed">
                For your security, the existing password will not be sent.
                The email contains a secure link to create a new password.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};