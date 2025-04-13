import React, { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import "./index.css";

const VERCEL_API_BASE = "https://form-maker-git-main-hashir32s-projects.vercel.app/api/forms";

function SurveyComponent() {
  const [surveyModel, setSurveyModel] = useState(null);
  const [questionMap, setQuestionMap] = useState([]);

  useEffect(() => {
    // Fetch 5 random questions
    fetch(`${VERCEL_API_BASE}/random`)
      .then(res => res.json())
      .then(data => {
        const questions = data.questions;
        setQuestionMap(questions); // Save ID mapping for later submission

        const elements = questions.flatMap((q, idx) => [
          {
            type: "html",
            name: `q${idx}_questionText`,
            title: q.questionText,  // Display the question text
            html: `<strong>${q.questionText}</strong>`
          },
          {
            type: "rating",
            name: `q${idx}_metric1`,
            title: `Metric 1`,
            rateCount: 10
          },
          {
            type: "rating",
            name: `q${idx}_metric2`,
            title: `Metric 2`,
            rateCount: 10
          },
          {
            type: "rating",
            name: `q${idx}_metric3`,
            title: `Metric 3`,
            rateCount: 10
          }
        ]);

        const json = {
          pages: [{ name: "page1", elements }]
        };

        const survey = new Model(json);
        survey.onComplete.add(sender => {
          const responses = sender.data;
          
          // Iterate through each question to submit responses for each metric
          questions.forEach((q, idx) => {
            const body = {
              rating_1: responses[`q${idx}_metric1`],
              rating_2: responses[`q${idx}_metric2`],
              rating_3: responses[`q${idx}_metric3`]
            };

            // Send the ratings to the backend for each question
            fetch(`${VERCEL_API_BASE}/rate-question/${q._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            })
              .then(res => res.json())
              .then(data => {
                console.log("Ratings successfully updated:", data);
              })
              .catch(err => {
                console.error("Error updating ratings:", err);
              });
          });
        });

        setSurveyModel(survey);
      });
  }, []);

  return surveyModel ? <Survey model={surveyModel} /> : <p>Loading survey...</p>;
}

export default SurveyComponent;
