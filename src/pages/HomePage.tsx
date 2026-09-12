import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { ComplaintCategory } from '../types';
import { 
  Trash2, 
  Car, 
  Droplets, 
  Waves, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  Building2, 
  Smartphone, 
  TrendingUp,
  Search,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    language, 
    setCurrentView, 
    setActiveTab, 
    currentUser, 
    prefillComplaintForm,
    setTrackSearchId,
    complaints,
    openComplaintDetails
  } = useApp();

  const [quickTrackId, setQuickTrackId] = useState('');
  const t = (key: any) => getTranslation(language, key);

  const categories: {
    id: ComplaintCategory;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    border: string;
    sampleIssue: string;
  }[] = [
    {
      id: 'Garbage',
      title: t('catGarbage'),
      description: t('catGarbageDesc'),
      icon: <Trash2 className="w-6 h-6 text-emerald-700" />,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      sampleIssue: 'Overflowing community garbage bin'
    },
    {
      id: 'Road Damage',
      title: t('catRoadDamage'),
      description: t('catRoadDamageDesc'),
      icon: <Car className="w-6 h-6 text-amber-700" />,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      sampleIssue: 'Dangerous deep pothole on main road'
    },
    {
      id: 'Water Leakage',
      title: t('catWaterLeakage'),
      description: t('catWaterLeakageDesc'),
      icon: <Droplets className="w-6 h-6 text-blue-700" />,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      sampleIssue: 'Main pipeline leak causing flooding'
    },
    {
      id: 'Drainage',
      title: t('catDrainage'),
      description: t('catDrainageDesc'),
      icon: <Waves className="w-6 h-6 text-cyan-700" />,
      color: 'text-cyan-700',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      sampleIssue: 'Blocked stormwater drainage & manhole'
    },
    {
      id: 'Street Light',
      title: t('catStreetLight'),
      description: t('catStreetLightDesc'),
      icon: <Lightbulb className="w-6 h-6 text-yellow-700" />,
      color: 'text-yellow-700',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      sampleIssue: 'Broken dark streetlight outside gate'
    },
    {
      id: 'Other',
      title: t('catOther'),
      description: t('catOtherDesc'),
      icon: <HelpCircle className="w-6 h-6 text-purple-700" />,
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      sampleIssue: 'Encroachment or fallen tree branch'
    }
  ];

  const handleFileComplaintCTA = (category?: ComplaintCategory) => {
    prefillComplaintForm(category);
  };

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTrackId.trim()) return;
    setTrackSearchId(quickTrackId.trim());
    if (currentUser) {
      setCurrentView('citizen-dashboard');
      setActiveTab('track');
    } else {
      setCurrentView('track');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 border-b border-emerald-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold tracking-wide shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>{t('heroBadge')}</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.15]">
                {t('heroTitle')}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {t('heroDescription')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  id="hero-primary-cta"
                  onClick={() => handleFileComplaintCTA()}
                  className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/25 hover:shadow-lg hover:shadow-emerald-700/30 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('heroCtaPrimary')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-secondary-cta"
                  onClick={() => setCurrentView('features')}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-2xs transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('heroCtaSecondary')}</span>
                </button>
              </div>

              {/* Quick Track Input Bar */}
              <div className="pt-4 max-w-lg">
                <form onSubmit={handleQuickTrack} className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-300 shadow-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                  <div className="pl-3 text-slate-400">
                    <Search className="w-4 h-4 text-emerald-700" />
                  </div>
                  <input
                    type="text"
                    value={quickTrackId}
                    onChange={e => setQuickTrackId(e.target.value)}
                    placeholder="Enter Complaint ID (e.g. CC-90812)"
                    className="w-full text-xs sm:text-sm font-medium focus:outline-hidden text-slate-800 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex-shrink-0"
                  >
                    Track Status
                  </button>
                </form>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                  <span>Try sample IDs:</span>
                  <button 
                    type="button" 
                    onClick={() => { setQuickTrackId('CC-90812'); setTrackSearchId('CC-90812'); if (currentUser) { setCurrentView('citizen-dashboard'); setActiveTab('track'); } else { setCurrentView('track'); } }}
                    className="font-mono text-emerald-700 hover:underline font-semibold"
                  >
                    CC-90812
                  </button>
                  <span>•</span>
                  <button 
                    type="button" 
                    onClick={() => { setQuickTrackId('CC-90813'); setTrackSearchId('CC-90813'); if (currentUser) { setCurrentView('citizen-dashboard'); setActiveTab('track'); } else { setCurrentView('track'); } }}
                    className="font-mono text-emerald-700 hover:underline font-semibold"
                  >
                    CC-90813
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: City Visual Card & Real-Time Stats */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                
                {/* Visual Image / Urban Illustration */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1000&auto=format&fit=crop&q=80"
                    alt="Clean Modern City Infrastructure"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-600/90 backdrop-blur-xs">
                      Live Redressal Network
                    </span>
                    <h3 className="text-base font-bold mt-1">Smart Governance in Action</h3>
                    <p className="text-xs text-slate-200 mt-0.5">Municipal Corporation Connected Dispatch</p>
                  </div>
                </div>

                {/* Micro Live Feed Item */}
                <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                    <span className="font-semibold text-emerald-950">Latest Resolved:</span>
                    <span className="text-emerald-800 truncate max-w-[170px]">Broken Streetlight, Ward 2</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-700 font-bold">CC-90814</span>
                </div>

                {/* Grid of 3 Core Statistics as Requested */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 p-4 text-center bg-white">
                  <div className="p-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display">94.8%</p>
                    <p className="text-[11px] font-semibold text-slate-500 mt-0.5 uppercase tracking-wide">
                      {t('statResolutionRate')}
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">2.4 hrs</p>
                    <p className="text-[11px] font-semibold text-slate-500 mt-0.5 uppercase tracking-wide">
                      {t('statResponseTime')}
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display">18,450+</p>
                    <p className="text-[11px] font-semibold text-slate-500 mt-0.5 uppercase tracking-wide">
                      {t('statResolvedIssues')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-2.5 bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">ISO 9001 Citizen Care</p>
                  <p className="text-[10px] text-slate-500">Government Verified Resolution</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* "What Can You Report?" Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Citizen Grievance Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 font-display">
            {t('reportSectionTitle')}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t('reportSectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              id={`cat-card-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleFileComplaintCTA(cat.id)}
              className="group relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Report Now <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Common issue:</span>
                <span className="font-semibold text-slate-700 truncate max-w-[180px]">{cat.sampleIssue}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step How It Works Section */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
              Transparent Redressal Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
              How Your Complaint Gets Resolved
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our automated smart municipal grievance system ensures full accountability from photo submission to on-site clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4 font-display">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Snap & Submit</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Take a photo of the civic issue. Click "Detect GPS" to capture pinpoint coordinates automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4 font-display">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">AI Categorization</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Our smart AI analyzes the text, assigns the category, flags urgency/priority, and issues your Complaint ID.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4 font-display">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Municipal Dispatch</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Complaint is routed to the exact Ward Officer. Rapid maintenance crews, tankers, or trucks are dispatched.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4 font-display">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Live Resolution</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Officer inspects, completes the repairs, logs photographic proof of work, and marks the grievance as Resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Public Resolution Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Complaints in Process</h2>
            <p className="text-xs text-slate-500">Live updates from citizens across municipal wards.</p>
          </div>
          <button
            onClick={() => {
              if (currentUser) {
                setCurrentView('citizen-dashboard');
                setActiveTab('history');
              } else {
                setCurrentView('track');
              }
            }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Grievances</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {complaints.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => openComplaintDetails(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 text-[11px] font-mono font-bold bg-slate-900/85 text-white px-2 py-0.5 rounded">
                  {item.id}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  {item.status}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 mb-1">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span className="text-slate-500">{item.ward.split('-')[0]}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{item.createdAt}</span>
                  <span className="font-bold text-emerald-700 hover:underline">Details &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Help & Support Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-700 text-emerald-200 inline-block">
              24x7 Citizen Care Helpline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Have an urgent civic hazard? Dial toll-free 1800-123-CLEAN
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Open manholes, live sparking wires, and major pipeline bursts are treated as Tier-1 critical municipal emergencies. Our emergency disaster desk operates round the clock.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('contact')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                View Emergency Contact Directory
              </button>
              <button
                onClick={() => handleFileComplaintCTA()}
                className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs border border-emerald-500/50 transition-colors cursor-pointer"
              >
                Submit Emergency Grievance
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
