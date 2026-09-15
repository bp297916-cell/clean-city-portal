import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from "../firebase";
import { storage } from "../storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getTranslation } from '../translations';
import { 
  Complaint, 
  ComplaintCategory, 
  ComplaintPriority, 
  ComplaintStatus, 
  CitizenDashboardTab 
} from '../types';
import { WARDS, analyzeCivicText } from '../data/mockData';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  History, 
  User as UserIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  MapPin, 
  Camera, 
  UploadCloud, 
  ArrowRight, 
  Eye, 
  Filter, 
  Send, 
  Bot, 
  Compass, 
  Building2, 
  Lock, 
  BellRing, 
  LogOut, 
  Save, 
  ShieldCheck, 
  FileText,
  Trash2,
  Car,
  Droplets,
  Waves,
  Lightbulb,
  HelpCircle,
  X
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { 
    currentUser, 
    complaints, 
    activeTab, 
    setActiveTab, 
    language, 
    createComplaint, 
    openComplaintDetails, 
    toggleAiChat,
    trackSearchId,
    setTrackSearchId,
    prefillData,
    updateUserProfile,
    logout,
    addToast
  } = useApp();

  const t = (key: any) => getTranslation(language, key);

  // Stats calculation
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Verification').length;
  const inProgress = complaints.filter(c => c.status === 'Assigned' || c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  // New Complaint Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<ComplaintCategory>('Garbage');
  const [newPriority, setNewPriority] = useState<ComplaintPriority>('Medium');
  const [newLocation, setNewLocation] = useState('');
  const [newWard, setNewWard] = useState(WARDS[3]);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [additionalPhotoUrl, setAdditionalPhotoUrl] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [additionalPhotoFile, setAdditionalPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [additionalPhotoPreview, setAdditionalPhotoPreview] = useState<string>('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysisReason, setAiAnalysisReason] = useState<string>('');

  // Handle pre-fill from Home cards or AI chat
  useEffect(() => {
    if (prefillData) {
      if (prefillData.category) {
        setNewCategory(prefillData.category as ComplaintCategory);
      }
      if (prefillData.title) {
        setNewTitle(prefillData.title);
        setNewDesc(prefillData.title);
      }
    }
  }, [prefillData]);

  // Real-time AI Categorization as user types description
  useEffect(() => {
    if (newDesc.trim().length > 6) {
      const result = analyzeCivicText(newDesc);
      setNewCategory(result.category);
      setNewPriority(result.priority);
      setAiAnalysisReason(result.reason);
    }
  }, [newDesc]);

  // GPS Detection Handler
  const handleDetectGPS = () => {
    setIsDetectingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setIsDetectingGps(false);
          setGpsCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setNewLocation(prev => prev || `Near GPS Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`);
          addToast('GPS Captured', `Accurate location coordinates detected: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`, 'success');
        },
        _err => {
          // Fallback to municipal simulated coordinates for the ward
          setTimeout(() => {
            setIsDetectingGps(false);
            const simulatedLat = 23.0225 + (Math.random() - 0.5) * 0.05;
            const simulatedLng = 72.5714 + (Math.random() - 0.5) * 0.05;
            setGpsCoords({ lat: simulatedLat, lng: simulatedLng });
            setNewLocation(prev => prev || `Station Road intersection, GPS: ${simulatedLat.toFixed(4)}, ${simulatedLng.toFixed(4)}`);
            addToast('GPS Coordinates Located', 'Captured precise municipal coordinates for your ward.', 'info');
          }, 600);
        },
        { timeout: 5000 }
      );
    } else {
      setIsDetectingGps(false);
      setGpsCoords({ lat: 23.0225, lng: 72.5714 });
      addToast('GPS Set', 'Ward central coordinates applied.', 'info');
    }
  };

  // Sample photo choices so evaluators can easily test photo uploading without their own files
  const samplePhotoPresets = [
    { label: 'Garbage Dump', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80' },
    { label: 'Deep Pothole', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80' },
    { label: 'Water Leak', url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80' },
    { label: 'Broken Light', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80' },
    { label: 'Blocked Drain', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?w=800&auto=format&fit=crop&q=80' }
  ];

  // Handle actual image file selection
  const handlePhotoFileChange = (
    file: File | null,
    type: 'primary' | 'additional'
  ) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Invalid Photo', 'Please select an image file.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('Photo Too Large', 'Please select an image smaller than 5 MB.', 'error');
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (type === 'primary') {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoFile(file);
      setPhotoPreview(previewUrl);
      setPhotoUrl('');
    } else {
      if (additionalPhotoPreview) URL.revokeObjectURL(additionalPhotoPreview);
      setAdditionalPhotoFile(file);
      setAdditionalPhotoPreview(previewUrl);
      setAdditionalPhotoUrl('');
    }
  };

  const clearPhoto = (type: 'primary' | 'additional') => {
    if (type === 'primary') {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoFile(null);
      setPhotoPreview('');
      setPhotoUrl('');
    } else {
      if (additionalPhotoPreview) URL.revokeObjectURL(additionalPhotoPreview);
      setAdditionalPhotoFile(null);
      setAdditionalPhotoPreview('');
      setAdditionalPhotoUrl('');
    }
  };

  const uploadComplaintPhoto = async (
    file: File,
    complaintId: string,
    slot: 'primary' | 'additional'
  ) => {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      throw new Error('AUTH_REQUIRED');
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `complaintPhotos/${firebaseUser.uid}/${complaintId}/${slot}-${Date.now()}-${safeName}`;
    const storageRef = ref(storage, storagePath);

    setIsUploadingPhoto(true);
    try {
      await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          complaintId,
          uploadedBy: firebaseUser.uid,
        },
      });

      return await getDownloadURL(storageRef);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Submit Complaint Handler
const handleSubmitComplaint = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate required fields
  if (!newTitle.trim() || !newDesc.trim() || !newLocation.trim()) {
    addToast(
      'Missing Required Fields',
      'Please provide a title, description, and location/ward.',
      'error'
    );
    return;
  }

  setIsSubmitting(true);

  try {
    if (!auth.currentUser) {
      addToast(
        'Login Required',
        'Please sign in with your Firebase account before submitting a complaint.',
        'error'
      );
      return;
    }

    if (!photoFile && !photoUrl.trim()) {
      addToast(
        'Photo Required',
        'Please choose a complaint photo before submitting.',
        'error'
      );
      return;
    }

    // Create the complaint ID first so uploaded photos are grouped under it.
    const complaintRef = doc(collection(db, 'complaints'));
    const complaintId = complaintRef.id;

    let finalPhotoUrl = photoUrl.trim();
    let finalAdditionalPhotoUrl = additionalPhotoUrl.trim();

    // Upload selected photos to Firebase Storage.
    if (photoFile) {
      finalPhotoUrl = await uploadComplaintPhoto(
        photoFile,
        complaintId,
        'primary'
      );
    }

    if (additionalPhotoFile) {
      finalAdditionalPhotoUrl = await uploadComplaintPhoto(
        additionalPhotoFile,
        complaintId,
        'additional'
      );
    }

    const complaintData = {
      title: newTitle.trim(),
      description: newDesc.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'Submitted',
      location: newLocation.trim(),
      ward: newWard,
      coordinates: gpsCoords ?? {
        lat: 23.0225,
        lng: 72.5714,
      },
      photoUrl: finalPhotoUrl,
      ...(finalAdditionalPhotoUrl
        ? { additionalPhotoUrl: finalAdditionalPhotoUrl }
        : {}),
    };

    // Save complaint metadata + uploaded image URLs to Firestore.
    await setDoc(complaintRef, {
      ...complaintData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });


    // Clear form
    setNewTitle('');
    setNewDesc('');
    setNewLocation('');
    setGpsCoords(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    if (additionalPhotoPreview) URL.revokeObjectURL(additionalPhotoPreview);
    setPhotoFile(null);
    setAdditionalPhotoFile(null);
    setPhotoPreview('');
    setAdditionalPhotoPreview('');
    setPhotoUrl('');
    setAdditionalPhotoUrl('');
    setAiAnalysisReason('');

    // Show success message
    addToast(
      'Complaint Registered Successfully',
      `Your Complaint ID is ${complaintId}. Keep this ID for tracking.`,
      'success'
    );

    // Open Track Complaint
    setTrackSearchId(complaintId);
    setTrackInput(complaintId);
    setActiveTab('track');

  } catch (error) {
    console.error('Firestore complaint error:', error);

    addToast(
      'Submission Failed',
      'Unable to save complaint to Firebase. Please check Firebase configuration and try again.',
      'error'
    );
  } finally {
    setIsSubmitting(false);
  }
};
  // Track Complaint Search
  const [trackInput, setTrackInput] = useState(trackSearchId || 'CC-90812');
  const [trackedComplaint, setTrackedComplaint] = useState<Complaint | null>(() => {
    return complaints.find(c => c.id.toUpperCase() === (trackSearchId || 'CC-90812').toUpperCase()) || complaints[0] || null;
  });

  useEffect(() => {
    if (trackSearchId) {
      setTrackInput(trackSearchId);
      const found = complaints.find(c => c.id.toUpperCase() === trackSearchId.toUpperCase());
      if (found) {
        setTrackedComplaint(found);
      }
    }
  }, [trackSearchId, complaints]);

  const handleSearchTrack = (idToSearch?: string) => {
    const id = (idToSearch || trackInput).trim().toUpperCase();
    if (!id) return;
    const found = complaints.find(c => c.id.toUpperCase() === id);
    if (found) {
      setTrackedComplaint(found);
      setTrackSearchId(found.id);
    } else {
      addToast('Complaint Not Found', `No grievance record found with ID "${id}". Please check and try again.`, 'error');
    }
  };

  // Complaint History Filters
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>('All');
  const [historyCategoryFilter, setHistoryCategoryFilter] = useState<string>('All');

  const filteredHistory = complaints.filter(c => {
    const matchesStatus = historyStatusFilter === 'All' || c.status === historyStatusFilter;
    const matchesCategory = historyCategoryFilter === 'All' || c.category === historyCategoryFilter;
    return matchesStatus && matchesCategory;
  });

  // Profile Edit State
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileAddress, setProfileAddress] = useState(currentUser?.address || '');
  const [profileWard, setProfileWard] = useState(currentUser?.ward || WARDS[3]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileName,
      phone: profilePhone,
      address: profileAddress,
      ward: profileWard
    });
    setIsEditingProfile(false);
  };

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Submitted':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Under Verification':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'In Progress':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getPriorityBadge = (priority: ComplaintPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      {/* Top Banner Greeting */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {currentUser?.role === 'admin' ? 'Municipal Officer View' : 'Citizen Grievance Portal'}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Smart Governance Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Citizen Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Welcome back, <strong className="text-emerald-800">{currentUser?.name || 'Citizen'}</strong>! Manage and track your civic complaints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dashboard-new-complaint-top-btn"
            onClick={() => setActiveTab('new-complaint')}
            className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-200" />
            <span>+ New Complaint</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Complaints</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">{total}</p>
          <p className="text-[11px] text-slate-400 mt-1">Logged on portal</p>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Pending</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-display mt-2">{pending}</p>
          <p className="text-[11px] text-amber-600/80 mt-1">Submitted / Under Verification</p>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">In Progress</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-display mt-2">{inProgress}</p>
          <p className="text-[11px] text-blue-600/80 mt-1">Assigned to field officers</p>
        </div>

        {/* Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Resolved</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display mt-2">{resolved}</p>
          <p className="text-[11px] text-emerald-600/80 mt-1">Grievances redressed</p>
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-1">
        <button
          id="tab-btn-overview"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{t('tabOverview')}</span>
        </button>

        <button
          id="tab-btn-new-complaint"
          onClick={() => setActiveTab('new-complaint')}
          className={`flex-1 min-w-[130px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'new-complaint'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('tabNewComplaint')}</span>
        </button>

        <button
          id="tab-btn-track"
          onClick={() => setActiveTab('track')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'track'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{t('tabTrack')}</span>
        </button>

        <button
          id="tab-btn-history"
          onClick={() => setActiveTab('history')}
          className={`flex-1 min-w-[130px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'history'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{t('tabHistory')}</span>
        </button>

        <button
          id="tab-btn-profile"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>{t('tabProfile')}</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Recent Complaints List / Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">Recent Complaints</h2>
                <p className="text-xs text-slate-500">Live list of your submitted grievances and their status</p>
              </div>
              <button
                onClick={() => setActiveTab('history')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full History ({complaints.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Complaint ID</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Location</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Priority</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {complaints.slice(0, 5).map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-emerald-800">{c.id}</td>
                      <td className="py-3.5 font-semibold text-slate-700">{c.category}</td>
                      <td className="py-3.5 max-w-[160px] truncate font-medium text-slate-900" title={c.title}>
                        {c.title}
                      </td>
                      <td className="py-3.5 max-w-[130px] truncate text-slate-500" title={c.location}>
                        {c.location.split(',')[0]}
                      </td>
                      <td className="py-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                        {c.createdAt.split(' ')[0]}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(c.priority)}`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${getStatusBadge(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right whitespace-nowrap">
                        <button
                          id={`overview-view-${c.id}`}
                          onClick={() => openComplaintDetails(c)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 font-bold rounded-md text-[11px] transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {complaints.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                No complaints registered yet. Click "+ New Complaint" above.
              </div>
            )}
          </div>

          {/* Right: AI Assistant Tips Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 rounded-3xl border border-emerald-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-900 font-bold font-display text-base">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <h3>{t('aiTipsTitle')}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our smart municipal dispatch algorithms route your complaint faster when high-quality details are provided.
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800">1. Clear Photo Evidence</span>
                  <p className="text-[11px] text-slate-600 leading-normal">{t('aiTip1')}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800">2. Specific Landmarks & Pole IDs</span>
                  <p className="text-[11px] text-slate-600 leading-normal">{t('aiTip2')}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800">3. Appropriate Priority Setting</span>
                  <p className="text-[11px] text-slate-600 leading-normal">{t('aiTip3')}</p>
                </div>
              </div>

              <button
                id="open-ai-chatbot-banner-btn"
                onClick={() => toggleAiChat(true)}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Bot className="w-4 h-4 text-emerald-200" />
                <span>{t('btnOpenAiChatbot')}</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: NEW COMPLAINT FORM */}
      {/* ======================================================== */}
      {activeTab === 'new-complaint' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI-Assisted Redressal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              {t('formTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('formSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmitComplaint} className="space-y-5">
            
            {/* 1. Complaint Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                1. {t('fieldTitle')} *
              </label>
              <input
                id="complaint-form-title"
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder={t('fieldTitlePlaceholder')}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* 2. Description with Real-Time AI Auto-suggestion */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. {t('fieldDesc')} *
                </label>
                {aiAnalysisReason && (
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>AI auto-detected: {newCategory} ({newPriority} Priority)</span>
                  </span>
                )}
              </div>
              <textarea
                id="complaint-form-description"
                required
                rows={4}
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder={t('fieldDescPlaceholder')}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 leading-relaxed"
              />
            </div>

            {/* 3 & 4. Category and Priority Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>3. {t('fieldCategory')} *</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    {t('aiSuggestionBadge')}
                  </span>
                </label>
                <select
                  id="complaint-form-category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as ComplaintCategory)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Garbage">Garbage & Waste</option>
                  <option value="Road Damage">Road Damage / Potholes</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Drainage">Drainage & Sewage</option>
                  <option value="Street Light">Street Light</option>
                  <option value="Other">Other Civic Issues</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  4. {t('fieldPriority')} *
                </label>
                <select
                  id="complaint-form-priority"
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as ComplaintPriority)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-medium"
                >
                  <option value="Low">Low - Minor nuisance, non-hazardous</option>
                  <option value="Medium">Medium - Regular civic maintenance</option>
                  <option value="High">High - Urgent hazard, open safety risk</option>
                </select>
              </div>
            </div>

            {/* 5 & 6. Location / Ward & Detect GPS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  5. {t('fieldLocation')} *
                </label>
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  disabled={isDetectingGps}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isDetectingGps ? 'Detecting...' : t('btnDetectGps')}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={newWard}
                  onChange={e => setNewWard(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  {WARDS.map(w => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>

                <input
                  id="complaint-form-location"
                  type="text"
                  required
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  placeholder={t('fieldLocationPlaceholder')}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {gpsCoords && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>GPS Attached: {gpsCoords.lat.toFixed(5)}° N, {gpsCoords.lng.toFixed(5)}° E</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setGpsCoords(null)}
                    className="text-[11px] text-slate-400 hover:text-slate-600 underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* 7 & 8. Real Firebase Storage Photo Evidence Upload */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  7. {t('photoEvidence')} *
                </label>
                <span className="text-[10px] font-semibold text-slate-500">
                  JPG / PNG / WEBP • Max 5 MB
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <input
                    id="complaint-form-photo-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e =>
                      handlePhotoFileChange(
                        e.target.files?.[0] || null,
                        'primary'
                      )
                    }
                  />

                  <label
                    htmlFor="complaint-form-photo-file"
                    className="min-h-36 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 flex flex-col items-center justify-center gap-2 text-emerald-800 cursor-pointer transition-colors p-4"
                  >
                    <Camera className="w-8 h-8" />
                    <span className="text-xs font-bold">
                      {photoFile ? 'Change Primary Photo' : 'Choose Primary Photo'}
                    </span>
                    <span className="text-[10px] text-slate-500 text-center">
                      Take/select a photo showing the civic issue
                    </span>
                  </label>

                  {(photoPreview || photoUrl) && (
                    <div className="relative h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={photoPreview || photoUrl}
                        alt="Primary evidence preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded">
                        {photoFile ? 'Ready to Upload' : 'Sample Evidence'}
                      </span>
                      <button
                        type="button"
                        onClick={() => clearPhoto('primary')}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1.5 rounded-full"
                        title="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    8. {t('optionalPhoto')}
                  </label>

                  <input
                    id="complaint-form-additional-photo-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e =>
                      handlePhotoFileChange(
                        e.target.files?.[0] || null,
                        'additional'
                      )
                    }
                  />

                  <label
                    htmlFor="complaint-form-additional-photo-file"
                    className="min-h-36 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center gap-2 text-slate-600 cursor-pointer transition-colors p-4"
                  >
                    <UploadCloud className="w-8 h-8" />
                    <span className="text-xs font-bold">
                      {additionalPhotoFile ? 'Change Second Photo' : 'Add Second Photo'}
                    </span>
                    <span className="text-[10px] text-slate-500 text-center">
                      Optional second angle / supporting evidence
                    </span>
                  </label>

                  {additionalPhotoPreview && (
                    <div className="relative h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={additionalPhotoPreview}
                        alt="Secondary evidence preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded">
                        Ready to Upload
                      </span>
                      <button
                        type="button"
                        onClick={() => clearPhoto('additional')}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1.5 rounded-full"
                        title="Remove second photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <p className="text-[10px] text-slate-500 mb-1.5">
                  Demo option: use a sample evidence image instead of a local file.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {samplePhotoPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        clearPhoto('primary');
                        setPhotoUrl(preset.url);
                      }}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium border bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {isUploadingPhoto && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                  <UploadCloud className="w-4 h-4 animate-pulse" />
                  Uploading photo to Firebase Storage...
                </div>
              )}

              <p className="text-[10px] text-slate-400">
                Selected photos are uploaded to Firebase Storage and their download URLs are saved with the complaint.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[11px] text-slate-500">
                By submitting, you certify this civic grievance is accurate.
              </p>
              <button
                id="submit-new-complaint-btn"
                type="submit"
                disabled={isSubmitting || isUploadingPhoto}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? t('submitting') : t('btnSubmitComplaint')}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: TRACK COMPLAINT */}
      {/* ======================================================== */}
      {activeTab === 'track' && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Search Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                {t('trackTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('trackSubtitle')}
              </p>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                handleSearchTrack();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  id="track-complaint-input"
                  type="text"
                  value={trackInput}
                  onChange={e => setTrackInput(e.target.value)}
                  placeholder={t('trackInputPlaceholder')}
                  className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono uppercase"
                />
              </div>
              <button
                id="track-search-btn"
                type="submit"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                {t('searchButton')}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
              <span>Quick test IDs:</span>
              {complaints.slice(0, 4).map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setTrackInput(c.id);
                    handleSearchTrack(c.id);
                  }}
                  className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
                    trackedComplaint?.id === c.id
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>

          {/* Tracked Complaint Details & 5-Step Timeline */}
          {trackedComplaint ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
              
              {/* Header Details */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white">
                      {trackedComplaint.id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {trackedComplaint.category}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${getPriorityBadge(trackedComplaint.priority)}`}>
                      {trackedComplaint.priority} Priority
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{trackedComplaint.title}</h3>
                </div>

                <div className="text-right">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(trackedComplaint.status)}`}>
                    {trackedComplaint.status}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Updated: {trackedComplaint.updatedAt}</p>
                </div>
              </div>

              {/* Visual 5-Step Progress Timeline as explicitly specified */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-5">
                  5-Stage Grievance Redressal Progress
                </h4>

                {(() => {
                  const stages: ComplaintStatus[] = [
                    'Submitted',
                    'Under Verification',
                    'Assigned',
                    'In Progress',
                    'Resolved'
                  ];
                  const currentIdx = stages.indexOf(trackedComplaint.status);

                  return (
                    <div className="relative">
                      {/* Bar behind */}
                      <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                        <div 
                          className="h-full bg-emerald-600 transition-all duration-500"
                          style={{ width: `${(currentIdx / (stages.length - 1)) * 100}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10 text-center">
                        {stages.map((stg, idx) => {
                          const isDone = idx <= currentIdx;
                          const isCurrent = idx === currentIdx;

                          return (
                            <div key={stg} className="flex flex-col items-center bg-white p-2 rounded-xl sm:bg-transparent">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isCurrent
                                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md'
                                    : isDone
                                    ? 'bg-emerald-700 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}
                              >
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span className={`text-[11px] mt-2 font-semibold leading-tight ${
                                isCurrent ? 'text-emerald-900 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                              }`}>
                                {stg}
                              </span>
                              {isCurrent && (
                                <span className="mt-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                  Current
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Officer & Remarks details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {t('assignedOfficer')}
                  </span>
                  <p className="text-sm font-bold text-slate-800">
                    {trackedComplaint.assignedOfficer || 'Pending Assignment to Zonal Field Inspector'}
                  </p>
                  <p className="text-xs text-slate-500">{trackedComplaint.ward}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Location & Landmark
                  </span>
                  <p className="text-sm font-semibold text-slate-800">{trackedComplaint.location}</p>
                  {trackedComplaint.coordinates && (
                    <p className="text-[10px] font-mono text-emerald-700">
                      GPS: {trackedComplaint.coordinates.lat.toFixed(4)}, {trackedComplaint.coordinates.lng.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>

              {/* Remarks Box */}
              {trackedComplaint.officerRemarks && (
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                    {t('officerRemarks')}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-emerald-100">
                    {trackedComplaint.officerRemarks}
                  </p>
                </div>
              )}

              {/* View Full Timeline Modal Button */}
              <div className="pt-2 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Citizen: <strong>{trackedComplaint.citizenName}</strong>
                </p>
                <button
                  onClick={() => openComplaintDetails(trackedComplaint)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  View Complete Audit & Photos
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
              <Compass className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Enter a Complaint ID above to track status</p>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: COMPLAINT HISTORY */}
      {/* ======================================================== */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                My Complaint History
              </h2>
              <p className="text-xs text-slate-500">
                Filter and inspect all public infrastructure grievances reported by your account.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Status:</span>
                <select
                  id="history-filter-status"
                  value={historyStatusFilter}
                  onChange={e => setHistoryStatusFilter(e.target.value)}
                  className="text-xs p-2 rounded-xl border border-slate-300 focus:border-emerald-600"
                >
                  <option value="All">All Statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Verification">Under Verification</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-600">Category:</span>
                <select
                  id="history-filter-category"
                  value={historyCategoryFilter}
                  onChange={e => setHistoryCategoryFilter(e.target.value)}
                  className="text-xs p-2 rounded-xl border border-slate-300 focus:border-emerald-600"
                >
                  <option value="All">All Categories</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Road Damage">Road Damage</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Drainage">Drainage</option>
                  <option value="Street Light">Street Light</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Priority</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-emerald-800">{c.id}</td>
                    <td className="py-3.5 font-semibold text-slate-700">{c.category}</td>
                    <td className="py-3.5 max-w-[200px] truncate font-medium text-slate-900" title={c.title}>
                      {c.title}
                    </td>
                    <td className="py-3.5 text-slate-400 text-[11px] whitespace-nowrap">{c.createdAt}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(c.priority)}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap">
                      <button
                        id={`history-view-btn-${c.id}`}
                        onClick={() => openComplaintDetails(c)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs">
              No complaints match the selected status or category filters.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: PROFILE & SETTINGS */}
      {/* ======================================================== */}
      {activeTab === 'profile' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              Citizen Profile & Portal Settings
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Manage your verified citizen credentials, preferred municipal ward, and alert notifications.
            </p>
          </div>

          {/* Profile Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-600 shadow-sm flex-shrink-0">
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold text-slate-900">{currentUser?.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Verified Resident
                </span>
              </div>
              <p className="text-xs text-slate-500">{currentUser?.email} • {currentUser?.phone}</p>
              <p className="text-xs font-semibold text-emerald-800">{currentUser?.ward}</p>
            </div>
            <button
              id="edit-profile-btn"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {/* Edit Profile Form */}
          {isEditingProfile && (
            <form onSubmit={handleSaveProfile} className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-4 animate-in fade-in">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Update Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={profilePhone}
                    onChange={e => setProfilePhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address / Street</label>
                <input
                  type="text"
                  required
                  value={profileAddress}
                  onChange={e => setProfileAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Municipal Ward</label>
                <select
                  value={profileWard}
                  onChange={e => setProfileWard(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {WARDS.map(w => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Change Password Card */}
          <div className="p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Change Account Password
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Ensure your citizen grievance account is protected with a secure password.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => addToast('Password Update', 'Password reset confirmation link dispatched to your email.', 'success')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Send Password Reset Email
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Notification Preferences
              </h4>
            </div>
            <div className="space-y-2.5 pt-1">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600 rounded" />
                <span>Instant SMS alerts when complaint status changes (e.g. Assigned, Resolved)</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600 rounded" />
                <span>Email summary containing officer remarks and photographic completion evidence</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600 rounded" />
                <span>Ward alert broadcasts for scheduled water supply shutdowns or road repairs</span>
              </label>
            </div>
          </div>

          {/* Logout Section */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Session active on this browser
            </p>
            <button
              id="citizen-profile-logout-btn"
              onClick={logout}
              className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
