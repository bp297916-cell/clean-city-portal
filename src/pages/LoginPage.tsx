import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Building2, Mail, Lock, ShieldCheck, UserCheck, ArrowRight, Check } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { 
    loginWithCredentials, 
    loginAsAdmin, 
    loginAsCitizen, 
    setCurrentView, 
    addToast, 
    language 
  } = useApp();

  const [email, setEmail] = useState('dhanrajpatil8141@gmail.com');
  const [password, setPassword] = useState('CleanCity@2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const t = (key: any) => getTranslation(language, key);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      addToast('Missing Credentials', 'Please enter your registered email and password.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginWithCredentials(email, password);
    }, 400);
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
              Quick One-Click Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="quick-login-citizen-btn"
                type="button"
                onClick={loginAsCitizen}
                className="py-2 px-2.5 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Citizen Demo</span>
              </button>
              <button
                id="quick-login-admin-btn"
                type="button"
                onClick={loginAsAdmin}
                className="py-2 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => addToast('Password Reset', 'Password recovery instructions sent to your registered email.', 'info')}
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
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 select-none cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
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
    </div>
  );
};
