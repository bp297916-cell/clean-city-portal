import { Complaint, User } from '../types';

export const INITIAL_CITIZEN: User = {
  id: 'usr-citizen-01',
  name: 'Dhanraj Patil',
  email: 'dhanrajpatil8141@gmail.com',
  phone: '+91 98254 71234',
  address: 'Flat 402, Shivalik Heights, Central Avenue, Ward 4',
  ward: 'Ward 4 - Central Zone',
  role: 'citizen',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  language: 'en',
  notifications: {
    email: true,
    sms: true,
    push: true
  }
};

export const INITIAL_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Municipal Admin (Commissioner Office)',
  email: 'admin.greivance@cleancityportal.gov.in',
  phone: '+91 79 2658 9900',
  address: 'Room 204, Municipal Corporation Headquarters',
  ward: 'All Wards (HQ)',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  language: 'en',
  notifications: {
    email: true,
    sms: true,
    push: true
  }
};

export const WARDS = [
  'Ward 1 - North Ring & Heritage Area',
  'Ward 2 - Civil Lines & University Hub',
  'Ward 3 - West Ring & Lake Area',
  'Ward 4 - Central Zone & Market Square',
  'Ward 5 - Riverfront East & Station Road',
  'Ward 6 - Industrial South Sector',
  'Ward 7 - Tech City Hub & Suburbs'
];

export const MUNICIPAL_OFFICERS = [
  { id: 'off-1', name: 'Eng. Rajesh Sharma', department: 'Solid Waste Management' },
  { id: 'off-2', name: 'Insp. Sunita Patel', department: 'Roads & Bridges Engineering' },
  { id: 'off-3', name: 'Officer Vikram Deshmukh', department: 'Water Supply & Sewage Board' },
  { id: 'off-4', name: 'Insp. Manoj Kumar', department: 'Electrical & Street Lighting' },
  { id: 'off-5', name: 'Officer Ananya Joshi', department: 'Public Health & Drainage' },
  { id: 'off-6', name: 'Insp. Hardik Shah', department: 'Town Planning & Encroachment' }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'CC-90812',
    title: 'Overflowing Garbage Bin near Central Market',
    description: 'The community trash container near Vegetable Market gate has been overflowing for the last 3 days. Animals are scattering plastic bags, causing strong foul smell and health hazard to nearby vegetable vendors and pedestrians.',
    category: 'Garbage',
    priority: 'High',
    status: 'In Progress',
    location: 'Gate 2, Central Market, Ward 4',
    ward: 'Ward 4 - Central Zone & Market Square',
    coordinates: { lat: 23.0225, lng: 72.5714 },
    photoUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
    additionalPhotoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-09-08 09:30 AM',
    updatedAt: '2026-09-10 11:15 AM',
    citizenName: 'Dhanraj Patil',
    citizenEmail: 'dhanrajpatil8141@gmail.com',
    citizenPhone: '+91 98254 71234',
    assignedOfficer: 'Eng. Rajesh Sharma (Solid Waste Management)',
    officerRemarks: 'Dispatched sanitation compactor truck (Vehicle #GJ-01-M-4412). Crew deployed for clearance and area sanitization spray.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-08 09:30 AM', note: 'Complaint lodged by citizen with 2 photo attachments.', actor: 'Citizen Dhanraj Patil' },
      { status: 'Under Verification', timestamp: '2026-09-08 11:20 AM', note: 'Verified by Municipal Control Desk. Severity: High.', actor: 'Control Room Officer' },
      { status: 'Assigned', timestamp: '2026-09-09 10:00 AM', note: 'Assigned to Ward 4 Sanitation Supervisor Eng. Rajesh Sharma.', actor: 'Zonal Officer' },
      { status: 'In Progress', timestamp: '2026-09-10 11:15 AM', note: 'Clearance truck deployed. Waste removal underway.', actor: 'Eng. Rajesh Sharma' }
    ]
  },
  {
    id: 'CC-90813',
    title: 'Deep Pothole causing traffic snarls',
    description: 'A deep pothole measuring approx 4 feet across has formed right at the intersection after recent rainfall. Multiple two-wheeler riders have suffered near-accidents and evening traffic is bottlenecked.',
    category: 'Road Damage',
    priority: 'High',
    status: 'Assigned',
    location: 'Near Metro Pillar 142, Ring Road Junction, Ward 7',
    ward: 'Ward 7 - Tech City Hub & Suburbs',
    coordinates: { lat: 23.0338, lng: 72.585 },
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-09-09 03:45 PM',
    updatedAt: '2026-09-10 09:00 AM',
    citizenName: 'Dhanraj Patil',
    citizenEmail: 'dhanrajpatil8141@gmail.com',
    citizenPhone: '+91 98254 71234',
    assignedOfficer: 'Insp. Sunita Patel (Roads & Bridges Engineering)',
    officerRemarks: 'Inspection completed. Work order issued to rapid road patch unit. Cold asphalt filling scheduled tonight during low traffic hours.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-09 03:45 PM', note: 'Pothole report lodged with geo-tagged location.', actor: 'Citizen Dhanraj Patil' },
      { status: 'Under Verification', timestamp: '2026-09-09 05:15 PM', note: 'Verified via traffic camera feed. Priority set to High.', actor: 'Traffic Grievance Cell' },
      { status: 'Assigned', timestamp: '2026-09-10 09:00 AM', note: 'Assigned to Insp. Sunita Patel (Roads Dept).', actor: 'Chief Engineer Office' }
    ]
  },
  {
    id: 'CC-90814',
    title: 'Broken Streetlight outside Park Gate 2',
    description: 'Two consecutive pole lights are completely non-operational outside Park Gate 2. The walkway remains pitch dark after 7 PM, creating safety concerns for senior citizens and evening walkers.',
    category: 'Street Light',
    priority: 'Medium',
    status: 'Resolved',
    location: 'Nehru Peace Park, Avenue Road, Ward 2',
    ward: 'Ward 2 - Civil Lines & University Hub',
    coordinates: { lat: 23.0395, lng: 72.566 },
    photoUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-09-06 08:20 PM',
    updatedAt: '2026-09-08 04:30 PM',
    citizenName: 'Dhanraj Patil',
    citizenEmail: 'dhanrajpatil8141@gmail.com',
    citizenPhone: '+91 98254 71234',
    assignedOfficer: 'Insp. Manoj Kumar (Electrical & Street Lighting)',
    officerRemarks: 'Replaced faulty LED luminaires (80W) and tested underground cable connection. Fully illuminated and verified on-site.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-06 08:20 PM', note: 'Complaint submitted by citizen.', actor: 'Citizen Dhanraj Patil' },
      { status: 'Under Verification', timestamp: '2026-09-07 09:10 AM', note: 'Ward electrician confirmed pole numbers #LP-82 and #LP-83.', actor: 'Electrical Control Desk' },
      { status: 'Assigned', timestamp: '2026-09-07 02:00 PM', note: 'Assigned to field technician under Insp. Manoj Kumar.', actor: 'Ward Engineer' },
      { status: 'In Progress', timestamp: '2026-09-08 01:30 PM', note: 'Hydraulic ladder vehicle on site replacing fittings.', actor: 'Insp. Manoj Kumar' },
      { status: 'Resolved', timestamp: '2026-09-08 04:30 PM', note: 'Both luminaires replaced. Night photo inspection verified.', actor: 'Insp. Manoj Kumar' }
    ]
  },
  {
    id: 'CC-90815',
    title: 'Water Leakage from Main Supply Pipe',
    description: 'High-pressure clean municipal water is gushing out from the pipeline valve on Station Road. Thousands of liters are going to waste and flooding the side lane since early morning.',
    category: 'Water Leakage',
    priority: 'High',
    status: 'Under Verification',
    location: 'Opposite Railway Colony Water Tank, Station Road, Ward 5',
    ward: 'Ward 5 - Riverfront East & Station Road',
    coordinates: { lat: 23.018, lng: 72.592 },
    photoUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-09-10 07:15 AM',
    updatedAt: '2026-09-10 08:00 AM',
    citizenName: 'Dhanraj Patil',
    citizenEmail: 'dhanrajpatil8141@gmail.com',
    citizenPhone: '+91 98254 71234',
    assignedOfficer: 'Officer Vikram Deshmukh (Water Supply & Sewage Board)',
    officerRemarks: 'Sub-divisional engineer dispatched to isolate valve section. Repair crew on standby.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-10 07:15 AM', note: 'Citizen emergency alert logged.', actor: 'Citizen Dhanraj Patil' },
      { status: 'Under Verification', timestamp: '2026-09-10 08:00 AM', note: 'Cross-checked with SCADA telemetry pipe pressure drop.', actor: 'Water Operations Cell' }
    ]
  },
  {
    id: 'CC-90816',
    title: 'Blocked Drainage causing water overflow',
    description: 'Stormwater drain inlet is completely choked with silt and polythene wrappers. Even a slight downpour leads to knee-deep foul water accumulation in front of residences.',
    category: 'Drainage',
    priority: 'Medium',
    status: 'Submitted',
    location: 'Cross Lane 4, Shanti Nagar, Ward 3',
    ward: 'Ward 3 - West Ring & Lake Area',
    coordinates: { lat: 23.048, lng: 72.545 },
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-09-11 02:10 AM',
    updatedAt: '2026-09-11 02:10 AM',
    citizenName: 'Dhanraj Patil',
    citizenEmail: 'dhanrajpatil8141@gmail.com',
    citizenPhone: '+91 98254 71234',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-11 02:10 AM', note: 'Complaint logged via mobile web portal.', actor: 'Citizen Dhanraj Patil' }
    ]
  },
  {
    id: 'CC-90817',
    title: 'Fallen Banyan Tree Branch Blocking Road',
    description: 'A heavy branch fell during strong winds overnight, completely blocking the left carriageway. City buses are taking alternate detours.',
    category: 'Other',
    priority: 'High',
    status: 'Resolved',
    location: 'Near Old Circuit House, Ward 1',
    ward: 'Ward 1 - North Ring & Heritage Area',
    coordinates: { lat: 23.055, lng: 72.578 },
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-09-05 06:10 AM',
    updatedAt: '2026-09-05 10:45 AM',
    citizenName: 'Karan Mehra',
    citizenEmail: 'karan.mehra@gmail.com',
    citizenPhone: '+91 98790 12345',
    assignedOfficer: 'Officer Ananya Joshi (Public Health & Disaster Mgmt)',
    officerRemarks: 'Disaster response team mobilized chainsaw cutters. Branch cleared and road reopened for vehicular traffic in 3 hours.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-05 06:10 AM', note: 'Emergency tree fall report received.', actor: 'Citizen Karan Mehra' },
      { status: 'Under Verification', timestamp: '2026-09-05 06:30 AM', note: 'Verified by beat officer.', actor: 'Ward 1 Control Room' },
      { status: 'Assigned', timestamp: '2026-09-05 06:45 AM', note: 'Assigned to Parks & Disaster tree cutting crew.', actor: 'Disaster Control' },
      { status: 'In Progress', timestamp: '2026-09-05 07:30 AM', note: 'Cutting and lifting operation in progress.', actor: 'Officer Ananya Joshi' },
      { status: 'Resolved', timestamp: '2026-09-05 10:45 AM', note: 'Wood transported to municipal yard, road cleared.', actor: 'Officer Ananya Joshi' }
    ]
  }
];

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ['garbage', 'trash', 'waste', 'dump', 'bin', 'plastic', 'debris', 'litter', 'smell', 'कचरा', 'કચરો', 'कूड़ा'],
    category: 'Garbage' as const,
    priority: 'Medium' as const,
    advice: 'For accumulated waste, include the nearby shop name or street intersection. If toxic or medical waste, elevate priority to High.'
  },
  {
    keywords: ['pothole', 'road', 'asphalt', 'divider', 'crater', 'traffic', 'speedbreaker', 'patch', 'सड़क', 'गड्ढा', 'ખાડો', 'રસ્તો'],
    category: 'Road Damage' as const,
    priority: 'High' as const,
    advice: 'Road hazards pose serious risks to two-wheelers. Mention the approximate depth and lane (left/center/right).'
  },
  {
    keywords: ['water', 'leakage', 'pipe', 'pipeline', 'burst', 'gushing', 'drinking', 'tap', 'supply', 'पानी', 'रिसाव', 'પાણી', 'લિકેજ'],
    category: 'Water Leakage' as const,
    priority: 'High' as const,
    advice: 'Water pipeline bursts cause heavy water loss. Click "Detect GPS" to ensure emergency technicians reach the exact valve.'
  },
  {
    keywords: ['drain', 'drainage', 'gutter', 'sewer', 'manhole', 'overflow', 'clogged', 'choked', 'सीवर', 'नाला', 'ગટર', 'ડ્રેનેજ'],
    category: 'Drainage' as const,
    priority: 'High' as const,
    advice: 'Open manholes or severe sewer overflows are considered critical municipal emergencies. Always upload a photo if safe.'
  },
  {
    keywords: ['street light', 'streetlight', 'light', 'lamp', 'dark', 'bulb', 'wire', 'pole', 'बिजली', 'लाइट', 'લાઇટ'],
    category: 'Street Light' as const,
    priority: 'Medium' as const,
    advice: 'Please note the pole number stencil (e.g. LP-45) painted on the post. This cuts resolution time by half.'
  },
  {
    keywords: ['tree', 'animal', 'encroachment', 'dog', 'park', 'signboard', 'noise', 'pedestrian', 'पेड़', 'પક્ષી', 'વૃક્ષ'],
    category: 'Other' as const,
    priority: 'Low' as const,
    advice: 'For public property or general civil requests, provide clear landmark details and photo proof.'
  }
];

export function analyzeCivicText(text: string): {
  category: 'Garbage' | 'Road Damage' | 'Water Leakage' | 'Drainage' | 'Street Light' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
  confidence: number;
  reason: string;
} {
  const lower = text.toLowerCase();
  
  // High risk keywords that boost priority
  const highRiskWords = ['emergency', 'urgent', 'danger', 'accident', 'burst', 'open manhole', 'hazard', 'severe', 'child', 'injury', 'death', 'flooding', 'deep'];
  const hasHighRisk = highRiskWords.some(w => lower.includes(w));

  for (const item of AI_KNOWLEDGE_BASE) {
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        return {
          category: item.category,
          priority: hasHighRisk ? 'High' : item.priority,
          confidence: 94,
          reason: `Detected keyword "${kw}" indicative of ${item.category} public infrastructure issues.`
        };
      }
    }
  }

  return {
    category: 'Other',
    priority: hasHighRisk ? 'High' : 'Low',
    confidence: 65,
    reason: 'Standard civic report categorization applied.'
  };
}
