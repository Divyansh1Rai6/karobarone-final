"use client"

import { useEffect, useRef, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { createPortal } from "react-dom"

import {
    Check,
    ChevronDown,
    Search,
    Sparkles,
    X,
} from "lucide-react"

import { QuestionConfig } from "@/config/questionnaire-config"

interface DynamicQuestionProps {
    question: QuestionConfig
    value: string | string[] | undefined
    onChange: (value: string | string[]) => void
    faded?: boolean
}

function FieldShell({
    question,
    nested,
    children,
}: {
    question: QuestionConfig
    nested: boolean
    children: React.ReactNode
}) {
    return (
        <div
            className={
                nested
                    ? "relative pl-6 overflow-visible"
                    : "grid gap-2.5 overflow-visible"
            }
        >
            {nested && (
                <span
                    className="absolute left-[7px] top-0 bottom-0 w-px bg-border"
                    aria-hidden
                />
            )}

            {nested && (
                <span
                    className="absolute left-1 top-2.5 h-2 w-2 rounded-full border-2 border-background bg-border"
                    aria-hidden
                />
            )}

            <div
                className={
                    nested
                        ? "grid gap-2 overflow-visible"
                        : "grid gap-2.5 overflow-visible"
                }
            >
                <div className="flex items-start gap-2">
                    <Label
                        className={
                            nested
                                ? "text-sm font-medium text-muted-foreground"
                                : "text-base font-semibold text-foreground"
                        }
                    >
                        {question.text}
                    </Label>
                </div>

                {children}
            </div>
        </div>
    )
}

function SelectTrigger({
    value,
    placeholder,
    open,
    onClick,
    triggerRef,
}: {
    value: string
    placeholder: string
    open: boolean
    onClick: () => void
    triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
    return (
        <button
            ref={triggerRef}
            type="button"
            onClick={onClick}
            className="relative z-[10000] flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-sm shadow-sm transition hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
            <span
                className={
                    value
                        ? "text-foreground"
                        : "text-muted-foreground"
                }
            >
                {value || placeholder}
            </span>

            <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                }`}
            />
        </button>
    )
}

function OptionPanel({
    options,
    selected,
    multi,
    onSelect,
    position,
    panelRef,
    aiStyle = false,
}: {
    options: string[]
    selected: string | string[] | undefined
    multi: boolean
    onSelect: (option: string) => void
    position: {
        top: number
        left: number
        width: number
    }
    panelRef: React.RefObject<HTMLDivElement | null>
    aiStyle?: boolean
}) {
    const [search, setSearch] = useState("")

    const selectedValues = Array.isArray(selected)
        ? selected
        : selected
          ? [selected]
          : []

    const filteredOptions =
        search.trim().length > 0
            ? options.filter((option) =>
                  option
                      .toLowerCase()
                      .includes(search.toLowerCase())
              )
            : options

    const panel = (
        <motion.div
            ref={panelRef}
            initial={{
                opacity: 0,
                y: -12,
                scale: 0.97,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                y: -8,
                scale: 0.97,
            }}
            transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.12)]"
            style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                width: position.width,
                zIndex: 999999,
            }}
        >
            {options.length > 6 && (
                <div className="border-b border-gray-100 bg-white p-2.5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search options..."
                            className={`h-9 w-full rounded-xl border bg-gray-50/70 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition focus:bg-white ${
                                aiStyle
                                    ? "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                                    : "border-gray-200 focus:border-[#7f915c] focus:ring-2 focus:ring-[#7f915c]/20"
                            }`}
                        />
                    </div>
                </div>
            )}

            <div className="max-h-56 overflow-y-auto p-1.5">
                {filteredOptions.length === 0 ? (
                    <div className="px-3 py-6 text-center text-sm text-gray-400">
                        No options found
                    </div>
                ) : (
                    filteredOptions.map((option, index) => {
                        const isSelected =
                            selectedValues.includes(option)

                        return (
                            <motion.button
                                key={option}
                                type="button"
                                onClick={() =>
                                    onSelect(option)
                                }
                                initial={{
                                    opacity: 0,
                                    y: -4,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.18,
                                    delay: index * 0.025,
                                    ease: "easeOut",
                                }}
                                whileHover={{
                                    x: 2,
                                }}
                                whileTap={{
                                    scale: 0.99,
                                }}
                                className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                                    aiStyle
                                        ? isSelected
                                            ? "border-[#7C3AED] bg-[#EDE9FE] font-semibold text-[#7C3AED]"
                                            : "border-transparent text-gray-700 hover:bg-[#F5F3FF]"
                                        : isSelected
                                          ? "border-transparent bg-[#7f915c]/10 font-medium text-[#7f915c]"
                                          : "border-transparent text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {multi ? (
                                    <span
                                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all ${
                                            aiStyle
                                                ? isSelected
                                                    ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow-sm"
                                                    : "border-gray-300 bg-white group-hover:border-gray-400"
                                                : isSelected
                                                  ? "border-[#7f915c] bg-[#7f915c] text-white shadow-sm"
                                                  : "border-gray-300 bg-white group-hover:border-gray-400"
                                        }`}
                                    >
                                        {isSelected && (
                                            <Check className="h-3 w-3 stroke-[3]" />
                                        )}
                                    </span>
                                ) : (
                                    <span
                                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all ${
                                            aiStyle
                                                ? isSelected
                                                    ? "border-[#7C3AED] bg-white"
                                                    : "border-gray-300 bg-white group-hover:border-gray-400"
                                                : isSelected
                                                  ? "border-[#7f915c] bg-white"
                                                  : "border-gray-300 bg-white group-hover:border-gray-400"
                                        }`}
                                    >
                                        {isSelected && (
                                            <span
                                                className={
                                                    aiStyle
                                                        ? "h-2 w-2 rounded-full bg-[#7C3AED]"
                                                        : "h-2 w-2 rounded-full bg-[#7f915c]"
                                                }
                                            />
                                        )}
                                    </span>
                                )}

                                <span
                                    className={`min-w-0 flex-1 truncate ${
                                        isSelected
                                            ? "font-semibold"
                                            : ""
                                    }`}
                                >
                                    {option}
                                </span>

                                {isSelected && !multi && (
                                    <Check
                                        className={
                                            aiStyle
                                                ? "h-4 w-4 shrink-0 text-[#7C3AED]"
                                                : "h-4 w-4 shrink-0 text-[#7f915c]"
                                        }
                                    />
                                )}
                            </motion.button>
                        )
                    })
                )}
            </div>
        </motion.div>
    )

    if (typeof document === "undefined") {
        return null
    }

    return createPortal(panel, document.body)
}


function SelectedChips({
    values,
    onRemove,
}: {
    values: string[]
    onRemove: (value: string) => void
}) {
    if (values.length === 0) {
        return null
    }

    return (
        <div className="flex flex-wrap gap-2 pt-1">
            {values.map((value) => (
                <span
                    key={value}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#7f915c]/30 bg-[#7f915c]/10 px-2.5 py-1 text-xs text-[#7f915c]"
                >
                    {value}

                    <button
                        type="button"
                        onClick={() => onRemove(value)}
                        className="rounded-full text-[#7f915c]/70 transition hover:text-[#7f915c]"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </span>
            ))}
        </div>
    )
}

export function DynamicQuestion({
    question,
    value,
    onChange,
    faded = false,
}: DynamicQuestionProps) {
    const [open, setOpen] = useState(false)
    const [showAIQuestion, setShowAIQuestion] = useState(false)

    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        left: 0,
        width: 0,
    })

    const triggerRef =
        useRef<HTMLButtonElement | null>(null)

    const dropdownRef =
        useRef<HTMLDivElement | null>(null)

    const nested = faded

    const updateDropdownPosition = () => {
        if (!triggerRef.current) {
            return
        }

        const rect =
            triggerRef.current.getBoundingClientRect()

        setDropdownPosition({
            top: rect.bottom + 4,
            left: rect.left,
            width: rect.width,
        })
    }

    useEffect(() => {
        if (!open) {
            return
        }

        updateDropdownPosition()

        const handleScroll = () => {
            updateDropdownPosition()
        }

        const handleResize = () => {
            updateDropdownPosition()
        }

        window.addEventListener(
            "scroll",
            handleScroll,
            true
        )

        window.addEventListener(
            "resize",
            handleResize
        )

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
                true
            )

            window.removeEventListener(
                "resize",
                handleResize
            )
        }
    }, [open])

    useEffect(() => {
        if (!open) {
            return
        }

        const handleOutsideClick = (
            event: MouseEvent
        ) => {
            const target = event.target as Node

            const clickedTrigger =
                triggerRef.current?.contains(target)

            const clickedDropdown =
                dropdownRef.current?.contains(target)

            if (
                !clickedTrigger &&
                !clickedDropdown
            ) {
                setOpen(false)
            }
        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        )

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            )
        }
    }, [open])

    useEffect(() => {
        if (faded) {
            setOpen(false)
        }
    }, [faded])

    if (question.type === "text") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                <FieldShell
                    question={question}
                    nested={nested}
                >
                    <Input
                        value={
                            typeof value === "string"
                                ? value
                                : ""
                        }
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                        placeholder=""
                    />
                </FieldShell>
            </motion.div>
        )
    }

    if (question.type === "textarea") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                <FieldShell
                    question={question}
                    nested={nested}
                >
                    <Textarea
                        value={
                            typeof value === "string"
                                ? value
                                : ""
                        }
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                        placeholder=""
                    />
                </FieldShell>
            </motion.div>
        )
    }

if (question.type === "ai") {
    const aiAnswerOptions = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ]

    const selectedAIAnswer =
        typeof value === "string"
            ? value
            : ""

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            <div className="grid gap-2.5 overflow-visible">
                {!showAIQuestion ? (
                    <button
                        type="button"
                        onClick={() =>
                            setShowAIQuestion(true)
                        }
                        className="w-full rounded-xl border border-[#DDD6FE] bg-[#F3F0FF] p-4 text-left transition"
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#7C3AED]" />

                            <span className="text-sm font-medium text-[#7C3AED]">
                                AI Generated Answer
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-[#6B7280]">
                            Click to view the AI-generated answer
                        </p>
                    </button>
                ) : (
                    <div className="rounded-xl border border-[#DDD6FE] bg-[#F3F0FF] p-4">
                        <button
                            type="button"
                            onClick={() =>
                                setShowAIQuestion(false)
                            }
                            className="w-full text-left"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-[#7C3AED]" />

                                    <span className="text-sm font-medium text-[#7C3AED]">
                                        AI Generated Answer
                                    </span>
                                </div>

                                <span className="text-xs font-medium text-[#7C3AED]">
                                    Hide
                                </span>
                            </div>
                        </button>

                        <p className="mt-3 text-sm font-medium leading-6 text-foreground">
                            {question.text}
                        </p>

                        <div className="mt-4">
                            <Label className="text-sm font-medium text-muted-foreground">
                                Your Answer
                            </Label>

                            <div className="mt-2">
                                <SelectTrigger
                                    value={selectedAIAnswer}
                                    placeholder="Select an option"
                                    open={open}
                                    triggerRef={triggerRef}
                                    onClick={() => {
                                        setOpen((current) => {
                                            const next = !current

                                            if (!current) {
                                                requestAnimationFrame(
                                                    updateDropdownPosition
                                                )
                                            }

                                            return next
                                        })
                                    }}
                                />

                                <AnimatePresence>
                                    {open && (
                                        <OptionPanel
                                            options={aiAnswerOptions}
                                            selected={selectedAIAnswer}
                                            multi={false}
                                            position={dropdownPosition}
                                            panelRef={dropdownRef}
                                            onSelect={(option) => {
                                                onChange(option)
                                                setOpen(false)
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
    if (question.type === "metrics") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                <FieldShell
                    question={question}
                    nested={nested}
                >
                    <Input
                        value={
                            typeof value === "string"
                                ? value
                                : ""
                        }
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                        placeholder=""
                    />
                </FieldShell>
            </motion.div>
        )
    }

    if (question.type === "multi") {
        const selectedValues = Array.isArray(value)
            ? value
            : []

        const displayValue =
            selectedValues.length > 0
                ? `${selectedValues.length} selected`
                : ""

        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.25,
                }}
                className="relative overflow-visible"
            >
                <FieldShell
                    question={question}
                    nested={nested}
                >
                    <div className="relative overflow-visible">
                        <SelectTrigger
                            value={displayValue}
                            placeholder="Select options"
                            open={open}
                            triggerRef={triggerRef}
                            onClick={() => {
                                setOpen((current) => {
                                    const next =
                                        !current

                                    if (!current) {
                                        requestAnimationFrame(
                                            updateDropdownPosition
                                        )
                                    }

                                    return next
                                })
                            }}
                        />

                        <AnimatePresence>
                            {open && (
                                <OptionPanel
                                    options={
                                        question.options || []
                                    }
                                    selected={
                                        selectedValues
                                    }
                                    multi={true}
                                    position={
                                        dropdownPosition
                                    }
                                    panelRef={dropdownRef}
                                    onSelect={(option) => {
                                        const next =
                                            selectedValues.includes(
                                                option
                                            )
                                                ? selectedValues.filter(
                                                      (item) =>
                                                          item !==
                                                          option
                                                  )
                                                : [
                                                      ...selectedValues,
                                                      option,
                                                  ]

                                        onChange(next)
                                    }}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <SelectedChips
                        values={selectedValues}
                        onRemove={(item) =>
                            onChange(
                                selectedValues.filter(
                                    (itemValue) =>
                                        itemValue !== item
                                )
                            )
                        }
                    />
                </FieldShell>
            </motion.div>
        )
    }

    if (question.type === "single") {
        const selectedValue =
            typeof value === "string"
                ? value
                : ""

        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.25,
                }}
                className="relative overflow-visible"
            >
                <FieldShell
                    question={question}
                    nested={nested}
                >
                    <div className="relative overflow-visible">
                        <SelectTrigger
                            value={selectedValue}
                            placeholder="Select an option"
                            open={open}
                            triggerRef={triggerRef}
                            onClick={() => {
                                setOpen((current) => {
                                    const next =
                                        !current

                                    if (!current) {
                                        requestAnimationFrame(
                                            updateDropdownPosition
                                        )
                                    }

                                    return next
                                })
                            }}
                        />

                    <AnimatePresence>
    {open && (
        <OptionPanel
            options={
                question.options || []
            }
            selected={
                selectedValue
            }
            multi={false}
            position={
                dropdownPosition
            }
            panelRef={dropdownRef}
            onSelect={(option) => {
                if (selectedValue === option) {
                    onChange("")
                } else {
                    onChange(option)
                }

                setOpen(false)
            }}
        />
    )}
</AnimatePresence>
                    </div>
                </FieldShell>
            </motion.div>
        )
    }

    return null
}