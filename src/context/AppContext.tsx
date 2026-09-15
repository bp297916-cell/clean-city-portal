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
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

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
  registerCitizen: (data: { name: string; email: string; phone: string; password?: string }) => Promise<boolean>;
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

const ADMIN_EMAIL = 'bp297916@gmail.com';

const LOCAL_STORAGE_KEY_COMPLAINTS = 'clean_city_portal_complaints_v1';
const LOCAL_STORAGE_KEY_USER = 'clean_city_portal_user_v1';
const LOCAL_STORAGE_KEY_LANG = 'clean_city_portal_lang_v1';

const removeUndefined = (value: any): any => {
  if (Array.isArray(value)) return value.map(removeUndefined);
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, removeUndefined(v)])
    );
  }
  return value;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored language or default to en
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LANG);
    return (saved === 'hi' || saved === 'gu' || saved === 'en') ? saved : 'en';
  });

  // IMPORTANT: never restore a previous demo/user session from localStorage.
  // Firebase Authentication is the source of truth for the signed-in user.
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Complaints come only from Firebase for the currently authenticated user.
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeTab, setActiveTab] = useState<CitizenDashboardTab>('overview');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [assignModalComplaint, setAssignModalComplaint] = useState<Complaint | null>(null);
  const [statusModalComplaint, setStatusModalComplaint] = useState<Complaint | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [trackSearchId, setTrackSearchId] = useState<string>('');
  const [prefillData, setPrefillData] = useState<{ category?: string; title?: string } | null>(null);
  const [firebaseUser, setFirebaseUser] = useState(auth.currentUser);

  // Firebase Authentication is the only source of truth.
  // We intentionally DO NOT auto-login anonymously. A new visitor must register/login.
  useEffect(() => {
    // Remove old demo data that may have been stored by previous versions.
    localStorage.removeItem(LOCAL_STORAGE_KEY_COMPLAINTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);

      if (!user) {
        setCurrentUser(null);
        setComplaints([]);
        setCurrentView('register');
        setActiveTab('overview');
        return;
      }

      const email = (user.email || '').trim().toLowerCase();

      if (email === ADMIN_EMAIL.toLowerCase()) {
        const adminUser: User = {
          ...INITIAL_ADMIN,
          id: user.uid,
          email: user.email || ADMIN_EMAIL,
          role: 'admin'
        };
        setCurrentUser(adminUser);
        setCurrentView('admin-dashboard');
        return;
      }

      const citizenUser: User = {
        ...INITIAL_CITIZEN,
        id: user.uid,
        email: user.email || '',
        name: user.displayName || user.email?.split('@')[0] || 'Citizen',
        role: 'citizen'
      };
      setCurrentUser(citizenUser);
      setCurrentView('citizen-dashboard');
      setActiveTab('overview');
    });

    return () => unsubscribeAuth();
  }, []);

  // Sync complaints with Firebase Firestore in real time
  useEffect(() => {
    if (!firebaseUser) return;

    const complaintsRef = collection(db, 'complaints');

    const formatFirestoreDate = (value: any): string => {
      if (!value) return '';
      if (typeof value === 'string') return value;
      if (value?.toDate && typeof value.toDate === 'function') {
        const date = value.toDate();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      return String(value);
    };

    const unsubscribe = onSnapshot(
      complaintsRef,
      (snapshot) => {
        const firestoreComplaints = snapshot.docs.map((item) => {
          const data = item.data();
          const timeline = Array.isArray(data.timeline)
            ? data.timeline.map((entry: any) => ({
                ...entry,
                timestamp: formatFirestoreDate(entry.timestamp),
              }))
            : [];

          return {
            ...data,
            id: item.id,
            createdAt: formatFirestoreDate(data.createdAt),
            updatedAt: formatFirestoreDate(data.updatedAt),
            timeline,
          } as Complaint;
        });

        // Citizens must only see complaints created by their own Firebase UID.
        // Admin (the single configured admin email) can see all complaints.
        const visibleComplaints =
          firebaseUser.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()
            ? firestoreComplaints
            : firestoreComplaints.filter(
                (complaint: any) => complaint.userId === firebaseUser.uid
              );

        setComplaints(visibleComplaints);
      },
      (error) => {
        console.error('Firestore listener error:', error);
      }
    );

    return () => unsubscribe();
  }, [firebaseUser]);



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
    addToast(
      'Registration Required',
      'Please create a citizen account or sign in with your Firebase account.',
      'info'
    );
    setCurrentView('register');
  };

  const loginAsAdmin = () => {
    addToast(
      'Admin Login Required',
      `Only ${ADMIN_EMAIL} can access the Admin Panel.`,
      'info'
    );
    setCurrentView('login');
  };

  const loginWithCredentials = (email: string, pass: string): boolean => {
    if (!email.trim() || !pass) {
      addToast('Login Failed', 'Please enter your email and password.', 'error');
      return false;
    }

    signInWithEmailAndPassword(auth, email.trim(), pass)
      .then((credential) => {
        const isAdmin = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
        const citizenUser: User = {
          ...INITIAL_CITIZEN,
          id: credential.user.uid,
          email: credential.user.email || email,
          name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
        };

        if (isAdmin) {
          setCurrentUser({ ...INITIAL_ADMIN, id: credential.user.uid, email: credential.user.email || email });
          setCurrentView('admin-dashboard');
          addToast('Admin Login Successful', 'Authenticated with Firebase.', 'success');
        } else {
          setCurrentUser(citizenUser);
          setCurrentView('citizen-dashboard');
          setActiveTab('overview');
          addToast('Login Successful', `Welcome back, ${citizenUser.name}!`, 'success');
        }
      })
      .catch((error: any) => {
        console.error('Firebase login error:', error);
        let message = 'Invalid email or password.';
        if (error?.code === 'auth/user-not-found' || error?.code === 'auth/invalid-credential') {
          message = 'No account found with these credentials.';
        } else if (error?.code === 'auth/wrong-password') {
          message = 'Incorrect password.';
        } else if (error?.code === 'auth/invalid-email') {
          message = 'Please enter a valid email address.';
        }
        addToast('Login Failed', message, 'error');
      });

    return true;
  };

  const registerCitizen = async (data: { name: string; email: string; phone: string; password?: string }): Promise<boolean> => {
    if (!data.password) {
      addToast('Password Required', 'Please enter a password to create your Firebase account.', 'error');
      return false;
    }

    if (data.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      addToast(
        'Admin Email Reserved',
        'This email is reserved for the municipal administrator.',
        'error'
      );
      return false;
    }

    try {
      const credential = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);

      const newUser: User = {
        id: credential.user.uid,
        name: data.name,
        email: credential.user.email || data.email,
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
    } catch (error: any) {
      console.error('Firebase registration error:', error);

      let message = 'Unable to create your account. Please try again.';
      if (error?.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please sign in instead.';
      } else if (error?.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error?.code === 'auth/weak-password') {
        message = 'Password is too weak. Please use a stronger password.';
      }

      addToast('Registration Failed', message, 'error');
      return false;
    }
  };

  const logout = () => {
    signOut(auth).catch((error) => console.error('Firebase logout error:', error));
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
      userId: firebaseUser?.uid || currentUser?.id || '',
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

    // Save complaint to Firestore
    setDoc(doc(db, 'complaints', newId), removeUndefined(newComplaint))
      .catch((error) => {
        console.error('Firestore save error:', error);
        addToast(
          'Cloud Save Failed',
          'Complaint was saved locally, but could not be saved to Firebase.',
          'error'
        );
      });
    
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

    let updatedComplaint: Complaint | null = null;

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updatedTimeline = [
          ...(Array.isArray(c.timeline) ? c.timeline : []),
          {
            status,
            timestamp: formattedDate,
            note: remarks || `Status updated to ${status} by Municipal Officer.`,
            actor: currentUser?.role === 'admin' ? currentUser.name : 'Municipal Authority'
          }
        ];

        updatedComplaint = {
          ...c,
          status,
          updatedAt: formattedDate,
          officerRemarks: remarks || c.officerRemarks,
          timeline: updatedTimeline
        };

        return updatedComplaint;
      }

      return c;
    }));

    // Save updated complaint to Firestore
    if (updatedComplaint) {
      setDoc(doc(db, 'complaints', id), removeUndefined(updatedComplaint))
        .catch((error) => {
          console.error('Firestore status update error:', error);
          addToast(
            'Cloud Update Failed',
            'Status was updated locally, but could not be saved to Firebase.',
            'error'
          );
        });
    }

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

    let updatedComplaint: Complaint | null = null;

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus: ComplaintStatus = c.status === 'Submitted' ? 'Assigned' : c.status;
        const updatedTimeline = [
          ...(Array.isArray(c.timeline) ? c.timeline : []),
          {
            status: nextStatus,
            timestamp: formattedDate,
            note: `Assigned to ${officerName}. ${remarks ? `Remarks: ${remarks}` : ''}`,
            actor: currentUser?.name || 'Administrator'
          }
        ];

        updatedComplaint = {
          ...c,
          assignedOfficer: officerName,
          status: nextStatus,
          updatedAt: formattedDate,
          officerRemarks: remarks || c.officerRemarks,
          timeline: updatedTimeline
        };

        return updatedComplaint;
      }

      return c;
    }));

    // Save assigned complaint to Firestore
    if (updatedComplaint) {
      setDoc(doc(db, 'complaints', id), removeUndefined(updatedComplaint))
        .catch((error) => {
          console.error('Firestore assignment error:', error);
          addToast(
            'Cloud Update Failed',
            'Officer assignment was updated locally, but could not be saved to Firebase.',
            'error'
          );
        });
    }

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
      setCurrentView('register');
      return;
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

