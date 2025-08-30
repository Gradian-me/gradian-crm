export interface MedicalDevice {
  id: string
  name: string
  category: string
  description: string
  image: string
  price: string
  status: 'available' | 'out-of-stock' | 'discontinued'
  specifications: string[]
  manufacturer: string
  model: string
  warranty: string
  certifications: string[]
}

export const medicalDevices: MedicalDevice[] = [
  {
    id: "swt-001",
    name: "2025 New Upgraded Shockwave Therapy Machine",
    category: "Therapy Equipment",
    description: "Extracorporeal Shock Wave Therapy Device for Pain Relief, Muscle and Bone Tissue Regeneration, ESWT Shock Wave Therapy Machine for Home & Institution Use",
    image: "https://m.media-amazon.com/images/I/71Fq0aJkMVL._AC_UL320_.jpg",
    price: "$1,199.99",
    status: "available",
    specifications: [
      "ESWT technology for pain relief",
      "Muscle and bone tissue regeneration",
      "Home and institution use",
      "Advanced 2025 upgraded model"
    ],
    manufacturer: "Advanced Therapy Solutions",
    model: "ESWT-2025",
    warranty: "2 years",
    certifications: ["FDA Approved", "CE Marked", "ISO 13485"]
  },
  {
    id: "neck-002",
    name: "Heated Neck Traction Device with Red Light Therapy",
    category: "Physical Therapy",
    description: "Cervical Neck Stretcher for People with TMJ Tech Neck or Other Neck Issue, Ideal for Neck Pain Relief",
    image: "https://m.media-amazon.com/images/I/61XeLs26PZL._AC_UL320_.jpg",
    price: "$129.99",
    status: "available",
    specifications: [
      "Heated neck traction system",
      "Red light therapy integration",
      "TMJ and tech neck relief",
      "Adjustable traction settings"
    ],
    manufacturer: "NeckCare Pro",
    model: "NTR-2025",
    warranty: "1 year",
    certifications: ["FDA Approved", "CE Marked"]
  },
  {
    id: "tens-003",
    name: "3-in-1 TENS Unit with 32 Modes",
    category: "Pain Management",
    description: "Dual Channel EMS Muscle Stimulator with 40 Intensities for Gradual Pain Relief Therapy, Rechargeable Electronic Pulse Massager with 12 Electrode Pads, EVA Case",
    image: "https://m.media-amazon.com/images/I/81mWM4Ev6aL._AC_UL320_.jpg",
    price: "$32.99",
    status: "available",
    specifications: [
      "32 therapy modes",
      "Dual channel operation",
      "40 intensity levels",
      "12 electrode pads included"
    ],
    manufacturer: "PainRelief Tech",
    model: "TENS-3IN1",
    warranty: "1 year",
    certifications: ["FDA Approved", "CE Marked"]
  },
  {
    id: "swt-004",
    name: "Generic Shockwave Therapy Machine",
    category: "Therapy Equipment",
    description: "Extracorporeal Shock Wave Therapy Device 7in1 Focused Shockwave Therapy Machine Pain Relief at Home for Body Feet Knees, Silver",
    image: "https://m.media-amazon.com/images/I/713H9v1IxcL._AC_UL320_.jpg",
    price: "$195.99",
    status: "available",
    specifications: [
      "7-in-1 focused therapy",
      "Body, feet, and knees treatment",
      "Home use design",
      "Silver finish construction"
    ],
    manufacturer: "Generic Medical",
    model: "SWT-7IN1",
    warranty: "1 year",
    certifications: ["FDA Approved", "CE Marked"]
  }
]

export const deviceCategories = [
  "Therapy Equipment",
  "Physical Therapy", 
  "Pain Management",
  "Rehabilitation",
  "Home Healthcare",
  "Professional Medical",
  "Wellness Devices",
  "Alternative Medicine"
]

export const getDevicesByCategory = (category: string) => {
  return medicalDevices.filter(device => device.category === category)
}

export const getDeviceById = (id: string) => {
  return medicalDevices.find(device => device.id === id)
}

export const searchDevices = (query: string) => {
  const lowerQuery = query.toLowerCase()
  return medicalDevices.filter(device => 
    device.name.toLowerCase().includes(lowerQuery) ||
    device.description.toLowerCase().includes(lowerQuery) ||
    device.manufacturer.toLowerCase().includes(lowerQuery) ||
    device.category.toLowerCase().includes(lowerQuery)
  )
} 