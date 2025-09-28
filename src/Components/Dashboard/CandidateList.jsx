import CandidateDetail from "./CandidateDetail";

export default function CandidateList({ candidates }) {
  if (!candidates.length) return <p>No candidates yet.</p>;

  return (
    <div className="candidate-list">
      <h2>All Candidates</h2>
      {candidates.map((c, i) => (
        <CandidateDetail key={i} candidate={c} />
      ))}
    </div>
  );
}
