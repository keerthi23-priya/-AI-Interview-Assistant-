import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCandidate } from "./store/interviewSlice";
import './ResumeUpload.css';

export default function ResumeUpload() {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({ name: "", email: "", phone: "", skills: "" });
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      alert("Upload PDF or DOCX only!");
      return;
    }

    // Mock extraction from resume (can be extended later)
    const extracted = { 
      name: file.name.replace(/\.[^/.]+$/, ""), 
      email: "", 
      phone: "", 
      skills: "" 
    };
    setFields(extracted);
    setResumeUploaded(true);
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!fields.name || !fields.email || !fields.phone || !fields.skills) {
      alert("Please fill all missing fields.");
      return;
    }
    dispatch(setCandidate(fields));
  };

  return (
    <div className="resume-upload">
      <h2>Upload Resume</h2>
      <input type="file" onChange={handleUpload} />

      {resumeUploaded && (
        <div className="resume-fields">
          <h3>Confirm Your Details</h3>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            type="text"
            name="skills"
            value={fields.skills}
            onChange={handleChange}
            placeholder="Skills (e.g. React, Node.js, SQL)"
          />
          <button onClick={handleSubmit}>Continue</button>
        </div>
      )}
    </div>
  );
}
