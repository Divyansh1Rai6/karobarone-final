"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { useQuestionnaire } from "@/context/questionnaire-context"
import { StepWrapper } from "../step-wrapper"
import { NavigationButtons } from "../navigation-buttons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/* =========================================================
   DROPDOWN COMPONENTS (single-select + multi-select)
========================================================= */

/* =========================================================
   SINGLE-SELECT DROPDOWN
========================================================= */

interface DropdownSelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function DropdownSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground transition-colors duration-150 hover:border-primary/40 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        className={`absolute z-20 mt-2 w-full origin-top overflow-hidden rounded-xl border border-border bg-background shadow-lg transition-all duration-200 ease-out ${open
            ? "translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-y-95 opacity-0"
          }`}
      >
        <div className="max-h-64 overflow-y-auto thin-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent py-1 px-1 ">
          {options.map((option) => {
            const selected = value === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`group flex w-full items-center justify-between  hover:bg-[#f0ecea] rounded-lg px-4 py-2.5 text-left text-sm text-foreground transition-colors duration-150 hover:border-l-primary/60 hover:bg-muted/70 ${selected
                    ? "border-l-primary bg-muted/40 font-medium"
                    : "border-l-transparent"
                  }`}
              >
                {option}
                {selected && <Check className="h-4 w-4 text-primary" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   MULTI-SELECT DROPDOWN
========================================================= */

interface MultiDropdownSelectProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function MultiDropdownSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
}: MultiDropdownSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option))
    } else {
      onChange([...value, option])
    }
  }

  const removeOption = (option: string, event: React.MouseEvent) => {
    event.stopPropagation()
    onChange(value.filter((item) => item !== option))
  }

  return (
    <div>
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground transition-colors duration-150 hover:border-primary/40 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <span className={value.length ? "text-foreground" : "text-muted-foreground"}>
            {value.length
              ? `${value.length} selected`
              : placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        <div
          className={`absolute z-20 mt-2 w-full origin-top overflow-hidden rounded-xl border border-border bg-background shadow-lg transition-all duration-200 ease-out ${open
              ? "translate-y-0 scale-y-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-y-95 opacity-0"
            }`}
        >
          <div className="max-h-64 overflow-y-auto thin-scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent py-1 px-1 ">
            {options.map((option) => {
              const selected = value.includes(option)
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className={`group flex w-full items-center justify-between  px-4 py-2.5 text-left text-sm text-foreground transition-colors duration-150 hover:bg-[#f0ecea] rounded-lg ${selected
                      ? "border-l-primary bg-muted/40 font-medium"
                      : "border-l-transparent"
                    }`}
                >
                  {option}
                  {selected && <Check className="h-4 w-4 text-primary" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Selected options shown as removable chips */}
      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((option) => (
            <span
              key={option}
              className="flex animate-in items-center gap-1.5 rounded-full border border-border bg-muted/40 py-1 pl-3 pr-2 text-xs text-foreground fade-in zoom-in-95 duration-150"
            >
              {option}
              <button
                type="button"
                onClick={(event) => removeOption(option, event)}
                aria-label={`Remove ${option}`}
                className="rounded-full p-0.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================================================
   QUESTIONNAIRE OPTION LISTS
========================================================= */

const competitorKnowledgeOptions = [
  "Yes, clearly",
  "Know a few",
  "Know indirect competitors",
  "Not sure",
  "No",
]

const competitorCountOptions = [
  "1",
  "2",
  "3",
  "4–5",
  "More than 5",
]

const competitorReachOptions = [
  "Local Area",
  "City",
  "State",
  "Pan India",
  "International",
  "Online Only",
  "Marketplace",
  "Multiple",
]

const competitorTypeOptions = [
  "Direct Competitor",
  "Indirect Competitor",
  "Substitute Solution Provider",
  "Large Established Brand",
  "Local Business Competitor",
  "Regional Competitor",
  "National Competitor",
  "International Competitor",
  "New Startup / Emerging Competitor",
  "Marketplace Seller / Platform Competitor",
  "Low-cost Competitor",
  "Premium Competitor",
  "Technology-led Competitor",
  "Specialist / Niche Competitor",
  "Full-service / One-stop Competitor",
  "Manufacturer / Direct-source Competitor",
  "Distributor / Reseller Competitor",
  "Other",
]

const customerChoiceOptions = [
  "Lower Price",
  "Better Brand Recognition",
  "Better Website",
  "Better Online Presence",
  "More Reviews",
  "More Products",
  "More Locations",
  "Faster Delivery",
  "Better Marketing",
  "Better Technology",
  "Better Customer Experience",
  "Stronger Distribution",
  "More Trust",
  "Better Offers",
  "Easier Buying Process",
  "Not Sure",
]

const businessStrengthOptions = [
  "Quality",
  "Price",
  "Customisation",
  "Expertise",
  "Service",
  "Speed",
  "Support",
  "Technology",
  "Experience",
  "Product Range",
  "Convenience",
  "Local Presence",
  "Manufacturing Capability",
  "Reliability",
  "Innovation",
  "Customer Relationships",
  "None yet",
  "Not sure",
]

const competitorStrengthOptions = [
  "Branding",
  "Website",
  "SEO",
  "Social Media",
  "Reviews",
  "Online Advertising",
  "Technology",
  "Automation",
  "Product Presentation",
  "Content",
  "Customer Experience",
  "Lead Generation",
  "E-commerce",
  "Mobile Experience",
  "CRM",
  "Analytics",
  "Pricing",
  "Market Reach",
]

const competitivePositionOptions = [
  "Premium Specialist",
  "Technology Leader",
  "Reliable Partner",
  "Cost-effective Provider",
  "Customisation Specialist",
  "Fast Service Provider",
  "Industry Expert",
  "Local Leader",
  "Large-scale Capability",
  "Innovation-focused",
  "Customer-focused",
  "One-stop Solution",
]

const comparisonOptions = [
  "Yes",
  "Only indirectly",
  "Only through benefits",
  "Comparison table for products/services",
  "No competitor comparison",
]

const threatOptions = [
  "Price Competition",
  "Large Brands",
  "New Entrants",
  "Technology Disruption",
  "Online Competitors",
  "Marketplaces",
  "Customer Switching",
  "Better Marketing by Competitors",
  "Better Service",
  "Product Innovation",
  "Geographic Expansion",
  "Not Sure",
]

const onlineChannelOptions = [
  "Website",
  "Google Search",
  "Google Maps",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "YouTube",
  "X",
  "Marketplaces",
  "Paid Ads",
  "Email Marketing",
  "Mobile App",
  "WhatsApp",
]

const websiteRatingOptions = [
  "Much Better",
  "Better",
  "Similar",
  "Worse",
  "Much Worse",
  "Not Sure",
]

const websiteLikeOptions = [
  "Design",
  "Colours",
  "Product Display",
  "Service Explanation",
  "Pricing",
  "Navigation",
  "Images",
  "Videos",
  "Testimonials",
  "Case Studies",
  "Content",
  "Speed",
  "Mobile Experience",
  "Online Ordering",
  "Quote Process",
  "Booking",
  "Chat",
  "Other",
]

const websiteFeatureOptions = [
  "Product Catalogue",
  "Search",
  "Filters",
  "Booking",
  "Quote Request",
  "E-commerce",
  "Reviews",
  "Case Studies",
  "Downloads",
  "Customer Login",
  "Dealer Login",
  "Multilingual",
  "Calculator",
  "Chatbot",
  "WhatsApp",
  "Blog",
  "AI Search",
  "Recommendation Engine",
  "Other",
]

const rankingOptions = [
  "Google Brand Search",
  "Product Keywords",
  "Service Keywords",
  "Local Search",
  "Google Maps",
  "Marketplace Search",
  "Social Search",
  "YouTube",
  "Not Sure",
]

const paidAdvertisingOptions = [
  "Yes frequently",
  "Occasionally",
  "Probably",
  "No",
  "Not Sure",
]

const contentOptions = [
  "Product Posts",
  "Educational Posts",
  "Videos",
  "Reels",
  "Customer Stories",
  "Testimonials",
  "Offers",
  "Blogs",
  "Case Studies",
  "Tutorials",
  "Founder Content",
  "Industry News",
  "Before-After Content",
]

const trustSignalOptions = [
  "Reviews",
  "Testimonials",
  "Client Logos",
  "Certifications",
  "Awards",
  "Customer Counts",
  "Years Experience",
  "Case Studies",
  "Media Features",
  "Partnerships",
  "Ratings",
  "None visible",
]

const digitalCapabilityOptions = [
  "Professional Website",
  "SEO",
  "E-commerce",
  "Booking",
  "CRM",
  "Automation",
  "Online Payments",
  "Customer Portal",
  "Mobile App",
  "Chatbot",
  "AI Features",
  "Analytics",
  "Content Marketing",
  "Social Presence",
  "Digital Advertising",
  "Reviews",
]



const onlineMetricOptions = [
  "Website Traffic",
  "Google Rankings",
  "Leads",
  "Calls",
  "WhatsApp Enquiries",
  "Quote Requests",
  "Online Sales",
  "Bookings",
  "Conversion Rate",
  "Reviews",
  "Social Followers",
  "Engagement",
  "Repeat Customers",
]

const competitorAchievementOptions = [
  "Large Customer Base",
  "Recognised Clients",
  "High Revenue",
  "Market Share",
  "Geographic Reach",
  "Awards",
  "Certifications",
  "Reviews",
  "Search Rankings",
  "Social Following",
  "Product Range",
  "Technology",
  "Funding",
  "Partnerships",
  "Distribution Network",
]

const ownAchievementOptions = [
  "Years in Business",
  "Major Clients",
  "Number of Customers",
  "Completed Projects",
  "Revenue Milestone",
  "Geographic Expansion",
  "Certifications",
  "Awards",
  "Patents",
  "Product Innovation",
  "Partnerships",
  "Export Business",
  "Large Team",
  "Production Capacity",
  "High Ratings",
  "Repeat Customers",
]

const futureAchievementOptions = [
  "Revenue Growth",
  "More Customers",
  "National Expansion",
  "International Expansion",
  "Better Brand Recognition",
  "Better Online Visibility",
  "More Dealers",
  "More Distributors",
  "More Locations",
  "Product Launch",
  "New Services",
  "Technology Adoption",
  "Automation",
  "Higher Repeat Business",
]

const achievementPeriodOptions = [
  "3 Months",
  "6 Months",
  "12 Months",
  "2 Years",
  "3 Years",
  "5 Years",
]

const trustProofOptions = [
  "Reviews",
  "Testimonials",
  "Client Logos",
  "Certifications",
  "Project Results",
  "Portfolio",
  "Years Experience",
  "Factory Photos",
  "Team Expertise",
  "Awards",
  "Demonstrations",
  "Transparent Pricing",
  "Guarantees where applicable",
]

const achievementDisplayOptions = [
  "Homepage Counters",
  "Timeline",
  "Achievement Cards",
  "About Page",
  "Credentials Section",
  "Case Studies",
  "Client Section",
  "Certificates Gallery",
  "Minimal mention",
]

const visualPreferenceOptions = [
  "Colour palette",
  "Typography",
  "Homepage layout",
  "Header/navigation",
  "Hero section",
  "Product presentation",
  "Service presentation",
  "Images",
  "Animation",
  "Minimalism",
  "Premium appearance",
  "Mobile layout",
  "CTA placement",
  "Content structure",
  "Overall professionalism",
]

const differentiationOptions = [
  "Similar level of professionalism, but visually different",
  "Similar structure, different branding",
  "More premium",
  "More modern",
  "More minimal",
  "More technical",
  "More colourful",
  "Completely different",
  "Let the system decide",
]

/* Q109 */
const discoveryOptions = [
  "Brand Search",
  "Product Search",
  "Service Search",
  "Local Search",
  "Industry Search",
  "Google Maps",
  "Social Media",
  "Referrals",
  "Paid Ads",
  "Marketplace",
  "Not Sure",
]

/* Q110 */
const seoTargetOptions = [
  "Local Area",
  "City",
  "Multiple Cities",
  "State",
  "Multiple States",
  "Pan India",
  "International",
  "No Location Targeting",
]

/* Q112 */
const onlinePresenceOptions = [
  "No",
  "Domain Only",
  "Existing Website",
  "Website + Domain",
  "Google Business Profile",
  "Marketplace Page",
]

/* Q147 */
const mainBusinessResultOptions = [
  "More Leads",
  "More Calls",
  "More WhatsApp Enquiries",
  "More Sales",
  "More Bookings",
  "More Quote Requests",
  "Better Credibility",
  "Better Search Visibility",
  "Dealer Enquiries",
  "Distributor Enquiries",
  "Recruitment",
  "Reduce Manual Work",
  "Customer Self-service",
]



/* Q148 */
const secondaryOutcomeOptions = [
  "Revenue Growth",
  "New Customers",
  "Repeat Business",
  "Lower Acquisition Cost",
  "Faster Sales Process",
  "Better Lead Quality",
  "Wider Geography",
  "Better Brand Image",
  "Customer Education",
  "Reduced Support Work",
  "Automation",
]

/* Q149 */
const websiteProblemOptions = [
  "No Online Presence",
  "Poor Credibility",
  "Few Leads",
  "Poor Lead Quality",
  "Customers Cannot Find Us",
  "Products Hard to Discover",
  "Too Many Manual Enquiries",
  "Slow Quotation Process",
  "No Online Booking",
  "No Online Sales",
  "Weak Competitor Position",
  "Difficult Customer Communication",
]

/* Q151 */
const qualifiedLeadOptions = [
  "1–5",
  "6–10",
  "11–25",
  "26–50",
  "51–100",
  "100+",
  "Not Sure",
]

/* Q152 */
const salesBookingOptions = [
  "1–5",
  "6–10",
  "11–25",
  "26–50",
  "51–100",
  "100+",
  "Not Sure",
]

/* Q159 */
const successMeasurementOptions = [
  "Leads",
  "Conversion Rate",
  "Revenue Attributed to Website",
  "Orders",
  "Bookings",
  "Quote Requests",
  "Calls",
  "WhatsApp",
  "Search Traffic",
  "Rankings",
  "Returning Visitors",
  "Customer Self-service",
  "Cost Savings",
]

/* Q137 */
const digitalCompetitionOptions = [
  "Basic credible presence",
  "Match competitors",
  "Exceed local competitors",
  "Compete nationally",
  "Establish premium positioning",
  "Build category authority",
]

/* Q138 */
const catchingCompetitorsMetricOptions = [
  "Website Traffic",
  "Google Rankings",
  "Leads",
  "Calls",
  "WhatsApp Enquiries",
  "Quote Requests",
  "Online Sales",
  "Bookings",
  "Conversion Rate",
  "Reviews",
  "Social Followers",
  "Engagement",
  "Repeat Customers",
]

/* =========================================================
   COMPONENT
========================================================= */

export function Step5Operating() {
  const { data, updateData } = useQuestionnaire()

  const d = data as Record<string, any>

  /* Q109 */
  const [customerDiscovery, setCustomerDiscovery] = useState<string[]>(
    d.customerDiscovery ?? [],
  )

  /* Q110 */
  const [seoTarget, setSeoTarget] = useState(d.seoTarget ?? "")

  /* Q112 */
  const [websitePresence, setWebsitePresence] = useState(
    d.websitePresence ?? "",
  )

  /* Q147 */
  const [mainBusinessResult, setMainBusinessResult] = useState(
    d.mainBusinessResult ?? "",
  )

  /* Q148 */
  const [secondaryOutcomes, setSecondaryOutcomes] = useState(
    d.secondaryOutcomes ?? [],
  )

  /* Q149 */
  const [websiteProblem, setWebsiteProblem] = useState(
    d.websiteProblem ?? "",
  )

  /* Q151 */
  const [qualifiedLeads, setQualifiedLeads] = useState(
    d.qualifiedLeads ?? "",
  )

  /* Q152 */
  const [salesBookings, setSalesBookings] = useState(
    d.salesBookings ?? "",
  )

  /* Q159 */
  const [successMeasurement, setSuccessMeasurement] = useState(
    d.successMeasurement ?? "",
  )


  /* Q138 */
  const [catchUpMetric, setCatchUpMetric] = useState(
    d.catchUpMetric ?? "",
  )


  const [competitorKnowledge, setCompetitorKnowledge] = useState(
    d.competitorKnowledge || "",
  )

  const [competitorCount, setCompetitorCount] = useState(
    d.competitorCount || "",
  )

  const [competitors, setCompetitors] = useState(
    d.competitors || "",
  )
  const [visitorUnderstand, setVisitorUnderstand] = useState(
    d.visitorUnderstand || "",
  )

  const [competitorReach, setCompetitorReach] = useState(
    d.competitorReach || "",
  )

  const [competitorType, setCompetitorType] = useState<string[]>(
    d.competitorType || [],
  )

  const [customerChoice, setCustomerChoice] = useState<string[]>(
    d.customerChoice || [],
  )

  const [businessStrengths, setBusinessStrengths] = useState<string[]>(
    d.businessStrengths || [],
  )

  const [competitorStrengths, setCompetitorStrengths] = useState<string[]>(
    d.competitorStrengths || [],
  )

  const [competitivePosition, setCompetitivePosition] = useState(
    d.competitivePosition || "",
  )

  const [comparisonApproach, setComparisonApproach] = useState(
    d.comparisonApproach || "",
  )

  const [competitiveThreat, setCompetitiveThreat] = useState<string[]>(
    d.competitiveThreat || [],
  )

  const [onlineChannels, setOnlineChannels] = useState<string[]>(
    d.onlineChannels || [],
  )

  const [websiteRating, setWebsiteRating] = useState(
    d.websiteRating || "",
  )

  const [websiteLikes, setWebsiteLikes] = useState<string[]>(
    d.websiteLikes || [],
  )

  const [websiteFeatures, setWebsiteFeatures] = useState<string[]>(
    d.websiteFeatures || [],
  )

  const [onlineRankings, setOnlineRankings] = useState<string[]>(
    d.onlineRankings || [],
  )

  const [paidAdvertising, setPaidAdvertising] = useState(
    d.paidAdvertising || "",
  )

  const [competitorContent, setCompetitorContent] = useState<string[]>(
    d.competitorContent || [],
  )

  const [trustSignals, setTrustSignals] = useState<string[]>(
    d.trustSignals || [],
  )

  const [digitalCapabilities, setDigitalCapabilities] = useState<string[]>(
    d.digitalCapabilities || [],
  )

  const [digitalCompetitionLevel, setDigitalCompetitionLevel] = useState(
    d.digitalCompetitionLevel || "",
  )

  const [onlineMetric, setOnlineMetric] = useState(
    d.onlineMetric || "",
  )

  const [competitorAchievements, setCompetitorAchievements] = useState<string[]>(
    d.competitorAchievements || [],
  )

  const [ownAchievements, setOwnAchievements] = useState<string[]>(
    d.ownAchievements || [],
  )

  const [publicAchievements, setPublicAchievements] = useState<string[]>(
    d.publicAchievements || [],
  )

  const [futureAchievement, setFutureAchievement] = useState(
    d.futureAchievement || "",
  )

  const [achievementPeriod, setAchievementPeriod] = useState(
    d.achievementPeriod || "",
  )

  const [trustProof, setTrustProof] = useState<string[]>(
    d.trustProof || [],
  )

  const [achievementDisplay, setAchievementDisplay] = useState<string[]>(
    d.achievementDisplay || [],
  )

  const [competitorWebsiteUrls, setCompetitorWebsiteUrls] = useState(
    d.competitorWebsiteUrls || "",
  )

  const [visualPreferences, setVisualPreferences] = useState<string[]>(
    d.visualPreferences || [],
  )

  const [differentiation, setDifferentiation] = useState(
    d.differentiation || "",
  )

  const saveData = () => {
    updateData({
      competitorKnowledge,
      competitorCount,
      competitors,
      competitorReach,
      competitorType,
      customerChoice,
      businessStrengths,
      competitorStrengths,
      competitivePosition,
      comparisonApproach,
      competitiveThreat,
      onlineChannels,
      websiteRating,
      websiteLikes,
      websiteFeatures,
      onlineRankings,
      paidAdvertising,
      competitorContent,
      trustSignals,
      digitalCapabilities,
      digitalCompetitionLevel,
      onlineMetric,
      competitorAchievements,
      ownAchievements,
      publicAchievements,
      futureAchievement,
      achievementPeriod,
      trustProof,
      achievementDisplay,
      competitorWebsiteUrls,
      visualPreferences,
      differentiation,
      customerDiscovery,
      seoTarget,
      websitePresence,
      mainBusinessResult,
      secondaryOutcomes,
      websiteProblem,
      qualifiedLeads,
      salesBookings,
      successMeasurement,
      catchUpMetric
    } as Parameters<typeof updateData>[0])

    return true
  }

  const hasCompetitors =
    competitorKnowledge &&
    competitorKnowledge !== "No"

  const knownCompetitors =
    competitorKnowledge === "Yes, clearly" ||
    competitorKnowledge === "Know a few"

  const canReviewWebsites =
    websiteRating === "Much Better" ||
    websiteRating === "Better" ||
    websiteRating === "Similar"

  return (
    <StepWrapper
      title="Competitor Analysis"
      description="Help us understand your competitors and how your business compares."
    >
      <div className="grid gap-6">

        {/* =================================================
            MAIN QUESTION
        ================================================= */}

        <div className="grid gap-4">
          <Label className="text-base font-bold text-foreground">
            Do you know your main competitors?
          </Label>

          <DropdownSelect
            options={competitorKnowledgeOptions}
            value={competitorKnowledge}
            onChange={setCompetitorKnowledge}
            placeholder="Select an option"
          />
        </div>

        {hasCompetitors && (
          <>
            {/* HIDDEN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                How many competitors should we consider while planning your
                website?
              </Label>

              <DropdownSelect
                options={competitorCountOptions}
                value={competitorCount}
                onChange={setCompetitorCount}
                placeholder="Select an option"
              />
            </div>

            {/* MAIN */}
            {knownCompetitors && (
              <div className="grid gap-3 border-t border-border pt-6">
                <Label className="text-base font-bold text-foreground">
                  Who are your main competitors?
                </Label>

                <Input
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  placeholder="Enter competitor business names"
                />
              </div>
            )}

            {/* HIDDEN */}
            {competitors && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  Where do your competitors primarily compete with you?
                </Label>

                <DropdownSelect
                  options={competitorReachOptions}
                  value={competitorReach}
                  onChange={setCompetitorReach}
                  placeholder="Select an option"
                />
              </div>
            )}

            {/* MAIN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                What type of competitors are they?
              </Label>

              <MultiDropdownSelect
                options={competitorTypeOptions}
                value={competitorType}
                onChange={setCompetitorType}
                placeholder="Select competitor types"
              />
            </div>

            {/* MAIN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                Why do customers currently choose competitors instead of you?
              </Label>

              <MultiDropdownSelect
                options={customerChoiceOptions}
                value={customerChoice}
                onChange={setCustomerChoice}
                placeholder="Select reasons"
              />
            </div>

            {/* HIDDEN */}
            {customerChoice.length > 0 && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  What is the biggest competitive threat to your business?
                </Label>

                <MultiDropdownSelect
                  options={threatOptions}
                  value={competitiveThreat}
                  onChange={setCompetitiveThreat}
                  placeholder="Select threats"
                />
              </div>
            )
            }


            {/* MAIN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                Where do you believe your business is stronger than those
                competitors?
              </Label>

              <MultiDropdownSelect
                options={businessStrengthOptions}
                value={businessStrengths}
                onChange={setBusinessStrengths}
                placeholder="Select strengths"
              />
            </div>

            {businessStrengths.length > 0 && (
              <>
                {/* HIDDEN */}
                <div className="grid gap-4 border-t border-border pt-6">
                  <Label className="text-base font-medium text-[#877a75]">
                    What competitive position should your website communicate?
                  </Label>

                  <DropdownSelect
                    options={competitivePositionOptions}
                    value={competitivePosition}
                    onChange={setCompetitivePosition}
                    placeholder="Select an option"
                  />
                </div>

                {/* HIDDEN */}
                <div className="grid gap-4 border-t border-border pt-6">
                  <Label className="text-base font-medium text-[#877a75]">
                    Should your website directly compare your capabilities with
                    alternatives?
                  </Label>

                  <DropdownSelect
                    options={comparisonOptions}
                    value={comparisonApproach}
                    onChange={setComparisonApproach}
                    placeholder="Select an option"
                  />
                </div>

                {/* HIDDEN */}
                <div className="grid gap-4 border-t border-border pt-6">
                  <Label className="text-base font-medium text-[#877a75]">
                    What should visitors understand about you after comparing you
                    with competitors?
                  </Label>

                  <Textarea
                    className="rounded-xl border border-border bg-muted/30  "
                    value={visitorUnderstand}
                    onChange={(e) => setVisitorUnderstand(e.target.value)}
                    placeholder="Write your answer"
                  />
                </div>

              </>
            )}



            {/* MAIN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                Where do competitors currently appear stronger than your business?
              </Label>

              <MultiDropdownSelect
                options={competitorStrengthOptions}
                value={competitorStrengths}
                onChange={setCompetitorStrengths}
                placeholder="Select areas"
              />
            </div>

            {competitorStrengths.length >0 &&(
              <>
              {/* HIDDEN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                What online capability do competitors have that you currently
                lack?
              </Label>

              <MultiDropdownSelect
                options={digitalCapabilityOptions}
                value={digitalCapabilities}
                onChange={setDigitalCapabilities}
                placeholder="Select capabilities"
              />
            </div>

            {/* HIDDEN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                Which competitor achievements concern or impress you most?
              </Label>

              <MultiDropdownSelect
                options={competitorAchievementOptions}
                value={competitorAchievements}
                onChange={setCompetitorAchievements}
                placeholder="Select achievements"
              />
            </div>
              </>
            )}

            

            {/* MAIN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                Which online channels are your competitors strong on?
              </Label>

              <MultiDropdownSelect
                options={onlineChannelOptions}
                value={onlineChannels}
                onChange={setOnlineChannels}
                placeholder="Select channels"
              />
            </div>

            {/* HIDDEN */}
            {onlineChannels.length > 0 && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  How would you rate competitors' websites compared with your
                  current online presence?
                </Label>

                <DropdownSelect
                  options={websiteRatingOptions}
                  value={websiteRating}
                  onChange={setWebsiteRating}
                  placeholder="Select an option"
                />
              </div>
            )}

            {/* MAIN */}
            {canReviewWebsites && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-bold text-foreground">
                  What do you like about competitors' websites?
                </Label>

                <MultiDropdownSelect
                  options={websiteLikeOptions}
                  value={websiteLikes}
                  onChange={setWebsiteLikes}
                  placeholder="Select what you like"
                />
              </div>
            )}

            {/* HIDDEN / Q196 */}
            {websiteLikes.length > 0 && (
              <div className="grid gap-3 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  Are there any competitor websites whose visual style you
                  like?
                </Label>

                <Input
                  value={competitorWebsiteUrls}
                  onChange={(e) =>
                    setCompetitorWebsiteUrls(e.target.value)
                  }
                  placeholder="Enter competitor website URLs"
                />
              </div>
            )}

            {/* HIDDEN / Q197 */}
            {competitorWebsiteUrls.trim() && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  What exactly do you like about those websites?
                </Label>

                <MultiDropdownSelect
                  options={visualPreferenceOptions}
                  value={visualPreferences}
                  onChange={setVisualPreferences}
                  placeholder="Select what you like"
                />
              </div>
            )}

            {/* MAIN */}
            {canReviewWebsites && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-bold text-foreground">
                  Which competitor website features would you like to match or
                  improve upon?
                </Label>

                <MultiDropdownSelect
                  options={websiteFeatureOptions}
                  value={websiteFeatures}
                  onChange={setWebsiteFeatures}
                  placeholder="Select features"
                />
              </div>
            )}

            {/* HIDDEN / Q198 */}
            {visualPreferences.length > 0 && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  Should your website feel similar or clearly differentiated?
                </Label>

                <DropdownSelect
                  options={differentiationOptions}
                  value={differentiation}
                  onChange={setDifferentiation}
                  placeholder="Select an option"
                />
              </div>
            )}

            {/* MAIN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                Where do competitors rank better online?
              </Label>

              <MultiDropdownSelect
                options={rankingOptions}
                value={onlineRankings}
                onChange={setOnlineRankings}
                placeholder="Select areas"
              />
            </div>

            {onlineRankings.length >0 &&(

              <>
              {/* Hidden (109) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                How should people primarily discover your business?
              </Label>
              <MultiDropdownSelect
                options={discoveryOptions}
                value={customerDiscovery}
                onChange={setCustomerDiscovery}
                placeholder="Select discovery channels"
              />
            </div>

            {/* Hidden (110) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                How should people primarily discover your business?
              </Label>
              <DropdownSelect
                options={seoTargetOptions}
                value={seoTarget}
                onChange={setSeoTarget}
                placeholder="Select an option"
              />
            </div>

            {/* Hidden (112) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                How should people primarily discover your business?
              </Label>
              <MultiDropdownSelect
                options={onlinePresenceOptions}
                value={websitePresence}
                onChange={setWebsitePresence}
                placeholder="Select an option"
              />
            </div>

              </>
            )}


            {/* MAIN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                Which competitor content appears most effective?
              </Label>

              <MultiDropdownSelect
                options={contentOptions}
                value={competitorContent}
                onChange={setCompetitorContent}
                placeholder="Select content types"
              />
            </div>

            {/* HIDDEN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                Do competitors appear to run paid digital advertising?
              </Label>

              <DropdownSelect
                options={paidAdvertisingOptions}
                value={paidAdvertising}
                onChange={setPaidAdvertising}
                placeholder="Select an option"
              />
            </div>

            {/* HIDDEN */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                Which competitor trust signals are visible online?
              </Label>

              <MultiDropdownSelect
                options={trustSignalOptions}
                value={trustSignals}
                onChange={setTrustSignals}
                placeholder="Select trust signals"
              />
            </div>


            {/* MAIN(147) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                What is the single most important business result you want from the website?
              </Label>

              <MultiDropdownSelect
                options={mainBusinessResultOptions}
                value={mainBusinessResult}
                onChange={setMainBusinessResult}
                placeholder="Select content types"
              />
            </div>

            {/* HIDDEN(143) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                Which future achievement matters most to you?
              </Label>

              <DropdownSelect
                options={futureAchievementOptions}
                value={futureAchievement}
                onChange={setFutureAchievement}
                placeholder="Select an option"
              />
            </div>

            {/* HIDDEN(144) */}
            {futureAchievement && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  Over what period do you want to achieve this?
                </Label>

                <DropdownSelect
                  options={achievementPeriodOptions}
                  value={achievementPeriod}
                  onChange={setAchievementPeriod}
                  placeholder="Select an option"
                />
              </div>
            )}

            {/* HIDDEN(148) */}
            {futureAchievement && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  Which secondary business outcomes do you want?
                </Label>

                <DropdownSelect
                  options={secondaryOutcomeOptions}
                  value={secondaryOutcomes}
                  onChange={setSecondaryOutcomes}
                  placeholder="Select an option"
                />
              </div>
            )}

            {/* HIDDEN(149) */}
            {futureAchievement && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  What business problem should the website solve first?
                </Label>

                <DropdownSelect
                  options={websiteProblemOptions}
                  value={websiteProblem}
                  onChange={setWebsiteProblem}
                  placeholder="Select an option"
                />
              </div>
            )}
            {/* HIDDEN(151) */}
            {futureAchievement && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  How many qualified leads would make the website worthwhile each month?
                </Label>

                <DropdownSelect
                  options={qualifiedLeadOptions}
                  value={qualifiedLeads}
                  onChange={setQualifiedLeads}
                  placeholder="Select an option"
                />
              </div>
            )}
            {/* HIDDEN(152) */}
            {futureAchievement && (
              <div className="grid gap-4 border-t border-border pt-6">
                <Label className="text-base font-medium text-[#877a75]">
                  How many additional sales/orders/bookings would make the website worthwhile monthly?
                </Label>

                <DropdownSelect
                  options={salesBookingOptions}
                  value={salesBookings}
                  onChange={setSalesBookings}
                  placeholder="Select an option"
                />
              </div>
            )}

            {/* MAIN(159) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-bold text-foreground">
                How should website success primarily be measured?
              </Label>

              <MultiDropdownSelect
                options={successMeasurementOptions}
                value={successMeasurement}
                onChange={setSuccessMeasurement}
                placeholder="Select content types"
              />
            </div>

            {/* HIDDEN(137) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                How aggressively should your website compete digitally?
              </Label>

              <DropdownSelect
                options={digitalCompetitionOptions}
                value={digitalCompetitionLevel}
                onChange={setDigitalCompetitionLevel}
                placeholder="Select an option"
              />
            </div>

            {/* HIDDEN(138) */}
            <div className="grid gap-4 border-t border-border pt-6">
              <Label className="text-base font-medium text-[#877a75]">
                Which online metric would most clearly show that you are catching competitors?
              </Label>

              <DropdownSelect
                options={catchingCompetitorsMetricOptions}
                value={catchUpMetric}
                onChange={setCatchUpMetric}
                placeholder="Select an option"
              />
            </div>





          </>
        )}

      </div>

      <NavigationButtons onNext={saveData} />
    </StepWrapper>
  )
}