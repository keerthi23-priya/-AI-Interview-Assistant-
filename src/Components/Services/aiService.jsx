export async function askAI(question, answer, correctAnswer) {
  const user = answer.toLowerCase().trim();
  const correct = correctAnswer.toLowerCase().trim();

  // Exact match = 10
  if (user === correct) return 10;

  // Partial keyword match = 7
  const keywords = correct.split(" ");
  const matched = keywords.filter(k => user.includes(k));
  if (matched.length >= Math.ceil(keywords.length / 2)) return 7;

  // Poor attempt = 3
  return 3;
}
