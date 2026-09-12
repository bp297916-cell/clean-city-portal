import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileEdit, 
  Camera, 
  MapPin, 
  Cpu, 
  AlertOctagon, 
  Compass, 
  History, 
  RefreshCw, 
  Globe2, 
  UserCheck, 
  BellRing, 
  Bot, 
  ArrowRight,
  Check
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { setCurrentView, setActiveTab, currentUser, prefillComplaintForm, toggleAiChat } = useApp();

  const features = [
    {
      id: 'feat-1',
      title: 'Online Complaint Registration',
      category: 'Citizen Portal',
      icon: <FileEdit className="w-6 h-6 text-emerald-700" />,
      description: 'Streamlined online grievance form allowing citizens to report issues with title, detailed notes, ward selection, and automated ID generation (e.g. CC-49452).'
    },
    {
      id: 'feat-2',
      title: 'Photo Evidence Upload',
      category: 'Visual Verification',
      icon: <Camera className="w-6 h-6 text-emerald-700" />,
      description: 'Upload primary and optional secondary photos showing the issue and surrounding landmarks. Includes image preview and file validation.'
    },
    {
      id: 'feat-3',
      title: 'GPS / Location Detection',
      category: 'Smart Geolocation',
      icon: <MapPin className="w-6 h-6 text-emerald-700" />,
      description: 'One-click "Detect GPS" grabs accurate latitude and longitude coordinates directly from the device to guide maintenance trucks to the exact meter.'
    },
    {
      id: 'feat-4',
      title: 'AI-based Complaint Categorization',
      category: 'Artificial Intelligence',
      icon: <Cpu className="w-6 h-6 text-emerald-700" />,
      description: 'Natural language analysis parses user descriptions to automatically suggest whether an issue is Garbage, Road Damage, Water Leakage, Drainage, or Street Light.'
    },
    {
      id: 'feat-5',
      title: 'Priority Detection',
      category: 'Severity Triaging',
      icon: <AlertOctagon className="w-6 h-6 text-emerald-700" />,
      description: 'Smart hazard detection automatically flags urgent safety risks (such as open manholes, sparking cables, or high-pressure pipe bursts) as High Priority.'
    },
    {
      id: 'feat-6',
      title: 'Complaint Tracking',
      category: 'Live Status Tracker',
      icon: <Compass className="w-6 h-6 text-emerald-700" />,
      description: 'Instant search by Complaint ID displaying a 5-stage visual progress timeline: Submitted &rarr; Under Verification &rarr; Assigned &rarr; In Progress &rarr; Resolved.'
    },
    {
      id: 'feat-7',
      title: 'Complaint History',
      category: 'Citizen Archive',
      icon: <History className="w-6 h-6 text-emerald-700" />,
      description: 'Complete record of all grievances lodged by the citizen with status filters, category filters, submission timestamps, and full detail views.'
    },
    {
      id: 'feat-8',
      title: 'Real-time Status Updates',
      category: 'Administrative Dispatch',
      icon: <RefreshCw className="w-6 h-6 text-emerald-700" />,
      description: 'Instant status changes logged with official municipal remarks, officer assignments, and resolution notes stored in the audit trail.'
    },
    {
      id: 'feat-9',
      title: 'Multilingual Support',
      category: 'Inclusive Governance',
      icon: <Globe2 className="w-6 h-6 text-emerald-700" />,
      description: 'Full tri-lingual user interface support for English, Hindi (हिंदी), and Gujarati (ગુજરાતી) across all dashboard modules, buttons, and navigation.'
    },
    {
      id: 'feat-10',
      title: 'Citizen Profile',
      category: 'Account Management',
      icon: <UserCheck className="w-6 h-6 text-emerald-700" />,
      description: 'Manage personal contact information, home address, default municipal ward, avatar, notification preferences, and password settings.'
    },
    {
      id: 'feat-11',
      title: 'Notifications',
      category: 'Alert System',
      icon: <BellRing className="w-6 h-6 text-emerald-700" />,
      description: 'Visual toast alerts and notification badges informing citizens of successful submissions, status changes, officer dispatches, and ticket resolutions.'
    },
    {
      id: 'feat-12',
      title: 'AI Assistant / Chatbot',
      category: 'Conversational Support',
      icon: <Bot className="w-6 h-6 text-emerald-700" />,
      description: 'Floating bottom-right assistant helping citizens draft complaints, explain bureaucratic statuses, suggest categories, and prefill submission forms.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-emerald-100/60 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
            System Architecture & Features
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 font-display">
            Comprehensive Smart Municipal Grievance Suite
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Discover the 12 core smart features powering Clean City Portal for citizens, municipal engineers, and administrative controllers.
          </p>
        </div>
      </section>

      {/* 12 Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={f.id}
              id={`feature-card-${idx + 1}`}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {f.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-emerald-800">
                  Feature #{String(idx + 1).padStart(2, '0')}
                </span>
                {f.id === 'feat-1' || f.id === 'feat-4' ? (
                  <button
                    onClick={() => prefillComplaintForm()}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    Try Form &rarr;
                  </button>
                ) : f.id === 'feat-6' ? (
                  <button
                    onClick={() => {
                      if (currentUser) {
                        setCurrentView('citizen-dashboard');
                        setActiveTab('track');
                      } else {
                        setCurrentView('track');
                      }
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    Track Status &rarr;
                  </button>
                ) : f.id === 'feat-12' ? (
                  <button
                    onClick={() => toggleAiChat(true)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    Open AI Chat &rarr;
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <Check className="w-3.5 h-3.5" /> Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 rounded-3xl p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold font-display">Experience the Portal First-Hand</h2>
            <p className="text-sm text-emerald-100">
              Register an account or test our interactive admin control center to see complaint dispatching in real time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => prefillComplaintForm()}
              className="px-5 py-3 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Submit a Complaint
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs border border-emerald-500/60 transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
