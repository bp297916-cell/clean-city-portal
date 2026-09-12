import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Clock, 
  MapPin, 
  Zap, 
  FileText, 
  ArrowRight,
  Eye,
  Award
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, setCurrentView, prefillComplaintForm } = useApp();
  const t = (key: any) => getTranslation(language, key);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-emerald-100/60 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
            About Clean City Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 font-display">
            Smart Citizen Grievance Redressal for Modern Urban Living
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Clean City Portal is an integrated digital municipal platform bridging the gap between vigilant citizens and municipal administration to build cleaner, safer, and better-maintained neighborhoods.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1 & 2: What is Clean City Portal & Why it is useful */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                What is Clean City Portal?
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Clean City Portal is the official citizen grievance management initiative designed to empower residents to actively participate in the upkeep of their city’s public infrastructure. It centralizes complaint reporting for all civic domains: solid waste management, road asphalt restoration, water pipeline maintenance, stormwater drainage, and street illumination.
              </p>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Instead of navigating bureaucratic physical offices or paper registers, citizens can file photo-verified and geo-tagged complaints in under 60 seconds from any smartphone, tablet, or PC.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>Unified Municipal Single-Window System</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Why is the Portal Useful?
              </h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Zero Paperwork & Bureaucracy:</strong> Instant ticket generation with automated routing to the exact ward officer.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Visual & GPS Proof:</strong> Uploaded photos and latitude-longitude coordinates ensure repair teams locate the exact pothole or valve.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Real-Time Accountability:</strong> Transparent status tracking prevents forgotten files or unaddressed grievances.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Data-Driven City Planning:</strong> Analytics highlight chronic problem hotspots to allocate annual civic budgets wisely.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>Measurable Service Level Agreements (SLAs)</span>
            </div>
          </div>
        </div>

        {/* Section 3: How Complaints Are Verified, Assigned & Resolved */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Operational Governance Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
              Verification, Assignment & Resolution Lifecycle
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every complaint follows a strictly audited 4-step administrative verification chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm mb-4">
                Step 1
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Verification & Triaging</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                The Municipal Grievance Control Desk validates the submission. Duplicate reports in the same radius are merged, and the problem severity is confirmed with AI assistance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mb-4">
                Step 2
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Officer Assignment</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                The complaint is assigned to the designated Zonal Engineer (e.g. Roads Dept, Sanitation Supervisor, or Electrical Inspector) with SLA response timers activated.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4">
                Step 3
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Resolution & Proof Log</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                The maintenance truck executes repairs. The officer logs the resolution remarks, attaches post-repair verification photos, and marks the grievance as Resolved.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Benefits of Digital Complaint Management */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Benefits of Digital Complaint Management
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Transforming traditional municipal administration into transparent, participatory smart governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Rapid Response Times</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Average resolution turnaround dropped from 14 days in physical offices to under 48 hours via digital dispatch.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">100% Public Transparency</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Citizens can see exactly which officer is holding their ticket, read status notes, and verify resolution photos.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Pinpoint Accuracy</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                GPS detection prevents field workers from searching vague street addresses, drastically cutting repair delays.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Public Health & Safety</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Early detection of open manholes, contaminated water pipelines, and dark street stretches protects citizen lives.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Inclusive Multilingual Access</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Available in English, Hindi, and Gujarati, ensuring every citizen can report issues comfortably in their mother tongue.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">High Citizen Satisfaction</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Over 94.8% resolution rate with automated SMS and portal notifications updating citizens at every step.
              </p>
            </div>
          </div>
        </div>

        {/* Action CTA */}
        <div className="bg-emerald-700 text-white rounded-2xl p-8 text-center space-y-4 shadow-lg">
          <h2 className="text-2xl font-bold font-display">Ready to Make Your Neighborhood Cleaner?</h2>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto">
            Take a photo of any civic issue in your ward and submit your first complaint in seconds.
          </p>
          <button
            onClick={() => prefillComplaintForm()}
            className="px-6 py-3 bg-white text-emerald-900 hover:bg-emerald-50 font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>File a Complaint Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
