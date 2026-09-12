export type ComplaintCategory = 
  | 'Garbage' 
  | 'Road Damage' 
  | 'Water Leakage' 
  | 'Drainage' 
  | 'Street Light' 
  | 'Other';

export type ComplaintPriority = 'Low' | 'Medium' | 'High';

export type ComplaintStatus = 
  | 'Submitted' 
  | 'Under Verification' 
  | 'Assigned' 
  | 'In Progress' 
  | 'Resolved';

export interface TimelineEvent {
  status: ComplaintStatus;
  timestamp: string;
  note: string;
  actor: string;
}

export interface Complaint {
  id: string; // e.g. "CC-90812"
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  location: string;
  ward: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  photoUrl: string;
  additionalPhotoUrl?: string;
  createdAt: string;
  updatedAt: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  assignedOfficer?: string;
  officerRemarks?: string;
  timeline: TimelineEvent[];
}

export type UserRole = 'citizen' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  role: UserRole;
  avatarUrl: string;
  language: Language;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export type Language = 'en' | 'hi' | 'gu';

export type AppView = 
  | 'home' 
  | 'about' 
  | 'features' 
  | 'contact' 
  | 'login' 
  | 'register' 
  | 'citizen-dashboard' 
  | 'admin-dashboard' 
  | 'track';

export type CitizenDashboardTab = 
  | 'overview' 
  | 'new-complaint' 
  | 'track' 
  | 'history' 
  | 'profile';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
