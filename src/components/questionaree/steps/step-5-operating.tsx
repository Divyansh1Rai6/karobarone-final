
"use client"

import { useState } from "react"
import { useQuestionnaire } from "@/context/questionnaire-context"
import { StepWrapper } from "../step-wrapper"
import { NavigationButtons } from "../navigation-buttons"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const questions = [
  {
    key: "competitorStrongestOnline",
    label: "Where do those competitors appear strongest online?",
    options: ["Website", "Google", "Maps", "Instagram", "Facebook", "LinkedIn", "YouTube", "Marketplaces", "Ads"],
  },
  {
    key: "likedCompetitorWebsite",
    label: "What do you like about their websites?",
    options: ["Design", "Colours", "Content", "Products", "Navigation", "Testimonials", "Pricing"],
  },
  {
    key: "desiredCompetitorFeature",
    label: "Is there any competitor website feature you would like your website to have or improve upon?",
    options: ["Catalogue", "Filters", "Booking", "Quote", "E-commerce", "Chatbot", "WhatsApp"],
  },
  {
    key: "competitorsEasierToFindOnGoogle",
    label: "Do competitors appear easier to find on Google than your business?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    key: "competitorMarketingWorks",
    label: "What type of competitor marketing seems to work well?",
    options: ["Social posts", "Reels", "Educational content", "Ads", "Testimonials", "Offers", "Case studies"],
  },
  {
    key: "keyBusinessResult",
    label: "What is the single most important business result you want this website to create?",
    options: ["Leads", "Sales", "Bookings", "Credibility", "Visibility", "Automation"],
  },
  {
    key: "websiteSuccessMetric",
    label: "How would you personally decide after six months whether the website has been successful?",
    options: ["Leads", "Revenue", "Traffic", "Rankings", "Orders", "Calls", "Enquiries"],
  },
] as const

export function Step5Operating() {
  const { data, updateData } = useQuestionnaire()
  const [firstQuestionError, setFirstQuestionError] = useState("")
  const firstQuestionKey = questions[0].key

  const validate = (): boolean => {
    const firstAnswer = data[firstQuestionKey]?.trim()

    if (!firstAnswer) {
      setFirstQuestionError("Please answer the first question before continuing.")
      return false
    }

    setFirstQuestionError("")
    return true
  }

  const canAccessQuestion = (index: number): boolean => {
    if (index === 0) return true

    return Boolean(data[questions[index - 1].key]?.trim())
  }

  return (
    <StepWrapper
      title="Market Insights"
    //description="Choose the option that best matches your current understanding of competitors and your business goals."
    >
      <div className="grid gap-5">
        {questions.map((question, index) => (
          <div key={question.key} className="grid gap-2">
            <Label htmlFor={question.key}>{question.label}</Label>

            <Select
              value={data[question.key] || undefined}
              disabled={!canAccessQuestion(index)}
              onValueChange={(value) => {
                updateData({ [question.key]: value } as any)
                if (index === 0 && value) {
                  setFirstQuestionError("")
                }
              }}
            >
              <SelectTrigger
                id={question.key}
                className="
                  w-full h-11
                  rounded-xl
                  transition-all duration-200 ease-out
                  hover:border-primary/50
                  focus:ring-2 focus:ring-primary/20
                  data-[state=open]:border-primary
                  data-[state=open]:ring-2
                  data-[state=open]:ring-primary/20
                "
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>

              <SelectContent
                side="bottom"
                sideOffset={6}
                avoidCollisions={false}
                className="
                  opacity-100!
                  w-(--radix-select-trigger-width)
                  max-h-60
                  overflow-y-auto
                  overflow-x-hidden
                  rounded-xl
                  scrollbar-thin
                  [scrollbar-color:var(--primary)_transparent]
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-primary/30
                  [&::-webkit-scrollbar-thumb:hover]:bg-primary/60
                  border
                  bg-background
                  p-1.5
                  shadow-2xl

                  origin-top
                  transition-all
                  duration-200
                  ease-out

                  data-[state=open]:animate-in
                  data-[state=open]:fade-in-0
                  data-[state=open]:zoom-in-95
                  data-[state=open]:slide-in-from-top-2

                  data-[state=closed]:animate-out
                  data-[state=closed]:fade-out-0
                  data-[state=closed]:zoom-out-95
                  data-[state=closed]:slide-out-to-top-2
                "
              >
                {question.options.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="
                      cursor-pointer
                      rounded-lg
                      px-3 
                      py-2.5
                      my-0.5
                      transition-all
                      duration-150
                      outline-none

                      hover:bg-primary/10
                      focus:bg-primary/10

                      data-[state=checked]:bg-primary/15
                      data-[state=checked]:font-medium

                      data-highlighted:bg-primary/10
                    "
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {index === 0 && firstQuestionError && (
              <p className="text-xs text-destructive">{firstQuestionError}</p>
            )}
          </div>
        ))}
      </div>

      <NavigationButtons onNext={validate} />
    </StepWrapper>
  )
}
