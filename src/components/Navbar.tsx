import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Language } from '../types';
import { 
  Building2, 
  Globe2, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X, 
  FileText, 
  PlusCircle, 
  Compass,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentView, 
    language, 
    setCurrentView, 
    setLanguage, 
    logout, 
    setActiveTab,
    loginAsAdmin,
    loginAsCitizen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const t = (key: any) => getTranslation(language, key);

  const handleNavClick = (view: any) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languagesList: { code: Language; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Default' },
    { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
    { code: 'gu', label: 'ગુજરાતી', sub: 'Gujarati' }
  ];

  const currentLangLabel = languagesList.find(l => l.code === language)?.label || 'English';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
      {/* Top micro-bar for Government Smart City notice */}
      <div className="bg-emerald-800 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">Official Smart Governance Grievance Redressal Portal</span>
            <span className="sm:hidden">Govt Smart City Portal</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-emerald-100">
            <span className="hidden md:inline">24x7 Citizen Helpline: <strong>1800-123-CLEAN</strong></span>
            {currentUser?.role === 'admin' ? (
              <span className="bg-emerald-700 text-white px-2 py-0.5 rounded font-mono text-[10px] tracking-wide uppercase">
                Admin Mode Active
              </span>
            ) : (
              <button 
                id="quick-demo-admin-pill"
                onClick={loginAsAdmin} 
                className="hover:text-white underline decoration-emerald-400 cursor-pointer font-medium"
                title="Switch to Municipal Admin view to review & assign complaints"
              >
                Switch to Admin Demo
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Portal Identity */}
          <div 
            id="nav-logo-brand" 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:bg-emerald-800 transition-all duration-200">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-display">
                  CLEAN CITY PORTAL
                </span>
                <span className="hidden lg:inline-flex text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Govt Initiative
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-tight">
                {t('portalSubtitle')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              {t('navHome')}
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'about'
                  ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              {t('navAbout')}
            </button>
            <button
              id="nav-link-features"
              onClick={() => handleNavClick('features')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'features'
                  ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              {t('navFeatures')}
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'contact'
                  ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              {t('navContact')}
            </button>

            {/* Quick Track link */}
            <button
              id="nav-link-track"
              onClick={() => {
                if (currentUser) {
                  setCurrentView('citizen-dashboard');
                  setActiveTab('track');
                } else {
                  setCurrentView('track');
                }
              }}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Track</span>
            </button>
          </nav>

          {/* Right Action Area: Language & Auth */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-dropdown-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>{currentLangLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div 
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language
                  </div>
                  {languagesList.map(lang => (
                    <button
                      key={lang.code}
                      id={`lang-option-${lang.code}`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                        language === lang.code ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-xs text-slate-400">{lang.sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authenticated vs Guest Controls */}
            {currentUser ? (
              <div className="relative flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <button
                    id="nav-admin-dashboard-btn"
                    onClick={() => handleNavClick('admin-dashboard')}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-200" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button
                    id="nav-new-complaint-btn"
                    onClick={() => {
                      setCurrentView('citizen-dashboard');
                      setActiveTab('new-complaint');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-emerald-200" />
                    <span>+ New Complaint</span>
                  </button>
                )}

                {/* Citizen Name & Profile dropdown */}
                <div className="relative">
                  <button
                    id="user-profile-menu-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs overflow-hidden">
                      {currentUser.avatarUrl ? (
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        currentUser.name.charAt(0)
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 max-w-[120px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div 
                      id="user-dropdown-menu"
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in"
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {currentUser.role === 'admin' ? 'Municipal Officer' : 'Citizen'}
                        </span>
                      </div>

                      {currentUser.role === 'citizen' ? (
                        <>
                          <button
                            id="menu-citizen-dashboard"
                            onClick={() => {
                              setCurrentView('citizen-dashboard');
                              setActiveTab('overview');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                          >
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <span>My Dashboard</span>
                          </button>
                          <button
                            id="menu-citizen-profile"
                            onClick={() => {
                              setCurrentView('citizen-dashboard');
                              setActiveTab('profile');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                          >
                            <UserIcon className="w-4 h-4 text-emerald-600" />
                            <span>Profile & Settings</span>
                          </button>
                        </>
                      ) : (
                        <button
                          id="menu-admin-overview"
                          onClick={() => {
                            setCurrentView('admin-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Admin Control Center</span>
                        </button>
                      )}

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        id="nav-logout-btn"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>{t('navLogout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                >
                  {t('navLogin')}
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => handleNavClick('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  {t('navRegister')}
                </button>
              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-language-toggle"
              onClick={() => {
                const nextLang: Language = language === 'en' ? 'hi' : language === 'hi' ? 'gu' : 'en';
                setLanguage(nextLang);
              }}
              className="p-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              {language.toUpperCase()}
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${currentView === 'home' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700'}`}
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${currentView === 'about' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700'}`}
            >
              {t('navAbout')}
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${currentView === 'features' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700'}`}
            >
              {t('navFeatures')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2.5 rounded-lg font-medium text-sm ${currentView === 'contact' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700'}`}
            >
              {t('navContact')}
            </button>
            <button
              onClick={() => {
                if (currentUser) {
                  setCurrentView('citizen-dashboard');
                  setActiveTab('track');
                } else {
                  setCurrentView('track');
                }
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-lg font-medium text-sm text-slate-700 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Track Complaint</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="px-3 py-2 bg-slate-50 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800">{currentUser.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                    {currentUser.role}
                  </span>
                </div>
                {currentUser.role === 'citizen' ? (
                  <button
                    onClick={() => {
                      setCurrentView('citizen-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-emerald-700 text-white rounded-lg font-semibold text-sm"
                  >
                    Citizen Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentView('admin-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-emerald-700 text-white rounded-lg font-semibold text-sm"
                  >
                    Admin Control Center
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-red-600 text-sm font-medium flex items-center justify-center gap-2 border border-red-200 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('navLogout')}</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="py-2.5 text-center text-sm font-semibold border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50"
                >
                  {t('navLogin')}
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="py-2.5 text-center text-sm font-semibold bg-emerald-700 text-white rounded-lg shadow-xs hover:bg-emerald-800"
                >
                  {t('navRegister')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
