import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Complaint, 
  User, 
  Language, 
  AppView, 
  CitizenDashboardTab, 
  ToastNotification,
  ComplaintStatus 
} from '../types';
import { INITIAL_CITIZEN, INITIAL_ADMIN, INITIAL_COMPLAINTS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  complaints: Complaint[];
  currentView: AppView;
  activeTab: CitizenDashboardTab;
  language: Language;
  toasts: ToastNotification[];
  selectedComplaint: Complaint | null;
  assignModalComplaint: Complaint | null;
  statusModalComplaint: Complaint | null;
  isAiChatOpen: boolean;
  trackSearchId: string;
  prefillData: { category?: string; title?: string } | null;
  
  // Actions
  setCurrentView: (view: AppView) => void;
  setActiveTab: (tab: CitizenDashboardTab) => void;
  setLanguage: (lang: Language) => void;
  loginAsCitizen: () => void;
  loginAsAdmin: () => void;
  loginWithCredentials: (email: string, pass: string) => boolean;
  registerCitizen: (data: { name: string; email: string; phone: string; password?: string }) => boolean;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  createComplaint: (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'citizenName' | 'citizenEmail' | 'citizenPhone'>) => Complaint;
  updateComplaintStatus: (id: string, status: ComplaintStatus, remarks?: string) => void;
  assignComplaint: (id: string, officerName: string, remarks?: string) => void;
  resolveComplaint: (id: string, remarks?: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  openComplaintDetails: (complaint: Complaint) => void;
  closeComplaintDetails: () => void;
  openAssignOfficerModal: (complaint: Complaint) => void;
  closeAssignOfficerModal: () => void;
  openUpdateStatusModal: (complaint: Complaint) => void;
  closeUpdateStatusModal: () => void;
  toggleAiChat: (forceState?: boolean) => void;
  setTrackSearchId: (id: string) => void;
  prefillComplaintForm: (category?: string, title?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_COMPLAINTS = 'clean_city_portal_complaints_v1';
const LOCAL_STORAGE_KEY_USER = 'clean_city_portal_user_v1';
const LOCAL_STORAGE_KEY_LANG = 'clean_city_portal_lang_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored language or default to en
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LANG);
    return (saved === 'hi' || saved === 'gu' || saved === 'en') ? saved : 'en';
  });

  // Current User (Defaults to citizen so app is fully previewable and ready immediately)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CITIZEN;
      }
    }
    return INITIAL_CITIZEN;
  });

  // Complaints state
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_COMPLAINTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        return INITIAL_COMPLAINTS;
      }
    }
    return INITIAL_COMPLAINTS;
  });

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeTab, setActiveTab] = useState<CitizenDashboardTab>('overview');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [assignModalComplaint, setAssignModalComplaint] = useState<Complaint | null>(null);
  const [statusModalComplaint, setStatusModalComplaint] = useState<Complaint | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [trackSearchId, setTrackSearchId] = useState<string>('');
  const [prefillData, setPrefillData] = useState<{ category?: string; title?: string } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  }, [currentUser]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_KEY_LANG, lang);
  };

  const addToast = (
    title: string, 
    message: string, 
    type: 'success' | 'error' | 'info' | 'warning' = 'success'
  ) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, title, message, type }]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loginAsCitizen = () => {
    setCurrentUser(INITIAL_CITIZEN);
    setCurrentView('citizen-dashboard');
    setActiveTab('overview');
    addToast('Login Successful', `Welcome back, ${INITIAL_CITIZEN.name}!`, 'success');
  };

  const loginAsAdmin = () => {
    setCurrentUser(INITIAL_ADMIN);
    setCurrentView('admin-dashboard');
    addToast('Admin Portal Access', 'Logged in as Municipal Grievance Administrator.', 'info');
  };

  const loginWithCredentials = (email: string, _pass: string): boolean => {
    if (email.toLowerCase().includes('admin')) {
      loginAsAdmin();
      return true;
    }
    const citizenUser: User = {
      ...INITIAL_CITIZEN,
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
    setCurrentUser(citizenUser);
    setCurrentView('citizen-dashboard');
    setActiveTab('overview');
    addToast('Welcome to Clean City Portal', `Logged in successfully as ${citizenUser.name}`, 'success');
    return true;
  };

  const registerCitizen = (data: { name: string; email: string; phone: string }): boolean => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: 'Ward 4 - Central Zone',
      ward: 'Ward 4 - Central Zone & Market Square',
      role: 'citizen',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      language: language,
      notifications: { email: true, sms: true, push: true }
    };
    setCurrentUser(newUser);
    setCurrentView('citizen-dashboard');
    setActiveTab('overview');
    addToast('Account Created Successfully', `Welcome to Clean City Portal, ${newUser.name}!`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    addToast('Logged Out', 'You have been safely signed out from the portal.', 'info');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...data } : null);
    addToast('Profile Updated', 'Your contact details and preferences have been updated.', 'success');
  };

  const createComplaint = (
    complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'citizenName' | 'citizenEmail' | 'citizenPhone'>
  ): Complaint => {
    // Generate unique ID e.g. CC-49452 or random 5 digits
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `CC-${randomNum}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newComplaint: Complaint = {
      ...complaintData,
      id: newId,
      createdAt: formattedDate,
      updatedAt: formattedDate,
      status: 'Submitted',
      citizenName: currentUser ? currentUser.name : 'Anonymous Citizen',
      citizenEmail: currentUser ? currentUser.email : 'citizen@smartcity.gov.in',
      citizenPhone: currentUser ? currentUser.phone : '+91 98000 00000',
      timeline: [
        {
          status: 'Submitted',
          timestamp: formattedDate,
          note: 'Complaint registered successfully by citizen via portal.',
          actor: currentUser ? currentUser.name : 'Citizen'
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    addToast(
      'Complaint Registered Successfully!', 
      `Your Complaint ID is ${newId}. Keep this ID for tracking.`, 
      'success'
    );
    setTrackSearchId(newId);
    return newComplaint;
  };

  const updateComplaintStatus = (id: string, status: ComplaintStatus, remarks?: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updatedTimeline = [
          ...c.timeline,
          {
            status,
            timestamp: formattedDate,
            note: remarks || `Status updated to ${status} by Municipal Officer.`,
            actor: currentUser?.role === 'admin' ? currentUser.name : 'Municipal Authority'
          }
        ];
        return {
          ...c,
          status,
          updatedAt: formattedDate,
          officerRemarks: remarks || c.officerRemarks,
          timeline: updatedTimeline
        };
      }
      return c;
    }));

    addToast('Complaint Status Updated', `Complaint ${id} status updated to "${status}".`, 'info');
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => prev ? {
        ...prev,
        status,
        updatedAt: formattedDate,
        officerRemarks: remarks || prev.officerRemarks
      } : null);
    }
  };

  const assignComplaint = (id: string, officerName: string, remarks?: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus: ComplaintStatus = c.status === 'Submitted' ? 'Assigned' : c.status;
        const updatedTimeline = [
          ...c.timeline,
          {
            status: nextStatus,
            timestamp: formattedDate,
            note: `Assigned to ${officerName}. ${remarks ? `Remarks: ${remarks}` : ''}`,
            actor: currentUser?.name || 'Administrator'
          }
        ];
        return {
          ...c,
          assignedOfficer: officerName,
          status: nextStatus,
          updatedAt: formattedDate,
          officerRemarks: remarks || c.officerRemarks,
          timeline: updatedTimeline
        };
      }
      return c;
    }));

    addToast('Officer Assigned', `Complaint ${id} has been assigned to ${officerName}.`, 'success');
  };

  const resolveComplaint = (id: string, remarks?: string) => {
    updateComplaintStatus(
      id, 
      'Resolved', 
      remarks || 'Issue has been inspected, repaired, and successfully resolved on site.'
    );
  };

  const openComplaintDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaintDetails = () => {
    setSelectedComplaint(null);
  };

  const openAssignOfficerModal = (complaint: Complaint) => {
    setAssignModalComplaint(complaint);
  };

  const closeAssignOfficerModal = () => {
    setAssignModalComplaint(null);
  };

  const openUpdateStatusModal = (complaint: Complaint) => {
    setStatusModalComplaint(complaint);
  };

  const closeUpdateStatusModal = () => {
    setStatusModalComplaint(null);
  };

  const toggleAiChat = (forceState?: boolean) => {
    setIsAiChatOpen(prev => forceState !== undefined ? forceState : !prev);
  };

  const prefillComplaintForm = (category?: string, title?: string) => {
    setPrefillData({ category, title });
    if (!currentUser) {
      setCurrentUser(INITIAL_CITIZEN);
    }
    setCurrentView('citizen-dashboard');
    setActiveTab('new-complaint');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        complaints,
        currentView,
        activeTab,
        language,
        toasts,
        selectedComplaint,
        assignModalComplaint,
        statusModalComplaint,
        isAiChatOpen,
        trackSearchId,
        prefillData,
        setCurrentView,
        setActiveTab,
        setLanguage,
        loginAsCitizen,
        loginAsAdmin,
        loginWithCredentials,
        registerCitizen,
        logout,
        updateUserProfile,
        createComplaint,
        updateComplaintStatus,
        assignComplaint,
        resolveComplaint,
        addToast,
        removeToast,
        openComplaintDetails,
        closeComplaintDetails,
        openAssignOfficerModal,
        closeAssignOfficerModal,
        openUpdateStatusModal,
        closeUpdateStatusModal,
        toggleAiChat,
        setTrackSearchId,
        prefillComplaintForm
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
