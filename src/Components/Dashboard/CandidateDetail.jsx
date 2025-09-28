export default function CandidateDetail({ candidate }) {
  return (
    <div className="candidate-detail">
      <h3>{candidate.name} ({candidate.email})</h3>
      <p>Score: {candidate.score}</p>
      <p>{candidate.summary}</p>
    </div>
  );
}
