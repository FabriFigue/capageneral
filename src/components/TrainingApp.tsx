import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import { Button } from './ui/button';
import { ArrowRight, Check, RotateCcw, Shuffle, Trophy, X } from 'lucide-react';

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

      const next = drawPlayer(turnQueue);
      setTurnQueue(next.rest);
      setActivePlayer(next.player);

      prepareQuestion(questions[nextIndex]);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="quiz-stage px-4 py-10"><div className="quiz-glass max-w-2xl mx-auto p-6 md:p-8 text-center">
        <img src={LOGO_URL} alt="Jerárquicos Salud" className="h-20 md:h-24 w-auto mx-auto mb-6 object-contain" />
        <Trophy className="w-8 h-8 mx-auto mb-3 text-primary" aria-hidden="true" />
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

        <Button
          onClick={initGame}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-soft"
        >
          <Shuffle aria-hidden="true" /> Nueva Ronda (Mezclar Todo)
        </Button>
      </div></div>
    );
  }

  return (
    <div className="quiz-stage"><div className="max-w-3xl mx-auto py-6 md:py-8 px-4">
      <header className="flex flex-col items-center text-center mb-7 md:mb-8">
        <img
          src={LOGO_URL}
          alt="Jerárquicos Salud"
          className="h-20 md:h-24 w-auto object-contain"
        />
        <h1 className="mt-4 text-xl md:text-2xl font-bold text-primary leading-snug">
          Capacitación Ingresantes – Campaña General
        </h1>
      </header>

      <div className="quiz-glass overflow-hidden">
      <progress className="quiz-progress" value={currentIndex + 1} max={questions.length} aria-label="Progreso del cuestionario" />
      <div className="p-5 md:p-8">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4 pb-3 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase font-semibold">Le toca a:</span>
          <span key={currentIndex} className="quiz-turn snake-turn relative overflow-hidden rounded-full p-[2px] inline-flex" aria-live="polite">
            <span className="absolute inset-[-200%] animate-snake snake-gradient pointer-events-none" aria-hidden="true" />
            <span className="snake-turn-content relative z-10 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold uppercase">{activePlayer}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
          <Button variant="ghost" size="icon"
            onClick={initGame}
            title="Reiniciar cuestionario"
             aria-label="Reiniciar cuestionario"
             className="text-muted-foreground hover:bg-secondary hover:text-primary h-8 w-8"
          >
            <RotateCcw aria-hidden="true" />
          </Button>
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
          let btnStyle = "text-foreground";

          if (selectedOption !== null) {
            if (idx === correctOptionIndex) {
              btnStyle = "quiz-option-correct font-semibold";
            } else if (idx === selectedOption) {
              btnStyle = "quiz-option-wrong text-destructive";
            } else {
              btnStyle = "quiz-option-muted text-muted-foreground";
            }
          }

          return (
            <Button variant="outline"
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={selectedOption !== null}
              aria-pressed={selectedOption === idx}
              className={`quiz-option snake-option relative overflow-hidden rounded-2xl p-[2px] transition-all duration-300 w-full h-auto whitespace-normal text-left border-0 ${btnStyle}`}
            >
              <span className="snake-beam absolute inset-[-200%] animate-snake snake-gradient pointer-events-none" aria-hidden="true" />
              <span className="snake-option-content relative z-10 flex items-start gap-4 rounded-[14px] px-5 py-4 w-full min-h-16 text-left transition-colors text-sm md:text-base">
              <span className="snake-letter shrink-0 font-bold text-xs mt-0.5 px-2 py-0.5 rounded border border-current">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>
              {selectedOption !== null && idx === correctOptionIndex && <Check className="quiz-check mt-0.5" aria-label="Respuesta correcta" />}
              {selectedOption === idx && idx !== correctOptionIndex && <X className="mt-0.5" aria-label="Respuesta incorrecta" />}
              </span>
            </Button>
          );
        })}
      </div>

      {showExplanation && (
        <div role="status" className="quiz-turn p-4 bg-secondary/80 rounded-lg border border-border mb-6 text-sm text-foreground leading-relaxed">
          <p className={`font-semibold mb-2 ${selectedOption === correctOptionIndex ? 'text-primary' : 'text-destructive'}`}>
            {selectedOption === correctOptionIndex ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
          </p>
          <p className="font-bold mb-1 text-primary">Fundamento normativo:</p>
          <p>{currentQ.explanation}</p>
        </div>
      )}

      {selectedOption !== null && (
        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all shadow-soft"
          >
            {currentIndex + 1 === questions.length ? "Ver Resultados Finales" : "Siguiente Turno"}
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      )}
      </div>
      </div>
      </div>
    </div>
  );
}

export default TrainingApp;
