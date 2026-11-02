import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { participants, type Leaderboard } from '@/data/participants';

interface Props {
  leaderboard: Leaderboard;
  onStart: (name: string) => void;
}

export const LeaderboardCard = ({ leaderboard }: { leaderboard: Leaderboard }) => {
  const rows = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-institutional-accent" /> Tabla de posiciones
        </h3>
        {rows.length === 0 ? (
          <p className="text-muted-foreground text-sm">Todavía no hay puntajes guardados.</p>
        ) : (
          <ol className="space-y-2">
            {rows.map(([name, score], i) => (
              <li key={name} className="flex justify-between border-b pb-2 last:border-0 text-foreground">
                <span><span className="font-semibold text-institutional-blue">{i + 1}.</span> {name}</span>
                <span className="font-bold">{score} pts</span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
};

export const ParticipantSelect = ({ leaderboard, onStart }: Props) => {
  const [name, setName] = useState('');
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-institutional-blue/5 p-4">
      <div className="container max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <img src="/lovable-uploads/ad436da4-9684-42bb-8d06-2e2507d86a9e.png" alt="Jerárquicos Salud" className="h-20 md:h-24 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">Capacitación Ingresantes</h1>
          <p className="text-muted-foreground">Seleccioná tu nombre para comenzar</p>
        </div>
        <Card style={{ boxShadow: 'var(--shadow-institutional)' }}>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {participants.map(p => (
                <Button
                  key={p}
                  variant="outline"
                  aria-pressed={name === p}
                  onClick={() => setName(p)}
                  className={name === p ? 'border-institutional-blue bg-institutional-blue/10 text-institutional-blue font-semibold' : ''}
                >
                  {p}
                </Button>
              ))}
            </div>
            <Button
              disabled={!name}
              onClick={() => onStart(name)}
              size="lg"
              className="w-full bg-gradient-to-r from-institutional-blue to-institutional-blue-light text-white text-xl py-6 rounded-xl"
            >
              Comenzar trivia
            </Button>
          </CardContent>
        </Card>
        <LeaderboardCard leaderboard={leaderboard} />
      </div>
    </div>
  );
};
