export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // --- GENERALIDADES, PLANES Y SOCIOS ---
  {
    id: 1,
    category: "Generalidades y PMO/PMI",
    question: "¿Cuál es la principal diferencia entre el PMO y el PMI (Planes JS)?",
    options: [
      "El PMO requiere abonar servicios adicionales de la Mutual para activarse.",
      "El PMO se brinda únicamente con los aportes de ley sin abonar servicios mutuales, mientras que el PMI ofrece cobertura superadora mediante servicios adicionales.",
      "El PMI solo cubre prestaciones básicas de urgencia médica en Sanatorios de Santa Fe.",
      "El PMO incluye turismo, subsidio de sepelio y reintegros ilimitados."
    ],
    correctAnswer: 1,
    explanation: "El PMO es el conjunto de prestaciones básicas esenciales cubiertas por los aportes de ley sin servicios de la Mutual. El PMI/Planes JS brinda cobertura superadora abonando servicios adicionales."
  },
  {
    id: 2,
    category: "Grupo Familiar",
    question: "¿Hasta qué edad pueden permanecer como adherentes los hijos solteros que cursen estudios regulares reconocidos oficialmente?",
    options: [
      "Hasta los 21 años inclusive.",
      "Hasta los 24 años inclusive.",
      "Hasta los 25 años inclusive.",
      "Hasta los 26 años cumplidos."
    ],
    correctAnswer: 2,
    explanation: "Forman parte del grupo familiar primario los hijos solteros de 21 hasta los 25 años inclusive que estén a exclusivo cargo y cursen estudios regulares reconocidos por el Ministerio de Educación."
  },
  {
    id: 3,
    category: "Asalariados y Aportes",
    question: "En el régimen de Asalariados, del 9% total de aportes y contribuciones a la Obra Social, ¿qué porcentaje recepciona efectivamente Jerárquicos?",
    options: [
      "9,00%",
      "6,00%",
      "7,65%",
      "8,15%"
    ],
    correctAnswer: 2,
    explanation: "El empleado aporta 3% y el empleador 6% (total 9%). Jerárquicos recepciona el 7,65%, mientras que el 2,35% restante lo retiene AFIP."
  },
  {
    id: 4,
    category: "Planes JS",
    question: "¿Qué particularidad comercial tienen actualmente los Planes JS (Conecta, Avanza, Impulsa, Elite) para nuevos socios o cambios de plan?",
    options: [
      "Se comercializa únicamente la línea PMI tradicional.",
      "Para socios nuevos o cambios de plan sólo se ofrece la línea de planes JS, descontando del costo final los aportes de ley sin un mínimo requerido.",
      "Exigen un sueldo mínimo bruto de 5 salarios mínimos para afiliarse.",
      "No permiten la incorporación de cónyuges ni hijos menores."
    ],
    correctAnswer: 1,
    explanation: "Para socios nuevos o cambios de plan actualmente solo se ofrece la línea de planes JS, descontando del precio final los aportes que ingresan sin mínimo requerido."
  },
  {
    id: 5,
    category: "Servicios Mutuales",
    question: "¿A partir de qué edad y bajo qué condición se aplica el aporte solidario al 'Fondo de Jubilados' en socios activos?",
    options: [
      "Desde los 18 años a todos los socios activos.",
      "Desde los 45 años en mujeres y 50 años en varones, ingresados a partir de enero de 2014.",
      "Únicamente a los 65 años al momento de jubilarse.",
      "Desde los 60 años en varones y 55 en mujeres."
    ],
    correctAnswer: 1,
    explanation: "El Fondo de Jubilados se implementó para nuevos socios desde enero de 2014; es un aporte no reintegrable aplicable a cada integrante desde los 45 años en mujeres y 50 años en varones."
  },
  {
    id: 6,
    category: "Servicio de Prótesis",
    question: "¿Qué porcentaje de cobertura brinda el Fondo Especial de Prótesis Internas en prótesis importadas al transcurrir 24 meses en planes Asalariados y Monotributistas?",
    options: [
      "Continúa en 80%.",
      "Se eleva al 100%.",
      "50% con copago.",
      "Solo cubre prótesis de origen nacional."
    ],
    correctAnswer: 1,
    explanation: "Inicia con un 80% sobre importadas. Transcurridos 24 meses se eleva al 100% en asalariados y monotributistas (en autónomos se mantiene al 80%)."
  },
  {
    id: 7,
    category: "Bajas",
    question: "Al producirse la desvinculación laboral o cambio de Obra Social de un socio asalariado, ¿por cuánto tiempo se extiende por ley la cobertura de salud?",
    options: [
      "30 días corridos.",
      "60 días corridos.",
      "90 días a partir de la fecha de desvinculación u opción.",
      "Cesa inmediatamente al último día del mes trabajado."
    ],
    correctAnswer: 2,
    explanation: "La cobertura se extiende por ley durante 90 días a partir de la desvinculación o de la opción de cambio de O.S. Durante ese período continúa abonando la cuota del plan superador."
  },
  {
    id: 8,
    category: "Programa Materno Infantil",
    question: "Durante los primeros días de vida del recién nacido, ¿cómo accede a las prestaciones médicas y qué plazo tiene el titular para incorporarlo?",
    options: [
      "Accede con DNI provisorio y tiene 60 días para el alta.",
      "Accede durante los primeros 30 días con la credencial de la madre, debiendo ser incorporado formalmente en dicho plazo.",
      "Debe tramitar de inmediato una credencial provisoria en el CAT antes del alta médica.",
      "Solo se cubre si ya nació afiliado como socio titular adherente."
    ],
    correctAnswer: 1,
    explanation: "Durante los primeros 30 días de vida accede con la credencial de la madre y en dicho plazo debe ser incorporado formalmente al grupo familiar."
  },

  // --- FINANZAS, CUENTAS CORRIENTES Y DÉBITOS ---
  {
    id: 9,
    category: "Formas de Pago y Débitos",
    question: "Si un socio que abona por débito automático tiene en su cuenta bancaria $1 menos del importe total de la cuota:",
    options: [
      "Se cobra el importe disponible y el peso restante pasa a deuda a futuro.",
      "No se realizan pagos parciales; el débito se rechaza y la cuota pasa automáticamente a forma de pago CAJA.",
      "El sistema reintenta diariamente hasta completar el importe sin generar intereses.",
      "Se cancela la afiliación a la mutual de inmediato."
    ],
    correctAnswer: 1,
    explanation: "No se realizan pagos parciales. Ante la falta de saldo suficiente se rechaza el débito total y la cuota se genera automáticamente por Caja."
  },
  {
    id: 10,
    category: "Cuentas Corrientes y Coseguros",
    question: "¿En qué pantalla y concepto se registran las prestaciones médicas que el socio abonará en liquidaciones venideras?",
    options: [
      "Créditos Pendientes.",
      "Deudas a Futuro (reflejadas luego en la liquidación mensual).",
      "Diferencia de Tope de Plan.",
      "Fondo Compensador Interno."
    ],
    correctAnswer: 1,
    explanation: "Los coseguros facturados por los prestadores ingresan primero como 'Deudas a Futuro' y se incorporan al resumen en la próxima liquidación a generarse."
  },
  {
    id: 11,
    category: "Cuenta Corriente de Aportes",
    question: "En la pantalla de Cuenta Corriente de Aportes de la nueva línea JS, ¿qué significa que un aporte esté resaltado en color VIOLETA?",
    options: [
      "Que el empleador tiene deuda en AFIP.",
      "Que el aporte ya fue aplicado en la Cuenta Corriente de Servicios de Salud correspondiente a ese mes.",
      "Que es un aporte devuelto por pago de vacaciones.",
      "Que corresponde a un pago duplicado pendiente de auditoría."
    ],
    correctAnswer: 1,
    explanation: "Color violeta = Aporte aplicado en CC Salud del período correspondiente, para evitar interpretaciones incorrectas o duplicaciones."
  },

  // --- COBRANZAS, MOROSIDAD Y REFINANCIACIÓN ---
  {
    id: 12,
    category: "Cobranzas - Estados del Moroso",
    question: "¿Qué período de atraso comprende el estado de 'DEUDOR TRANSITORIO' y qué acciones iniciales dispara?",
    options: [
      "1 a 15 días; carta documento y corte de prestaciones.",
      "1 a 30 días de atraso; envío de email con link de pago/boleta, reclamo de resumen vencido y llamados automáticos de 16 a 20 hs.",
      "31 a 90 días; intimación de baja y pase a prejudicial.",
      "Más de 90 días; bloqueo registral de credenciales."
    ],
    correctAnswer: 1,
    explanation: "El Deudor Transitorio abarca de 1 a 30 días de atraso posterior al vencimiento o rechazo de débito, activando mails con link de pago, avisos y llamadas automáticas recordatorias."
  },
  {
    id: 13,
    category: "Cobranzas - Estados del Moroso",
    question: "¿Cuáles son los filtros para aplicar la 'Notificación de Baja del Plan Mutual' en el Estado de Deudor Administrativo (31 a 90 días)?",
    options: [
      "Socios que adeuden 1 cuota al día 10 del mes.",
      "Socios Activos que adeuden 3 o más períodos y se encuentren en estado administrativo o extrajudicial (FTC el último día del mes en curso).",
      "Socios dados de baja que adeuden coseguros de más de un año.",
      "Socios adherentes menores de 21 años sin certificado de estudio."
    ],
    correctAnswer: 1,
    explanation: "El filtro de Notificación de Baja aplica a socios activos que adeuden 3 o más períodos en estado administrativo o extrajudicial, asignando como FTC el último día del mes."
  },
  {
    id: 14,
    category: "Cobranzas - Gestión Extrajudicial",
    question: "¿A partir de cuántos días de mora un expediente se considera 'Prejudicial en estudio' dentro de la Gestión Extrajudicial (91 a 165 días)?",
    options: [
      "A partir de los 45 días de atraso.",
      "A partir de los 60 días de atraso.",
      "A partir de los 90 días de atraso.",
      "Más de 120 días de mora."
    ],
    correctAnswer: 3,
    explanation: "Dentro del estado de Gestión Extrajudicial (91 a 165 días), cuando se superan los 120 días de mora el expediente pasa a 'Prejudicial en estudio' y se brindan los datos del estudio jurídico."
  },
  {
    id: 15,
    category: "Cobranzas - Incobrables",
    question: "Si un socio se encuentra clasificado internamente en 'Estado Incobrable' y se comunica para regularizar su situación:",
    options: [
      "Se le debe informar abiertamente que su legajo pasó a pérdida e incobrable.",
      "Bajo ninguna circunstancia se le informa que está en estado incobrable; se le cobra Capital + Interés moratorio al día de la fecha.",
      "Se le condona el 100% de la deuda si abona en efectivo.",
      "Se le exige únicamente la entrega de credenciales rotas sin abonar."
    ],
    correctAnswer: 1,
    explanation: "La condición de 'Incobrable' es estrictamente de uso interno; nunca se le comunica al socio. Si llama para abonar, se le cobra Capital + Interés."
  },
  {
    id: 16,
    category: "Cobranzas - Refinanciación",
    question: "¿Cuáles son los requisitos para acceder a una 'Moratoria Individual CON Interés' (hasta 4 cuotas con 6% de interés)?",
    options: [
      "Tener una deuda superior a $500.000 y ser socio dado de baja.",
      "Ser socio activo, deuda que NO supere los $300.000, cancelar previamente consumos de Tarjeta Jerárquicos y no poseer refinanciaciones previas en curso.",
      "Abonar mediante 12 cheques diferidos con firma certificada.",
      "Presentar dos garantes propietarios que sean socios titulares."
    ],
    correctAnswer: 1,
    explanation: "Aplica a socios activos cuya deuda no supere los $300.000, con cancelación previa de Tarjeta Jerárquicos (no financiable), hasta en 4 cuotas (6% interés c/u) y sin refinanciaciones previas."
  },
  {
    id: 17,
    category: "Cobranzas - Convenio Mutuo",
    question: "Para formalizar un 'Convenio Mutuo con Firma de Pagaré' (deudas de activos mayores a $300.000 o socios dados de baja):",
    options: [
      "Se refinancia el 100% en hasta 24 cuotas fijas sin entrega inicial.",
      "Requiere una entrega previa del 50%, cancelación previa de Tarjeta Jerárquicos, nota firmada, pagaré certificado y un plazo máximo de hasta 6 cuotas.",
      "Solo requiere el envío de un correo electrónico sin certificación de firmas.",
      "Se otorga de oficio desde el CAT sin intervención de Cobranzas."
    ],
    correctAnswer: 1,
    explanation: "Se exige entrega previa del 50%, cancelación de Tarjeta JS, convenio y pagaré firmados por el titular y certificados, con financiación del remanente en hasta 6 cuotas."
  },
  {
    id: 18,
    category: "Cobranzas - Medios de Pago",
    question: "Si un socio abona su deuda con 'Cheques de Pago Diferido', ¿cuál es el porcentaje de recargo adicional según el plazo?",
    options: [
      "3% a 30 días, 6% a 60 días y 9% a 90 días.",
      "6% a 30 días, 12% a 60 días y 18% a 90 días, más $150 de impuesto/comisión por cheque.",
      "10% fijo sin importar los días de diferimiento.",
      "No se aceptan cheques diferidos bajo ningún concepto."
    ],
    correctAnswer: 1,
    explanation: "En cheques diferidos se adiciona: 30 días (+6%), 60 días (+12%) y 90 días (+18%), más $150 de comisión/impuesto por cada cheque ingresado."
  },
  {
    id: 19,
    category: "Gestiones Afectadas por Deuda",
    question: "Si a un socio con deuda se le retiene el despacho de una credencial y solicita un certificado provisorio, ¿qué vigencia tiene dicho comprobante?",
    options: [
      "10 días corridos para todos los planes.",
      "Autónomos: 1 día; Asalariados, Monotributistas y Jubilados: 5 días hábiles.",
      "Autónomos: 5 días hábiles; Asalariados: 30 días corridos.",
      "No se emiten provisorios a socios con saldo deudor."
    ],
    correctAnswer: 1,
    explanation: "El certificado provisorio de cobertura por retención de credencial tiene vigencia de 1 día para planes Autónomos y 5 días hábiles para Asalariados, Monotributistas y Jubilados."
  },
  {
    id: 20,
    category: "Cobranzas - Reingreso de Socios",
    question: "Si un socio dado de baja al PMO por deuda desea reincorporarse al Plan Mutual (PMI/JS), ¿cuál es el requisito formal y excluyente?",
    options: [
      "Cancelar el 50% de la deuda y abonar en efectivo por caja.",
      "Cancelar la totalidad de la deuda y presentar obligatoriamente una Forma de Pago Electrónica (CBU o Tarjeta de Crédito).",
      "Permanecer obligatoriamente 2 años en PMO antes de solicitarlo.",
      "Entregar las credenciales rotas y solicitar un plan Monotributista."
    ],
    correctAnswer: 1,
    explanation: "Debe cancelar la totalidad de la deuda y presentar una forma de pago electrónica excluyente (Caja de Ahorro, Cta Cte o Tarjeta). Sin esto no procede el cambio de plan y permanece en PMO."
  }
];