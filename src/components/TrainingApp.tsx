import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Users, MessageCircleQuestion } from 'lucide-react';
import { quizQuestions, type QuizQuestion } from '@/data/quizData';

const PARTICIPANTS = [
  'Catalina'
];

const QUESTIONS = quizQuestions.map(question => question.question);

export const TrainingApp = () => {
  const [usedParticipants, setUsedParticipants] = useState<string[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const activeQuestion: QuizQuestion | undefined = quizQuestions.find(question => question.question === currentQuestion);

  const getRandomUnused = (array: string[], usedArray: string[]) => {
    const available = array.filter(item => !usedArray.includes(item));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleStart = () => {
    let participant = getRandomUnused(PARTICIPANTS, usedParticipants);
    const question = getRandomUnused(QUESTIONS, usedQuestions);

    // Si no hay participantes disponibles, resetear la lista
    if (!participant && usedParticipants.length > 0) {
      setUsedParticipants([]);
      participant = getRandomUnused(PARTICIPANTS, []);
    }

    if (participant && question) {
      setCurrentParticipant(participant);
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setUsedParticipants(prev => [...prev, participant]);
      setUsedQuestions(prev => [...prev, question]);
      setShowResult(true);
    }
  };

  const handleShowQuestion = () => {
    const question = getRandomUnused(QUESTIONS, usedQuestions);
    if (question) {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setUsedQuestions(prev => [...prev, question]);
      setShowResult(true);
      setCurrentParticipant('');
    }
  };

  const handleComplete = () => {
    if (remainingQuestions === 0) {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setUsedParticipants([]);
    setUsedQuestions([]);
    setCurrentParticipant('');
    setCurrentQuestion('');
    setIsComplete(false);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const remainingParticipants = PARTICIPANTS.length - usedParticipants.length;
  const remainingQuestions = QUESTIONS.length - usedQuestions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-institutional-blue/5 p-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="mb-4">
            <img 
              src="/lovable-uploads/ad436da4-9684-42bb-8d06-2e2507d86a9e.png" 
              alt="Jerárquicos Salud" 
              className="h-20 md:h-24 mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Capacitación Ingresantes
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Campaña Socios - Jerárquicos Salud
          </p>
          <p className="text-sm text-muted-foreground">
            Equipo: Catalina
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-l-4 border-l-institutional-blue">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-institutional-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Participantes restantes</p>
                  <p className="text-2xl font-bold text-institutional-blue">{remainingParticipants}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-institutional-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircleQuestion className="w-5 h-5 text-institutional-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Preguntas disponibles</p>
                  <p className="text-2xl font-bold text-institutional-accent">{remainingQuestions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="mb-8" style={{ boxShadow: 'var(--shadow-institutional)' }}>
          <CardContent className="p-4 sm:p-8 text-center">
            {!showResult ? (
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-institutional-blue to-institutional-blue-light rounded-full flex items-center justify-center animate-pulse-slow">
                  <MessageCircleQuestion className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    ¿Listo para comenzar?
                  </h2>
                  <p className="text-muted-foreground">
                    Presiona el botón para sortear un participante y una pregunta
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up">
                {!isComplete ? (
                  <>
                    {currentParticipant ? (
                      <Badge 
                        variant="secondary" 
                        className="bg-institutional-blue text-white px-4 py-2 text-lg"
                      >
                        Turno {usedParticipants.length} de {PARTICIPANTS.length}
                      </Badge>
                    ) : (
                      <Badge 
                        variant="secondary" 
                        className="bg-institutional-accent text-white px-4 py-2 text-lg"
                      >
                        Solo Pregunta
                      </Badge>
                    )}
                    
                    <div className="space-y-4">
                      {currentParticipant && (
                        <div>
                          <h3 className="text-lg text-muted-foreground mb-2">Participante seleccionado:</h3>
                          <p className="text-4xl font-bold text-institutional-blue animate-fade-in">
                            {currentParticipant}
                          </p>
                        </div>
                      )}
                      
                      <div className={currentParticipant ? "border-t pt-4" : ""}>
                        <h3 className="text-lg text-muted-foreground mb-2">Pregunta:</h3>
                        <p className="text-xl text-foreground font-medium leading-relaxed animate-fade-in">
                          {currentQuestion}
                        </p>
                        {activeQuestion && (
                          <div className="mt-6 text-left">
                            <p className="mb-3 text-sm font-medium text-institutional-blue">{activeQuestion.category}</p>
                            <div className="grid gap-3">
                              {activeQuestion.options.map((option, index) => {
                                const answered = selectedAnswer !== null;
                                const correct = index === activeQuestion.correctAnswer;
                                const selected = index === selectedAnswer;
                                return (
                                  <Button
                                    key={option}
                                    variant="outline"
                                    aria-pressed={selected}
                                    disabled={answered}
                                    onClick={() => setSelectedAnswer(index)}
                                    className={`h-auto min-h-14 w-full justify-start whitespace-normal p-4 text-left leading-relaxed disabled:opacity-100 ${answered && correct ? 'border-success bg-success/10 text-foreground' : answered && selected ? 'border-destructive bg-destructive/10 text-foreground' : 'border-border text-foreground'}`}
                                  >
                                    <span className="shrink-0 font-semibold">{String.fromCharCode(65 + index)}.</span>
                                    <span className="min-w-0">{option}</span>
                                  </Button>
                                );
                              })}
                            </div>
                            {selectedAnswer !== null && (
                              <div role="status" aria-live="polite" className="mt-5 border-t pt-5">
                                <p className={`font-semibold ${selectedAnswer === activeQuestion.correctAnswer ? 'text-success' : 'text-destructive'}`}>
                                  {selectedAnswer === activeQuestion.correctAnswer ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
                                </p>
                                <p className="mt-2 text-foreground"><span className="font-semibold">Respuesta correcta: </span>{activeQuestion.options[activeQuestion.correctAnswer]}</p>
                                <h4 className="mt-4 font-semibold text-institutional-blue">Explicación / fundamento</h4>
                                <p className="mt-2 leading-relaxed text-foreground">{activeQuestion.explanation}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-success mb-4">
                        Felicitaciones 👏🏻
                      </h2>
                      <p className="text-xl text-foreground mb-2">
                        ¡Buen trabajo, equipo!
                      </p>
                      <p className="text-muted-foreground">
                        La capacitación ha finalizado exitosamente
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isComplete ? (
            <>
              <Button
                onClick={handleStart}
                disabled={remainingQuestions === 0 || (showResult && selectedAnswer === null)}
                size="lg"
                className="bg-gradient-to-r from-institutional-blue to-institutional-blue-light hover:from-institutional-blue-dark hover:to-institutional-blue text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                style={{ boxShadow: 'var(--shadow-institutional)' }}
              >
                ¡Vamos!
              </Button>
              <Button
                onClick={handleShowQuestion}
                disabled={remainingQuestions === 0 || (showResult && selectedAnswer === null)}
                size="lg"
                variant="outline"
                className="border-institutional-accent text-institutional-accent hover:bg-institutional-accent hover:text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <MessageCircleQuestion className="w-5 h-5 mr-2" />
                Solo Pregunta
              </Button>
              {remainingQuestions === 0 && selectedAnswer !== null && (
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-gradient-to-r from-success to-success/80 hover:from-success hover:to-success text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Finalizar
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="border-institutional-blue text-institutional-blue hover:bg-institutional-blue hover:text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reiniciar Capacitación
              </Button>
              <Button
                onClick={handleShowQuestion}
                disabled={remainingQuestions === 0}
                size="lg"
                className="bg-gradient-to-r from-institutional-accent to-institutional-accent/80 hover:from-institutional-accent hover:to-institutional-accent text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <MessageCircleQuestion className="w-5 h-5 mr-2" />
                Pregunta Extra
              </Button>
            </>
          )}
        </div>

        {/* Used Participants List */}
        {usedParticipants.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Participantes que ya fueron seleccionados:
              </h3>
              <div className="flex flex-wrap gap-2">
                {usedParticipants.map((participant, index) => (
                  <Badge 
                    key={participant} 
                    variant="secondary"
                    className="bg-muted text-muted-foreground"
                  >
                    {index + 1}. {participant}
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