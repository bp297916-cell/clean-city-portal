import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, User, Mail, Phone, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerCitizen, setCurrentView, addToast } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full legal name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    const cleanedPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!formData.termsAccepted) {
      errs.terms = 'You must agree to the Municipal Citizen Charter terms';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Invalid Form Submission', 'Please correct the highlighted errors in the form.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      registerCitizen({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      });
    }, 500);
  };

  const handleQuickFill = () => {
    setFormData({
      fullName: 'Sunil Verma',
      email: 'sunil.verma@example.com',
      phone: '+91 98765 43210',
      password: 'CleanCity@2026',
      confirmPassword: 'CleanCity@2026',
      termsAccepted: true
    });
    setErrors({});
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50">
      <div className="w-full max-w-lg">
        
        {/* Centered Registration Card */}
        <div 
          id="registration-card"
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 space-y-6 animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-700/20 mb-3">
              <Building2 className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Create Citizen Account
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Join Clean City Portal to report civic issues
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
            >
              Fill Sample Citizen Info
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="register-fullname"
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sunil Verma"
                  className={`w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border ${
                    errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  } focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600`}
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="register-email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sunil.verma@example.com"
                  className={`w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  } focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="register-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border ${
                    errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  } focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600`}
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
            </div>

            {/* Password and Confirm Password in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="register-password"
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 6 chars"
                    className={`w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border ${
                      errors.password ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                    } focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600`}
                  />
                </div>
                {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="register-confirm-password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className={`w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border ${
                      errors.confirmPassword ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                    } focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-[11px] text-red-600 mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <div className="flex items-start">
                <input
                  id="register-terms"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded mt-0.5 cursor-pointer"
                />
                <label htmlFor="register-terms" className="ml-2 block text-xs text-slate-600 leading-normal cursor-pointer">
                  I agree to provide truthful civic grievance details and accept the Municipal Citizen Charter terms.
                </label>
              </div>
              {errors.terms && <p className="text-[11px] text-red-600 mt-1">{errors.terms}</p>}
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Register Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Below link */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already registered?{' '}
              <button
                id="register-goto-signin-btn"
                type="button"
                onClick={() => setCurrentView('login')}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
