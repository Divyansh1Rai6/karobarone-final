"use client"

import { Fragment } from "react"
import { useQuestionnaire } from "@/context/questionnaire-context"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const businessQuestionRows = [
  { code: "Q160", topic: "Which parts of your business still require a lot of manual work?", sample: "Sales / marketing / quotation / inventory / booking / reporting / support / operations / etc." },
  { code: "Q161", topic: "What software or digital systems do you already use?", sample: "Website / CRM / ERP / accounting / inventory / POS / Sheets / none" },
  { code: "Q162", topic: "What is the most important customer journey step that should be improved?", sample: "Discovery / quote / checkout / support / delivery / renewal" },
  { code: "Q163", topic: "Apart from a website, what technology do you think could help your business?", sample: "E-commerce / CRM / ERP / custom software / AI / automation / app / analytics / etc." },
  { code: "Q164", topic: "Which daily process creates the highest business friction?", sample: "Orders / invoicing / inventory / lead capture / schedules / reporting" },
  { code: "Q165", topic: "What information is missing when you make business decisions?", sample: "Sales / inventory / cost / campaign / customer / staffing" },
  { code: "Q166", topic: "What type of customer experience would delight your audience?", sample: "Fast response / faster delivery / personal follow-up / online booking" },
  { code: "Q167", topic: "If technology could automate one repetitive task in your company, what would create the most value?", sample: "Follow-ups / quotation / data entry / reporting / booking / support / etc." },
  { code: "Q168", topic: "Which team or business unit needs the most operational visibility?", sample: "Sales / support / fulfillment / finance / warehouse / service desk" },
  { code: "Q169", topic: "Which marketing channel is currently most effective for your business?", sample: "Google / WhatsApp / Instagram / referrals / local SEO / ads" },
  { code: "Q170", topic: "What do customers usually ask before buying from you?", sample: "Pricing / availability / delivery / product use / customization" },
  { code: "Q171", topic: "How do you currently measure whether a campaign is working?", sample: "Leads / calls / conversion / website traffic / sales" },
  { code: "Q172", topic: "What type of reports should your website or management system provide?", sample: "Sales / order / customer / inventory / field activity / staff activity" },
  { code: "Q173", topic: "What should technology ultimately improve most — revenue, cost, leads, productivity, customer experience, or scalability?", sample: "MCQ" },
  { code: "Q174", topic: "What is your preferred way of receiving customer inquiries?", sample: "Phone / WhatsApp / form / chat / email / walk-ins" },
  { code: "Q175", topic: "What implementation approach would you prefer?", sample: "MCQ: One Priority at a Time / Small MVP First / Phased Transformation / Complete Integrated System / Need Consultation First" },
  { code: "Q176", topic: "Approximately what annual revenue range does your business fall into? You can choose not to answer.", sample: "Revenue band" },
  { code: "Q177", topic: "What annual business growth would you ideally like to achieve over the next year or two?", sample: "<5% / 5–10% / 11–20% / 21–30% / 31–50% / 50%+" },
  { code: "Q178", topic: "Which business documents are important in your workflow?", sample: "Invoices / quotations / contracts / licenses / orders / tax forms" },
  { code: "Q179", topic: "What content or story do you want visitors to understand quickly?", sample: "Mission / values / founder / products / service promise / proof" },
  { code: "Q180", topic: "What percentage of annual revenue would you consider investing in IT if the business case is credible?", sample: "MCQ: <1% / 1-2% / 2-3% / 3-5% / 5-10% / >10% / Depends on ROI / Not Sure" },
  { code: "Q181", topic: "What investment range would you consider for your next digital initiative?", sample: "MCQ: <₹25k / ₹25k-₹50k / ₹50k-₹1L / ₹1L-₹2.5L / ₹2.5L-₹5L / ₹5L-₹10L / ₹10L+ / Need Business Case First" },
  { code: "Q182", topic: "What payback period would make an IT investment attractive?", sample: "MCQ: <3 Months / 3–6 Months / 6–12 Months / 12–24 Months / 2–3 Years / Depends on Strategic Value / Not Sure" },
  { code: "Q183", topic: "Which financial return matters most from technology investment?", sample: "MCQ: Revenue Increase / Cost Reduction / Employee Time Saved / More Leads / Higher Conversion / Repeat Sales / Lower Acquisition Cost / Reduced Errors / Scalability / Combination" },
  { code: "Q184", topic: "Which non-financial return matters most?", sample: "MCQ: Better Customer Experience / Brand Credibility / Faster Decisions / Better Data / Employee Productivity / Process Control / Compliance / Scalability / Competitive Advantage" },
  { code: "Q185", topic: "Would you prefer to start with one small high-value solution, an MVP, or a broader digital transformation?", sample: "One priority / MVP / phased / integrated / consultation first" },
  { code: "Q186", topic: "Which investment profile best reflects your preference?", sample: "MCQ: Very Conservative / Small Experiments / Invest After Proof / Moderate Growth Investment / Aggressive Digital Expansion / Depends on Business Case" },
  { code: "Q187", topic: "Which of these 3-4 colour combinations do you prefer?", sample: "A — Corporate Blue / Navy + Royal Blue + Light Blue + White; B — Premium Dark Charcoal + Graphite + Gold; C — Technology Deep Navy + Indigo + Cyan + White; D — Industrial Charcoal + Steel Grey + Orange + White; E — Natural Forest Green + Emerald + Mint + White; F — Minimal Professional Black + Slate Grey + Light Grey + White" },
  { code: "Q188", topic: "Which overall colour personality should your website have?", sample: "MCQ: Corporate & Trustworthy / Premium & Sophisticated / Technology & Modern / Natural & Sustainable / Energetic & Bold / Warm & Approachable / Industrial & Technical / Minimal & Professional / Luxury / Creative / Healthcare / Clean, Let the system recommend" },
  { code: "Q189", topic: "Which of these 3-4 colour combinations do you prefer for your website?", sample: "Website palette options: Corporate Blue / Premium Dark / Modern SaaS / Industrial Engineering / Green Professional / Luxury Black & Gold / Elegant Burgundy / Healthcare Clean / Warm Business / Modern Purple / Bold Red / Minimal Neutral / Ocean Professional / Earth & Nature / Creative Coral / Royal Premium / Midnight Blue / Let us recommend" },
]

const dropdownOptions: Record<string, string[]> = {
  Q175: ["One Priority at a Time", "Small MVP First", "Phased Transformation", "Complete Integrated System", "Need Consultation First"],
  Q180: ["<1%", "1-2%", "2-3%", "3-5%", "5-10%", ">10%", "Depends on ROI / Not Sure"],
  Q181: ["<₹25k", "₹25k-₹50k", "₹50k-₹1L", "₹1L-₹2.5L", "₹2.5L-₹5L", "₹5L-₹10L", "₹10L+", "Need Business Case First"],
  Q182: ["<3 Months", "3–6 Months", "6–12 Months", "12–24 Months", "2–3 Years", "Depends on Strategic Value", "Not Sure"],
  Q183: ["Revenue Increase", "Cost Reduction", "Employee Time Saved", "More Leads", "Higher Conversion", "Repeat Sales", "Lower Acquisition Cost", "Reduced Errors", "Scalability", "Combination"],
  Q184: ["Better Customer Experience", "Brand Credibility", "Faster Decisions", "Better Data", "Employee Productivity", "Process Control", "Compliance", "Scalability", "Competitive Advantage"],
  Q186: [
    "Very Conservative",
    "Small Experiments",
    "Invest After Proof",
    "Moderate Growth Investment",
    "Aggressive Digital Expansion",
    "Depends on Business Case",
  ],
  Q188: [
    "Corporate & Trustworthy",
    "Premium & Sophisticated",
    "Technology & Modern",
    "Natural & Sustainable",
    "Energetic & Bold",
    "Warm & Approachable",
    "Industrial & Technical",
    "Minimal & Professional",
    "Luxury",
    "Creative",
    "Healthcare / Clean",
    "Let the system recommend",
  ],
  Q189: [
    "Corporate Blue",
    "Premium Dark",
    "Modern SaaS",
    "Industrial Engineering",
    "Green Professional",
    "Luxury Black & Gold",
    "Elegant Burgundy",
    "Healthcare Clean",
    "Warm Business",
    "Modern Purple",
    "Bold Red",
    "Minimal Neutral",
    "Ocean Professional",
    "Earth & Nature",
    "Creative Coral",
    "Royal Premium",
    "Midnight Blue",
    "Let us recommend",
  ],
}

const subQuestionMap: Record<string, { code: string; topic: string; sample: string; options?: string[] }[]> = {
  Q186: [
    {
      code: "Q187",
      topic: "Which of these 3-4 colour combinations do you prefer?",
      sample: "Corporate Blue / Premium Dark / Modern SaaS / Industrial Engineering / Green Professional / Luxury Black & Gold / Elegant Burgundy / Healthcare Clean / Warm Business / Modern Purple / Bold Red / Minimal Neutral / Ocean Professional / Earth & Nature / Creative Coral / Royal Premium / Midnight Blue / Let us recommend",
      options: [
        "Corporate Blue",
        "Premium Dark",
        "Modern SaaS",
        "Industrial Engineering",
        "Green Professional",
        "Luxury Black & Gold",
        "Elegant Burgundy",
        "Healthcare Clean",
        "Warm Business",
        "Modern Purple",
        "Bold Red",
        "Minimal Neutral",
        "Ocean Professional",
        "Earth & Nature",
        "Creative Coral",
        "Royal Premium",
        "Midnight Blue",
        "Let us recommend",
      ],
    },
  ],
  Q188: [
    {
      code: "Q189",
      topic: "Which of these 3-4 colour combinations do you prefer for your website?",
      sample: "Corporate Blue / Premium Dark / Modern SaaS / Industrial Engineering / Green Professional / Luxury Black & Gold / Elegant Burgundy / Healthcare Clean / Warm Business / Modern Purple / Bold Red / Minimal Neutral / Ocean Professional / Earth & Nature / Creative Coral / Royal Premium / Midnight Blue / Let us recommend",
      options: [
        "Corporate Blue",
        "Premium Dark",
        "Modern SaaS",
        "Industrial Engineering",
        "Green Professional",
        "Luxury Black & Gold",
        "Elegant Burgundy",
        "Healthcare Clean",
        "Warm Business",
        "Modern Purple",
        "Bold Red",
        "Minimal Neutral",
        "Ocean Professional",
        "Earth & Nature",
        "Creative Coral",
        "Royal Premium",
        "Midnight Blue",
        "Let us recommend",
      ],
    },
  ],
}

export function BusinessQuestionTable() {
  const { data, updateData } = useQuestionnaire()

  const answerMap = data.businessQuestions || {}

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Label className="text-sm font-semibold text-foreground">
            Business Requirement Questions
          </Label>
          <p className="text-xs text-muted-foreground">
            Answer the 29 business questions below and the preview will update with your business profile.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Question</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Answer</th>
            </tr>
          </thead>
          <tbody>
            {businessQuestionRows.map((row, index) => {
              const hasValue = Boolean(answerMap[row.code]?.trim())
              const subQuestions = subQuestionMap[row.code] || []

              return (
                <Fragment key={row.code}>
                  <tr className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="border-t border-border px-4 py-3 align-top">
                      <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        {row.code}
                      </span>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {row.topic}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {row.sample}
                      </p>
                    </td>
                    <td className="border-t border-border px-4 py-3 align-top">
                      {dropdownOptions[row.code] ? (
                        <select
                          value={answerMap[row.code] ?? ""}
                          onChange={(event) => {
                            updateData({
                              businessQuestions: {
                                ...(data.businessQuestions || {}),
                                [row.code]: event.target.value,
                              },
                            })
                          }}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="">Select an option</option>
                          {dropdownOptions[row.code].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Textarea
                          value={answerMap[row.code] ?? ""}
                          placeholder="Add answer"
                          className="min-h-[80px] resize-y text-sm"
                          onChange={(event) => {
                            updateData({
                              businessQuestions: {
                                ...(data.businessQuestions || {}),
                                [row.code]: event.target.value,
                              },
                            })
                          }}
                        />
                      )}
                    </td>
                  </tr>

                  {hasValue && subQuestions.length > 0 && subQuestions.map((subQuestion) => (
                    <tr key={`${row.code}-${subQuestion.code}`} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="border-t border-border px-4 py-3 align-top pl-8">
                        <span className="inline-flex rounded-full bg-secondary/10 px-2 py-1 text-xs font-semibold text-secondary-foreground">
                          {subQuestion.code}
                        </span>
                        <p className="mt-2 text-sm font-medium text-foreground">
                          {subQuestion.topic}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {subQuestion.sample}
                        </p>
                      </td>
                      <td className="border-t border-border px-4 py-3 align-top">
                        <select
                          value={answerMap[subQuestion.code] ?? ""}
                          onChange={(event) => {
                            updateData({
                              businessQuestions: {
                                ...(data.businessQuestions || {}),
                                [subQuestion.code]: event.target.value,
                              },
                            })
                          }}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="">Select an option</option>
                          {(subQuestion.options || []).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
