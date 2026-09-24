"use client";

import { useState } from "react";
import ConditionalQuestion from "./ConditionalQuestion";

export default function ExampleUsage() {
  const [q160Values, setQ160Values] = useState<Record<string, string>>({});
  const [q161Values, setQ161Values] = useState<Record<string, string>>({});
  const [q163Values, setQ163Values] = useState<Record<string, string>>({});
  const [q167Values, setQ167Values] = useState<Record<string, string>>({});
  const [q173Values, setQ173Values] = useState<Record<string, string>>({});
  const [q176Values, setQ176Values] = useState<Record<string, string>>({});
  const [q177Values, setQ177Values] = useState<Record<string, string>>({});
  const [q178Values, setQ178Values] = useState<Record<string, string>>({});
  const [q179Values, setQ179Values] = useState<Record<string, string>>({});

  return (
    <div>

      {/* Q160 */}
      <ConditionalQuestion
        mainLabel="Which parts of your business require manual work?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[
          {
            id: "q153",
            label: "Desired level of online automation",
            placeholder: "Describe your desired level of automation",
          },
          {
            id: "q154",
            label: "Website/manual work to reduce",
            placeholder: "What website or manual work would you like to reduce?",
          },
          {
            id: "q164",
            label: "Sales process to improve",
            placeholder: "Which sales process would you like to improve?",
          },
          {
            id: "q165",
            label: "Customer-service process",
            placeholder: "Which customer-service process would you like to improve?",
          },
          {
            id: "q166",
            label: "Operational process",
            placeholder: "Which operational process would you like to improve?",
          },
        ]}
        values={q160Values}
        onChange={(id, value) =>
          setQ160Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q161 */}
      <ConditionalQuestion
        mainLabel="What software do you already use?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[
          {
            id: "q162",
            label: "Where is customer data stored?",
            placeholder: "Describe where your customer data is stored",
          },
          {
            id: "q169",
            label: "Whether integrations are useful",
            placeholder: "Would integrations between your software be useful?",
          },
          {
            id: "q170",
            label: "Systems that should communicate",
            placeholder: "Which systems should communicate with each other?",
          },
        ]}
        values={q161Values}
        onChange={(id, value) =>
          setQ161Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q163 */}
      <ConditionalQuestion
        mainLabel="What technology could help your business?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[
          {
            id: "q156",
            label: "Future website capability",
            placeholder: "What future website capability would be useful?",
          },
          {
            id: "q157",
            label: "Most useful future digital facility",
            placeholder: "What future digital facility would be most useful?",
          },
          {
            id: "q168",
            label: "AI interests",
            placeholder: "Describe your interests in AI",
          },
          {
            id: "q171",
            label: "Highest-priority IT investment",
            placeholder: "What is your highest-priority IT investment?",
          },
          {
            id: "q172",
            label: "Barriers to technology",
            placeholder: "What barriers do you face in adopting technology?",
          },
          {
            id: "q174",
            label: "Recommended IT services",
            placeholder: "What IT services would you recommend?",
          },
        ]}
        values={q163Values}
        onChange={(id, value) =>
          setQ163Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q167 */}
      <ConditionalQuestion
        mainLabel="Which repetitive task would you automate first?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[]}
        values={q167Values}
        onChange={(id, value) =>
          setQ167Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q173 */}
      <ConditionalQuestion
        mainLabel="What should technology improve most?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[
          {
            id: "q184",
            label: "Non-financial benefit",
            placeholder: "What non-financial benefit would you expect?",
          },
          {
            id: "q185",
            label: "How IT investment should be justified",
            placeholder: "How should the IT investment be justified?",
          },
        ]}
        values={q173Values}
        onChange={(id, value) =>
          setQ173Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q176 */}
      <ConditionalQuestion
        mainLabel="What is your annual revenue range?"
        mainType="select"
        mainRequired={false}
        mainOptions={[
          "Below ₹5 Lakh",
          "₹5 Lakh - ₹10 Lakh",
          "₹10 Lakh - ₹25 Lakh",
          "₹25 Lakh - ₹50 Lakh",
          "₹50 Lakh - ₹1 Crore",
          "Above ₹1 Crore",
        ]}
        subQuestions={[]}
        values={q176Values}
        onChange={(id, value) =>
          setQ176Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q177 */}
      <ConditionalQuestion
        mainLabel="What growth do you want?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[]}
        values={q177Values}
        onChange={(id, value) =>
          setQ177Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q178 */}
      <ConditionalQuestion
        mainLabel="How much can technology influence that growth?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[]}
        values={q178Values}
        onChange={(id, value) =>
          setQ178Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

      {/* Q179 */}
      <ConditionalQuestion
        mainLabel="How much do you currently spend on technology?"
        mainType="textarea"
        mainRequired={true}
        subQuestions={[]}
        values={q179Values}
        onChange={(id, value) =>
          setQ179Values((prev) => ({
            ...prev,
            [id]: value,
          }))
        }
      />

    </div>
  );
}