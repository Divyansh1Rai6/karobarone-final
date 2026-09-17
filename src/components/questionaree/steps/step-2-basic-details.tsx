"use client"

import { useQuestionnaire } from "@/context/questionnaire-context"
import { StepWrapper } from "../step-wrapper"
import { NavigationButtons } from "../navigation-buttons"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

const BUSINESS_NATURE_OPTIONS = ["product", "service"]

function NaturePills({
                       options,
                       value,
                       onChange,
                     }: {
  options: string[]
  value: string
  onChange: (v: "product" | "service") => void
}) {
  return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt

          return (
              <button
                  key={opt}
                  type="button"
                  onClick={() => onChange(opt as "product" | "service")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium capitalize transition-colors ${
                      selected
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-muted-foreground/40"
                  }`}
              >
                {selected && <Check className="w-3.5 h-3.5 text-accent" />}
                {opt}
              </button>
          )
        })}
      </div>
  )
}

export function Step2BasicDetails() {
  const { data, updateData } = useQuestionnaire()

  return (
      <StepWrapper title="Business Basic Details">
        <div className="grid gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="businessName">
                Business / Brand Name
              </Label>

              <Input
                  id="businessName"
                  type="text"
                  value={data.businessName || ""}
                  onChange={(e) =>
                      updateData({ businessName: e.target.value })
                  }
                  placeholder="e.g., KarobarOne"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="legalName">
                Registered Legal Name
              </Label>

              <Input
                  id="legalName"
                  type="text"
                  value={data.legalName || ""}
                  onChange={(e) =>
                      updateData({ legalName: e.target.value })
                  }
                  placeholder="e.g., KarobarOne Private Limited"
              />
            </div>
          </div>

          {/* Contact Person Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="contactPerson">
                Contact Person Name
              </Label>

              <Input
                  id="contactPerson"
                  type="text"
                  value={data.contactPerson || ""}
                  onChange={(e) =>
                      updateData({ contactPerson: e.target.value })
                  }
                  placeholder="e.g., John Doe"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="designation">
                Designation
              </Label>

              <Input
                  id="designation"
                  type="text"
                  value={data.designation || ""}
                  onChange={(e) =>
                      updateData({ designation: e.target.value })
                  }
                  placeholder="e.g., Founder / Managing Director"
              />
            </div>
          </div>

          {/* Communication Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="phoneNumber">
                Primary Phone Number
              </Label>

              <Input
                  id="phoneNumber"
                  type="text"
                  value={data.phoneNumber || ""}
                  onChange={(e) =>
                      updateData({ phoneNumber: e.target.value })
                  }
                  placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="email">
                Business Email Address
              </Label>

              <Input
                  id="email"
                  type="email"
                  value={data.email || ""}
                  onChange={(e) =>
                      updateData({ email: e.target.value })
                  }
                  placeholder="info@yourbusiness.com"
              />
            </div>
          </div>

          {/* Business Attributes */}
          <div className="grid gap-1.5">
            <Label htmlFor="brandTagline">
              Brand Tagline / Slogan
            </Label>

            <Input
                id="brandTagline"
                type="text"
                value={data.brandTagline || ""}
                onChange={(e) =>
                    updateData({ brandTagline: e.target.value })
                }
                placeholder="e.g., Empowering Local Digital Commerce"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="industryType">
              Industry Sector Type
            </Label>

            <Input
                id="industryType"
                type="text"
                value={data.industryType || ""}
                onChange={(e) =>
                    updateData({ industryType: e.target.value })
                }
                placeholder="e.g., Retail, Manufacturing, IT Software"
            />
          </div>

          {/* Business Nature */}
          <div className="grid gap-3">
            <Label>
              What is the primary nature of your business transactions?
            </Label>

            <NaturePills
                options={BUSINESS_NATURE_OPTIONS}
                value={data.businessNature}
                onChange={(v) =>
                    updateData({ businessNature: v })
                }
            />
          </div>

          {/* Address Fields Block */}
          <div className="border-t pt-4 mt-2 space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground">
              📍 Physical Operational Address
            </h3>

            <div className="grid gap-1.5">
              <Label htmlFor="businessAddressLine1">
                Street Address Line 1
              </Label>

              <Input
                  id="businessAddressLine1"
                  type="text"
                  value={data.businessAddressLine1 || ""}
                  onChange={(e) =>
                      updateData({
                        businessAddressLine1: e.target.value,
                      })
                  }
                  placeholder="Building name, Floor, Street details..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="city">City</Label>

                <Input
                    id="city"
                    type="text"
                    value={data.city || ""}
                    onChange={(e) =>
                        updateData({ city: e.target.value })
                    }
                    placeholder="e.g., Asansol"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="state">State</Label>

                <Input
                    id="state"
                    type="text"
                    value={data.state || ""}
                    onChange={(e) =>
                        updateData({ state: e.target.value })
                    }
                    placeholder="e.g., West Bengal"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="postalCode">
                  Postal Code
                </Label>

                <Input
                    id="postalCode"
                    type="text"
                    value={data.postalCode || ""}
                    onChange={(e) =>
                        updateData({
                          postalCode: e.target.value,
                        })
                    }
                    placeholder="e.g., 713334"
                />
              </div>
            </div>
          </div>

          {/* GST / PAN Config Layer */}
          <div className="border-t pt-4 space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground">
              ⚖️ Statutory Registrations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="gstNumber">
                  GSTIN Identifier (Optional)
                </Label>

                <Input
                    id="gstNumber"
                    type="text"
                    value={data.gstNumber || ""}
                    onChange={(e) =>
                        updateData({
                          gstNumber: e.target.value,
                        })
                    }
                    placeholder="19AAAAA0000A1Z5"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="panNumber">
                  Permanent Account Number (PAN)
                </Label>

                <Input
                    id="panNumber"
                    type="text"
                    value={data.panNumber || ""}
                    onChange={(e) =>
                        updateData({
                          panNumber: e.target.value,
                        })
                    }
                    placeholder="ABCDE1234F"
                />
              </div>
            </div>
          </div>
        </div>
        <NavigationButtons />
      </StepWrapper>
  )
}