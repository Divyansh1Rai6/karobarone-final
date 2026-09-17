"use client"

import { AnimatePresence, motion } from "framer-motion"

import { useQuestionnaire } from "@/context/questionnaire-context"
import { StepWrapper } from "../step-wrapper"
import { NavigationButtons } from "../navigation-buttons"
import { DynamicQuestion } from "./dynamic-question"

import {
    MAIN_QUESTION_GROUPS,
    QUESTION_GROUPS,
    QuestionConfig,
} from "@/config/questionnaire-config"

export function Step4DiscoveryDetails() {
    const { data, updateData } = useQuestionnaire()

    const handleQuestionChange = (
        questionId: string,
        value: string | string[]
    ) => {
        updateData({
            [questionId]: value,
        } as Partial<typeof data>)
    }

    const getQuestion = (
        questionId: string
    ): QuestionConfig | undefined => {
        return QUESTION_GROUPS.find(
            (question) => question.id === questionId
        )
    }

    return (
        <StepWrapper
            title="Business Discovery Details"
            description="A few more details to help us understand your business, customers, goals and website requirements."
        >
            <div className="grid gap-10 overflow-visible pt-4">
                {MAIN_QUESTION_GROUPS.map((mainQuestion) => {
                    const question = getQuestion(mainQuestion.id)

                    if (!question) {
                        return null
                    }

                    const mainValue = data[question.id]

                    const hasSelectedOption =
                        Array.isArray(mainValue)
                            ? mainValue.length > 0
                            : typeof mainValue === "string"
                              ? mainValue.trim().length > 0
                              : Boolean(mainValue)

                    return (
                        <motion.div
                            key={question.id}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                            className="relative grid gap-5 overflow-visible scroll-mt-24"
                        >
                            {/* MAIN QUESTION */}
                            <div className="relative z-50 overflow-visible">
                                <DynamicQuestion
                                    question={question}
                                    value={
                                        mainValue as
                                            | string
                                            | string[]
                                            | undefined
                                    }
                                    onChange={(value) =>
                                        handleQuestionChange(
                                            question.id,
                                            value
                                        )
                                    }
                                />
                            </div>

                            {/* ================================
                                RELATED QUESTIONS
                            ================================= */}

                            <AnimatePresence initial={false}>
                                {hasSelectedOption &&
                                    question.relatedQuestions?.map(
                                        (relatedId) => {
                                            const relatedQuestion =
                                                getQuestion(
                                                    relatedId
                                                )

                                            if (!relatedQuestion) {
                                                return null
                                            }

                                            return (
                                                <motion.div
                                                    key={
                                                        relatedQuestion.id
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        x: -15,
                                                        height: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                        height: "auto",
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -15,
                                                        height: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeOut",
                                                    }}
                                                    className="relative z-10 overflow-visible scroll-mt-24"
                                                >
                                                    <DynamicQuestion
                                                        question={
                                                            relatedQuestion
                                                        }
                                                        value={
                                                            data[
                                                                relatedQuestion.id
                                                            ] as
                                                                | string
                                                                | string[]
                                                                | undefined
                                                        }
                                                        onChange={(
                                                            value
                                                        ) =>
                                                            handleQuestionChange(
                                                                relatedQuestion.id,
                                                                value
                                                            )
                                                        }
                                                        faded
                                                    />
                                                </motion.div>
                                            )
                                        }
                                    )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}

                {/* ================================
                    NAVIGATION
                ================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.4,
                        delay: 0.2,
                    }}
                    className="relative z-0"
                >
                    <NavigationButtons />
                </motion.div>
            </div>
        </StepWrapper>
    )
}