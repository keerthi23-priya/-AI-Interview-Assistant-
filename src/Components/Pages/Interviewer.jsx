import { useState } from "react";
import { useSelector } from "react-redux";
import "./Interviewer.css";

export default function Interviewer() {
  const { allCandidates } = useSelector((state) => state.interview);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

  const filteredCandidates = allCandidates
    ?.filter((c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "score") return (b.score ?? 0) - (a.score ?? 0);
      return 0;
    });

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="interviewer">
      <h2>All Candidates</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="score">Sort by Score</option>
        </select>
      </div>

      {filteredCandidates?.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Skills</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((c, index) => (
              <tr key={index} onClick={() => setSelectedCandidate(c)}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{Array.isArray(c.skills) ? c.skills.join(", ") : c.skills}</td>
                <td>{c.score ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCandidate && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCandidate(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedCandidate(null)}
            >
              ✖
            </button>
            <h3>{selectedCandidate.name} — Details</h3>
            <p>
              <strong>Email:</strong> {selectedCandidate.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCandidate.phone}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {Array.isArray(selectedCandidate.skills)
                ? selectedCandidate.skills.join(", ")
                : selectedCandidate.skills}
            </p>
            <p>
              <strong>Score:</strong> {selectedCandidate.score ?? "N/A"}
            </p>

            <h4>Questions & Answers:</h4>
            {selectedCandidate.answers && selectedCandidate.answers.length > 0 ? (
              <ul className="qa-list">
                {selectedCandidate.answers.map((ans, i) => (
                  <li key={i} className="qa-item">
                    <div
                      className="qa-question"
                      onClick={() => toggleQuestion(i)}
                    >
                      <strong>Q{i + 1}:</strong> {ans.question}
                      <span className="toggle-indicator">
                        {openQuestions[i] ? "▲" : "▼"}
                      </span>
                    </div>
                    {openQuestions[i] && (
                      <div className="qa-answer">
                        <p>
                          <strong>A:</strong> {ans.answer}
                        </p>
                        <p>
                          <strong>AI Score:</strong> {ans.score ?? "N/A"}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions answered yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
