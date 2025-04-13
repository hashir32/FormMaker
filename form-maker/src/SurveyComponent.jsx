import React, { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "./index.css";

const VERCEL_API_BASE = "https://form-maker-git-main-hashir32s-projects.vercel.app/api/forms";

function SurveyComponent() {
  const [surveyModel, setSurveyModel] = useState(null);

  useEffect(() => {
    fetch(`${VERCEL_API_BASE}/random`)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.questions;

        const introElement = {
          type: "html",
          name: "intro",
          html: `
            <div style="border: 2px solid #003f7f; background-color: #f0f8ff; padding: 0.5rem 2rem; border-radius: 10px; margin-bottom: 1rem; max-width: 1200px; margin-left: auto; margin-right: auto;">
              <h3 style="margin-bottom: 0.3rem;">Welcome to the Privacy Breach Evaluation Study</h3>
              <p style="margin: 0 0 0.3rem 0;">
                These privacy breaches are generated by an LLM architecture.
                This is part of a study to assess how reliable the generated breaches are across three dimensions.
              </p>
              <p style="margin: 0 0 0.3rem 0;"><strong>How would you rate each breach on the basis of the following metrics?</strong></p>
              <ul style="margin: 0; padding-left: 1.2rem;">
                <li><strong>Plausibility:</strong> Is it feasible within the context of IoT devices?</li>
                <li><strong>Comprehensiveness:</strong> Is the explanation detailed and complete?</li>
                <li><strong>Company Perspective:</strong> Is the explanation framed from a company’s viewpoint?</li>
              </ul>
            </div>
          `
        };

        const questionElements = questions.map((q, idx) => ({
          type: "panel",
          name: `question_${idx}`,
          title: q.questionText,
          elements: [
            {
              type: "rating",
              name: `q${idx}_metric1`,
              title: "Plausibility",
              rateCount: 10
            },
            {
              type: "rating",
              name: `q${idx}_metric2`,
              title: "Comprehensiveness",
              rateCount: 10
            },
            {
              type: "rating",
              name: `q${idx}_metric3`,
              title: "Company Perspective",
              rateCount: 10
            }
          ]
        }));

        const json = {
          pages: [{
            name: "page1",
            elements: [introElement, ...questionElements]
          }]
        };

        const survey = new Model(json);
        survey.onComplete.add((sender) => {
          const responses = sender.data;
          questions.forEach((q, idx) => {
            const body = {
              rating_1: responses[`q${idx}_metric1`],
              rating_2: responses[`q${idx}_metric2`],
              rating_3: responses[`q${idx}_metric3`]
            };
            fetch(`${VERCEL_API_BASE}/rate-question/${q._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            });
          });
        });

        setSurveyModel(survey);
      });
  }, []);

  return surveyModel ? (
    <div className="survey-container">
      <Survey model={surveyModel} />
    </div>
  ) : (
    <p>Loading survey...</p>
  );
}

export default SurveyComponent;
