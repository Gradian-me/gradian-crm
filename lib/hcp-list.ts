export interface HCP {
  id: number
  name: string
  email: string
  telephone: string
  address: string
  region: string
  facilityType: 'Public' | 'Private'
  type: 'hospital' | 'clinic' | 'distributor' | 'doctor'
  specialty?: string
  institution: string
  location: string
  phone: string
  prescribingPotential?: string
  productInterest?: string[]
  lastVisit?: string
  nextVisit?: string
  complianceStatus?: string
  sunshineAct?: {
    gifts: number
    samples: number
    sponsorships: number
  }
  engagementScore?: number
  avatar?: string
  coordinates?: { lat: number; lng: number }
  status?: string
  checkIn?: string | null
  checkOut?: string | null
  duration?: string
  purpose?: string
  notes?: string
  distance?: string
}

export const hcpList: HCP[] = [
  {
    id: 1,
    name: "Ibn Sina Hospital",
    email: "info@ibnsinahospital.iq",
    telephone: "+964 780 380 9000",
    address: "Al Tashrea, District 211, International Zone, Baghdad",
    region: "International Zone, Baghdad",
    facilityType: "Public",
    type: "hospital",
    specialty: "General Medicine",
    institution: "Ibn Sina Hospital",
    location: "International Zone, Baghdad",
    phone: "+964 780 380 9000",
    prescribingPotential: "High",
    productInterest: ["General Medical Equipment", "Diagnostic Tools"],
    lastVisit: "2024-01-15",
    nextVisit: "2024-02-15",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 2,
      samples: 15,
      sponsorships: 1,
    },
    engagementScore: 85,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 33.3152, lng: 44.3661 },
    status: "completed",
    checkIn: "09:15 AM",
    checkOut: "10:30 AM",
    duration: "1h 15m",
    purpose: "Product presentation - General Medical Equipment",
    notes: "Positive reception, requested samples",
    distance: "2.3 km",
  },
  {
    id: 2,
    name: "Al Yermouk Hospital",
    email: "",
    telephone: "+964 7901830108, Dr Ehad",
    address: "Al Yermouk District, Baghdad",
    region: "Outside International Zone, Baghdad",
    facilityType: "Public",
    type: "hospital",
    specialty: "Emergency Medicine",
    institution: "Al Yermouk Hospital",
    location: "Outside International Zone, Baghdad",
    phone: "+964 7901830108",
    prescribingPotential: "Very High",
    productInterest: ["Emergency Equipment", "Trauma Care"],
    lastVisit: "2024-01-20",
    nextVisit: "2024-02-20",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 1,
      samples: 8,
      sponsorships: 0,
    },
    engagementScore: 92,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 33.2985, lng: 44.3299 },
    status: "in-progress",
    checkIn: "11:00 AM",
    checkOut: null,
    duration: "45m",
    purpose: "Follow-up meeting - Emergency Equipment trial",
    notes: "",
    distance: "3.7 km",
  },
  {
    id: 3,
    name: "Al Rahebat/Saint Raphael Hospital",
    email: "",
    telephone: "+964 771 111 9280",
    address: "Karradah District, Baghdad",
    region: "Outside International Zone, Baghdad",
    facilityType: "Private",
    type: "hospital",
    specialty: "Cardiology",
    institution: "Al Rahebat/Saint Raphael Hospital",
    location: "Outside International Zone, Baghdad",
    phone: "+964 771 111 9280",
    prescribingPotential: "High",
    productInterest: ["CardioStent Pro", "HeartGuard Plus"],
    lastVisit: "2024-01-10",
    nextVisit: "2024-02-10",
    complianceStatus: "Review Required",
    sunshineAct: {
      gifts: 0,
      samples: 0,
      sponsorships: 0,
    },
    engagementScore: 78,
    avatar: "/modern-city-building.png",
    coordinates: { lat: 33.3075, lng: 44.3808 },
    status: "scheduled",
    checkIn: null,
    checkOut: null,
    duration: "30m",
    purpose: "Contract renewal discussion",
    notes: "",
    distance: "1.8 km",
  },
  {
    id: 4,
    name: "Al Moosawi Hospital",
    email: "info@almoosawihospital.com",
    telephone: "+964 770 493 9583",
    address: "Al Jezair St, Basra",
    region: "Basra",
    facilityType: "Private",
    type: "hospital",
    specialty: "Pulmonology",
    institution: "Al Moosawi Hospital",
    location: "Basra",
    phone: "+964 770 493 9583",
    prescribingPotential: "Medium",
    productInterest: ["BreathEasy Inhaler", "PulmoMax"],
    lastVisit: "2024-01-25",
    nextVisit: "2024-02-25",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 3,
      samples: 12,
      sponsorships: 2,
    },
    engagementScore: 88,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 30.5088, lng: 47.7804 },
    status: "completed",
    checkIn: "08:30 AM",
    checkOut: "09:45 AM",
    duration: "1h 15m",
    purpose: "Product demonstration - Respiratory equipment",
    notes: "Interested in new pulmonology devices",
    distance: "4.2 km",
  },
  {
    id: 5,
    name: "Par Hospital",
    email: "info@parhosptial.org",
    telephone: "+964 66 210 7001/2",
    address: "60 Meters Road, Mamostayan District, Erbil",
    region: "Erbil",
    facilityType: "Private",
    type: "hospital",
    specialty: "Oncology",
    institution: "Par Hospital",
    location: "Erbil",
    phone: "+964 66 210 7001",
    prescribingPotential: "Very High",
    productInterest: ["OncoTarget", "ImmunoPlex"],
    lastVisit: "2024-01-18",
    nextVisit: "2024-02-18",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 2,
      samples: 10,
      sponsorships: 1,
    },
    engagementScore: 90,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 36.1911, lng: 44.0092 },
    status: "completed",
    checkIn: "10:00 AM",
    checkOut: "11:30 AM",
    duration: "1h 30m",
    purpose: "Oncology equipment presentation",
    notes: "High interest in new cancer treatment devices",
    distance: "5.1 km",
  },
  {
    id: 6,
    name: "Zheen Hospital",
    email: "info@zheenhospital.com",
    telephone: "+964 66 255 2518 / 66 223 2144",
    address: "Koya Main St, Erbil",
    region: "Erbil",
    facilityType: "Private",
    type: "hospital",
    specialty: "Orthopedics",
    institution: "Zheen Hospital",
    location: "Erbil",
    phone: "+964 66 255 2518",
    prescribingPotential: "High",
    productInterest: ["OrthoFlex", "BoneHeal Pro"],
    lastVisit: "2024-01-22",
    nextVisit: "2024-02-22",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 1,
      samples: 6,
      sponsorships: 0,
    },
    engagementScore: 82,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 36.1911, lng: 44.0092 },
    status: "scheduled",
    checkIn: null,
    checkOut: null,
    duration: "45m",
    purpose: "Orthopedic equipment review",
    notes: "",
    distance: "3.5 km",
  },
  {
    id: 7,
    name: "Rizgary Hospital",
    email: "",
    telephone: "+964 66 227 3882",
    address: "Peshawa Qazi, Erbil",
    region: "Erbil",
    facilityType: "Public",
    type: "hospital",
    specialty: "General Surgery",
    institution: "Rizgary Hospital",
    location: "Erbil",
    phone: "+964 66 227 3882",
    prescribingPotential: "Medium",
    productInterest: ["Surgical Instruments", "General Equipment"],
    lastVisit: "2024-01-12",
    nextVisit: "2024-02-12",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 0,
      samples: 4,
      sponsorships: 0,
    },
    engagementScore: 75,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 36.1911, lng: 44.0092 },
    status: "completed",
    checkIn: "09:45 AM",
    checkOut: "10:30 AM",
    duration: "45m",
    purpose: "Surgical equipment assessment",
    notes: "Need for updated surgical tools",
    distance: "2.8 km",
  },
  {
    id: 8,
    name: "Shifa Hospital",
    email: "",
    telephone: "+964 66 253 2225",
    address: "100 Meters Road, Qazi Mohaammed, Erbil",
    region: "Erbil",
    facilityType: "Private",
    type: "hospital",
    specialty: "Pediatrics",
    institution: "Shifa Hospital",
    location: "Erbil",
    phone: "+964 66 253 2225",
    prescribingPotential: "High",
    productInterest: ["Pediatric Equipment", "Child Care Devices"],
    lastVisit: "2024-01-28",
    nextVisit: "2024-02-28",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 2,
      samples: 8,
      sponsorships: 1,
    },
    engagementScore: 87,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 36.1911, lng: 44.0092 },
    status: "in-progress",
    checkIn: "11:15 AM",
    checkOut: null,
    duration: "30m",
    purpose: "Pediatric equipment demonstration",
    notes: "",
    distance: "4.0 km",
  },
  {
    id: 9,
    name: "Daik Hospital",
    email: "daikhospital@gmail.com",
    telephone: "+964 66 227 0479",
    address: "Koya Road, Erbil",
    region: "Erbil",
    facilityType: "Private",
    type: "hospital",
    specialty: "Neurology",
    institution: "Daik Hospital",
    location: "Erbil",
    phone: "+964 66 227 0479",
    prescribingPotential: "Very High",
    productInterest: ["NeuroFlow", "BrainScan Pro"],
    lastVisit: "2024-01-30",
    nextVisit: "2024-02-28",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 3,
      samples: 12,
      sponsorships: 2,
    },
    engagementScore: 94,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 36.1911, lng: 44.0092 },
    status: "completed",
    checkIn: "08:00 AM",
    checkOut: "09:30 AM",
    duration: "1h 30m",
    purpose: "Neurology equipment presentation",
    notes: "Excellent response to new neuro devices",
    distance: "3.2 km",
  },
  {
    id: 10,
    name: "Life Support Team Medical Services",
    email: "info@lst-medic.com",
    telephone: "+964 750 881 0102 / 3",
    address: "Italian Village, Erbil",
    region: "Erbil",
    facilityType: "Private",
    type: "distributor",
    specialty: "Emergency Services",
    institution: "Life Support Team Medical Services",
    location: "Erbil",
    phone: "+964 750 881 0102",
    prescribingPotential: "N/A",
    productInterest: ["Emergency Equipment", "Life Support Systems"],
    lastVisit: "2024-01-14",
    nextVisit: "2024-02-14",
    complianceStatus: "Review Required",
    sunshineAct: {
      gifts: 0,
      samples: 0,
      sponsorships: 0,
    },
    engagementScore: 78,
    avatar: "/modern-city-building.png",
    coordinates: { lat: 36.1911, lng: 44.0092 },
    status: "scheduled",
    checkIn: null,
    checkOut: null,
    duration: "1h 00m",
    purpose: "Emergency equipment distribution agreement",
    notes: "",
    distance: "6.5 km",
  },
  {
    id: 11,
    name: "Azadi Teaching Hospital",
    email: "it@duhokhealth.org",
    telephone: "+964 722 4061 / 722 4074",
    address: "Duhok",
    region: "Duhok",
    facilityType: "Public",
    type: "hospital",
    specialty: "Teaching Hospital",
    institution: "Azadi Teaching Hospital",
    location: "Duhok",
    phone: "+964 722 4061",
    prescribingPotential: "High",
    productInterest: ["Educational Equipment", "Training Devices"],
    lastVisit: "2024-01-16",
    nextVisit: "2024-02-16",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 1,
      samples: 5,
      sponsorships: 0,
    },
    engagementScore: 80,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 36.8667, lng: 42.9833 },
    status: "completed",
    checkIn: "10:30 AM",
    checkOut: "11:45 AM",
    duration: "1h 15m",
    purpose: "Teaching equipment presentation",
    notes: "Interested in educational medical devices",
    distance: "8.2 km",
  },
  {
    id: 12,
    name: "Shar Hospital",
    email: "info@sharteachinghospital.com",
    telephone: "+964 533 364 011 / 2, +964 772 727 1919",
    address: "Malik Mahmud Ring Road, Sulaymaniyah",
    region: "Sulaymaniyah",
    facilityType: "Public",
    type: "hospital",
    specialty: "Teaching Hospital",
    institution: "Shar Hospital",
    location: "Sulaymaniyah",
    phone: "+964 533 364 011",
    prescribingPotential: "High",
    productInterest: ["Research Equipment", "Advanced Diagnostics"],
    lastVisit: "2024-01-24",
    nextVisit: "2024-02-24",
    complianceStatus: "Compliant",
    sunshineAct: {
      gifts: 2,
      samples: 7,
      sponsorships: 1,
    },
    engagementScore: 85,
    avatar: "/caring-doctor.png",
    coordinates: { lat: 35.5611, lng: 45.4408 },
    status: "completed",
    checkIn: "09:00 AM",
    checkOut: "10:15 AM",
    duration: "1h 15m",
    purpose: "Research equipment discussion",
    notes: "High potential for research collaboration",
    distance: "7.8 km",
  },
]

// Helper functions
export const getHCPsByRegion = (region: string) => {
  return hcpList.filter(hcp => hcp.region === region)
}

export const getHCPsByType = (type: string) => {
  return hcpList.filter(hcp => hcp.type === type)
}

export const getHCPsByFacilityType = (facilityType: 'Public' | 'Private') => {
  return hcpList.filter(hcp => hcp.facilityType === facilityType)
}

export const getHCPById = (id: number) => {
  return hcpList.find(hcp => hcp.id === id)
}

export const searchHCPs = (query: string) => {
  const lowerQuery = query.toLowerCase()
  return hcpList.filter(hcp => 
    hcp.name.toLowerCase().includes(lowerQuery) ||
    hcp.institution.toLowerCase().includes(lowerQuery) ||
    hcp.region.toLowerCase().includes(lowerQuery) ||
    hcp.specialty?.toLowerCase().includes(lowerQuery) ||
    hcp.address.toLowerCase().includes(lowerQuery)
  )
}

// Get unique regions for filtering
export const getRegions = () => {
  return [...new Set(hcpList.map(hcp => hcp.region))]
}

// Get unique specialties for filtering
export const getSpecialties = () => {
  return [...new Set(hcpList.map(hcp => hcp.specialty).filter(Boolean))]
}

// Get unique facility types
export const getFacilityTypes = () => {
  return [...new Set(hcpList.map(hcp => hcp.facilityType))]
}
