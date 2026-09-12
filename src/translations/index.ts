import { Language } from '../types';

export const translations = {
  en: {
    portalName: 'CLEAN CITY PORTAL',
    portalSubtitle: 'Smart Citizen Complaint Management System',
    navHome: 'Home',
    navAbout: 'About',
    navFeatures: 'Features',
    navContact: 'Contact',
    navLogin: 'Login',
    navRegister: 'Register',
    navDashboard: 'Dashboard',
    navAdmin: 'Admin Portal',
    navLogout: 'Logout',
    
    // Hero
    heroBadge: 'Smart Municipal Governance & Grievance Redressal',
    heroTitle: 'Building a Cleaner, Smarter City, Together',
    heroDescription: 'Report potholes, overflowing garbage, water leakages, broken streetlights and other civic problems in seconds. Track real-time progress right until complete resolution.',
    heroCtaPrimary: 'File a Complaint Now',
    heroCtaSecondary: 'Explore Portal Features',
    statResolutionRate: 'Resolution Rate',
    statResponseTime: 'Avg. Response Time',
    statResolvedIssues: 'Resolved Issues',
    statCivicSatisfaction: 'Citizen Satisfaction',
    
    // What Can You Report
    reportSectionTitle: 'What Can You Report?',
    reportSectionSubtitle: 'Quickly select a civic issue category to submit or view guidelines.',
    catGarbage: 'Garbage & Waste',
    catGarbageDesc: 'Overflowing bins, uncollected trash, illegal dumping, and market waste.',
    catRoadDamage: 'Road Damage / Potholes',
    catRoadDamageDesc: 'Dangerous potholes, broken road dividers, cave-ins, and uneven asphalt.',
    catWaterLeakage: 'Water Leakage',
    catWaterLeakageDesc: 'Main pipeline bursts, tap water leakage, dirty supply, low water pressure.',
    catDrainage: 'Drainage & Sewage',
    catDrainageDesc: 'Blocked storm drains, open manholes, sewer overflow, and waterlogging.',
    catStreetLight: 'Street Lights',
    catStreetLightDesc: 'Non-functional streetlights, dangling electric wires, dark street stretches.',
    catOther: 'Other Civic Issues',
    catOtherDesc: 'Encroachments, fallen trees, stray animals, park maintenance, and signage.',

    // Statuses
    statusSubmitted: 'Submitted',
    statusUnderVerification: 'Under Verification',
    statusAssigned: 'Assigned',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',

    // Priorities
    priorityLow: 'Low',
    priorityMedium: 'Medium',
    priorityHigh: 'High',

    // Track
    trackTitle: 'Track Complaint Status',
    trackSubtitle: 'Enter your Complaint ID to check real-time verification and resolution status.',
    trackInputPlaceholder: 'e.g. CC-90812',
    searchButton: 'Search',
    assignedOfficer: 'Assigned Officer',
    officerRemarks: 'Officer Remarks',
    viewDetails: 'View Details',

    // Citizen Dashboard
    citizenDashboardTitle: 'Citizen Dashboard',
    citizenDashboardWelcome: 'Welcome back',
    citizenDashboardSubtitle: 'Manage, track, and monitor all your civic complaints.',
    newComplaintBtn: '+ New Complaint',
    totalComplaints: 'Total Complaints',
    pendingComplaints: 'Pending',
    inProgressComplaints: 'In Progress',
    resolvedComplaints: 'Resolved',
    tabOverview: 'Overview',
    tabNewComplaint: 'New Complaint Form',
    tabTrack: 'Track Complaint',
    tabHistory: 'Complaint History',
    tabProfile: 'Profile & Settings',

    // New Complaint Form
    formTitle: 'Submit New Civic Complaint',
    formSubtitle: 'Fill in the issue details below. Our AI will automatically categorize and prioritize your report.',
    fieldTitle: 'Complaint Title',
    fieldTitlePlaceholder: 'e.g. Deep Pothole outside Central Market Gate 2',
    fieldDesc: 'Detailed Description',
    fieldDescPlaceholder: 'Describe the civic problem, duration, severity, and any hazards...',
    fieldCategory: 'Category (AI Suggested)',
    fieldPriority: 'Priority Level',
    fieldLocation: 'Location / Landmark & Ward',
    fieldLocationPlaceholder: 'e.g. Main Ring Road, near City Hospital, Ward 4',
    btnDetectGps: 'Detect GPS Location',
    gpsDetected: 'GPS Coordinates Captured',
    photoEvidence: 'Photo Evidence Upload',
    optionalPhoto: 'Optional Additional Photo',
    btnSubmitComplaint: 'Submit Complaint',
    submitting: 'Submitting Complaint...',
    aiAnalyzing: 'AI Analyzing Description...',
    aiSuggestionBadge: 'AI Suggested',

    // AI Tips
    aiTipsTitle: 'AI Assistant Tips',
    aiTip1: 'Take a clear, well-lit photo showing both the issue and nearby landmarks.',
    aiTip2: 'Mention landmark names (metro pillar, shop board, ward) for fast dispatch.',
    aiTip3: 'For water bursts or open manholes, mark Priority as High.',
    btnOpenAiChatbot: 'Open AI Assistant',

    // Footer
    footerCopyright: '© 2026 Clean City Complaint Portal. All rights reserved. Government of Smart City Initiative.',
    footerAbout: 'About Us',
    footerPrivacy: 'Privacy Policy',
    footerEmergency: 'Emergency Contacts',
    tollFreeHelpline: 'Citizen Toll-Free Helpline: 1800-123-CLEAN (24x7)'
  },
  hi: {
    portalName: 'क्लीन सिटी पोर्टल',
    portalSubtitle: 'स्मार्ट नागरिक शिकायत निवारण प्रणाली',
    navHome: 'होम',
    navAbout: 'पोर्टल परिचय',
    navFeatures: 'सुविधाएं',
    navContact: 'संपर्क',
    navLogin: 'लॉग इन',
    navRegister: 'पंजीकरण',
    navDashboard: 'नागरिक डैशबोर्ड',
    navAdmin: 'प्रशासनिक पोर्टल',
    navLogout: 'लॉग आउट',

    // Hero
    heroBadge: 'स्मार्ट नगर शासन एवं शिकायत निवारण',
    heroTitle: 'एक स्वच्छ और आधुनिक शहर का निर्माण, साथ मिलकर',
    heroDescription: 'सड़क के गड्ढे, कचरे का ढेर, पानी का रिसाव, खराब स्ट्रीट लाइट जैसी नागरिक समस्याओं की तुरंत रिपोर्ट करें और समाधान तक लाइव ट्रैक करें।',
    heroCtaPrimary: 'अभी शिकायत दर्ज करें',
    heroCtaSecondary: 'पोर्टल सुविधाएं देखें',
    statResolutionRate: 'निवारण दर',
    statResponseTime: 'औसत प्रतिक्रिया समय',
    statResolvedIssues: 'हल की गई समस्याएं',
    statCivicSatisfaction: 'नागरिक संतुष्टि',

    // What Can You Report
    reportSectionTitle: 'आप किन समस्याओं की रिपोर्ट कर सकते हैं?',
    reportSectionSubtitle: 'समस्या की श्रेणी चुनें और तुरंत अपनी शिकायत दर्ज करें।',
    catGarbage: 'कचरा एवं सफाई',
    catGarbageDesc: 'कूड़ेदान का भरना, अनधिकृत कचरा फेंकना, बाजार का कचरा।',
    catRoadDamage: 'सड़क क्षति / गड्ढे',
    catRoadDamageDesc: 'गहरे गड्ढे, टूटे डिवाइडर, उखड़ी हुई डामर सड़क।',
    catWaterLeakage: 'पानी का रिसाव',
    catWaterLeakageDesc: 'मुख्य पाइपलाइन फूटना, दूषित पानी, पानी का भारी नुकसान।',
    catDrainage: 'जल निकासी एवं सीवर',
    catDrainageDesc: 'अवरुद्ध नाले, खुले मैनहोल, गंदे पानी का जलभराव।',
    catStreetLight: 'स्ट्रीट लाइट',
    catStreetLightDesc: 'बंद स्ट्रीट लाइट, झूलते बिजली के तार, अंधेरे रास्ते।',
    catOther: 'अन्य नागरिक मुद्दे',
    catOtherDesc: 'अतिक्रमण, गिरे हुए पेड़, आवारा पशु, सार्वजनिक पार्क रखरखाव।',

    // Statuses
    statusSubmitted: 'दर्ज हुई',
    statusUnderVerification: 'सत्यापन अधीन',
    statusAssigned: 'अधिकारी नियुक्त',
    statusInProgress: 'कार्य प्रगति पर',
    statusResolved: 'निराकरण पूर्ण',

    // Priorities
    priorityLow: 'निम्न',
    priorityMedium: 'मध्यम',
    priorityHigh: 'उच्च',

    // Track
    trackTitle: 'शिकायत की स्थिति ट्रैक करें',
    trackSubtitle: 'वास्तविक समय में सत्यापन एवं निवारण स्थिति देखने के लिए शिकायत आईडी दर्ज करें।',
    trackInputPlaceholder: 'उदा. CC-90812',
    searchButton: 'खोजें',
    assignedOfficer: 'नियुक्त अधिकारी',
    officerRemarks: 'अधिकारी की टिप्पणी',
    viewDetails: 'विवरण देखें',

    // Citizen Dashboard
    citizenDashboardTitle: 'नागरिक डैशबोर्ड',
    citizenDashboardWelcome: 'स्वागत है',
    citizenDashboardSubtitle: 'अपनी सभी नागरिक शिकायतों का प्रबंधन और निगरानी करें।',
    newComplaintBtn: '+ नई शिकायत',
    totalComplaints: 'कुल शिकायतें',
    pendingComplaints: 'लंबित',
    inProgressComplaints: 'प्रगति पर',
    resolvedComplaints: 'हल की गईं',
    tabOverview: 'अवलोकन',
    tabNewComplaint: 'नई शिकायत फॉर्म',
    tabTrack: 'शिकायत ट्रैक करें',
    tabHistory: 'शिकायत इतिहास',
    tabProfile: 'प्रोफाइल एवं सेटिंग्स',

    // New Complaint Form
    formTitle: 'नई नागरिक शिकायत दर्ज करें',
    formSubtitle: 'नीचे विवरण भरें। हमारी एआई प्रणाली स्वतः श्रेणी और प्राथमिकता का सुझाव देगी।',
    fieldTitle: 'शिकायत का शीर्षक',
    fieldTitlePlaceholder: 'उदा. सेंट्रल मार्केट गेट 2 के पास गहरा गड्ढा',
    fieldDesc: 'विस्तृत विवरण',
    fieldDescPlaceholder: 'समस्या का प्रकार, अवधि और जोखिम का स्पष्ट विवरण लिखें...',
    fieldCategory: 'श्रेणी (एआई सुझाव)',
    fieldPriority: 'प्राथमिकता स्तर',
    fieldLocation: 'स्थान / वार्ड एवं लैंडमार्क',
    fieldLocationPlaceholder: 'उदा. रिंग रोड, सिटी अस्पताल के पास, वार्ड 4',
    btnDetectGps: 'जीपीएस लोकेशन प्राप्त करें',
    gpsDetected: 'जीपीएस निर्देशांक प्राप्त हुए',
    photoEvidence: 'फोटो प्रमाण अपलोड करें',
    optionalPhoto: 'अतिरिक्त फोटो (वैकल्पिक)',
    btnSubmitComplaint: 'शिकायत दर्ज करें',
    submitting: 'शिकायत सबमिट हो रही है...',
    aiAnalyzing: 'एआई विश्लेषण जारी है...',
    aiSuggestionBadge: 'एआई सुझाव',

    // AI Tips
    aiTipsTitle: 'एआई सहायक सुझाव',
    aiTip1: 'समस्या और नजदीकी लैंडमार्क दिखाते हुए स्पष्ट फोटो लें।',
    aiTip2: 'त्वरित कार्रवाई हेतु पोल नंबर, दुकान या वार्ड का नाम लिखें।',
    aiTip3: 'पाइप फटने या खुले मैनहोल के लिए उच्च प्राथमिकता चुनें।',
    btnOpenAiChatbot: 'एआई सहायक खोलें',

    // Footer
    footerCopyright: '© 2026 क्लीन सिटी शिकायत पोर्टल। सर्वाधिकार सुरक्षित। स्मार्ट सिटी मिशन।',
    footerAbout: 'हमारे बारे में',
    footerPrivacy: 'गोपनीयता नीति',
    footerEmergency: 'आपातकालीन संपर्क',
    tollFreeHelpline: 'नागरिक टोल-फ्री हेल्पलाइन: 1800-123-CLEAN (24x7)'
  },
  gu: {
    portalName: 'ક્લીન સિટી પોર્ટલ',
    portalSubtitle: 'સ્માર્ટ નાગરિક ફરિયાદ નિવારણ વ્યવસ્થા',
    navHome: 'હોમ',
    navAbout: 'પોર્ટલ વિશે',
    navFeatures: 'વિશેષતાઓ',
    navContact: 'સંપર્ક',
    navLogin: 'લૉગ ઇન',
    navRegister: 'નોંધણી',
    navDashboard: 'નાગરિક ડેશબોર્ડ',
    navAdmin: 'વહીવટી પોર્ટલ',
    navLogout: 'લૉગ આઉટ',

    // Hero
    heroBadge: 'સ્માર્ટ મ્યુનિસિપલ વહીવટ અને ફરિયાદ નિવારણ',
    heroTitle: 'સ્વચ્છ અને સુંદર શહેરનું નિર્માણ, સાથે મળીને',
    heroDescription: 'રસ્તાના ખાડા, કચરાના ઢગલા, પાણીનું લિકેજ, બંધ સ્ટ્રીટ લાઇટ જેવી નાગરિક સમસ્યાઓની તાત્કાલિક ફરિયાદ નોંધાવો અને લાઇવ ટ્રૅક કરો.',
    heroCtaPrimary: 'હમણાં જ ફરિયાદ કરો',
    heroCtaSecondary: 'પોર્ટલની વિશેષતાઓ જુઓ',
    statResolutionRate: 'નિરાકરણ દર',
    statResponseTime: 'સરેરાશ પ્રતિભાવ સમય',
    statResolvedIssues: 'ઉકેલાયેલી સમસ્યાઓ',
    statCivicSatisfaction: 'નાગરિક સંતોષ',

    // What Can You Report
    reportSectionTitle: 'તમે કઈ સમસ્યાઓની ફરિયાદ કરી શકો છો?',
    reportSectionSubtitle: 'યોગ્ય શ્રેણી પસંદ કરો અને સરળતાથી ફરિયાદ નોંધાવો.',
    catGarbage: 'કચરો અને સફાઈ',
    catGarbageDesc: 'ભરાયેલી કચરાપેટી, જાહેર રસ્તા પર કચરો, ગંદકી.',
    catRoadDamage: 'રસ્તાનું નુકસાન / ખાડા',
    catRoadDamageDesc: 'મોટા ખાડા, તૂટેલા ડિવાઇડર, તૂટેલા રસ્તાઓ.',
    catWaterLeakage: 'પાણીનું લિકેજ',
    catWaterLeakageDesc: 'મુખ્ય પાઇપલાઇનનું લિકેજ, ગંદુ પાણી, પાણીનો બગાડ.',
    catDrainage: 'ગટર અને ડ્રેનેજ',
    catDrainageDesc: 'બ્લોક ગટર, ખુલ્લા ગટરના ઢાંકણા, ગંદા પાણીનો ભરાવો.',
    catStreetLight: 'સ્ટ્રીટ લાઇટ',
    catStreetLightDesc: 'બંધ સ્ટ્રીટ લાઇટ, લટકતા વીજ વાયરો, અંધારાવાળા માર્ગો.',
    catOther: 'અન્ય નાગરિક સમસ્યાઓ',
    catOtherDesc: 'દબાણ, પડેલા વૃક્ષો, રખડતા ઢોર, જાહેર બગીચાની જાળવણી.',

    // Statuses
    statusSubmitted: 'નોંધાયેલ',
    statusUnderVerification: 'ચકાસણી હેઠળ',
    statusAssigned: 'અધિકારી સોંપાયેલ',
    statusInProgress: 'કામ ચાલુ છે',
    statusResolved: 'ઉકેલાઈ ગયેલ',

    // Priorities
    priorityLow: 'ઓછી',
    priorityMedium: 'મધ્યમ',
    priorityHigh: 'ઉચ્ચ',

    // Track
    trackTitle: 'ફરિયાદનું સ્ટેટસ ટ્રૅક કરો',
    trackSubtitle: 'તમારી ફરિયાદની વાસ્તવિક સ્થિતિ જાણવા માટે ફરિયાદ આઈડી દાખલ કરો.',
    trackInputPlaceholder: 'દા.ત. CC-90812',
    searchButton: 'શોધો',
    assignedOfficer: 'સોંપાયેલ અધિકારી',
    officerRemarks: 'અધિકારીની નોંધ',
    viewDetails: 'વિગતો જુઓ',

    // Citizen Dashboard
    citizenDashboardTitle: 'નાગરિક ડેશબોર્ડ',
    citizenDashboardWelcome: 'સ્વાગત છે',
    citizenDashboardSubtitle: 'તમારી તમામ નાગરિક ફરિયાદોનું સંચાલન અને દેખરેખ કરો.',
    newComplaintBtn: '+ નવી ફરિયાદ',
    totalComplaints: 'કુલ ફરિયાદો',
    pendingComplaints: 'બાકી',
    inProgressComplaints: 'કામ ચાલુ છે',
    resolvedComplaints: 'ઉકેલાયેલ',
    tabOverview: 'ઝાંખી',
    tabNewComplaint: 'નવું ફરિયાદ ફોર્મ',
    tabTrack: 'ફરિયાદ ટ્રૅક કરો',
    tabHistory: 'ફરિયાદ ઇતિહાસ',
    tabProfile: 'પ્રોફાઇલ અને સેટિંગ્સ',

    // New Complaint Form
    formTitle: 'નવી નાગરિક ફરિયાદ નોંધાવો',
    formSubtitle: 'વિગતો ભરો. અમારી એઆઈ સિસ્ટમ આપોઆપ શ્રેણી અને અગ્રતા સૂચવશે.',
    fieldTitle: 'ફરિયાદનું શીર્ષક',
    fieldTitlePlaceholder: 'દા.ત. સેન્ટ્રલ માર્કેટ ગેટ 2 પાસે મોટો ખાડો',
    fieldDesc: 'વિગતવાર વર્ણન',
    fieldDescPlaceholder: 'સમસ્યાની વિગત, સ્થળ અને મુશ્કેલી વિશે સ્પષ્ટ લખો...',
    fieldCategory: 'શ્રેણી (એઆઈ સૂચિત)',
    fieldPriority: 'અગ્રતા સ્તર',
    fieldLocation: 'સ્થળ / વૉર્ડ અને સીમાચિહ્ન',
    fieldLocationPlaceholder: 'દા.ત. મુખ્ય રિંગ રોડ, સિટી હોસ્પિટલ પાસે, વૉર્ડ 4',
    btnDetectGps: 'જીપીએસ લોકેશન શોધો',
    gpsDetected: 'જીપીએસ માહિતી મળી ગઈ',
    photoEvidence: 'ફોટો પુરાવો અપલોડ કરો',
    optionalPhoto: 'વધારાનો ફોટો (વૈકલ્પિક)',
    btnSubmitComplaint: 'ફરિયાદ નોંધાવો',
    submitting: 'ફરિયાદ નોંધાઈ રહી છે...',
    aiAnalyzing: 'એઆઈ વિશ્લેષણ ચાલુ છે...',
    aiSuggestionBadge: 'એઆઈ સૂચન',

    // AI Tips
    aiTipsTitle: 'એઆઈ સહાયક સૂચનો',
    aiTip1: 'સમસ્યા અને નજીકના ઓળખચિહ્ન સ્પષ્ટ દેખાય તેવો ફોટો લો.',
    aiTip2: 'ઝડપી નિકાલ માટે થાંભલા નંબર કે દુકાનનું નામ દર્શાવો.',
    aiTip3: 'પાઈપ તૂટવા કે ખુલ્લી ગટર માટે ઉચ્ચ અગ્રતા પસંદ કરો.',
    btnOpenAiChatbot: 'એઆઈ સહાયક ખોલો',

    // Footer
    footerCopyright: '© 2026 ક્લીન સિટી ફરિયાદ પોર્ટલ. સર્વાધિકાર સુરક્ષિત. સ્માર્ટ સિટી મિશન.',
    footerAbout: 'અમારા વિશે',
    footerPrivacy: 'ગોપનીયતા નીતિ',
    footerEmergency: 'કટોકટી સંપર્ક',
    tollFreeHelpline: 'નાગરિક ટોલ-ફ્રી હેલ્પલાઇન: 1800-123-CLEAN (24x7)'
  }
};

export function getTranslation(lang: Language, key: keyof typeof translations['en']): string {
  const langDict = translations[lang] || translations.en;
  return langDict[key] || translations.en[key] || key;
}
