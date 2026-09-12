import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ShieldAlert, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      addToast('Incomplete Form', 'Please fill in all required fields before sending.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(
        'Message Dispatched Successfully',
        'Thank you! Your inquiry has been forwarded to the Municipal Public Relations Cell. Reference: REF-' + Math.floor(1000 + Math.random() * 9000),
        'success'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  const emergencyNumbers = [
    { title: 'Disaster Management & Fire Control', number: '101 / 079-2658-1100', desc: 'Flooding, building collapse, major fires', badge: 'Critical' },
    { title: 'Water Main Pipe Burst Emergency', number: '079-2658-2233', desc: 'Main line burst, contaminated supply, low pressure', badge: '24x7 Water Cell' },
    { title: 'Open Manholes & Sewer Clogging', number: '079-2658-4455', desc: 'Critical sewer overflow, open road manholes', badge: 'Drainage Desk' },
    { title: 'Electrical Sparks & Wire Breakage', number: '1912 / 079-2658-6677', desc: 'Fallen electric poles, sparking streetlights', badge: 'Power Grid' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-emerald-100/60 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
            Citizen Grievance Support & Municipal Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 font-display">
            Contact Municipal Corporation & Helpdesk
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Have general inquiries, technical portal questions, or need to connect with municipal zonal authorities? Reach our 24x7 helpline or send us an official communication.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office info & Helplines */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <span>Municipal Headquarters</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Central Municipal Corporation</p>
                    <p className="text-slate-600 mt-0.5">
                      Smart City Bhavan, Civil Lines, Sector 5, Central Administrative Zone
                    </p>
                    <p className="text-slate-400 mt-0.5">Pin: 380001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Phone & Helpline</p>
                    <p className="text-slate-600 mt-0.5">Toll-Free: <strong>1800-123-CLEAN (25326)</strong></p>
                    <p className="text-slate-600">HQ Control Room: +91 79 2658 0000 / 0001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Official Email Inquiries</p>
                    <p className="text-slate-600 mt-0.5">Citizen Helpdesk: helpdesk@smartcity.gov.in</p>
                    <p className="text-slate-600">Grievance Cell: contact@cleancityportal.gov.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Operational Hours</p>
                    <p className="text-slate-600 mt-0.5">Online Portal & Emergency Dispatch: <strong>24 Hours x 7 Days</strong></p>
                    <p className="text-slate-500">Physical Reception: Mon - Sat, 09:30 AM – 06:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map preview badge */}
            <div className="bg-emerald-900 text-white p-6 rounded-2xl space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">
                  Municipal Coverage
                </span>
                <span className="text-xs text-emerald-200">7 Active Wards</span>
              </div>
              <h3 className="font-bold text-base">Zonal Grievance Redressal Cells</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Dedicated municipal rapid action vans and junior engineers are deployed in every ward for on-ground issue inspection within 2 hours.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Send Official Communication
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in the form below for suggestions, feedback, RTI inquiries, or non-complaint municipal queries.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dhanraj Patil"
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. citizen@example.com"
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject / Department Reference *
                  </label>
                  <input
                    id="contact-form-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Inquiry regarding Ward 4 road resurfacing schedule"
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-form-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide detailed description of your query or feedback..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 leading-relaxed"
                  />
                </div>

                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Emergency Contacts Directory */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Municipal Emergency Direct Lines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyNumbers.map((em, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-red-100 shadow-2xs space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                    {em.badge}
                  </span>
                  <PhoneCall className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">{em.title}</h3>
                <p className="text-base font-extrabold text-red-700 font-mono">{em.number}</p>
                <p className="text-[11px] text-slate-500">{em.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
