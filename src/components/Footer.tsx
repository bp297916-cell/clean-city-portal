import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Building2, PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setCurrentView, setActiveTab, currentUser } = useApp();
  const t = (key: any) => getTranslation(language, key);

  return (
    <footer id="main-portal-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Portal Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-display tracking-tight">
                  CLEAN CITY PORTAL
                </span>
                <p className="text-[11px] text-emerald-400 font-medium">Smart Governance Grievance Redressal</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering citizens to report municipal infrastructure grievances and enabling municipal authorities to resolve civic issues with speed, transparency, and accountability.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Smart City Initiative</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation & Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setCurrentView('home')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('about')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('footerAbout')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('features')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('navFeatures')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (currentUser) {
                      setCurrentView('citizen-dashboard');
                      setActiveTab('track');
                    } else {
                      setCurrentView('track');
                    }
                  }} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Track Complaint Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (currentUser) {
                      setCurrentView('citizen-dashboard');
                      setActiveTab('new-complaint');
                    } else {
                      setCurrentView('login');
                    }
                  }} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-semibold"
                >
                  + File New Complaint
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Civic Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Report Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Garbage & Sanitation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Road Damage & Potholes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Water Supply & Pipe Bursts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Drainage & Stormwater</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Street Lighting & Electrical</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Other Civic Inconveniences</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Contacts & Helpline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">24x7 Helpdesk</h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <PhoneCall className="w-4 h-4" />
                <span>1800-123-CLEAN (25326)</span>
              </div>
              <p className="text-[11px] text-slate-400">Toll-free 24x7 Citizens Redressal Helpline</p>
              
              <div className="pt-2 border-t border-slate-700/60 flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">helpdesk@smartcity.gov.in</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Central Municipal HQ, Civil Lines, Sector 5</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            {t('footerCopyright')}
          </p>
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setCurrentView('about')} 
              className="hover:text-emerald-400 transition-colors"
            >
              {t('footerAbout')}
            </button>
            <button 
              onClick={() => {
                alert('Privacy Policy: All citizen complaint records and uploaded photographic evidence are securely stored and utilized exclusively for municipal grievance redressal.');
              }} 
              className="hover:text-emerald-400 transition-colors"
            >
              {t('footerPrivacy')}
            </button>
            <button 
              onClick={() => setCurrentView('contact')} 
              className="hover:text-emerald-400 transition-colors"
            >
              {t('footerEmergency')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
