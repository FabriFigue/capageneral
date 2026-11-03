import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PARTICIPANTS: string[] = [
  "Nacho", "Male", "Fer", "Rodrigo", "Gabriela",
  "Mara", "Nando", "Shaiel", "Geronimo", "Ana"
];

const LOGO_URL = "/lovable-uploads/ad436da4-9684-42bb-8d06-2e2507d86a9e.png";

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function TrainingApp() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activePlayer, setActivePlayer] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [turnQueue, setTurnQueue] = useState<string[]>([]);

  // Cada participante tiene un turno antes de repetir a alguien:
  // se baraja la lista y se va consumiendo; solo cuando se agota se baraja de nuevo.
  const drawPlayer = (queue: string[]): { player: string; rest: string[] } => {
    if (queue.length === 0) {
      const reshuffled = shuffle(PARTICIPANTS);
      return { player: reshuffled[0], rest: reshuffled.slice(1) };
    }
    return { player: queue[0], rest: queue.slice(1) };
  };

  const prepareQuestion = (questionObj: Question) => {
    if (!questionObj) return;
    const correctText = questionObj.options[questionObj.correctAnswer];
    const shuffledOpts = shuffle(questionObj.options);
    const newCorrectIdx = shuffledOpts.indexOf(correctText);

    setCurrentOptions(shuffledOpts);
    setCorrectOptionIndex(newCorrectIdx);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const initGame = () => {
    const shuffledQuestions = shuffle(quizQuestions);
    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setIsFinished(false);
    setScores({});

    const first = drawPlayer([]);
    setTurnQueue(first.rest);
    setActivePlayer(first.player);

    prepareQuestion(shuffledQuestions[0]);
  };

  useEffect(() => {
    initGame();
  }, []);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);

    if (index === correctOptionIndex) {
      setScores((prev) => ({
        ...prev,
        [activePlayer]: (prev[activePlayer] || 0) + 1
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const nextPlayer = PARTICIPANTS[Math.floor(Math.random() * PARTICIPANTS.length)];
      setActivePlayer(nextPlayer);

      prepareQuestion(questions[nextIndex]);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6 bg-card border rounded-xl shadow-institutional text-center">
        <h2 className="text-3xl font-extrabold text-primary mb-2">¡Ronda Finalizada!</h2>
        <p className="text-muted-foreground text-sm mb-6">Módulo: Socios, Cuentas Corrientes y Cobranzas</p>

        <h3 className="text-lg font-bold text-foreground mb-4">Tabla de Posiciones</h3>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8">
          {PARTICIPANTS.map((name) => (
            <div key={name} className="flex justify-between items-center p-3 bg-secondary rounded-lg border">
              <span className="font-semibold text-foreground text-sm">{name}</span>
              <span className="font-bold text-primary bg-background px-2.5 py-1 rounded shadow-sm text-sm">
                {scores[name] || 0} pts
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={initGame}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-soft"
        >
          Nueva Ronda (Mezclar Todo)
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-card border rounded-xl shadow-institutional">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4 pb-3 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase font-semibold">Le toca a:</span>
          <span className="text-sm font-extrabold text-primary-foreground bg-primary px-3 py-1 rounded-full shadow-sm animate-pulse">
            🎲 {activePlayer}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
          <button
            onClick={initGame}
            title="Reiniciar cuestionario"
            className="text-xs px-2.5 py-1 rounded border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
          >
            ↺ Reiniciar
          </button>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-secondary text-primary">
          {currentQ.category}
        </span>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 leading-relaxed">
        {currentQ.question}
      </h3>

      <div className="space-y-3 mb-6">
        {currentOptions.map((option, idx) => {
          let btnStyle = "bg-card border hover:bg-secondary/60 text-foreground";

          if (selectedOption !== null) {
            if (idx === correctOptionIndex) {
              btnStyle = "bg-success text-success-foreground border-success font-semibold shadow-sm";
            } else if (idx === selectedOption) {
              btnStyle = "bg-destructive text-destructive-foreground border-destructive";
            } else {
              btnStyle = "opacity-40 border bg-muted";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-4 rounded-lg border transition-all text-sm md:text-base flex items-start gap-3 ${btnStyle}`}
            >
              <span className="font-bold text-xs mt-0.5 px-2 py-0.5 rounded border border-current">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="p-4 bg-secondary/80 rounded-lg border border-border mb-6 text-sm text-foreground">
          <p className="font-bold mb-1 text-primary">Fundamento normativo:</p>
          <p>{currentQ.explanation}</p>
        </div>
      )}

      {selectedOption !== null && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-soft"
          >
            {currentIndex + 1 === questions.length ? "Ver Resultados Finales" : "Siguiente Turno →"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TrainingApp;
