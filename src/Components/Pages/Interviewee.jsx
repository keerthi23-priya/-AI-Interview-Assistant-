import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResumeUpload from "../ResumeUpload";
import ChatBox from "../Chat/ChatBox";
import AIAssessment from "../Chat/AIAssessment";
import { resetInterview, resumeInterview, finishInterview } from "../store/interviewSlice";
import WelcomeBackModal from "../Modal/WelcomeBackModal";
import { askAI } from "../Services/aiService";
import './Interviewee.css';

export default function Interviewee() {
  const { candidate } = useSelector((state) => state.interview);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(!!candidate);
  const [aiScore, setAiScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleResume = () => {
    dispatch(resumeInterview());
    setShowModal(false);
  };

  const handleStartOver = () => {
    dispatch(resetInterview());
    navigate("/");
  };

  const handleSubmitInterview = async (answers) => {
    setSubmitting(true);

    let totalScore = 0;
    for (let i = 0; i < answers.length; i++) {
      totalScore += await askAI(
        answers[i].question,
        answers[i].answer,
        answers[i].correctAnswer
      );
    }

    const average = Math.round(totalScore / answers.length);

    // ✅ Save candidate result into Redux & localStorage
    dispatch(finishInterview(average));

    setAiScore(average);
    setSubmitting(false);
  };

  return (
    <div className="interviewee">
      {showModal && (
        <WelcomeBackModal
          onResume={handleResume}
          onStartOver={handleStartOver}
        />
      )}

      {aiScore !== null ? (
        <AIAssessment score={aiScore} />
      ) : !candidate ? (
        <ResumeUpload />
      ) : (
        <ChatBox onSubmit={handleSubmitInterview} submitting={submitting} />
      )}
    </div>
  );
}
