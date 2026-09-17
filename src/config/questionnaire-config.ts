export type QuestionType =
    | "text"
    | "single"
    | "multi"
    | "textarea"
    | "ai"
    | "metrics"

export interface QuestionConfig {
    id: string
    number: number
    section: string
    text: string
    type: QuestionType
    options?: string[]
    required?: boolean
    isMain?: boolean
    dependency?: string
    relatedQuestions?: string[]
    display?: string
    condition?: {
        questionId: string
        operator: "equals" | "notEquals" | "contains"
        value: string
    }
}

/* =========================================================
   GROUP 1 — Q17
========================================================= */

const q17: QuestionConfig = {
    id: "q17",
    number: 17,
    section: "B. Website Objective & Target Audience",
    text: "Where do you mainly serve customers?",
    type: "multi",
    options: [
        "Neighbourhood",
        "Own City",
        "Multiple Cities",
        "State",
        "Multiple States",
        "Pan India",
        "South Asia",
        "International",
        "Global-Remote",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: ["q18", "q111"],
}

const q18: QuestionConfig = {
    id: "q18",
    number: 18,
    section: "B. Website Objective & Target Audience",
    text: "Where do customers normally engage/buy?",
    type: "multi",
    options: [
        "Store",
        "Office",
        "Factory",
        "Customer Location",
        "Phone",
        "WhatsApp",
        "Email",
        "Website",
        "Social Media",
        "Marketplace",
        "Dealer Network",
        "Distributor Network",
        "Online Meeting",
        "Mobile App",
    ],
    display: "Always",
}

const q111: QuestionConfig = {
    id: "q111",
    number: 111,
    section: "B. Website Objective & Target Audience",
    text: "Which website languages are required?",
    type: "single",
    options: [
        "English",
        "Hindi",
        "Bengali",
        "Marathi",
        "Gujarati",
        "Tamil",
        "Telugu",
        "Kannada",
        "Malayalam",
        "Punjabi",
        "Urdu",
        "Other",
    ],
    display: "Always",
}

/* =========================================================
   GROUP 2 — Q13
========================================================= */

const q13: QuestionConfig = {
    id: "q13",
    number: 13,
    section: "B. Website Objective & Target Audience",
    text: "What is the main purpose of this website?",
    type: "single",
    options: [
        "Company Profile",
        "Business Portfolio",
        "Product Catalogue",
        "Service Catalogue",
        "Lead Generation",
        "Enquiries",
        "Credibility",
        "Business Information",
        "Project Showcase",
        "Expertise Showcase",
        "Appointment Generation",
        "Dealer-Distributor Enquiries",
        "Recruitment",
        "Investor Information",
        "Online Presence",
        "Combination",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: ["q14"],
}

const q14: QuestionConfig = {
    id: "q14",
    number: 14,
    section: "B. Website Objective & Target Audience",
    text: "What secondary objectives should the website support?",
    type: "multi",
    options: [
        "Calls",
        "WhatsApp",
        "Quote Requests",
        "Contact Leads",
        "Appointment Requests",
        "Store Visits",
        "Product Discovery",
        "Service Discovery",
        "Brochure Downloads",
        "Portfolio",
        "Newsletter",
        "Social Growth",
        "Recruitment",
        "Dealer Applications",
        "Partnership",
        "Distributor Enquiries",
    ],
    display: "Always",
}

/* =========================================================
   GROUP 3 — Q19
========================================================= */

const q19: QuestionConfig = {
    id: "q19",
    number: 19,
    section: "B. Website Objective & Target Audience",
    text: "What should a website visitor mainly do?",
    type: "single",
    options: [
        "Call Now",
        "WhatsApp",
        "Contact Us",
        "Send Enquiry",
        "Request Quote",
        "Get Consultation",
        "Book Appointment",
        "View Products",
        "View Services",
        "View Portfolio",
        "Visit Store",
        "Download Brochure",
        "Apply Now",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: [
        "q20",
        "q21",
        "q99",
        "q100",
        "q101",
        "q150",
    ],
}

const q20: QuestionConfig = {
    id: "q20",
    number: 20,
    section: "B. Website Objective & Target Audience",
    text: "What is the usual customer buying process?",
    type: "single",
    options: [
        "Buy immediately",
        "Call first",
        "Request quotation",
        "Requirement discussion",
        "Consultation",
        "Demo",
        "Site visit",
        "Sample",
        "Negotiation",
        "Appointment",
        "Multiple approvals",
        "Depends",
    ],
}

const q21: QuestionConfig = {
    id: "q21",
    number: 21,
    section: "B. Website Objective & Target Audience",
    text: "What is your typical sales cycle?",
    type: "single",
    options: [
        "Immediate",
        "Same Day",
        "1–3 Days",
        "4–7 Days",
        "1–2 Weeks",
        "2–4 Weeks",
        "1–3 Months",
        "3+ Months",
        "Varies",
        "Not Sure",
    ],
}

const q99: QuestionConfig = {
    id: "q99",
    number: 99,
    section: "I. Contact, Location & Availability",
    text: "What kinds of leads are you interested in?",
    type: "single",
    options: [
        "Consumers",
        "Corporate Buyers",
        "Bulk Orders",
        "Dealers",
        "Distributors",
        "Franchise",
        "Suppliers",
        "Partnerships",
        "Investors",
        "Candidates",
        "General Enquiries",
    ],
}

const q100: QuestionConfig = {
    id: "q100",
    number: 100,
    section: "I. Contact, Location & Availability",
    text: "Do you provide an initial consultation?",
    type: "single",
    options: [
        "Free",
        "Free with Conditions",
        "Paid",
        "Not Required",
        "No",
    ],
}

const q101: QuestionConfig = {
    id: "q101",
    number: 101,
    section: "I. Contact, Location & Availability",
    text: "How are quotations/estimates handled?",
    type: "single",
    options: [
        "Free Quote",
        "Free Estimate",
        "After Requirement Discussion",
        "After Site Visit",
        "Paid Assessment",
        "Fixed Published Pricing",
        "Not Applicable",
    ],
}

const q150: QuestionConfig = {
    id: "q150",
    number: 150,
    section: "Website Conversion",
    text: "What should a successful visitor ideally do during one website visit?",
    type: "single",
    options: [
        "Understand Business",
        "Find Product",
        "Understand Service",
        "Compare Options",
        "Call",
        "WhatsApp",
        "Submit Lead",
        "Request Quote",
        "Book Appointment",
        "Purchase",
        "Download Information",
        "Visit Location",
    ],
}

/* =========================================================
   GROUP 4 — Q23
========================================================= */

const q23: QuestionConfig = {
    id: "q23",
    number: 23,
    section: "B. Website Objective & Target Audience",
    text: "What matters most to your customers?",
    type: "multi",
    options: [
        "Price",
        "Quality",
        "Reliability",
        "Speed",
        "Convenience",
        "Availability",
        "Expertise",
        "Customisation",
        "Trust",
        "Certifications",
        "Experience",
        "Location",
        "Warranty",
        "Support",
        "Reputation",
        "Results",
        "Innovation",
        "Safety",
        "Compliance",
    ],
    isMain: true,
    display: "Always",
}

/* =========================================================
   GROUP 5 — Q35
========================================================= */

const q35: QuestionConfig = {
    id: "q35",
    number: 35,
    section: "D. USPs, Differentiators & Trust",
    text: "Why should customers choose you?",
    type: "multi",
    options: [
        "Premium Quality",
        "Consistent Quality",
        "Better Materials",
        "Superior Finish",
        "Durability",
        "Performance",
        "Accuracy",
        "Quality Control",
        "Tested",
        "Certified",
        "Long Life",
        "Low Maintenance",
        "Safety",
        "Export Quality",
        "Competitive Pricing",
        "Transparent Pricing",
        "Value",
        "No Hidden Charges",
        "Flexible Pricing",
        "Volume Discounts",
        "Wholesale",
        "Manufacturer Pricing",
        "Flexible Terms",
        "Low MOQ",
        "Free Consultation",
        "Free Estimate",
        "Free Demo",
        "Free Trial",
        "Experience First Then Pay",
        "Fast Delivery",
        "Same Day",
        "Quick Turnaround",
        "Fast Response",
        "Fast Installation",
        "Quick Execution",
        "Short Lead Time",
        "Emergency",
        "24×7",
        "Fully Custom",
        "Made-to-order",
        "Custom Size",
        "Colour",
        "Material",
        "Design",
        "Formulation",
        "Software",
        "Tailored Solution",
        "Packages",
        "Branding",
        "Experienced Team",
        "Specialists",
        "Certified Professionals",
        "Technical Expertise",
        "Domain Expertise",
        "Skilled Workforce",
        "Founder-led",
        "Expert Consultation",
        "Research-led",
        "Engineering-led",
        "Technology-first",
        "Personalised",
        "Dedicated Manager",
        "Single Contact",
        "Fast Support",
        "After-sales",
        "Proactive Support",
        "Transparent Communication",
        "Regular Updates",
        "Easy Onboarding",
        "Hassle-free",
        "On-time",
        "Consistent Supply",
        "Dependable",
        "SLA",
        "Proven Process",
        "Low Failure",
        "High Uptime",
        "Continuity",
        "Long-term Support",
        "Latest Tech",
        "AI-powered",
        "Automation-first",
        "Cloud",
        "Data-driven",
        "Digital-first",
        "Proprietary Tech",
        "Modern Infrastructure",
        "Advanced Machinery",
        "Smart Analytics",
        "Local",
        "Pan India",
        "Global",
        "Distribution Network",
        "Doorstep",
        "Remote",
        "Multi-location",
        "Nationwide Delivery",
        "International Shipping",
        "Established",
        "Experience",
        "Customer Base",
        "Recognised Clients",
        "Repeat Customers",
        "Testimonials",
        "Certifications",
        "Government Registered",
        "Licensed",
        "Track Record",
        "In-house",
        "Direct Manufacturer",
        "Own Factory",
        "Modern Machinery",
        "High Capacity",
        "Small Batch",
        "Large Volume",
        "Prototyping",
        "Private Label",
        "OEM",
        "Contract Manufacturing",
        "End-to-end Production",
        "Eco-friendly",
        "Recyclable",
        "Energy Efficient",
        "Low Waste",
        "Sustainable Sourcing",
        "Local Sourcing",
        "Ethical",
        "One-stop",
        "End-to-end",
        "Home Delivery",
        "Online Consultation",
        "Easy Ordering",
        "Flexible Scheduling",
        "Pickup-Drop",
        "Multiple Payments",
        "Easy Returns",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: [
        "q29",
        "q30",
        "q31",
        "q36",
        "q37",
        "q38",
        "q39",
        "q41",
    ],
}

const q29: QuestionConfig = {
    id: "q29",
    number: 29,
    section: "D. USPs, Differentiators & Trust",
    text: "What should the business mission statement communicate?",
    type: "single",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ],
}

const q30: QuestionConfig = {
    id: "q30",
    number: 30,
    section: "D. USPs, Differentiators & Trust",
    text: "What should the business vision statement communicate?",
    type: "single",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ],
}

const q31: QuestionConfig = {
    id: "q31",
    number: 31,
    section: "D. USPs, Differentiators & Trust",
    text: "Which business values should be highlighted?",
    type: "multi",
    options: [
        "Integrity",
        "Transparency",
        "Quality",
        "Reliability",
        "Customer First",
        "Innovation",
        "Accountability",
        "Excellence",
        "Speed",
        "Professionalism",
        "Safety",
        "Sustainability",
        "Collaboration",
        "Respect",
        "Ownership",
        "Continuous Improvement",
        "Affordability",
        "Precision",
        "Trust",
        "Commitment",
    ],
}

const q36: QuestionConfig = {
    id: "q36",
    number: 36,
    section: "D. USPs, Differentiators & Trust",
    text: "What are your product-specific differentiators?",
    type: "single",
    options: [
        "Better Quality",
        "Design",
        "Material",
        "Longer Life",
        "Higher Performance",
        "More Features",
        "Compact",
        "Large Capacity",
        "Lightweight",
        "Energy Efficient",
        "Easy Use",
        "Low Maintenance",
        "Customisable",
        "Made-to-order",
        "Local",
        "Imported",
        "Proprietary",
        "Certified",
        "Eco-friendly",
        "Premium Finish",
        "Industrial Grade",
        "Food Grade",
        "Medical Grade",
        "Export Grade",
    ],
}

const q37: QuestionConfig = {
    id: "q37",
    number: 37,
    section: "D. USPs, Differentiators & Trust",
    text: "What are your service-specific differentiators?",
    type: "single",
    options: [
        "Faster Service",
        "Expertise",
        "Personalised",
        "Dedicated Manager",
        "End-to-end",
        "Specialist Team",
        "Certified Professionals",
        "On-site",
        "Remote",
        "24×7",
        "Same-day",
        "Response SLA",
        "Transparent Process",
        "Fixed Timeline",
        "Reporting",
        "Post-project Support",
        "Free Consultation",
        "Assessment",
        "Custom Solution",
    ],
}

const q38: QuestionConfig = {
    id: "q38",
    number: 38,
    section: "D. USPs, Differentiators & Trust",
    text: "What are your operational advantages?",
    type: "single",
    options: [
        "In-house Team",
        "In-house Production",
        "Own Infrastructure",
        "Warehouse",
        "Delivery",
        "Service Team",
        "Automation",
        "SOPs",
        "Quality Management",
        "Fast Procurement",
        "Inventory",
        "Multi-location",
        "Scalable Capacity",
        "Backup Suppliers",
        "Vendor Network",
    ],
}

const q39: QuestionConfig = {
    id: "q39",
    number: 39,
    section: "D. USPs, Differentiators & Trust",
    text: "What are your commercial advantages?",
    type: "single",
    options: [
        "Competitive",
        "Premium Value",
        "Transparent",
        "Fixed Price",
        "Flexible Packages",
        "Subscription",
        "Pay-per-use",
        "EMI",
        "Credit",
        "Volume Pricing",
        "Bulk Discounts",
        "Custom Quotes",
        "No Hidden Charges",
        "Free Trial",
        "Free Consultation",
        "Experience First Then Pay",
    ],
}

const q41: QuestionConfig = {
    id: "q41",
    number: 41,
    section: "D. USPs, Differentiators & Trust",
    text: "What customer promise should be highlighted?",
    type: "single",
    options: [
        "Timely Response",
        "Transparent Communication",
        "Clear Pricing",
        "Quality-focused Delivery",
        "Professional Support",
        "Confidentiality",
        "Data Security",
        "Safety Compliance",
        "Reliable Service",
        "Post-sale Support",
        "Dedicated Contact",
        "No Explicit Promise",
    ],
}

/* =========================================================
   GROUP 6 — Q40
========================================================= */

const q40: QuestionConfig = {
    id: "q40",
    number: 40,
    section: "D. USPs, Differentiators & Trust",
    text: "What proof do you have that customers can trust you?",
    type: "single",
    options: [
        "GST",
        "MSME",
        "ISO",
        "Industry Certification",
        "Government Approval",
        "Professional Licence",
        "Trademark",
        "Patent-IP",
        "Recognised Clients",
        "Testimonials",
        "Experience",
        "Awards",
        "Association Membership",
        "Case Studies",
        "Public Reviews",
        "Physical Facility",
        "Registered Company",
        "None",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: [
        "q33",
        "q34",
        "q42",
        "q43",
        "q44",
        "q69",
        "q70",
        "q71",
        "q72",
        "q73",
        "q74",
        "q75",
        "q76",
        "q77",
        "q78",
        "q79",
        "q80",
        "q81",
        "q82",
        "q83",
    ],
}

const q33: QuestionConfig = {
    id: "q33",
    number: 33,
    section: "D. USPs, Differentiators & Trust",
    text: "Which team members should be highlighted?",
    type: "multi",
    options: [
        "Founders",
        "Management",
        "Engineers",
        "Developers",
        "Consultants",
        "Designers",
        "Technicians",
        "Sales",
        "Support",
        "Doctors",
        "Professionals",
        "Trainers",
        "Craftspeople",
        "Production Team",
        "No Team Section",
    ],
}

const q34: QuestionConfig = {
    id: "q34",
    number: 34,
    section: "D. USPs, Differentiators & Trust",
    text: "What company information should be public?",
    type: "single",
    options: [
        "Experience",
        "Team Size",
        "Customers",
        "Projects",
        "Products",
        "Locations",
        "Countries",
        "Production Capacity",
        "Certifications",
        "Awards",
        "Partnerships",
        "Infrastructure",
        "Technology",
        "Client Brands",
        "None",
    ],
}

const q42: QuestionConfig = {
    id: "q42",
    number: 42,
    section: "D. USPs, Differentiators & Trust",
    text: "Which business statistics can be displayed?",
    type: "metrics",
    options: [
        "Years Experience",
        "Customers",
        "Projects",
        "Products Sold",
        "Orders",
        "Team",
        "Locations",
        "Countries",
        "Production Capacity",
        "Retention",
        "Repeat Customer %",
    ],
}

const q43: QuestionConfig = {
    id: "q43",
    number: 43,
    section: "D. USPs, Differentiators & Trust",
    text: "Which certifications or credentials do you have?",
    type: "single",
    options: [
        "ISO 9001",
        "ISO 14001",
        "ISO 45001",
        "ISO 27001",
        "GST",
        "Udyam",
        "Startup India",
        "FSSAI",
        "BIS",
        "CE",
        "IEC",
        "Industry Association",
        "Professional Licence",
        "Government Registration",
        "Other",
        "None",
    ],
}

const q44: QuestionConfig = {
    id: "q44",
    number: 44,
    section: "D. USPs, Differentiators & Trust",
    text: "Which awards or recognitions do you have?",
    type: "single",
    options: [
        "Industry Award",
        "Customer-Vendor Award",
        "Government Recognition",
        "Media Recognition",
        "Startup-Competition Recognition",
        "No",
        "Prefer Not to Display",
    ],
}

const q69: QuestionConfig = {
    id: "q69",
    number: 69,
    section: "D. USPs, Differentiators & Trust",
    text: "Should a portfolio/projects section be included?",
    type: "single",
    options: ["Yes", "No"],
}

const q70: QuestionConfig = {
    id: "q70",
    number: 70,
    section: "D. USPs, Differentiators & Trust",
    text: "What work should be showcased?",
    type: "single",
    options: [
        "Client Projects",
        "Manufactured Products",
        "Installations",
        "Websites",
        "Software",
        "Designs",
        "Construction",
        "Consulting",
        "Events",
        "Before-After",
        "Case Studies",
        "Research",
        "Other",
    ],
}

const q71: QuestionConfig = {
    id: "q71",
    number: 71,
    section: "D. USPs, Differentiators & Trust",
    text: "What is the project/portfolio item name?",
    type: "text",
    required: true,
}

const q72: QuestionConfig = {
    id: "q72",
    number: 72,
    section: "D. USPs, Differentiators & Trust",
    text: "What was the customer's main requirement?",
    type: "single",
    options: [
        "New Development",
        "Improvement",
        "Cost Reduction",
        "Performance",
        "Automation",
        "Repair",
        "Replacement",
        "Customisation",
        "Expansion",
        "Compliance",
        "Marketing-Sales Growth",
        "Other",
    ],
}

const q73: QuestionConfig = {
    id: "q73",
    number: 73,
    section: "D. USPs, Differentiators & Trust",
    text: "What solution was provided?",
    type: "single",
    options: [
        "Custom Product",
        "Standard Product",
        "Consulting",
        "Development",
        "Implementation",
        "Installation",
        "Repair",
        "Maintenance",
        "Automation",
        "Marketing",
        "Design",
        "Training",
        "End-to-end",
    ],
}

const q74: QuestionConfig = {
    id: "q74",
    number: 74,
    section: "D. USPs, Differentiators & Trust",
    text: "What outcome was achieved?",
    type: "single",
    options: [
        "Revenue Increase",
        "Cost Reduction",
        "Time Saved",
        "Faster Process",
        "Productivity",
        "Quality",
        "Capacity",
        "Error Reduction",
        "Reliability",
        "Customer Experience",
        "Compliance",
        "Successful Delivery",
        "Not Quantified",
    ],
}

const q75: QuestionConfig = {
    id: "q75",
    number: 75,
    section: "D. USPs, Differentiators & Trust",
    text: "How should the client identity be displayed?",
    type: "single",
    options: [
        "Name + Logo",
        "Name Only",
        "Logo Only",
        "Anonymous",
        "No",
    ],
}

const q76: QuestionConfig = {
    id: "q76",
    number: 76,
    section: "D. USPs, Differentiators & Trust",
    text: "What evidence should be displayed?",
    type: "single",
    options: [
        "Project Photos",
        "Before-After",
        "Screenshots",
        "Video",
        "Testimonial",
        "Performance Metrics",
        "Certificate",
        "Case Study",
        "None",
    ],
}

const q77: QuestionConfig = {
    id: "q77",
    number: 77,
    section: "D. USPs, Differentiators & Trust",
    text: "Should customer/client logos be displayed?",
    type: "single",
    options: [
        "Yes",
        "No",
        "Selected Clients Only",
    ],
}

const q78: QuestionConfig = {
    id: "q78",
    number: 78,
    section: "D. USPs, Differentiators & Trust",
    text: "Which customer types should be highlighted?",
    type: "single",
    options: [
        "Enterprises",
        "MSMEs",
        "Startups",
        "Government",
        "Recognised Brands",
        "International",
        "Local Businesses",
        "Consumers",
        "Dealers",
        "Distributors",
        "Institutions",
    ],
}

const q79: QuestionConfig = {
    id: "q79",
    number: 79,
    section: "D. USPs, Differentiators & Trust",
    text: "Do you have permission to display customer names/logos?",
    type: "single",
    options: [
        "Yes",
        "No",
        "Some",
        "Need to Verify",
    ],
}

const q80: QuestionConfig = {
    id: "q80",
    number: 80,
    section: "D. USPs, Differentiators & Trust",
    text: "What customer testimonials do you have?",
    type: "single",
    options: [
        "Written",
        "Video",
        "Google Reviews",
        "Social Reviews",
        "No",
        "Add Later",
    ],
}

const q81: QuestionConfig = {
    id: "q81",
    number: 81,
    section: "D. USPs, Differentiators & Trust",
    text: "What testimonial information may be shown?",
    type: "single",
    options: [
        "Customer Name",
        "Company",
        "Designation",
        "Photo",
        "Company Logo",
        "Rating",
        "Written Review",
        "Video",
    ],
}

const q82: QuestionConfig = {
    id: "q82",
    number: 82,
    section: "D. USPs, Differentiators & Trust",
    text: "Which public review sources do you have?",
    type: "single",
    options: [
        "Google",
        "Facebook",
        "Justdial",
        "IndiaMART",
        "Amazon",
        "Flipkart",
        "Trustpilot",
        "LinkedIn",
        "Other Marketplace",
        "None",
    ],
}

const q83: QuestionConfig = {
    id: "q83",
    number: 83,
    section: "D. USPs, Differentiators & Trust",
    text: "What social-proof statement should be generated?",
    type: "single",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ],
}


const q84: QuestionConfig = {
    id: "q84",
    number: 84,
    section: "I. Contact, Location & Availability",
    text: "How should visitors contact you?",
    type: "multi",
    options: [
        "Phone",
        "WhatsApp",
        "Email",
        "Contact Form",
        "Office",
        "Store",
        "Factory",
        "Google Maps",
        "Social Media",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: [
        "q85",
        "q86",
        "q87",
        "q88",
        "q89",
        "q90",
        "q91",
        "q92",
        "q93",
        "q94",
        "q95",
        "q96",
        "q97",
        "q98",
    ],
}

const q85: QuestionConfig = {
    id: "q85",
    number: 85,
    section: "I. Contact, Location & Availability",
    text: "What is the primary business phone number?",
    type: "text",
}

const q86: QuestionConfig = {
    id: "q86",
    number: 86,
    section: "I. Contact, Location & Availability",
    text: "Is WhatsApp the same as the primary phone number?",
    type: "single",
    options: [
        "Yes",
        "No",
        "Do Not Offer WhatsApp",
    ],
}

const q87: QuestionConfig = {
    id: "q87",
    number: 87,
    section: "I. Contact, Location & Availability",
    text: "What is the business email?",
    type: "text",
}

const q88: QuestionConfig = {
    id: "q88",
    number: 88,
    section: "I. Contact, Location & Availability",
    text: "What is the physical location type?",
    type: "single",
    options: [
        "Office",
        "Store",
        "Factory",
        "Warehouse",
        "Clinic",
        "Restaurant",
        "Workshop",
        "Studio",
        "Home Office",
        "Multiple",
        "No Public Location",
    ],
}

const q89: QuestionConfig = {
    id: "q89",
    number: 89,
    section: "I. Contact, Location & Availability",
    text: "What is the business address?",
    type: "textarea",
}

const q90: QuestionConfig = {
    id: "q90",
    number: 90,
    section: "I. Contact, Location & Availability",
    text: "How should the address be displayed?",
    type: "single",
    options: [
        "Full",
        "Area + City",
        "City Only",
        "Map Only",
        "Hide",
    ],
}

const q91: QuestionConfig = {
    id: "q91",
    number: 91,
    section: "I. Contact, Location & Availability",
    text: "Which days do you operate?",
    type: "multi",
    options: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Appointment Only",
    ],
}

const q92: QuestionConfig = {
    id: "q92",
    number: 92,
    section: "I. Contact, Location & Availability",
    text: "What are your operating hours?",
    type: "single",
    options: [
        "Standard Hours",
        "24×7",
        "Morning",
        "Evening",
        "Different Per Day",
        "Appointment Only",
        "Custom",
    ],
}

const q93: QuestionConfig = {
    id: "q93",
    number: 93,
    section: "I. Contact, Location & Availability",
    text: "How quickly do you respond to enquiries?",
    type: "single",
    options: [
        "Immediately",
        "<1 Hour",
        "<4 Hours",
        "Same Business Day",
        "24 Hours",
        "2 Business Days",
        "Varies",
    ],
}

const q94: QuestionConfig = {
    id: "q94",
    number: 94,
    section: "I. Contact, Location & Availability",
    text: "Which social platforms do you use?",
    type: "multi",
    options: [
        "Facebook",
        "Instagram",
        "LinkedIn",
        "YouTube",
        "X",
        "Pinterest",
        "Threads",
        "WhatsApp",
        "Telegram",
        "None",
    ],
}

const q95: QuestionConfig = {
    id: "q95",
    number: 95,
    section: "I. Contact, Location & Availability",
    text: "What are the selected social profile URLs?",
    type: "text",
}

const q96: QuestionConfig = {
    id: "q96",
    number: 96,
    section: "I. Contact, Location & Availability",
    text: "Which enquiry channels should be prioritised?",
    type: "multi",
    options: [
        "Phone",
        "WhatsApp",
        "Email",
        "Website Form",
        "Appointment",
        "Store Visit",
        "Quote",
    ],
}

const q97: QuestionConfig = {
    id: "q97",
    number: 97,
    section: "I. Contact, Location & Availability",
    text: "Which enquiry form fields should be included?",
    type: "multi",
    options: [
        "Name",
        "Phone",
        "WhatsApp",
        "Email",
        "Company",
        "City",
        "Product",
        "Service",
        "Budget",
        "Quantity",
        "Requirement",
        "Preferred Date",
        "Message",
    ],
}

const q98: QuestionConfig = {
    id: "q98",
    number: 98,
    section: "I. Contact, Location & Availability",
    text: "Which enquiry fields should be mandatory?",
    type: "multi",
    options: [
        "Name",
        "Phone",
        "WhatsApp",
        "Email",
        "Company",
        "City",
        "Product",
        "Service",
        "Budget",
        "Quantity",
        "Requirement",
        "Preferred Date",
        "Message",
    ],
}

/* =========================================================
   GROUP 8 — Q104 / Q106
========================================================= */

const q104: QuestionConfig = {
    id: "q104",
    number: 104,
    section: "K. Images, Branding & Website Design",
    text: "What website visual style do you prefer?",
    type: "single",
    options: [
        "Corporate",
        "Modern",
        "Minimal",
        "Premium-Luxury",
        "Industrial",
        "Technology",
        "Creative",
        "Friendly",
        "Traditional",
        "Elegant",
        "Bold",
        "Product-focused",
        "Service-focused",
        "System Decide",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: ["q105", "q108"],
}

const q105: QuestionConfig = {
    id: "q105",
    number: 105,
    section: "K. Images, Branding & Website Design",
    text: "What colour approach should the website use?",
    type: "single",
    options: [
        "Existing Brand",
        "Match Logo",
        "Blue Corporate",
        "Dark Premium",
        "White Minimal",
        "Green-Natural",
        "Warm",
        "Vibrant",
        "Neutral",
        "System Decide",
        "Custom",
    ],
}

const q108: QuestionConfig = {
    id: "q108",
    number: 108,
    section: "K. Images, Branding & Website Design",
    text: "Which homepage sections should be included?",
    type: "single",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ],
}

const q106: QuestionConfig = {
    id: "q106",
    number: 106,
    section: "K. Images, Branding & Website Design",
    text: "What impression should the website create?",
    type: "single",
    options: [
        "Professional",
        "Trustworthy",
        "Premium",
        "Modern",
        "Technical",
        "Innovative",
        "Established",
        "Friendly",
        "Affordable",
        "Powerful",
        "Elegant",
        "Simple",
        "Reliable",
        "Industrial",
        "Creative",
    ],
    isMain: true,
    display: "Always",
}

/* =========================================================
   GROUP 9 — Q103
========================================================= */

const q103: QuestionConfig = {
    id: "q103",
    number: 103,
    section: "K. Images, Branding & Website Design",
    text: "What should appear in the main banner?",
    type: "single",
    options: [
        "Product",
        "Service",
        "Team",
        "Office-Factory",
        "Customer-Application",
        "Abstract Business",
        "Illustration",
        "AI-generated",
        "Stock",
        "System Decide",
    ],
    isMain: true,
    display: "Always",
    relatedQuestions: ["q102", "q107", "q155"],
}

const q102: QuestionConfig = {
    id: "q102",
    number: 102,
    section: "K. Images, Branding & Website Design",
    text: "Which visual assets do you currently have?",
    type: "multi",
    options: [
        "Logo",
        "Product Photos",
        "Service Photos",
        "Office",
        "Factory",
        "Team",
        "Project",
        "Customer",
        "Videos",
        "Certificates",
        "Brochures",
        "None",
    ],
}

const q107: QuestionConfig = {
    id: "q107",
    number: 107,
    section: "K. Images, Branding & Website Design",
    text: "How image-heavy should the website be?",
    type: "single",
    options: [
        "Mostly Visual",
        "Balanced",
        "Informational",
        "Product-heavy",
        "Portfolio-heavy",
        "Minimal Images",
        "System Decide",
    ],
}

const q155: QuestionConfig = {
    id: "q155",
    number: 155,
    section: "Website Experience",
    text: "How important is mobile usage for your customers?",
    type: "single",
    options: [
        "Critical",
        "Very Important",
        "Important",
        "Limited",
        "Not Sure",
    ],
}

export const QUESTION_GROUPS: QuestionConfig[] = [
    q17,
    q18,
    q111,
    q13,
    q14,
    q19,
    q20,
    q21,
    q99,
    q100,
    q101,
    q150,
    q23,
    q35,
    q29,
    q30,
    q31,
    q36,
    q37,
    q38,
    q39,
    q41,
    q40,
    q33,
    q34,
    q42,
    q43,
    q44,
    q69,
    q70,
    q71,
    q72,
    q73,
    q74,
    q75,
    q76,
    q77,
    q78,
    q79,
    q80,
    q81,
    q82,
    q83,

    q84,
    q85,
    q86,
    q87,
    q88,
    q89,
    q90,
    q91,
    q92,
    q93,
    q94,
    q95,
    q96,
    q97,
    q98,

    q104,
    q105,
    q108,

    q106,

    q103,
    q102,
    q107,
    q155,
]

export const MAIN_QUESTION_GROUPS: QuestionConfig[] = [
    q17,
    q13,
    q19,
    q23,
    q35,
    q40,
    q84,
    q104,
    q106,
    q103,
]

export function getQuestionById(id: string) {
    return QUESTION_GROUPS.find((question) => question.id === id)
}