export interface TestResult {
  test_name: string
  actual_result: number | string
  lower_limit: number | string
  upper_limit: number | string
  unit: string
  acceptance_status: "Pass" | "Fail" | "Warning" | "Pending"
  completion_date: string
  method: string
  operator: string
  notes?: string
}

export interface TestCategory {
  name: string
  tests: TestResult[]
  completion_percentage: number
  overall_status: "Pass" | "Fail" | "Warning" | "In Progress"
}

export interface ProjectTestData {
  project_name: string
  project_id: string
  project_phase: string
  overall_completion: number
  overall_status: "Pass" | "Fail" | "Warning" | "In Progress"
  test_categories: TestCategory[]
}

export const projectATestResults: ProjectTestData = {
  project_name: "mAb Project A - Therapeutic Antibody Development",
  project_id: "MAB-A-001",
  project_phase: "Phase II Clinical Development",
  overall_completion: 78,
  overall_status: "In Progress",
  test_categories: [
    {
      name: "Pharmacokinetics/Pharmacodynamics",
      completion_percentage: 85,
      overall_status: "Pass",
      tests: [
        // Biological Activity
        {
          test_name: "Binding Affinity (ELISA)",
          actual_result: 0.25,
          lower_limit: 0.1,
          upper_limit: 0.5,
          unit: "nM",
          acceptance_status: "Pass",
          completion_date: "2024-12-08",
          method: "ELISA-001",
          operator: "Dr. Sarah Chen"
        },
        {
          test_name: "Binding Affinity (SPR/Biacore)",
          actual_result: 0.18,
          lower_limit: 0.1,
          upper_limit: 0.4,
          unit: "nM",
          acceptance_status: "Pass",
          completion_date: "2024-12-07",
          method: "SPR-BIA-002",
          operator: "Dr. Michael Rodriguez"
        },
        {
          test_name: "Cell-based Potency Assay",
          actual_result: 95.2,
          lower_limit: 80,
          upper_limit: 120,
          unit: "% relative potency",
          acceptance_status: "Pass",
          completion_date: "2024-12-09",
          method: "CELL-POT-003",
          operator: "Dr. Emily Watson"
        },
        {
          test_name: "Neutralization Assays",
          actual_result: 92.8,
          lower_limit: 85,
          upper_limit: 110,
          unit: "% neutralization",
          acceptance_status: "Pass",
          completion_date: "2024-12-06",
          method: "NEUT-001",
          operator: "Dr. James Liu"
        },
        // Physicochemical
        {
          test_name: "Isoelectric Focusing (IEF)",
          actual_result: "8.2-8.4",
          lower_limit: "8.0",
          upper_limit: "8.6",
          unit: "pI",
          acceptance_status: "Pass",
          completion_date: "2024-12-05",
          method: "IEF-004",
          operator: "Dr. Anna Kowalski"
        },
        {
          test_name: "Mass Spectrometry for PTMs",
          actual_result: 149246.2,
          lower_limit: 149200,
          upper_limit: 149300,
          unit: "Da",
          acceptance_status: "Pass",
          completion_date: "2024-12-04",
          method: "MS-PTM-005",
          operator: "Dr. Robert Kim"
        },
        // Pharmacological
        {
          test_name: "In vivo PK Study (Animal Models)",
          actual_result: 168,
          lower_limit: 120,
          upper_limit: 200,
          unit: "hours",
          acceptance_status: "Pass",
          completion_date: "2024-11-28",
          method: "PK-ANIM-006",
          operator: "Dr. Lisa Thompson",
          notes: "Half-life within expected range for therapeutic efficacy"
        },
        {
          test_name: "Population PK Modeling",
          actual_result: "Pending",
          lower_limit: "TBD",
          upper_limit: "TBD",
          unit: "Model fit",
          acceptance_status: "Pending",
          completion_date: "2024-12-15",
          method: "POP-PK-007",
          operator: "Dr. Maria Gonzalez"
        }
      ]
    },
    {
      name: "Stability",
      completion_percentage: 90,
      overall_status: "Pass",
      tests: [
        // Biological Activity
        {
          test_name: "Accelerated Stability Potency Assay",
          actual_result: 97.5,
          lower_limit: 90,
          upper_limit: 110,
          unit: "% initial potency",
          acceptance_status: "Pass",
          completion_date: "2024-12-03",
          method: "STAB-POT-008",
          operator: "Dr. David Park"
        },
        {
          test_name: "Forced Degradation Bioassay",
          actual_result: 88.2,
          lower_limit: 80,
          upper_limit: 120,
          unit: "% activity retained",
          acceptance_status: "Pass",
          completion_date: "2024-12-02",
          method: "FORCE-DEG-009",
          operator: "Dr. Jennifer Adams"
        },
        // Physicochemical
        {
          test_name: "Differential Scanning Calorimetry (DSC)",
          actual_result: 71.5,
          lower_limit: 65,
          upper_limit: 80,
          unit: "°C",
          acceptance_status: "Pass",
          completion_date: "2024-12-01",
          method: "DSC-010",
          operator: "Dr. Kevin Wright"
        },
        {
          test_name: "Dynamic Light Scattering (DLS)",
          actual_result: 8.2,
          lower_limit: 5,
          upper_limit: 12,
          unit: "nm",
          acceptance_status: "Pass",
          completion_date: "2024-11-30",
          method: "DLS-011",
          operator: "Dr. Sophie Martinez"
        },
        {
          test_name: "Size Exclusion Chromatography (SEC-HPLC)",
          actual_result: 98.7,
          lower_limit: 95,
          upper_limit: 99.5,
          unit: "% monomer",
          acceptance_status: "Pass",
          completion_date: "2024-11-29",
          method: "SEC-HPLC-012",
          operator: "Dr. Thomas Anderson"
        }
      ]
    },
    {
      name: "Half-life / Clearance",
      completion_percentage: 75,
      overall_status: "Warning",
      tests: [
        {
          test_name: "FcRn Binding Assay",
          actual_result: 2.8,
          lower_limit: 1.5,
          upper_limit: 5.0,
          unit: "nM KD",
          acceptance_status: "Pass",
          completion_date: "2024-11-25",
          method: "FCRN-013",
          operator: "Dr. Rachel Green"
        },
        {
          test_name: "Serum Half-life Studies",
          actual_result: 18.5,
          lower_limit: 14,
          upper_limit: 28,
          unit: "days",
          acceptance_status: "Warning",
          completion_date: "2024-11-20",
          method: "HALF-LIFE-014",
          operator: "Dr. Mark Taylor",
          notes: "Slightly below target range, monitoring required"
        },
        {
          test_name: "Clearance Rate Measurements",
          actual_result: 0.45,
          lower_limit: 0.2,
          upper_limit: 0.6,
          unit: "mL/min/kg",
          acceptance_status: "Pass",
          completion_date: "2024-11-18",
          method: "CLEAR-015",
          operator: "Dr. Nicole Brown"
        }
      ]
    },
    {
      name: "Immunogenicity",
      completion_percentage: 60,
      overall_status: "In Progress",
      tests: [
        {
          test_name: "Anti-Drug Antibody (ADA) Assay",
          actual_result: 2.1,
          lower_limit: 0,
          upper_limit: 5,
          unit: "% positive samples",
          acceptance_status: "Pass",
          completion_date: "2024-11-15",
          method: "ADA-016",
          operator: "Dr. Christopher Lee"
        },
        {
          test_name: "T-cell Proliferation Assay",
          actual_result: "In Progress",
          lower_limit: "< 2.0",
          upper_limit: "N/A",
          unit: "Stimulation Index",
          acceptance_status: "Pending",
          completion_date: "2024-12-20",
          method: "T-CELL-017",
          operator: "Dr. Amanda White"
        },
        {
          test_name: "Cytokine Release Assay",
          actual_result: "Pending",
          lower_limit: "TBD",
          upper_limit: "TBD",
          unit: "pg/mL",
          acceptance_status: "Pending",
          completion_date: "2024-12-22",
          method: "CYT-REL-018",
          operator: "Dr. Steven Davis"
        }
      ]
    },
    {
      name: "Efficacy / Mechanism of Action",
      completion_percentage: 95,
      overall_status: "Pass",
      tests: [
        {
          test_name: "ADCC (Antibody-Dependent Cellular Cytotoxicity)",
          actual_result: 78.5,
          lower_limit: 60,
          upper_limit: 90,
          unit: "% specific lysis",
          acceptance_status: "Pass",
          completion_date: "2024-11-10",
          method: "ADCC-019",
          operator: "Dr. Patricia Wilson"
        },
        {
          test_name: "CDC (Complement-Dependent Cytotoxicity)",
          actual_result: 65.2,
          lower_limit: 50,
          upper_limit: 80,
          unit: "% specific lysis",
          acceptance_status: "Pass",
          completion_date: "2024-11-08",
          method: "CDC-020",
          operator: "Dr. Joseph Miller"
        },
        {
          test_name: "Apoptosis Induction Assay",
          actual_result: 82.1,
          lower_limit: 70,
          upper_limit: 90,
          unit: "% apoptotic cells",
          acceptance_status: "Pass",
          completion_date: "2024-11-05",
          method: "APOP-021",
          operator: "Dr. Laura Garcia"
        },
        {
          test_name: "Receptor Blocking Assay",
          actual_result: 95.8,
          lower_limit: 85,
          upper_limit: 99,
          unit: "% receptor occupancy",
          acceptance_status: "Pass",
          completion_date: "2024-11-03",
          method: "REC-BLOCK-022",
          operator: "Dr. Daniel Johnson"
        }
      ]
    },
    {
      name: "Safety / Toxicology",
      completion_percentage: 45,
      overall_status: "In Progress",
      tests: [
        {
          test_name: "Single-dose Toxicity Studies",
          actual_result: "No adverse effects",
          lower_limit: "NOAEL",
          upper_limit: "N/A",
          unit: "mg/kg",
          acceptance_status: "Pass",
          completion_date: "2024-10-25",
          method: "TOX-SINGLE-023",
          operator: "Dr. Michelle Clark"
        },
        {
          test_name: "Repeated-dose Toxicity Studies",
          actual_result: "In Progress",
          lower_limit: "NOAEL",
          upper_limit: "N/A",
          unit: "mg/kg",
          acceptance_status: "Pending",
          completion_date: "2025-01-15",
          method: "TOX-REPEAT-024",
          operator: "Dr. Brian Rodriguez"
        },
        {
          test_name: "Cytokine Storm Simulation",
          actual_result: "Pending",
          lower_limit: "< 2x baseline",
          upper_limit: "N/A",
          unit: "fold increase",
          acceptance_status: "Pending",
          completion_date: "2025-01-20",
          method: "CYT-STORM-025",
          operator: "Dr. Kelly Martinez"
        }
      ]
    },
    {
      name: "Manufacturability / Quality Control",
      completion_percentage: 88,
      overall_status: "Pass",
      tests: [
        {
          test_name: "High-Performance Liquid Chromatography (HPLC)",
          actual_result: 99.2,
          lower_limit: 95,
          upper_limit: 102,
          unit: "% purity",
          acceptance_status: "Pass",
          completion_date: "2024-12-09",
          method: "HPLC-026",
          operator: "Dr. Gregory Turner"
        },
        {
          test_name: "Lot Release Potency Assay",
          actual_result: 103.5,
          lower_limit: 90,
          upper_limit: 110,
          unit: "% label claim",
          acceptance_status: "Pass",
          completion_date: "2024-12-08",
          method: "LOT-POT-027",
          operator: "Dr. Sandra Hernandez"
        },
        {
          test_name: "Host Cell Protein (HCP) ELISA",
          actual_result: 15.2,
          lower_limit: 0,
          upper_limit: 100,
          unit: "ng/mg",
          acceptance_status: "Pass",
          completion_date: "2024-12-07",
          method: "HCP-ELISA-028",
          operator: "Dr. Charles Wilson"
        },
        {
          test_name: "Batch-to-Batch Comparability Studies",
          actual_result: "Comparable",
          lower_limit: "Within specs",
          upper_limit: "N/A",
          unit: "Similarity index",
          acceptance_status: "Pass",
          completion_date: "2024-12-05",
          method: "BATCH-COMP-029",
          operator: "Dr. Diana Lopez"
        }
      ]
    }
  ]
}

export const testsByEffect = {
  "tests_by_effect": {
    "Pharmacokinetics/Pharmacodynamics": {
      "categories": {
        "Biological Activity": [
          "Binding Affinity (ELISA, SPR/Biacore)",
          "Cell-based Potency Assay",
          "Neutralization Assays"
        ],
        "Physicochemical": [
          "Isoelectric Focusing (IEF)",
          "Mass Spectrometry for PTMs",
          "Capillary Electrophoresis"
        ],
        "Pharmacological": [
          "In vivo PK Study (Animal Models)",
          "Population PK Modeling",
          "Dose-Response Curve Analysis"
        ],
        "Structural": [
          "X-ray Crystallography of Fab",
          "Cryo-EM of mAb Complex",
          "Circular Dichroism (CD) Spectroscopy"
        ]
      }
    },
    "Stability": {
      "categories": {
        "Biological Activity": [
          "Accelerated Stability Potency Assay",
          "Forced Degradation Bioassay"
        ],
        "Physicochemical": [
          "Differential Scanning Calorimetry (DSC)",
          "Dynamic Light Scattering (DLS)",
          "Size Exclusion Chromatography (SEC-HPLC)"
        ],
        "Structural": [
          "Aggregation Analysis",
          "Conformational Stability (FTIR, Raman)",
          "Secondary Structure Mapping"
        ],
        "Regulatory/Quality": [
          "ICH Stability Testing",
          "Forced Degradation under Stress Conditions",
          "Real-time Shelf-life Studies"
        ]
      }
    },
    "Half-life / Clearance": {
      "categories": {
        "Biological Activity": [
          "FcRn Binding Assay",
          "Neonatal Receptor Recycling Test"
        ],
        "Physicochemical": [
          "Glycosylation Profile (HILIC-UPLC, MS)",
          "Fc Effector Function Analysis"
        ],
        "Pharmacological": [
          "Serum Half-life Studies",
          "Clearance Rate Measurements"
        ]
      }
    },
    "Immunogenicity": {
      "categories": {
        "Immunological": [
          "Anti-Drug Antibody (ADA) Assay",
          "T-cell Proliferation Assay",
          "Cytokine Release Assay"
        ],
        "Biological Activity": [
          "Epitope Mapping",
          "Peptide-MHC Binding Studies"
        ],
        "Regulatory/Quality": [
          "GLP Immunogenicity Testing",
          "In vitro Immunogenic Risk Assessment"
        ]
      }
    },
    "Efficacy / Mechanism of Action": {
      "categories": {
        "Biological Activity": [
          "ADCC (Antibody-Dependent Cellular Cytotoxicity)",
          "CDC (Complement-Dependent Cytotoxicity)",
          "Apoptosis Induction Assay"
        ],
        "Functional": [
          "Receptor Blocking Assay",
          "Signal Pathway Inhibition Test"
        ],
        "Physicochemical": [
          "Fc Glycan Analysis",
          "Oligomerization State"
        ],
        "Structural": [
          "Epitope-Paratope Interaction Mapping",
          "Conformation Analysis of Binding Regions"
        ]
      }
    },
    "Safety / Toxicology": {
      "categories": {
        "Immunological": [
          "Cytokine Storm Simulation",
          "Off-target Binding Assay"
        ],
        "Toxicology": [
          "Single-dose Toxicity Studies",
          "Repeated-dose Toxicity Studies",
          "Organ Histopathology"
        ],
        "Physicochemical": [
          "Impurity Profiling (LC-MS)",
          "Host Cell Protein (HCP) ELISA",
          "Residual DNA Analysis"
        ],
        "Regulatory/Quality": [
          "GLP Safety Testing",
          "Regulatory Toxicology Compliance"
        ]
      }
    },
    "Manufacturability / Quality Control": {
      "categories": {
        "Physicochemical": [
          "High-Performance Liquid Chromatography (HPLC)",
          "Capillary Electrophoresis",
          "Mass Spectrometry for Impurities"
        ],
        "Structural": [
          "Disulfide Bond Mapping",
          "Glycan Structural Characterization"
        ],
        "Functional": [
          "Lot Release Potency Assay",
          "Consistency in Batch Potency"
        ],
        "Regulatory/Quality": [
          "cGMP Lot Release Testing",
          "ICH Q6B Compliance",
          "Batch-to-Batch Comparability Studies"
        ]
      }
    }
  }
} 