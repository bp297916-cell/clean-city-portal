import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-notifications-container" 
      className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
        let borderClass = 'border-emerald-200 bg-emerald-50/95 text-emerald-950';
        let badgeColor = 'bg-emerald-600';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
          borderClass = 'border-red-200 bg-red-50/95 text-red-950';
          badgeColor = 'bg-red-600';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
          borderClass = 'border-amber-200 bg-amber-50/95 text-amber-950';
          badgeColor = 'bg-amber-500';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;
          borderClass = 'border-blue-200 bg-blue-50/95 text-blue-950';
          badgeColor = 'bg-blue-600';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${borderClass}`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${badgeColor}`}></span>
                <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
              </div>
              <p className="text-xs mt-0.5 opacity-90 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              id={`toast-close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
