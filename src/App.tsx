import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { AIChatbot } from './components/AIChatbot';
import { ComplaintDetailsModal } from './components/ComplaintDetailsModal';
import { AssignOfficerModal, UpdateStatusModal } from './components/AdminModals';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { PublicTrackPage } from './pages/PublicTrackPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentPage = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'features':
        return <FeaturesPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'citizen-dashboard':
        return <CitizenDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'track':
        return <PublicTrackPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Floating Widgets */}
      <ComplaintDetailsModal />
      <AssignOfficerModal />
      <UpdateStatusModal />
      <ToastContainer />
      <AIChatbot />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
