
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";

// Interface for roadmap data
export interface RoadmapData {
  education: string;
  careerGoal: string;
  stages: {
    name: string;
    description: string;
    courses: Array<{
      title: string;
      links: Array<{
        type: string;
        url: string;
      }>
    }>;
    skills: string[];
    projects: string[];
    examInfo?: {
      exams: string[];
      targetRanks?: string;
      examDates?: string;
      eligibility?: string;
    };
    colleges?: string[];
    alternativePaths?: string[];
  }[];
  timeline: {
    foundation: string;
    intermediate: string;
    advanced: string;
    total: string;
  };
}

// Interface for educational path data
export interface EducationalPath {
  nextSteps: string[];
  streamOptions: string[];
  entranceExams: Array<{
    name: string;
    targetRank: string;
    examMonth: string;
    eligibility: string;
  }>;
  collegeOptions: Array<{
    tier: string;
    examples: string[];
  }>;
}

// Educational paths based on current level and career goal
export const educationalPaths: Record<string, Record<string, EducationalPath>> = {
  "10th Grade": {
    "Doctor": {
      nextSteps: ["12th Grade (BiPC)", "Intermediate with Biology", "Pre-Medical Course"],
      streamOptions: ["BiPC (Biology, Physics, Chemistry)", "PCMB (Physics, Chemistry, Math, Biology)"],
      entranceExams: [
        {
          name: "NEET",
          targetRank: "Under 10,000 for Government Medical Colleges",
          examMonth: "May",
          eligibility: "12th with 50% in PCB"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["AIIMS", "JIPMER", "CMC Vellore"]
        },
        {
          tier: "Medium",
          examples: ["Government Medical Colleges", "State Universities"]
        }
      ]
    },
    "Software Developer": {
      nextSteps: ["12th Grade (Science/MPC)", "Diploma in Computer Science"],
      streamOptions: ["MPC (Math, Physics, Chemistry)", "PCM (Physics, Chemistry, Mathematics)"],
      entranceExams: [
        {
          name: "JEE Main",
          targetRank: "Under 15,000 for NITs, IIITs",
          examMonth: "January, April",
          eligibility: "12th with 75% in PCM"
        },
        {
          name: "State Engineering Entrance Exams (e.g., EAMCET)",
          targetRank: "Under 5,000 for top state colleges",
          examMonth: "May",
          eligibility: "12th with PCM"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IITs", "NITs", "BITS Pilani", "IIITs"]
        },
        {
          tier: "Medium",
          examples: ["State Engineering Colleges", "Deemed Universities"]
        }
      ]
    },
    "IAS Officer": {
      nextSteps: ["12th Grade (Any stream)", "Bachelor's Degree (Any discipline)"],
      streamOptions: ["Arts/Humanities", "Science", "Commerce"],
      entranceExams: [
        {
          name: "College Entrance Exams (Varies by college and course)",
          targetRank: "Depends on the college",
          examMonth: "Various",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["Delhi University", "JNU", "St. Stephen's College"]
        },
        {
          tier: "Medium",
          examples: ["State Universities", "Government Colleges"]
        }
      ]
    },
    "Engineer": {
      nextSteps: ["12th Grade (Science/MPC)", "Diploma in Engineering", "Polytechnic"],
      streamOptions: ["MPC (Math, Physics, Chemistry)", "PCM with Computer Science"],
      entranceExams: [
        {
          name: "JEE Main",
          targetRank: "Under 15,000 for NITs, IIITs",
          examMonth: "January, April",
          eligibility: "12th with 75% in PCM"
        },
        {
          name: "JEE Advanced (for IITs)",
          targetRank: "Under 10,000",
          examMonth: "May/June",
          eligibility: "Qualification in JEE Main"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IITs", "NITs", "BITS Pilani"]
        },
        {
          tier: "Medium",
          examples: ["State Engineering Colleges", "Deemed Universities"]
        }
      ]
    },
    "Lawyer": {
      nextSteps: ["12th Grade (Any stream, preferably Arts with legal studies)", "5-year integrated law course"],
      streamOptions: ["Arts/Humanities", "Commerce", "Science"],
      entranceExams: [
        {
          name: "CLAT (Common Law Admission Test)",
          targetRank: "Under 500 for NLUs",
          examMonth: "May",
          eligibility: "12th with 45-50% marks"
        },
        {
          name: "AILET (for NLU Delhi)",
          targetRank: "Under 100",
          examMonth: "May",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi"]
        },
        {
          tier: "Medium",
          examples: ["State NLUs", "Government Law Colleges"]
        }
      ]
    },
    "Chartered Accountant": {
      nextSteps: ["12th Grade (Commerce with Mathematics)", "CA Foundation Course"],
      streamOptions: ["Commerce with Mathematics", "Commerce with Economics"],
      entranceExams: [
        {
          name: "CA Foundation",
          targetRank: "Pass (50% marks)",
          examMonth: "May, November",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["SRCC Delhi", "St. Xavier's Mumbai", "Christ University Bangalore"]
        },
        {
          tier: "Medium",
          examples: ["Commerce colleges in state universities"]
        }
      ]
    },
    "Data Scientist": {
      nextSteps: ["12th Grade (Science with Mathematics)", "Bachelor's in Computer Science/Statistics/Mathematics"],
      streamOptions: ["MPC (Math, Physics, Chemistry)", "PCM with Computer Science"],
      entranceExams: [
        {
          name: "JEE Main",
          targetRank: "Under 20,000 for decent engineering colleges",
          examMonth: "January, April",
          eligibility: "12th with PCM"
        },
        {
          name: "CUET (for central universities)",
          targetRank: "Top 5%",
          examMonth: "May",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IITs", "NITs", "IIITs", "ISI Kolkata", "CMI Chennai"]
        },
        {
          tier: "Medium",
          examples: ["State Universities", "Deemed Universities offering BSc in Mathematics/Statistics"]
        }
      ]
    },
    "Designer": {
      nextSteps: ["12th Grade (Any stream, preferably with drawing/art)", "Bachelor's in Design/Visual Arts"],
      streamOptions: ["Arts with Design", "Any stream with creative subjects"],
      entranceExams: [
        {
          name: "UCEED (for IIT Design Programs)",
          targetRank: "Top 10%",
          examMonth: "January",
          eligibility: "12th pass"
        },
        {
          name: "NID DAT",
          targetRank: "Top tier",
          examMonth: "January",
          eligibility: "12th pass"
        },
        {
          name: "NIFT Entrance",
          targetRank: "Top 10%",
          examMonth: "February",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["NID Ahmedabad", "IIT Bombay IDC", "NIFT Delhi"]
        },
        {
          tier: "Medium",
          examples: ["State Arts/Design Colleges", "Private Design Institutes"]
        }
      ]
    }
  },
  "12th Grade (Science)": {
    "Doctor": {
      nextSteps: ["MBBS", "BDS", "BAMS", "BHMS"],
      streamOptions: ["Medical College"],
      entranceExams: [
        {
          name: "NEET",
          targetRank: "Under 10,000 for Government Medical Colleges",
          examMonth: "May",
          eligibility: "12th with 50% in PCB"
        },
        {
          name: "AIIMS Entrance",
          targetRank: "Top 1%",
          examMonth: "May",
          eligibility: "12th with PCB"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["AIIMS", "JIPMER", "CMC Vellore"]
        },
        {
          tier: "Medium",
          examples: ["Government Medical Colleges", "State Universities"]
        }
      ]
    },
    "Software Developer": {
      nextSteps: ["B.Tech/B.E. in Computer Science/IT", "B.Tech in related fields", "BCA"],
      streamOptions: ["Engineering College", "Computer Applications"],
      entranceExams: [
        {
          name: "JEE Main",
          targetRank: "Under 15,000 for NITs, IIITs",
          examMonth: "January, April",
          eligibility: "12th with 75% in PCM"
        },
        {
          name: "JEE Advanced (for IITs)",
          targetRank: "Under 10,000",
          examMonth: "May/June",
          eligibility: "Qualification in JEE Main"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IITs", "NITs", "BITS Pilani", "IIITs"]
        },
        {
          tier: "Medium",
          examples: ["State Engineering Colleges", "Deemed Universities"]
        }
      ]
    },
    "Engineer": {
      nextSteps: ["B.Tech/B.E. in relevant engineering discipline"],
      streamOptions: ["Engineering College"],
      entranceExams: [
        {
          name: "JEE Main",
          targetRank: "Under 15,000 for NITs, IIITs",
          examMonth: "January, April",
          eligibility: "12th with 75% in PCM"
        },
        {
          name: "JEE Advanced (for IITs)",
          targetRank: "Under 10,000",
          examMonth: "May/June",
          eligibility: "Qualification in JEE Main"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IITs", "NITs", "BITS Pilani"]
        },
        {
          tier: "Medium",
          examples: ["State Engineering Colleges", "Deemed Universities"]
        }
      ]
    },
    "Data Scientist": {
      nextSteps: ["B.Tech in Computer Science", "BSc in Mathematics/Statistics", "BSc in Data Science"],
      streamOptions: ["Engineering", "Pure Sciences", "Specialized Data Science Programs"],
      entranceExams: [
        {
          name: "JEE Main",
          targetRank: "Under 20,000 for decent engineering colleges",
          examMonth: "January, April",
          eligibility: "12th with PCM"
        },
        {
          name: "CUET (for central universities)",
          targetRank: "Top 5%",
          examMonth: "May",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IITs", "NITs", "IIITs", "ISI Kolkata", "CMI Chennai"]
        },
        {
          tier: "Medium",
          examples: ["State Universities", "Deemed Universities offering BSc in Mathematics/Statistics"]
        }
      ]
    }
  },
  "12th Grade (Commerce)": {
    "Chartered Accountant": {
      nextSteps: ["B.Com", "BBA", "CA Foundation simultaneously"],
      streamOptions: ["Commerce College", "CA Coaching"],
      entranceExams: [
        {
          name: "CA Foundation",
          targetRank: "Pass (50% marks)",
          examMonth: "May, November",
          eligibility: "12th pass"
        },
        {
          name: "College entrance exams (for top commerce colleges)",
          targetRank: "Varies by college",
          examMonth: "Various",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["SRCC Delhi", "St. Xavier's Mumbai", "Christ University Bangalore"]
        },
        {
          tier: "Medium",
          examples: ["Commerce colleges in state universities"]
        }
      ]
    },
    "IAS Officer": {
      nextSteps: ["Bachelor's Degree (B.Com/BBA/BA Economics)", "UPSC preparation"],
      streamOptions: ["Commerce College", "General Studies"],
      entranceExams: [
        {
          name: "College Entrance Exams (Varies by college)",
          targetRank: "Depends on the college",
          examMonth: "Various",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["SRCC Delhi", "St. Xavier's Mumbai", "Christ University Bangalore"]
        },
        {
          tier: "Medium",
          examples: ["State Universities", "Government Colleges"]
        }
      ]
    },
    "Lawyer": {
      nextSteps: ["5-year integrated law course (BBA LLB, B.Com LLB)", "3-year LLB after graduation"],
      streamOptions: ["Law College"],
      entranceExams: [
        {
          name: "CLAT (Common Law Admission Test)",
          targetRank: "Under 500 for NLUs",
          examMonth: "May",
          eligibility: "12th with 45-50% marks"
        },
        {
          name: "AILET (for NLU Delhi)",
          targetRank: "Under 100",
          examMonth: "May",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi"]
        },
        {
          tier: "Medium",
          examples: ["State NLUs", "Government Law Colleges"]
        }
      ]
    }
  },
  "12th Grade (Arts)": {
    "IAS Officer": {
      nextSteps: ["Bachelor's Degree (BA in History/Political Science/Economics/Sociology)", "UPSC preparation"],
      streamOptions: ["Arts/Humanities College", "General Studies"],
      entranceExams: [
        {
          name: "College Entrance Exams (Varies by college)",
          targetRank: "Depends on the college",
          examMonth: "Various",
          eligibility: "12th pass"
        },
        {
          name: "CUET (for central universities)",
          targetRank: "Top 10%",
          examMonth: "May",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["Delhi University", "JNU", "St. Stephen's College"]
        },
        {
          tier: "Medium",
          examples: ["State Universities", "Government Colleges"]
        }
      ]
    },
    "Lawyer": {
      nextSteps: ["5-year integrated law course (BA LLB)", "3-year LLB after graduation"],
      streamOptions: ["Law College"],
      entranceExams: [
        {
          name: "CLAT (Common Law Admission Test)",
          targetRank: "Under 500 for NLUs",
          examMonth: "May",
          eligibility: "12th with 45-50% marks"
        },
        {
          name: "AILET (for NLU Delhi)",
          targetRank: "Under 100",
          examMonth: "May",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi"]
        },
        {
          tier: "Medium",
          examples: ["State NLUs", "Government Law Colleges"]
        }
      ]
    },
    "Designer": {
      nextSteps: ["Bachelor's in Design/Fine Arts/Visual Communication"],
      streamOptions: ["Design College", "Art School"],
      entranceExams: [
        {
          name: "UCEED (for IIT Design Programs)",
          targetRank: "Top 10%",
          examMonth: "January",
          eligibility: "12th pass"
        },
        {
          name: "NID DAT",
          targetRank: "Top tier",
          examMonth: "January",
          eligibility: "12th pass"
        },
        {
          name: "NIFT Entrance",
          targetRank: "Top 10%",
          examMonth: "February",
          eligibility: "12th pass"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["NID Ahmedabad", "IIT Bombay IDC", "NIFT Delhi"]
        },
        {
          tier: "Medium",
          examples: ["State Arts/Design Colleges", "Private Design Institutes"]
        }
      ]
    }
  },
  "BTech/BE": {
    "Software Developer": {
      nextSteps: ["Entry-level developer jobs", "Internships", "Master's in Computer Science"],
      streamOptions: ["Employment", "Higher Education", "Startups"],
      entranceExams: [
        {
          name: "GATE (for M.Tech/MS in India)",
          targetRank: "Under 1000",
          examMonth: "February",
          eligibility: "B.Tech/BE degree"
        },
        {
          name: "GRE (for MS abroad)",
          targetRank: "320+ for top universities",
          examMonth: "Year-round",
          eligibility: "Bachelor's degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IISc", "IITs", "US/European Universities"]
        },
        {
          tier: "Medium",
          examples: ["NITs", "IIITs", "State Universities"]
        }
      ]
    },
    "Data Scientist": {
      nextSteps: ["Entry-level data analyst roles", "Master's in Data Science/AI", "Specialized bootcamps"],
      streamOptions: ["Employment", "Higher Education", "Specialized Training"],
      entranceExams: [
        {
          name: "GATE (for M.Tech/MS in India)",
          targetRank: "Under 1000",
          examMonth: "February",
          eligibility: "B.Tech/BE degree"
        },
        {
          name: "GRE (for MS abroad)",
          targetRank: "320+ for top universities",
          examMonth: "Year-round",
          eligibility: "Bachelor's degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IISc", "IITs", "US/European Universities with Data Science programs"]
        },
        {
          tier: "Medium",
          examples: ["NITs", "IIITs", "State Universities with Data Science programs"]
        }
      ]
    },
    "Engineer": {
      nextSteps: ["Entry-level engineering jobs", "Master's in specific engineering discipline", "Public sector jobs"],
      streamOptions: ["Employment", "Higher Education", "Public Sector"],
      entranceExams: [
        {
          name: "GATE (for M.Tech/MS in India)",
          targetRank: "Under 1000",
          examMonth: "February",
          eligibility: "B.Tech/BE degree"
        },
        {
          name: "GRE (for MS abroad)",
          targetRank: "320+ for top universities",
          examMonth: "Year-round",
          eligibility: "Bachelor's degree"
        },
        {
          name: "ESE (Engineering Services Examination)",
          targetRank: "Top 100",
          examMonth: "June",
          eligibility: "B.Tech/BE degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IISc", "IITs", "US/European Universities"]
        },
        {
          tier: "Medium",
          examples: ["NITs", "State Universities"]
        }
      ]
    },
    "IAS Officer": {
      nextSteps: ["UPSC CSE preparation", "Optional subject selection", "Prelims, Mains, Interview preparation"],
      streamOptions: ["UPSC Coaching", "Self-preparation"],
      entranceExams: [
        {
          name: "UPSC Civil Services Examination",
          targetRank: "Under 700-1000 for IAS",
          examMonth: "Prelims in June, Mains in September",
          eligibility: "Bachelor's degree in any discipline"
        }
      ],
      collegeOptions: []
    }
  },
  "BSc": {
    "Data Scientist": {
      nextSteps: ["MSc in Data Science/Statistics", "Data Analyst roles", "Specialized certifications"],
      streamOptions: ["Higher Education", "Entry-level Jobs", "Certifications"],
      entranceExams: [
        {
          name: "JAM (for MSc at IITs/IISc)",
          targetRank: "Top 300",
          examMonth: "February",
          eligibility: "BSc degree"
        },
        {
          name: "University-specific entrance tests for MSc",
          targetRank: "Varies by university",
          examMonth: "Various",
          eligibility: "BSc degree"
        },
        {
          name: "GRE (for MS abroad)",
          targetRank: "320+ for top universities",
          examMonth: "Year-round",
          eligibility: "Bachelor's degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IISc", "IITs with MSc programs", "ISI Kolkata", "CMI Chennai"]
        },
        {
          tier: "Medium",
          examples: ["Central Universities", "State Universities with good Math/Stats departments"]
        }
      ]
    },
    "Doctor": {
      nextSteps: ["MBBS through lateral entry (rare)", "MSc in relevant biological science", "Research"],
      streamOptions: ["Medical Research", "Biomedical Sciences"],
      entranceExams: [
        {
          name: "CSIR-UGC NET for JRF/Lectureship",
          targetRank: "Top 10%",
          examMonth: "June, December",
          eligibility: "BSc/MSc in Life Sciences"
        },
        {
          name: "University-specific entrance for MSc",
          targetRank: "Varies by university",
          examMonth: "Various",
          eligibility: "BSc degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["AIIMS Research", "NCBS Bangalore", "TIFR", "IISc"]
        },
        {
          tier: "Medium",
          examples: ["Central Universities", "State Universities with good Life Science departments"]
        }
      ]
    },
    "IAS Officer": {
      nextSteps: ["UPSC CSE preparation", "Optional subject selection", "Prelims, Mains, Interview preparation"],
      streamOptions: ["UPSC Coaching", "Self-preparation"],
      entranceExams: [
        {
          name: "UPSC Civil Services Examination",
          targetRank: "Under 700-1000 for IAS",
          examMonth: "Prelims in June, Mains in September",
          eligibility: "Bachelor's degree in any discipline"
        }
      ],
      collegeOptions: []
    }
  },
  "BCom": {
    "Chartered Accountant": {
      nextSteps: ["CA Intermediate", "CA Final", "Articleship"],
      streamOptions: ["CA Path", "Other Professional Courses"],
      entranceExams: [
        {
          name: "CA Intermediate",
          targetRank: "Pass (50% marks)",
          examMonth: "May, November",
          eligibility: "CA Foundation pass"
        },
        {
          name: "CA Final",
          targetRank: "Pass (50% marks)",
          examMonth: "May, November",
          eligibility: "CA Intermediate pass and articleship"
        }
      ],
      collegeOptions: []
    },
    "IAS Officer": {
      nextSteps: ["UPSC CSE preparation", "Optional subject selection", "Prelims, Mains, Interview preparation"],
      streamOptions: ["UPSC Coaching", "Self-preparation"],
      entranceExams: [
        {
          name: "UPSC Civil Services Examination",
          targetRank: "Under 700-1000 for IAS",
          examMonth: "Prelims in June, Mains in September",
          eligibility: "Bachelor's degree in any discipline"
        }
      ],
      collegeOptions: []
    },
    "Lawyer": {
      nextSteps: ["3-year LLB", "Judicial Services Exam preparation"],
      streamOptions: ["Law College", "Legal Practice"],
      entranceExams: [
        {
          name: "CLAT PG (for LLM)",
          targetRank: "Under 500",
          examMonth: "May",
          eligibility: "LLB degree"
        },
        {
          name: "University-specific LLB entrance exams",
          targetRank: "Varies by university",
          examMonth: "Various",
          eligibility: "Bachelor's degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["Faculty of Law, Delhi University", "GLC Mumbai", "ILS Pune"]
        },
        {
          tier: "Medium",
          examples: ["State Universities Law Departments", "Private Law Colleges"]
        }
      ]
    }
  },
  "BA": {
    "IAS Officer": {
      nextSteps: ["UPSC CSE preparation", "Optional subject selection", "Prelims, Mains, Interview preparation"],
      streamOptions: ["UPSC Coaching", "Self-preparation"],
      entranceExams: [
        {
          name: "UPSC Civil Services Examination",
          targetRank: "Under 700-1000 for IAS",
          examMonth: "Prelims in June, Mains in September",
          eligibility: "Bachelor's degree in any discipline"
        }
      ],
      collegeOptions: []
    },
    "Lawyer": {
      nextSteps: ["3-year LLB", "Judicial Services Exam preparation"],
      streamOptions: ["Law College", "Legal Practice"],
      entranceExams: [
        {
          name: "CLAT PG (for LLM)",
          targetRank: "Under 500",
          examMonth: "May",
          eligibility: "LLB degree"
        },
        {
          name: "University-specific LLB entrance exams",
          targetRank: "Varies by university",
          examMonth: "Various",
          eligibility: "Bachelor's degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["Faculty of Law, Delhi University", "GLC Mumbai", "ILS Pune"]
        },
        {
          tier: "Medium",
          examples: ["State Universities Law Departments", "Private Law Colleges"]
        }
      ]
    },
    "Designer": {
      nextSteps: ["Master's in Design", "Entry-level design jobs", "Portfolio development"],
      streamOptions: ["Higher Education", "Professional Practice", "Freelancing"],
      entranceExams: [
        {
          name: "CEED (Common Entrance Exam for Design - for MDes at IITs)",
          targetRank: "Top tier",
          examMonth: "January",
          eligibility: "Bachelor's degree"
        },
        {
          name: "University-specific MDes entrance exams",
          targetRank: "Varies by institution",
          examMonth: "Various",
          eligibility: "Bachelor's degree"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["IDC IIT Bombay", "NID PG Programs", "IISc CPDM"]
        },
        {
          tier: "Medium",
          examples: ["State Design Schools", "Private Design Institutes"]
        }
      ]
    }
  },
  "Diploma": {
    "Engineer": {
      nextSteps: ["Direct entry to 2nd year B.Tech/BE", "Diploma level jobs", "Advanced Diploma"],
      streamOptions: ["Higher Education", "Employment", "Specialization"],
      entranceExams: [
        {
          name: "State-specific lateral entry exams",
          targetRank: "Varies by state",
          examMonth: "Various",
          eligibility: "Diploma in relevant engineering discipline"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["NITs (through lateral entry)", "Good State Engineering Colleges"]
        },
        {
          tier: "Medium",
          examples: ["State Universities", "Private Engineering Colleges"]
        }
      ]
    },
    "Software Developer": {
      nextSteps: ["Direct entry to 2nd year BCA/B.Tech", "Entry-level programming jobs", "Certifications"],
      streamOptions: ["Higher Education", "Employment", "Certifications"],
      entranceExams: [
        {
          name: "State-specific lateral entry exams",
          targetRank: "Varies by state",
          examMonth: "Various",
          eligibility: "Diploma in Computer Science/IT"
        }
      ],
      collegeOptions: [
        {
          tier: "Top",
          examples: ["NITs (through lateral entry)", "Good State Engineering Colleges"]
        },
        {
          tier: "Medium",
          examples: ["State Universities", "Private Engineering Colleges"]
        }
      ]
    },
    "Designer": {
      nextSteps: ["Bachelor's in Design", "Entry-level design jobs", "Freelancing"],
      streamOptions: ["Higher Education", "Employment", "Freelancing"],
      entranceExams: [
        {
          name: "University-specific design entrance exams",
          targetRank: "Varies by institution",
          examMonth: "Various",
          eligibility: "Diploma in Design/Art"
        }
      ],
      collegeOptions: [
        {
          tier: "Medium",
          examples: ["State Design Schools", "Private Design Institutes"]
        }
      ]
    }
  },
  "Other": {
    "default": {
      nextSteps: ["Identify specific educational requirements", "Skill enhancement", "Bridging courses"],
      streamOptions: ["Formal Education", "Skill Development", "Experience Building"],
      entranceExams: [
        {
          name: "Field-specific entrance exams",
          targetRank: "Varies by field",
          examMonth: "Various",
          eligibility: "Varies by exam"
        }
      ],
      collegeOptions: [
        {
          tier: "Various",
          examples: ["Depends on specific field and career goal"]
        }
      ]
    }
  }
};

// Career-specific roadmap data templates
export const careerRoadmapTemplates: Record<string, Partial<RoadmapData>> = {
  "Software Developer": {
    stages: [
      {
        name: "Foundation",
        description: "Build core programming knowledge and understanding of computer science fundamentals",
        courses: [
          { 
            title: "Introduction to Programming", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          },
          { 
            title: "Data Structures and Algorithms", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          }
        ],
        skills: ["Problem Solving", "Basic Programming", "Logical Thinking"],
        projects: ["Simple Calculator", "To-Do List App"],
        examInfo: {
          exams: ["JEE Main", "State Engineering Entrance Exams"],
          targetRanks: "Under 15,000 for good colleges",
          examDates: "January, April, May",
          eligibility: "12th with PCM"
        },
        colleges: ["IITs", "NITs", "BITS Pilani", "IIITs"],
        alternativePaths: ["Coding Bootcamps", "Self-learning + Certifications", "Polytechnic → Lateral Entry"]
      },
      {
        name: "Intermediate",
        description: "Deepen programming skills and gain practical project experience",
        courses: [
          { 
            title: "Web Development Fundamentals", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          },
          { 
            title: "Database Management", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          }
        ],
        skills: ["HTML/CSS", "JavaScript", "SQL", "Git"],
        projects: ["Personal Portfolio Website", "E-commerce Store Frontend"],
        examInfo: {
          exams: ["Semester Exams", "Coding Competitions"],
          targetRanks: "Good academic standing",
          examDates: "As per university calendar",
          eligibility: "Enrolled students"
        },
        colleges: ["Continue in the same institution"],
        alternativePaths: ["Internships", "Open Source Contributions", "Freelancing"]
      },
      {
        name: "Advanced",
        description: "Specialize in specific technologies and prepare for professional roles",
        courses: [
          { 
            title: "Full Stack Development", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          },
          { 
            title: "DevOps and CI/CD", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          }
        ],
        skills: ["React/Angular/Vue", "Node.js", "Docker", "Cloud Services"],
        projects: ["Full Stack Web Application", "Mobile App with API Integration"],
        examInfo: {
          exams: ["Technical Interviews", "Coding Assessments"],
          targetRanks: "N/A",
          examDates: "N/A",
          eligibility: "N/A"
        },
        colleges: ["N/A - Focus on employment or higher education"],
        alternativePaths: ["Master's in CS", "Startup", "Specialized Certifications"]
      }
    ],
    timeline: {
      foundation: "3 months",
      intermediate: "6 months",
      advanced: "9 months",
      total: "18 months"
    }
  },
  "Doctor": {
    stages: [
      {
        name: "Foundation",
        description: "Build strong fundamentals in biology and science subjects",
        courses: [
          { 
            title: "Biology and Chemistry Fundamentals", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=0RRVV4Diomg" }] 
          },
          { 
            title: "Human Anatomy and Physiology", 
            links: [{ type: "Free Course", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology" }] 
          }
        ],
        skills: ["Science Fundamentals", "Memorization", "Focus & Discipline"],
        projects: ["Human Anatomy Studies", "Biology Research Paper"],
        examInfo: {
          exams: ["NEET", "AIIMS Entrance"],
          targetRanks: "Under 10,000 for Government Medical Colleges",
          examDates: "May each year",
          eligibility: "12th with 50% in PCB"
        },
        colleges: ["AIIMS", "JIPMER", "Government Medical Colleges", "Private Medical Colleges"],
        alternativePaths: ["BDS (Dentistry)", "BAMS (Ayurveda)", "BHMS (Homeopathy)", "Allied Health Sciences"]
      },
      {
        name: "Intermediate",
        description: "Complete MBBS education and build clinical knowledge",
        courses: [
          { 
            title: "MBBS Core Subjects", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/DrNajeebLectures" }] 
          },
          { 
            title: "Medical Ethics", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/learn/medical-ethics" }] 
          }
        ],
        skills: ["Patient Care", "Clinical Diagnostics", "Medical Decision-Making"],
        projects: ["Health Awareness Camp", "Hospital Rotations"],
        examInfo: {
          exams: ["MBBS Professional Exams", "USMLE Step 1 (if planning for US)"],
          targetRanks: "Pass with good standing",
          examDates: "As per university calendar",
          eligibility: "Enrolled MBBS students"
        },
        colleges: ["Continue in the same medical institution"],
        alternativePaths: ["Research Opportunities", "Medical Conferences", "Additional Certifications"]
      },
      {
        name: "Advanced",
        description: "Specialize in specific medical field through post-graduate studies",
        courses: [
          { 
            title: "NEET PG Preparation", 
            links: [{ type: "Online Course", url: "https://www.marrow.com/" }] 
          },
          { 
            title: "Specialty Training", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/MedicalWorldIndia" }] 
          }
        ],
        skills: ["Advanced Diagnostics", "Specialized Procedures", "Research Methodology"],
        projects: ["Medical Research", "Specialty Clerkships"],
        examInfo: {
          exams: ["NEET PG", "DNB", "USMLE (for US)"],
          targetRanks: "Top 10,000 for MD/MS seats",
          examDates: "January",
          eligibility: "MBBS degree with internship completion"
        },
        colleges: ["Top PG Medical Institutions", "Specialty Hospitals"],
        alternativePaths: ["Medical Officer Jobs", "Hospital Administration", "Medical Research", "Public Health"]
      }
    ],
    timeline: {
      foundation: "12 months",
      intermediate: "54 months",
      advanced: "36 months",
      total: "102 months"
    }
  },
  "Data Scientist": {
    stages: [
      {
        name: "Foundation",
        description: "Build strong fundamentals in mathematics, statistics and basic programming",
        courses: [
          { 
            title: "Statistics and Probability", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" }] 
          },
          { 
            title: "Programming with Python", 
            links: [{ type: "Online Course", url: "https://www.datacamp.com/tracks/python-programmer" }] 
          }
        ],
        skills: ["Math Fundamentals", "Python Programming", "Data Analysis"],
        projects: ["Data Cleaning Project", "Exploratory Data Analysis"],
        examInfo: {
          exams: ["JEE Main (for BTech)", "JAM (for MSc)", "University Entrance Tests"],
          targetRanks: "Under 20,000 for good engineering colleges",
          examDates: "January, April, May",
          eligibility: "12th with PCM/Mathematics"
        },
        colleges: ["IITs", "NITs", "ISI Kolkata", "CMI Chennai", "BITS Pilani"],
        alternativePaths: ["BSc in Mathematics/Statistics", "BCA with strong math focus", "Online Certification Path"]
      },
      {
        name: "Intermediate",
        description: "Develop advanced data analysis skills and machine learning knowledge",
        courses: [
          { 
            title: "Machine Learning Fundamentals", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN" }] 
          },
          { 
            title: "Data Visualization", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/specializations/data-visualization" }] 
          }
        ],
        skills: ["Machine Learning Algorithms", "Data Visualization", "SQL", "Feature Engineering"],
        projects: ["Predictive Model", "Interactive Dashboard"],
        examInfo: {
          exams: ["Semester Exams", "Hackathons", "Kaggle Competitions"],
          targetRanks: "Good academic standing, competition rankings",
          examDates: "As per university calendar, various for competitions",
          eligibility: "Enrolled students"
        },
        colleges: ["Continue in the same institution"],
        alternativePaths: ["Internships", "Research Positions", "Industry Projects"]
      },
      {
        name: "Advanced",
        description: "Specialize in advanced ML techniques and industry applications",
        courses: [
          { 
            title: "Deep Learning", 
            links: [{ type: "Online Course", url: "https://www.deeplearning.ai/courses/deep-learning-specialization/" }] 
          },
          { 
            title: "Big Data Technologies", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/playlist?list=PL9ooVrP1hQOFrYxqxb0NJCdCABPZNo0pD" }] 
          }
        ],
        skills: ["Deep Learning", "Big Data Processing", "Model Deployment", "Business Analysis"],
        projects: ["Complex ML System", "Industry-Specific Data Project"],
        examInfo: {
          exams: ["GATE CS/Math/Statistics (for higher education in India)", "GRE (for MS abroad)"],
          targetRanks: "GATE: Under 1000, GRE: 320+ for top universities",
          examDates: "GATE: February, GRE: Year-round",
          eligibility: "Bachelor's degree"
        },
        colleges: ["IISc", "IITs for MTech/MS", "Top US/European Universities"],
        alternativePaths: ["Industry Jobs", "Specialized Certifications", "Research Positions"]
      }
    ],
    timeline: {
      foundation: "4 months",
      intermediate: "8 months",
      advanced: "12 months",
      total: "24 months"
    }
  },
  "Engineer": {
    stages: [
      {
        name: "Foundation",
        description: "Build strong fundamentals in mathematics, physics and basic engineering concepts",
        courses: [
          { 
            title: "Mathematics and Physics", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/JEEengineeringMainsAdvanced" }] 
          },
          { 
            title: "Engineering Drawing", 
            links: [{ type: "Online Course", url: "https://www.nptel.ac.in/courses/112/103/112103019/" }] 
          }
        ],
        skills: ["Mathematics", "Physics", "Problem Solving"],
        projects: ["Basic Engineering Designs", "Physics Projects"],
        examInfo: {
          exams: ["JEE Main", "JEE Advanced (for IITs)", "State Engineering Entrance Tests"],
          targetRanks: "Under 15,000 for NITs, IIITs, under 10,000 for IITs",
          examDates: "January, April, May/June",
          eligibility: "12th with 75% in PCM"
        },
        colleges: ["IITs", "NITs", "BITS Pilani", "State Engineering Colleges"],
        alternativePaths: ["Diploma → Lateral Entry", "Vocational Training", "Defense Technical Entry"]
      },
      {
        name: "Intermediate",
        description: "Develop specialized engineering knowledge and practical skills",
        courses: [
          { 
            title: "Engineering Mechanics", 
            links: [{ type: "Online Course", url: "https://www.nptel.ac.in/courses/112/105/112105268/" }] 
          },
          { 
            title: "Discipline-specific Core Courses", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/nptelhrd" }] 
          }
        ],
        skills: ["Engineering Analysis", "Design Principles", "Laboratory Skills", "Technical Drawing"],
        projects: ["Engineering Models", "Design Projects", "Technical Workshops"],
        examInfo: {
          exams: ["Semester Exams", "GATE (preparation)", "Technical Competitions"],
          targetRanks: "Good academic standing",
          examDates: "As per university calendar",
          eligibility: "Enrolled students"
        },
        colleges: ["Continue in the same institution"],
        alternativePaths: ["Internships", "Industrial Training", "Minor Specializations"]
      },
      {
        name: "Advanced",
        description: "Master advanced engineering concepts and prepare for professional roles",
        courses: [
          { 
            title: "Advanced Engineering Specialization", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/MITOpenCourseWare" }] 
          },
          { 
            title: "Project Management", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/professional-certificates/google-project-management" }] 
          }
        ],
        skills: ["Specialized Engineering Skills", "Project Management", "Team Leadership"],
        projects: ["Capstone Engineering Project", "Industry-sponsored Project"],
        examInfo: {
          exams: ["GATE (for M.Tech/PSU jobs)", "ESE (Engineering Services)", "GRE (for MS abroad)"],
          targetRanks: "GATE: Under 1000, ESE: Top 100, GRE: 320+ for top universities",
          examDates: "GATE: February, ESE: June, GRE: Year-round",
          eligibility: "Bachelor's degree in Engineering"
        },
        colleges: ["IITs", "IISc", "NITs", "Foreign Universities"],
        alternativePaths: ["Industry Jobs", "PSU Employment", "Entrepreneurship", "Research"]
      }
    ],
    timeline: {
      foundation: "12 months",
      intermediate: "24 months",
      advanced: "24 months",
      total: "60 months"
    }
  },
  "IAS Officer": {
    stages: [
      {
        name: "Foundation",
        description: "Build strong fundamentals in general studies and current affairs",
        courses: [
          { 
            title: "General Studies Foundation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/StudyIQeducation" }] 
          },
          { 
            title: "Indian Polity & Constitution", 
            links: [{ type: "Online Course", url: "https://www.unacademy.com/goal/upsc-civil-services-examination-ias-preparation/KSCGY" }] 
          }
        ],
        skills: ["Reading Comprehension", "Critical Thinking", "Current Affairs Analysis"],
        projects: ["Daily Newspaper Analysis", "NCERT Book Summaries"],
        examInfo: {
          exams: ["Bachelor's Degree Entrance Exams", "College-level Exams"],
          targetRanks: "Depends on the college/university",
          examDates: "Various",
          eligibility: "12th pass"
        },
        colleges: ["Delhi University", "JNU", "St. Stephen's College", "Top State Universities"],
        alternativePaths: ["Any Bachelor's Degree (Arts/Science/Commerce/Engineering)", "Direct UPSC Preparation"]
      },
      {
        name: "Intermediate",
        description: "Master UPSC syllabus and develop answer writing skills",
        courses: [
          { 
            title: "UPSC Prelims Preparation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/UnacademyUPSC" }] 
          },
          { 
            title: "Economy & International Relations", 
            links: [{ type: "Online Course", url: "https://www.cleariasexam.com/course" }] 
          }
        ],
        skills: ["MCQ Solving", "Map Reading", "Memorization Techniques"],
        projects: ["Mock Tests", "Subject-wise Notes Compilation"],
        examInfo: {
          exams: ["College Degree Completion", "UPSC CSE Prelims Practice"],
          targetRanks: "N/A",
          examDates: "N/A",
          eligibility: "Undergraduate students"
        },
        colleges: ["Continue in the same institution"],
        alternativePaths: ["Optional Subject Specialization", "Coaching Institutes", "Self-Study"]
      },
      {
        name: "Advanced",
        description: "Prepare intensively for UPSC CSE and develop specialized knowledge",
        courses: [
          { 
            title: "UPSC Mains Answer Writing", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/ShouldersOfGiants" }] 
          },
          { 
            title: "Essay & Optional Subject", 
            links: [{ type: "Online Course", url: "https://iasscore.in/upsc-coaching" }] 
          }
        ],
        skills: ["Essay Writing", "Opinion Formation", "Interview Skills"],
        projects: ["Answer Writing Practice", "Mock Interviews"],
        examInfo: {
          exams: ["UPSC Civil Services Examination (Prelims, Mains, Interview)"],
          targetRanks: "Under 100 for IAS, under 1000 for other civil services",
          examDates: "Prelims in June, Mains in September-October, Interview in March-May",
          eligibility: "Bachelor's degree in any discipline"
        },
        colleges: ["N/A - UPSC preparation phase"],
        alternativePaths: ["State Civil Services", "Other Government Exams (SSC, Banking, Railways)", "Private Sector"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "6 months",
      total: "24 months"
    }
  },
  "Lawyer": {
    stages: [
      {
        name: "Foundation",
        description: "Build strong fundamentals in legal studies and critical thinking",
        courses: [
          { 
            title: "Introduction to Legal Studies", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/LexCliq" }] 
          },
          { 
            title: "Indian Constitution", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/learn/introduction-to-law" }] 
          }
        ],
        skills: ["Reading Comprehension", "Logical Reasoning", "Critical Analysis"],
        projects: ["Case Studies", "Legal Document Analysis"],
        examInfo: {
          exams: ["CLAT", "AILET", "Other Law Entrance Exams"],
          targetRanks: "Under 500 for NLUs, under 100 for top NLUs",
          examDates: "May-June",
          eligibility: "12th with 45-50% marks"
        },
        colleges: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLU Delhi", "Other NLUs", "Government Law Colleges"],
        alternativePaths: ["BA LLB", "BBA LLB", "B.Com LLB", "3-year LLB after graduation"]
      },
      {
        name: "Intermediate",
        description: "Develop specialized legal knowledge and practical skills",
        courses: [
          { 
            title: "Legal Research Methods", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/LegalEdge" }] 
          },
          { 
            title: "Moot Court Preparation", 
            links: [{ type: "Online Course", url: "https://lawsikho.com/" }] 
          }
        ],
        skills: ["Legal Writing", "Case Analysis", "Time Management"],
        projects: ["Moot Court Competitions", "Legal Aid Clinics", "Internships"],
        examInfo: {
          exams: ["Semester Exams", "Moot Court Competitions"],
          targetRanks: "Good academic standing",
          examDates: "As per university calendar",
          eligibility: "Enrolled law students"
        },
        colleges: ["Continue in the same institution"],
        alternativePaths: ["Internships", "Research Assistant Roles", "NGO Work"]
      },
      {
        name: "Advanced",
        description: "Prepare for legal practice and develop specialized expertise",
        courses: [
          { 
            title: "Specialized Law Fields", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/FinologyLegal" }] 
          },
          { 
            title: "Court Procedures", 
            links: [{ type: "Online Course", url: "https://www.udemy.com/course/practical-course-on-criminal-trial/" }] 
          }
        ],
        skills: ["Argument Formation", "Client Consultation", "Court Etiquette"],
        projects: ["Moot Court", "Legal Internship", "Drafting Legal Documents"],
        examInfo: {
          exams: ["All India Bar Examination", "Judicial Services Examination"],
          targetRanks: "Pass (for AIBE), Top ranks for Judicial Services",
          examDates: "Various (AIBE held multiple times a year)",
          eligibility: "LLB degree"
        },
        colleges: ["N/A - Professional phase"],
        alternativePaths: ["Law Firm Practice", "Corporate Legal Counsel", "Academic/Research", "Judicial Services"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "36 months",
      total: "54 months"
    }
  },
  "Chartered Accountant": {
    stages: [
      {
        name: "Foundation",
        description: "Build strong fundamentals in accounting, business mathematics and economics",
        courses: [
          { 
            title: "Accounting Fundamentals", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/CANareshAggarwal" }] 
          },
          { 
            title: "Business Mathematics", 
            links: [{ type: "Online Course", url: "https://www.superprofs.com/courses/ca-foundation/" }] 
          }
        ],
        skills: ["Numerical Ability", "Logical Reasoning", "Basic Accounting"],
        projects: ["Journal Entry Practice", "Company Financial Statement Analysis"],
        examInfo: {
          exams: ["CA Foundation", "B.Com/BBA Entrance (if pursuing simultaneously)"],
          targetRanks: "Pass (50% marks)",
          examDates: "May, November",
          eligibility: "12th pass"
        },
        colleges: ["ICAI Registered Coaching Centers", "Top Commerce Colleges (if pursuing B.Com)"],
        alternativePaths: ["B.Com + CA", "Direct Entry (for Commerce Graduates)", "CS + CA"]
      },
      {
        name: "Intermediate",
        description: "Develop advanced accounting knowledge and begin practical training",
        courses: [
          { 
            title: "Advanced Accounting", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/CAGeniusEducation" }] 
          },
          { 
            title: "Taxation and Corporate Laws", 
            links: [{ type: "Online Course", url: "https://www.selfstudys.com/ca/intermediate" }] 
          }
        ],
        skills: ["Financial Statement Preparation", "Tax Calculation", "Audit Planning"],
        projects: ["Tax Filing Practice", "Audit Documentation"],
        examInfo: {
          exams: ["CA Intermediate (Both Groups)"],
          targetRanks: "Pass (50% aggregate, 40% in each subject)",
          examDates: "May, November",
          eligibility: "CA Foundation pass"
        },
        colleges: ["N/A - CA coaching and articleship"],
        alternativePaths: ["Articleship", "Part-time B.Com completion", "Additional certifications"]
      },
      {
        name: "Advanced",
        description: "Complete professional training and prepare for final examination",
        courses: [
          { 
            title: "CA Final Preparation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/CAclubindia" }] 
          },
          { 
            title: "Corporate Finance", 
            links: [{ type: "Online Course", url: "https://www.cakart.in/" }] 
          }
        ],
        skills: ["Advanced Taxation", "Corporate Auditing", "Financial Management"],
        projects: ["Articleship", "Corporate Tax Planning", "Audit Report Preparation"],
        examInfo: {
          exams: ["CA Final (Both Groups)"],
          targetRanks: "Pass (50% aggregate, 40% in each subject)",
          examDates: "May, November",
          eligibility: "CA Intermediate pass and completed articleship"
        },
        colleges: ["N/A - CA Final coaching"],
        alternativePaths: ["Accounting Firms", "Corporate Finance", "Independent Practice", "Specialized Certifications"]
      }
    ],
    timeline: {
      foundation: "8 months",
      intermediate: "18 months",
      advanced: "30 months",
      total: "56 months"
    }
  },
  "Designer": {
    stages: [
      {
        name: "Foundation",
        description: "Build strong fundamentals in design principles and visual arts",
        courses: [
          { 
            title: "Design Principles & Color Theory", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/TheDesignAcademy" }] 
          },
          { 
            title: "Introduction to Adobe Suite", 
            links: [{ type: "Online Course", url: "https://www.udemy.com/course/graphic-design-masterclass/" }] 
          }
        ],
        skills: ["Visual Thinking", "Color Theory", "Typography"],
        projects: ["Logo Design", "Poster Creation"],
        examInfo: {
          exams: ["UCEED", "NID DAT", "NIFT Entrance", "CEED (for PG)"],
          targetRanks: "Top 10%",
          examDates: "January-February",
          eligibility: "12th pass (for UG programs)"
        },
        colleges: ["NID Ahmedabad", "IIT Bombay IDC", "NIFT Delhi", "State Art/Design Schools"],
        alternativePaths: ["Fine Arts Programs", "Self-learning + Portfolio", "Design Bootcamps"]
      },
      {
        name: "Intermediate",
        description: "Develop specialized design skills and build your portfolio",
        courses: [
          { 
            title: "UI/UX Design", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/JesseShowalter" }] 
          },
          { 
            title: "Motion Graphics", 
            links: [{ type: "Online Course", url: "https://www.domestika.org/en/courses/areas/3-design" }] 
          }
        ],
        skills: ["Prototyping", "User Research", "Interface Design"],
        projects: ["Mobile App Design", "Website Redesign"],
        examInfo: {
          exams: ["Semester Projects", "Portfolio Reviews"],
          targetRanks: "Good academic standing",
          examDates: "As per institution calendar",
          eligibility: "Enrolled design students"
        },
        colleges: ["Continue in the same institution"],
        alternativePaths: ["Internships", "Freelancing", "Competition Entries"]
      },
      {
        name: "Advanced",
        description: "Master specialized design skills and prepare for professional practice",
        courses: [
          { 
            title: "Design Systems", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/DesignCourse" }] 
          },
          { 
            title: "Brand Identity", 
            links: [{ type: "Online Course", url: "https://www.masterclass.com/classes/david-carson-teaches-graphic-design" }] 
          }
        ],
        skills: ["Design Leadership", "Art Direction", "Client Management"],
        projects: ["Complete Brand Identity", "Product Design", "Design Portfolio"],
        examInfo: {
          exams: ["Final Portfolio Review", "CEED (if pursuing MDes)"],
          targetRanks: "Outstanding portfolio",
          examDates: "As per institution calendar, January for CEED",
          eligibility: "Final year design students, Graduates for CEED"
        },
        colleges: ["MDes at IDC IIT Bombay", "Masters Programs Abroad"],
        alternativePaths: ["Design Agency", "In-house Design Team", "Freelance Career", "Design Entrepreneurship"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "18 months",
      total: "36 months"
    }
  },
  // Default roadmap as a fallback
  "default": {
    stages: [
      {
        name: "Foundation",
        description: "Build core knowledge and fundamental skills",
        courses: [
          { 
            title: "Core Fundamentals", 
            links: [{ type: "Online Course", url: "https://www.example.com/fundamentals" }] 
          }
        ],
        skills: ["Critical Thinking", "Communication", "Time Management"],
        projects: ["Self-assessment", "Skill Development Plan"],
        examInfo: {
          exams: ["Relevant entrance exams for your field"],
          targetRanks: "Varies by field",
          examDates: "Various",
          eligibility: "Depends on specific requirements"
        }
      },
      {
        name: "Intermediate",
        description: "Develop specialized knowledge and practical experience",
        courses: [
          { 
            title: "Field-Specific Knowledge", 
            links: [{ type: "Online Course", url: "https://www.example.com/specific-field" }] 
          }
        ],
        skills: ["Field-Specific Skills", "Problem Solving", "Collaboration"],
        projects: ["Field Research", "Portfolio Development"]
      },
      {
        name: "Advanced",
        description: "Master advanced concepts and prepare for professional practice",
        courses: [
          { 
            title: "Specialization", 
            links: [{ type: "Online Course", url: "https://www.example.com/specialization" }] 
          }
        ],
        skills: ["Advanced Techniques", "Leadership", "Industry Best Practices"],
        projects: ["Capstone Project", "Industry Networking"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "12 months",
      total: "30 months"
    }
  }
};

// Function to generate roadmap based on education and career goal
export const generateRoadmap = (education: string, careerGoal: string): RoadmapData => {
  // Get career-specific template or default if not found
  const template = careerRoadmapTemplates[careerGoal] || careerRoadmapTemplates["default"];
  
  // Create a complete roadmap data object
  const roadmapData: RoadmapData = {
    education,
    careerGoal,
    stages: template.stages || careerRoadmapTemplates["default"].stages!,
    timeline: template.timeline || careerRoadmapTemplates["default"].timeline!
  };

  // Enhancement: Add educational path information to stages
  const educationPaths = educationalPaths[education] || educationalPaths["Other"];
  const careerPath = educationPaths[careerGoal] || educationPaths["default"];
  
  if (careerPath) {
    // Enhance the first stage with educational path information
    if (roadmapData.stages[0]) {
      roadmapData.stages[0].examInfo = roadmapData.stages[0].examInfo || {
        exams: []
      };
      
      if (careerPath.entranceExams && careerPath.entranceExams.length > 0) {
        roadmapData.stages[0].examInfo.exams = careerPath.entranceExams.map(exam => exam.name);
        roadmapData.stages[0].examInfo.targetRanks = careerPath.entranceExams[0].targetRank;
        roadmapData.stages[0].examInfo.examDates = careerPath.entranceExams.map(exam => exam.examMonth).join(", ");
        roadmapData.stages[0].examInfo.eligibility = careerPath.entranceExams[0].eligibility;
      }
      
      if (careerPath.collegeOptions && careerPath.collegeOptions.length > 0) {
        const colleges = careerPath.collegeOptions.flatMap(option => option.examples);
        roadmapData.stages[0].colleges = colleges.length > 0 ? colleges : roadmapData.stages[0].colleges;
      }
      
      if (careerPath.nextSteps && careerPath.nextSteps.length > 0) {
        roadmapData.stages[0].alternativePaths = careerPath.nextSteps;
      }
    }
  }
  
  return roadmapData;
};

// Function to save roadmap data to local storage
export const saveRoadmap = (roadmapData: RoadmapData) => {
  try {
    localStorage.setItem(`roadmap-${roadmapData.careerGoal}`, JSON.stringify(roadmapData));
    toast({
      title: "Roadmap Saved",
      description: "Your roadmap has been saved successfully"
    });
    return true;
  } catch (error) {
    console.error("Error saving roadmap:", error);
    toast({
      title: "Save Failed",
      description: "There was an error saving your roadmap",
      variant: "destructive"
    });
    return false;
  }
};

// Function to download roadmap as PDF
export const downloadRoadmapAsPDF = async (elementId: string, fileName: string = "roadmap") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }
    
    toast({
      title: "Preparing PDF",
      description: "Creating your roadmap PDF..."
    });
    
    // Create canvas from the DOM element
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    // Calculate dimensions
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${fileName}.pdf`);
    
    toast({
      title: "PDF Downloaded",
      description: "Your roadmap PDF has been downloaded"
    });
    
    return true;
  } catch (error) {
    console.error("Error downloading roadmap as PDF:", error);
    toast({
      title: "Download Failed",
      description: "There was an error creating your PDF",
      variant: "destructive"
    });
    return false;
  }
};

// Function to share roadmap
export const shareRoadmap = async (data: { title: string, text: string, url: string }) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      toast({
        title: "Shared Successfully",
        description: "Your roadmap has been shared"
      });
      return true;
    } catch (error) {
      console.error("Error sharing roadmap:", error);
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: "Share Failed",
          description: "There was an error sharing your roadmap",
          variant: "destructive"
        });
      }
      return false;
    }
  } else {
    // Fallback for browsers that don't support the Web Share API
    return copyToClipboard(data.url);
  }
};

// Function to copy content to clipboard
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied",
      description: "Roadmap link copied to clipboard"
    });
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    toast({
      title: "Copy Failed",
      description: "Could not copy link to clipboard",
      variant: "destructive"
    });
    return false;
  }
};

// Function to mark a step as done
export const markStepAsDone = (stepId: string, isDone: boolean) => {
  try {
    const completedSteps = JSON.parse(localStorage.getItem('completedRoadmapSteps') || '{}');
    completedSteps[stepId] = isDone;
    localStorage.setItem('completedRoadmapSteps', JSON.stringify(completedSteps));
    
    if (isDone) {
      toast({
        title: "Step Completed",
        description: "This step has been marked as complete"
      });
    } else {
      toast({
        description: "Step has been marked as incomplete"
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error marking step as done:", error);
    toast({
      title: "Action Failed",
      description: "There was an error updating this step",
      variant: "destructive"
    });
    return false;
  }
};

// Function to check if a step is done
export const isStepDone = (stepId: string) => {
  try {
    const completedSteps = JSON.parse(localStorage.getItem('completedRoadmapSteps') || '{}');
    return !!completedSteps[stepId];
  } catch (error) {
    console.error("Error checking if step is done:", error);
    return false;
  }
};

// Function to get all saved roadmaps
export const getAllRoadmaps = () => {
  try {
    const roadmaps: RoadmapData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('roadmap-')) {
        const data = localStorage.getItem(key);
        if (data) {
          roadmaps.push(JSON.parse(data));
        }
      }
    }
    return roadmaps;
  } catch (error) {
    console.error("Error getting all roadmaps:", error);
    return [];
  }
};

// Function to navigate to roadmap from quiz results
export const viewRoadmapFromQuiz = (careerPath: string, navigate: any) => {
  if (careerPath) {
    navigate(`/roadmap/${encodeURIComponent(careerPath)}`);
  } else {
    navigate('/roadmap');
  }
};

// Function to navigate to messaging page
export const navigateToMessaging = (navigate: any, groupId?: string) => {
  navigate('/messaging');
  if (groupId) {
    // In a real app, you would store the groupId in state or context
    // and then access it in the messaging page to open the correct group
    localStorage.setItem('activeGroupId', groupId);
  }
};

// Function to navigate to mentors chat
export const askMentor = (navigate: any) => {
  navigate('/messaging');
  // In a real app, you would store the mentor group ID
  localStorage.setItem('activeGroupId', '3'); // ID of the mentor group
};
