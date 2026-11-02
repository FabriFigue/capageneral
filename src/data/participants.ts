export const participants = [
  "Nacho",
  "Male",
  "Fer",
  "Rodrigo",
  "Gabriela",
  "Mara",
  "Nando",
  "Shaiel",
  "Geronimo",
  "Ana",
];

export const LEADERBOARD_KEY = "js_quiz_leaderboard";

export type Leaderboard = Record<string, number>;

export const loadLeaderboard = (): Leaderboard => {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "{}");
  } catch {
    return {};
  }
};

/** Keeps each participant's best score. */
export const saveScore = (board: Leaderboard, name: string, score: number): Leaderboard => {
  const updated = { ...board, [name]: Math.max(board[name] ?? 0, score) };
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  return updated;
};
