import { useState } from "react";
import { questions } from "../utils/questions";
import Timer from "./Timer";
import './ChatBox.css';

export default function ChatBox({ onSubmit, submitting }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState("");

  const handleNext = () => {
    if (!input.trim()) return;

    const newAnswers = [...answers, {
      question: questions[current].question,
      answer: input,
      correctAnswer: questions[current].correctAnswer
    }];

    setAnswers(newAnswers);
    setInput("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  const handleTimeout = () => {
    // Automatically submit current answers if time runs out
    onSubmit([...answers, {
      question: questions[current]?.question,
      answer: input,
      correctAnswer: questions[current]?.correctAnswer
    }]);
  };

  return (
    <div className="chat-box">
      {/* Timer: 100 seconds for each question */}
      <Timer seconds={100} onTimeout={handleTimeout} />

      <h3>Question {current + 1}:</h3>
      {questions[current] && <p>{questions[current].question}</p>}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={submitting}
        placeholder="Type your answer here..."
      />
      <button onClick={handleNext} disabled={submitting || !input.trim()}>
        {current + 1 === questions.length ? "Submit" : "Next"}
      </button>
    </div>
  );
}
