"use client";

import { useState, useEffect, useRef } from "react";

type FieldType = "text" | "textarea" | "select";

interface SubQuestion {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: FieldType;
  options?: string[];
}

interface ConditionalQuestionProps {
  mainLabel: string;
  mainPlaceholder?: string;
  mainRequired?: boolean;
  mainType?: FieldType;
  mainOptions?: string[];
  subQuestions: SubQuestion[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}

export default function ConditionalQuestion({
  mainLabel,
  mainPlaceholder = "Type your answer",
  mainRequired = true,
  mainType = "text",
  mainOptions = [],
  subQuestions,
  values,
  onChange,
}: ConditionalQuestionProps) {
  const mainId = "main";
  const mainValue = values[mainId] || "";
  const isAnswered = mainValue.trim().length > 0;

  const [showSub, setShowSub] = useState(isAnswered);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(isAnswered ? "1000px" : "0px");

  useEffect(() => {
    setShowSub(isAnswered);
  }, [isAnswered]);

  useEffect(() => {
    if (showSub && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [showSub, subQuestions]);

  return (
    <div className="cq-wrapper">
      <div className="cq-main">
        <label className="cq-main-label">
          {mainLabel}
          {mainRequired && <span className="cq-required"> *</span>}
        </label>

        {mainType === "textarea" ? (
          <textarea
            className="cq-input"
            placeholder={mainPlaceholder}
            value={mainValue}
            onChange={(e) => onChange(mainId, e.target.value)}
          />
        ) : mainType === "select" ? (
          <select
            className="cq-input"
            value={mainValue}
            onChange={(e) => onChange(mainId, e.target.value)}
          >
            <option value="">Select an option</option>
            {mainOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            className="cq-input"
            placeholder={mainPlaceholder}
            value={mainValue}
            onChange={(e) => onChange(mainId, e.target.value)}
          />
        )}
      </div>

      <div
        className="cq-sub-container"
        style={{ maxHeight, opacity: showSub ? 1 : 0 }}
      >
        <div ref={contentRef} className="cq-sub-inner">
          {subQuestions.map((sq) => (
            <div className="cq-sub-field" key={sq.id}>
              <label className="cq-sub-label">
                {sq.label}
                {sq.required && <span className="cq-required"> *</span>}
              </label>

              {sq.type === "textarea" ? (
                <textarea
                  className="cq-input cq-sub-input"
                  placeholder={sq.placeholder}
                  value={values[sq.id] || ""}
                  onChange={(e) => onChange(sq.id, e.target.value)}
                />
              ) : sq.type === "select" ? (
                <select
                  className="cq-input cq-sub-input"
                  value={values[sq.id] || ""}
                  onChange={(e) => onChange(sq.id, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {(sq.options || []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="cq-input cq-sub-input"
                  placeholder={sq.placeholder}
                  value={values[sq.id] || ""}
                  onChange={(e) => onChange(sq.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cq-wrapper {
          margin-bottom: 28px;
        }
        .cq-main {
          border: 1.5px solid #d9cdbf;
          border-left: 4px solid #6b4f3b;
          background: #fbf7f2;
          border-radius: 10px;
          padding: 18px 20px;
        }
        .cq-main-label {
          display: block;
          font-weight: 600;
          font-size: 16px;
          color: #2b2320;
          margin-bottom: 10px;
        }
        .cq-required {
          color: #b3492f;
        }
        .cq-input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #d9cdbf;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 15px;
          background: #ffffff;
          color: #2b2320;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .cq-input:focus {
          border-color: #6b4f3b;
        }
        .cq-sub-container {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease;
        }
        .cq-sub-inner {
          padding: 16px 20px 4px 24px;
          margin-top: 8px;
          border-left: 2px dashed #d9cdbf;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cq-sub-field {
          display: flex;
          flex-direction: column;
        }
        .cq-sub-label {
          font-size: 14px;
          font-weight: 500;
          color: #4a3f38;
          margin-bottom: 6px;
        }
        .cq-sub-input {
          background: #fcfaf7;
        }
      `}</style>
    </div>
  );
}