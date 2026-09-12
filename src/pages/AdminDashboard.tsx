import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Complaint, 
  ComplaintCategory, 
  ComplaintPriority, 
  ComplaintStatus 
} from '../types';
import { WARDS } from '../data/mockData';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  UserCheck, 
  RefreshCw, 
  Eye, 
  Download, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Building2, 
  AlertTriangle,
  TrendingUp,
  MapPin,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    complaints, 
    openComplaintDetails, 
    openAssignOfficerModal, 
    openUpdateStatusModal, 
    addToast 
  } = useApp();

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Stats calculation
  const total = complaints.length;
  const pendingReview = complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Verification').length;
  const inProgress = complaints.filter(c => c.status === 'Assigned' || c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  // Filter complaints
  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesPriority = selectedPriority === 'All' || c.priority === selectedPriority;
    const matchesWard = selectedWard === 'All' || c.ward === selectedWard;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesPriority && matchesWard && matchesStatus;
  });

  // Export to CSV / JSON
  const handleExportData = () => {
    const headers = ['Complaint ID', 'Category', 'Title', 'Citizen', 'Ward', 'Date', 'Priority', 'Status', 'Officer'];
    const rows = filteredComplaints.map(c => [
      c.id,
      c.category,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.citizenName}"`,
      `"${c.ward}"`,
      c.createdAt,
      c.priority,
      c.status,
      `"${c.assignedOfficer || 'Unassigned'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CleanCity_Complaints_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Report Exported', 'Downloaded complaint audit dataset as CSV.', 'success');
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

  // Category breakdown metrics
  const categoriesList: ComplaintCategory[] = ['Garbage', 'Road Damage', 'Water Leakage', 'Drainage', 'Street Light', 'Other'];
  const categoryCounts = categoriesList.map(cat => ({
    name: cat,
    count: complaints.filter(c => c.category === cat).length
  }));

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Municipal Administration Center</span>
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Control Room Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Municipal Complaint Management Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Dispatch grievance maintenance crews, assign ward inspectors, and update resolution audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="admin-export-report-btn"
            onClick={handleExportData}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Export CSV Audit</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Grievances</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">{total}</p>
          <p className="text-[11px] text-slate-400 mt-1">City-wide cumulative</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Pending Review</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-display mt-2">{pendingReview}</p>
          <p className="text-[11px] text-amber-600/80 mt-1">Awaiting verification / dispatch</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Active In-Progress</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-display mt-2">{inProgress}</p>
          <p className="text-[11px] text-blue-600/80 mt-1">Field teams deployed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Resolved Today</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display mt-2">{resolved}</p>
          <p className="text-[11px] text-emerald-600/80 mt-1">Completed & verified</p>
        </div>
      </div>

      {/* Analytics & Department Breakdown Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <span>Complaints by Civic Category</span>
              </h3>
              <p className="text-xs text-slate-500">Live distribution across municipal service lines</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              100% Monitored
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {categoryCounts.map(cat => {
              const pct = total > 0 ? Math.round((cat.count / total) * 100) : 0;
              return (
                <div key={cat.name} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{cat.name}</span>
                    <span className="font-mono text-slate-500">{cat.count} tickets ({pct}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 6)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SLA & Quick Action Card */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-700 text-emerald-100">
              Service Level Agreement (SLA)
            </span>
            <h3 className="text-lg font-bold">24-Hour Municipal Resolution Mandate</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Open manholes, live electrical wires, and main water leaks require immediate field team deployment within 2 hours.
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1 text-xs">
            <p className="font-bold text-emerald-400">Control Desk Hotline</p>
            <p className="text-slate-300">Rapid Action Wireless: Channel #4</p>
            <p className="text-slate-400 text-[11px]">Direct Dispatch: +91 79 2658 0002</p>
          </div>
        </div>

      </div>

      {/* Main Complaint Management Table with Multi-Filters */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Title and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Grievance Registry & Triage Console
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredComplaints.length} of {complaints.length} complaints matching active filters
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="admin-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search ID, title, citizen, location..."
              className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Filters Bar: Category, Priority, Ward, Status */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              id="admin-filter-category"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 bg-white rounded-xl border border-slate-300 focus:border-emerald-600 font-medium"
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

          {/* Priority Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Priority Level
            </label>
            <select
              id="admin-filter-priority"
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              className="w-full p-2 bg-white rounded-xl border border-slate-300 focus:border-emerald-600 font-medium"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Ward Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Municipal Ward
            </label>
            <select
              id="admin-filter-ward"
              value={selectedWard}
              onChange={e => setSelectedWard(e.target.value)}
              className="w-full p-2 bg-white rounded-xl border border-slate-300 focus:border-emerald-600 font-medium"
            >
              <option value="All">All Wards</option>
              {WARDS.map(w => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              id="admin-filter-status"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full p-2 bg-white rounded-xl border border-slate-300 focus:border-emerald-600 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Verification">Under Verification</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Title & Description</th>
                <th className="pb-3 font-semibold">Citizen</th>
                <th className="pb-3 font-semibold">Ward</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-emerald-800 whitespace-nowrap">{c.id}</td>
                  <td className="py-3.5 font-semibold text-slate-800 whitespace-nowrap">{c.category}</td>
                  <td className="py-3.5 max-w-[200px]">
                    <p className="font-bold text-slate-900 truncate" title={c.title}>{c.title}</p>
                    <p className="text-slate-500 truncate text-[11px]" title={c.description}>{c.description}</p>
                  </td>
                  <td className="py-3.5 text-slate-700 whitespace-nowrap font-medium">{c.citizenName}</td>
                  <td className="py-3.5 text-slate-600 whitespace-nowrap">{c.ward.split('-')[0]}</td>
                  <td className="py-3.5 text-slate-400 text-[11px] whitespace-nowrap">{c.createdAt.split(' ')[0]}</td>
                  <td className="py-3.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(c.priority)}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      {/* Assign Officer Button */}
                      <button
                        id={`admin-assign-btn-${c.id}`}
                        onClick={() => openAssignOfficerModal(c)}
                        title="Assign Field Officer"
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[11px] border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Assign</span>
                      </button>

                      {/* Update Status Button */}
                      <button
                        id={`admin-status-btn-${c.id}`}
                        onClick={() => openUpdateStatusModal(c)}
                        title="Update Complaint Status"
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold rounded-lg text-[11px] border border-blue-200 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Status</span>
                      </button>

                      {/* View Details Button */}
                      <button
                        id={`admin-view-btn-${c.id}`}
                        onClick={() => openComplaintDetails(c)}
                        title="View Full Complaint Audit"
                        className="p-1 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            No complaints match the specified search query or filters.
          </div>
        )}

      </div>

    </div>
  );
};
