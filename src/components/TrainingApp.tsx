import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Trophy } from 'lucide-react';
import { quizQuestions, type QuizQuestion } from '@/data/quizData';
import { participants } from '@/data/participants';

const shuffle = <T,>(items: T[]): T[] => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const emptyScores = () => Object.fromEntries(participants.map(p => [p, 0])) as Record<string, number>;

/** Picks a random participant, avoiding repeats until everyone has had a turn. */
const drawTurn = (pending: string[]): { name: string; rest: string[] } => {
  const pool = pending.length ? pending : participants;
  const name = pool[Math.floor(Math.random() * pool.length)];
  return { name, rest: pool.filter(p => p !== name) };
};

const newGame = () => {
  const { name, rest } = drawTurn([]);
  return { deck: shuffle(quizQuestions), index: 0, player: name, pending: rest };
};

export const TrainingApp = () => {
  const [game, setGame] = useState(newGame);
  const [scores, setScores] = useState(emptyScores);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q: QuizQuestion = game.deck[game.index];
  const isLast = game.index === game.deck.length - 1;

  const restart = () => {
    setGame(newGame());
    setScores(emptyScores());
    setSelected(null);
    setFinished(false);
  };

  const answer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctAnswer) setScores(s => ({ ...s, [game.player]: s[game.player] + 1 }));
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    const { name, rest } = drawTurn(game.pending);
    setGame(g => ({ ...g, index: g.index + 1, player: name, pending: rest }));
    setSelected(null);
  };

  const ranking = participants.map(p => [p, scores[p]] as const).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-institutional-blue/5 p-4">
      <div className="container max-w-4xl mx-auto">
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={restart} className="border-institutional-blue text-institutional-blue">
            <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar
          </Button>
        </div>

        <div className="text-center mb-6">
          <img src="/lovable-uploads/ad436da4-9684-42bb-8d06-2e2507d86a9e.png" alt="Jerárquicos Salud" className="h-20 md:h-24 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Capacitación Ingresantes</h1>
          <p className="text-xl text-muted-foreground">Campaña Socios - Jerárquicos Salud</p>
        </div>

        <Card className="mb-8" style={{ boxShadow: 'var(--shadow-institutional)' }}>
          <CardContent className="p-4 sm:p-8">
            {finished ? (
              <div className="text-center space-y-6 animate-fade-in">
                <Trophy className="w-14 h-14 mx-auto text-institutional-accent" />
                <h2 className="text-3xl font-bold text-success">Felicitaciones 👏🏻</h2>
                <p className="text-muted-foreground">Puntaje final de la ronda</p>
                <ol className="text-left max-w-md mx-auto space-y-2">
                  {ranking.map(([name, pts], i) => (
                    <li key={name} className="flex justify-between border-b pb-2 last:border-0 text-foreground">
                      <span><span className="font-semibold text-institutional-blue">{i + 1}.</span> {name}</span>
                      <span className="font-bold">{pts} pts</span>
                    </li>
                  ))}
                </ol>
                <Button onClick={restart} size="lg" className="bg-gradient-to-r from-institutional-blue to-institutional-blue-light text-white text-xl px-8 py-6 rounded-xl">
                  Nueva Ronda
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="secondary" className="bg-institutional-blue text-white px-4 py-2 text-base">
                    Pregunta {game.index + 1} de {game.deck.length}
                  </Badge>
                  <span className="text-sm font-medium text-institutional-blue">{q.category}</span>
                </div>

                <p className="text-3xl font-bold text-institutional-blue text-center animate-fade-in" key={game.index}>
                  🎲 Le toca a: {game.player}
                </p>

                <p className="text-xl text-foreground font-medium leading-relaxed">{q.question}</p>

                <div className="grid gap-3">
                  {q.options.map((option, i) => {
                    const answered = selected !== null;
                    const correct = i === q.correctAnswer;
                    return (
                      <Button
                        key={option}
                        variant="outline"
                        disabled={answered}
                        onClick={() => answer(i)}
                        className={`h-auto min-h-14 w-full justify-start whitespace-normal p-4 text-left leading-relaxed disabled:opacity-100 ${answered && correct ? 'border-success bg-success/10' : answered && i === selected ? 'border-destructive bg-destructive/10' : ''} text-foreground`}
                      >
                        <span className="shrink-0 font-semibold">{String.fromCharCode(65 + i)}.</span>
                        <span className="min-w-0">{option}</span>
                      </Button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <div role="status" aria-live="polite" className="border-t pt-5">
                    <p className={`font-semibold ${selected === q.correctAnswer ? 'text-success' : 'text-destructive'}`}>
                      {selected === q.correctAnswer ? `¡Correcto! +1 punto para ${game.player}` : 'Respuesta incorrecta'}
                    </p>
                    <p className="mt-2 text-foreground"><span className="font-semibold">Respuesta correcta: </span>{q.options[q.correctAnswer]}</p>
                    <h4 className="mt-4 font-semibold text-institutional-blue">Explicación / fundamento</h4>
                    <p className="mt-2 leading-relaxed text-foreground">{q.explanation}</p>
                    <div className="mt-6 flex justify-end">
                      <Button onClick={next} size="lg" className="bg-gradient-to-r from-institutional-blue to-institutional-blue-light text-white text-lg px-6 rounded-xl">
                        {isLast ? 'Ver resultados →' : 'Siguiente Turno →'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {!finished && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Puntajes</h3>
              <div className="flex flex-wrap gap-2">
                {participants.map(p => (
                  <Badge key={p} variant="secondary" className={p === game.player ? 'bg-institutional-blue text-white' : 'bg-muted text-muted-foreground'}>
                    {p}: {scores[p]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
