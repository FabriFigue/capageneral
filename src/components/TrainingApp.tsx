import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Users, MessageCircleQuestion } from 'lucide-react';

const PARTICIPANTS = [
  'Abril', 'Agustina', 'Fabricio', 'Flavia', 'Gonzalo', 'Belén', 'Julieta', 'Nicolas'
];

const QUESTIONS = [
  '¿Qué es un plan PMI?',
  '¿Qué es un plan PMI monotributo?',
  '¿Qué es un plan PMI 2886?',
  '¿Cómo se genera una baja (hijo PMI)?',
  '¿Cómo se genera un alta (PMI) socio nuevo?',
  'Mostrá en pantalla cómo actualizás los datos.',
  '¿Un plan PMI 2886 puede bajar a PMO?',
  'Nombrá línea de planes Jerárquicos.',
  '¿A quiénes va dirigido el PLAN JOVEN?',
  'Socio monotributista: ¿qué documentación deberá cargar para ingresar?',
  '¿Qué planes sí tienen carencias?',
  'Nombrá 2 servicios y detallá.',
  '¿Qué es el fondo Jubilados?',
  '¿Qué costo tiene el servicio de Prótesis Odontológica en un PMI 3000?',
  '¿Qué es el servicio de interconsulta?',
  '¿Un RN tiene cobertura?',
  '¿Un socio con deuda en PMO puede solicitar volver a PMI?',
  'Explicá con tus palabras la situación de hijo mayor de 21 años.',
  '¿Cual es el porcentaje que recepcionamos de aporte en asalariados?',
  'Explica los porcentajes de cobertura de Prótesis Odontologica según plan.',
  'Llama Persona de 55 años que le ofrecemos.',
  '¿Que beneficios tengo abonando la cuota societaria?'
];

export const TrainingApp = () => {
  const [usedParticipants, setUsedParticipants] = useState<string[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const getRandomUnused = (array: string[], usedArray: string[]) => {
    const available = array.filter(item => !usedArray.includes(item));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleStart = () => {
    const participant = getRandomUnused(PARTICIPANTS, usedParticipants);
    const question = getRandomUnused(QUESTIONS, usedQuestions);

    if (participant && question) {
      setCurrentParticipant(participant);
      setCurrentQuestion(question);
      setUsedParticipants(prev => [...prev, participant]);
      setUsedQuestions(prev => [...prev, question]);
      setShowResult(true);

      // Check if all participants have been used
      if (usedParticipants.length + 1 >= PARTICIPANTS.length) {
        setIsComplete(true);
      }
    }
  };

  const handleShowQuestion = () => {
    const question = getRandomUnused(QUESTIONS, usedQuestions);
    if (question) {
      setCurrentQuestion(question);
      setUsedQuestions(prev => [...prev, question]);
      setShowResult(true);
      setCurrentParticipant('');
    }
  };

  const handleReset = () => {
    setUsedParticipants([]);
    setUsedQuestions([]);
    setCurrentParticipant('');
    setCurrentQuestion('');
    setIsComplete(false);
    setShowResult(false);
  };

  const remainingParticipants = PARTICIPANTS.length - usedParticipants.length;
  const remainingQuestions = QUESTIONS.length - usedQuestions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-institutional-blue/5 p-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center gap-2 bg-institutional-blue/10 px-6 py-2 rounded-full mb-4">
            <Users className="w-5 h-5 text-institutional-blue" />
            <span className="text-institutional-blue font-medium">Jerárquicos Salud</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Capacitación Ingresantes
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Campaña General - Jerárquicos Salud
          </p>
          <p className="text-sm text-muted-foreground">
            Equipo: Abril, Agustina, Fabricio, Flavia, Gonzalo, Belén, Julieta y Nicolas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-l-4 border-l-institutional-blue">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h5 text-institutional-blue" />
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
          <CardContent className="p-8 text-center">
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
                        ¡Todos participaron!
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
                disabled={remainingParticipants === 0}
                size="lg"
                className="bg-gradient-to-r from-institutional-blue to-institutional-blue-light hover:from-institutional-blue-dark hover:to-institutional-blue text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                style={{ boxShadow: 'var(--shadow-institutional)' }}
              >
                ¡Vamos!
              </Button>
              {remainingParticipants === 8 && (
                <Button
                  onClick={handleShowQuestion}
                  disabled={remainingQuestions === 0}
                  size="lg"
                  variant="outline"
                  className="border-institutional-accent text-institutional-accent hover:bg-institutional-accent hover:text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <MessageCircleQuestion className="w-5 h-5 mr-2" />
                  Solo Pregunta
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