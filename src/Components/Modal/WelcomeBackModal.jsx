import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetInterview, resumeInterview } from "../store/interviewSlice";
import './WelcomeBackModal.css';

export default function WelcomeBackModal({ onResume, onStartOver }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleResume = () => {
    dispatch(resumeInterview());   // mark interview as resumed
    navigate("/interviewee");      // go back to interview page
  };

  const handleStartOver = () => {
    dispatch(resetInterview());    // clear state
    navigate("/");                 // back to home
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Welcome back!</h3>
        <p>You have an unfinished interview session.</p>
        <div className="modal-actions">
          <button className="resume-btn" onClick={onResume}>
            Resume
          </button>
          <button className="startover-btn" onClick={onStartOver}>
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
