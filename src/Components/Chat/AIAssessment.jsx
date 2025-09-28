import React from "react";
import "./AIAssessment.css";

export default function AIAssessment({ score }) {
  let feedback = "";
  if (score >= 8) feedback = "Excellent! You're highly skilled.";
  else if (score >= 5) feedback = "Good effort! Some improvements needed.";
  else feedback = "Needs improvement. Keep practicing!";

  return (
    <div className="ai-assessment">
      <h2>AI Assessment Result</h2>
      <div className="score-box">{score} / 10</div>
      <p className="feedback">{feedback}</p>
    </div>
  );
}
