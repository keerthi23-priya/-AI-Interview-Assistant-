import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCandidate } from "../store/interviewSlice";
import './Home.css'; 

export default function Home() {
  const { candidate } = useSelector((state) => state.interview);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);

  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setShowForm(true); // show form after upload
      // pre-fill name from file name if possible
      setFormData((prev) => ({
        ...prev,
        name: file.name.split(".")[0],
      }));
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save candidate info
  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all fields!");
      return;
    }

    const uploadedCandidate = {
      ...formData,
      resume,
    };

    dispatch(setCandidate(uploadedCandidate));
    setShowForm(false);
  };

  const handleStart = () => {
    if (candidate) {
      navigate("/interviewee");
    } else {
      alert("Please upload your resume and fill missing info!");
    }
  };

  return (
    <section className="home">
      <header>
        <h1>🚀 AI-Powered Interview Assistant</h1>
      </header>

      {!candidate ? (
        <div className="intro">
          {!showForm ? (
            <>
              <p>Upload your resume to begin your AI-driven interview journey.</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleUpload}
              />
            </>
          ) : (
            <div className="form-container">
              <h2>Fill Missing Information</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <button onClick={handleSave}>Save Info</button>
            </div>
          )}
        </div>
      ) : (
        <p className="intro">
          Welcome <strong>{candidate?.name}</strong> 👋  
          Your interview is about to start!
        </p>
      )}

      <div className="cta">
        <button
          onClick={handleStart}
          disabled={!candidate}
          style={{ cursor: candidate ? "pointer" : "not-allowed" }}
        >
          Start Interview
        </button>
      </div>
    </section>
  );
}
