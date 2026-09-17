"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface BusinessItem {
  id: string
  name: string
  images: File[]
  shortDescription: string
  longDescription: string
  mrp: string
  listPrice: string
  discount: string
  salePrice: string
}

export interface DayTiming {
  open: string
  close: string
}

export interface QuestionnaireData {
  // Page 2 - Business Basic Details
  businessName: string
  legalName: string
  contactPerson: string
  designation: string
  phoneNumber: string
  email: string
  brandTagline: string
  businessNature: "product" | "service" | ""

  // Page 2 - Address (new)
  businessAddressLine1: string
  city: string
  state: string
  postalCode: string

  // Page 2 - Industry Type (new — separate from GST/PAN registration type below)
  industryType: string

  // Page 2 - GST & Tax Details (merged in)
  gstNumber: string
  panNumber: string
  businessType: string // "gst" | "pan" — which registration type is being declared
  taxDocument: File | null

  // Page 4 - Discovery Questions (Q17,18,111 / Q13,14 / Q19,20,21,99,100,101,150 /
  // Q23 / Q35,29-31,36-39,41 / Q40,33,34,42-44 / Q84,85-94 / Q104-106 / Q103,102,107,155)
  serviceArea: string
  websitePurpose: string
  primaryAction: string
  customerPriority: string
  topReasons: string
  credibilityProof: string[]
  contactPreferences: string[]
  q18Engage: string[]
  q111Languages: string[]
  q14Secondary: string[]
  q20Buying: string
  q21Cycle: string
  q99Leads: string[]
  q100Consult: string
  q101Quote: string
  q150Visitor: string
  q31Values: string[]
  q36ProdDiff: string[]
  q37ServDiff: string[]
  q38OperAdv: string[]
  q39CommAdv: string[]
  q41Promise: string[]
  q33Team: string[]
  q34Highlight: string[]
  q42NumericalStats: string
  q43Certificates: string[]
  q44Awards: string
  q85Phone: string
  q87Email: string
  q86WhatsappSame: string
  q88LocationType: string
  q89Address: string
  q90AddressDisplay: string
  q91WorkingDays: string
  q93ResponseTime: string
  q94Socials: string[]
  q104Style: string
  q106Impression: string[]
  q105ColorApproach: string
  q103HeroBanner: string
  q102Assets: string[]
  q107ImageIntensity: string
  q155MobileImportance: string

  // Page 5 - Business Operating Details
  daysOpen: string[]
  dayTimings: { [day: string]: DayTiming }

  // Page 6 - Products / Services
  planType: "free" | "paid" | ""
  items: BusinessItem[]

  // Page 11 - Business USP
  businessUSP: string[]

  // Page 12 - About Us
  promoterName: string
  promoterDesignation: string
  promoterBio: string
  promoterPhoto: File | null
  yearFounded: string
  companyHistory: string
  missionVision: string
  certificationStatutory: File | null
  problemSolved: string
  uniqueSolution: string
  trustCredibility: string

  // Page 12.5 - Why Choose Us
  whyChooseUs: string[]

  // Page 12.7 - Social Media
  facebookUrl: string
  instagramUrl: string
  linkedinUrl: string

  // Page 13 - Licenses & Certifications
  businessRegistration: File | null
  taxCompliance: File | null
  tradeAuthorization: File | null
  safetyCompliance: File | null
  qualityCertifications: File | null
  brandIdentity: File | null

  // Page 14 - Confirmation
  confirmed: boolean
}

const initialData: QuestionnaireData = {
  businessName: "",
  legalName: "",
  contactPerson: "",
  designation: "",
  phoneNumber: "",
  email: "",
  brandTagline: "",
  businessNature: "",
  businessAddressLine1: "",
  city: "",
  state: "",
  postalCode: "",
  industryType: "",
  gstNumber: "",
  panNumber: "",
  businessType: "",
  taxDocument: null,
  serviceArea: "",
  websitePurpose: "",
  primaryAction: "",
  customerPriority: "",
  topReasons: "",
  credibilityProof: [],
  contactPreferences: [],
  q18Engage: [],
  q111Languages: [],
  q14Secondary: [],
  q20Buying: "",
  q21Cycle: "",
  q99Leads: [],
  q100Consult: "",
  q101Quote: "",
  q150Visitor: "",
  q31Values: [],
  q36ProdDiff: [],
  q37ServDiff: [],
  q38OperAdv: [],
  q39CommAdv: [],
  q41Promise: [],
  q33Team: [],
  q34Highlight: [],
  q42NumericalStats: "",
  q43Certificates: [],
  q44Awards: "",
  q85Phone: "",
  q87Email: "",
  q86WhatsappSame: "",
  q88LocationType: "",
  q89Address: "",
  q90AddressDisplay: "",
  q91WorkingDays: "",
  q93ResponseTime: "",
  q94Socials: [],
  q104Style: "",
  q106Impression: [],
  q105ColorApproach: "",
  q103HeroBanner: "",
  q102Assets: [],
  q107ImageIntensity: "",
  q155MobileImportance: "",
  daysOpen: [],
  dayTimings: {},
  planType: "",
  items: [],
  businessUSP: [],
  promoterName: "",
  promoterDesignation: "",
  promoterBio: "",
  promoterPhoto: null,
  yearFounded: "",
  companyHistory: "",
  missionVision: "",
  certificationStatutory: null,
  problemSolved: "",
  uniqueSolution: "",
  trustCredibility: "",
  whyChooseUs: [],
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  businessRegistration: null,
  taxCompliance: null,
  tradeAuthorization: null,
  safetyCompliance: null,
  qualityCertifications: null,
  brandIdentity: null,
  confirmed: false,
}

// Only these step numbers actually exist in the questionnaire flow
// NOTE: step 3 (Kriti's Q1-6) will slot in before step 4 once she adds it —
// make sure 3 ends up before 4 in this array when merging, not after.
const validSteps = [1, 2, 4, 5, 6, 11, 12, 12.5, 12.7, 13, 14, 15]

interface QuestionnaireContextType {
  data: QuestionnaireData
  updateData: (updates: Partial<QuestionnaireData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  resetQuestionnaire: () => void
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined)

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<QuestionnaireData>(initialData)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = validSteps.length

  useEffect(() => {
    const savedData = localStorage.getItem("questionnaireData")
    const savedStep = localStorage.getItem("questionnaireStep")

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setData({ ...initialData, ...parsed })
      } catch (e) {
        console.error("Failed to parse saved data:", e)
      }
    }

    if (savedStep) {
      const parsedStep = parseFloat(savedStep)
      setCurrentStep(validSteps.includes(parsedStep) ? parsedStep : 1)
    }
  }, [])

  useEffect(() => {
    const dataToSave = { ...data }
    Object.keys(dataToSave).forEach((key) => {
      const value = dataToSave[key as keyof QuestionnaireData]
      if (value instanceof File) {
        (dataToSave as Record<string, unknown>)[key] = null
      }
    })
    dataToSave.items = dataToSave.items.map((item) => ({ ...item, images: [] }))
    localStorage.setItem("questionnaireData", JSON.stringify(dataToSave))
    localStorage.setItem("questionnaireStep", currentStep.toString())
  }, [data, currentStep])

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    const idx = validSteps.indexOf(currentStep)
    if (idx !== -1 && idx < validSteps.length - 1) {
      setCurrentStep(validSteps[idx + 1])
    }
  }

  const prevStep = () => {
    const idx = validSteps.indexOf(currentStep)
    if (idx > 0) {
      setCurrentStep(validSteps[idx - 1])
    }
  }

  const resetQuestionnaire = () => {
    setData(initialData)
    setCurrentStep(1)
    localStorage.removeItem("questionnaireData")
    localStorage.removeItem("questionnaireStep")
  }

  return (
      <QuestionnaireContext.Provider
          value={{
            data,
            updateData,
            currentStep,
            setCurrentStep,
            totalSteps,
            nextStep,
            prevStep,
            resetQuestionnaire,
          }}
      >
        {children}
      </QuestionnaireContext.Provider>
  )
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext)
  if (context === undefined) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider")
  }
  return context
}