import { QuizQuestion } from '../types/neuro';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'En un paciente que ha sufrido un ACV isquémico con oclusión en el territorio de la Arteria Cerebral Media (ACM) Izquierda, ¿cuál de las siguientes combinaciones de déficits es más probable encontrar?',
    options: [
      'Heminegligencia espacial izquierda, anosognosia y aprosodia afectiva',
      'Afasia de Broca o Wernicke, apraxia ideomotora, acalculia y depresión reactiva',
      'Hemianopsia homónima bilateral, prosopagnosia aislada y alexia con agrafia',
      'Acinesia profunda, mutismo acinético e incontinencia de esfínteres'
    ],
    correctAnswerIndex: 1,
    explanation: 'El tronco de la ACM izquierda irriga las áreas perisilvianas del hemisferio dominante (Broca, Wernicke, corteza motora faciobraquial y giro angular/supramarginal). Su oclusión genera afasias, apraxias, acalculia (Síndrome de Gerstmann) y rigidez cognitiva.',
    unitId: 'unidad-3',
    relatedStructureId: 'lobulo-frontal-izquierdo',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 50: Left MCA stem)'
  },
  {
    id: 'q-2',
    question: '¿Qué rasgo clínico y de neuroimagen permite diferenciar con mayor certeza la Degeneración Lobar Frontotemporal (DLFT) de la Enfermedad de Alzheimer (EA) en etapas iniciales?',
    options: [
      'La DLFT inicia con amnesia episódica anterógrada severa y atrofia hipocampal precoz',
      'La DLFT presenta cambios tempranos prominentes en la personalidad, desinhibición o conducta moral con atrofia frontal/temporal anterior, mientras que en la EA predomina el olvido episódico con atrofia entorrinal e hipocampal',
      'La DLFT siempre presenta parkinsonismo simétrico y alucinaciones visuales tempranas',
      'La EA cursa con deterioro súbito escalonado y signos neurológicos focales espásticos'
    ],
    correctAnswerIndex: 1,
    explanation: 'Según la Tabla 2 de la clase, la clínica inicial de la DLFT se caracteriza por cambios en el comportamiento, la personalidad y el lenguaje (desinhibición, apatía, hiperoralidad), con atrofia lobar anterior circunscrita. La EA, en cambio, debuta con pérdida de memoria episódica reciente y atrofia del hipocampo y corteza entorrinal.',
    unitId: 'unidad-5',
    relatedStructureId: 'hipocampo',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositiva 33: Tabla 2)'
  },
  {
    id: 'q-3',
    question: 'En un Traumatismo Craneoencefálico (TEC) cerrado por aceleración-desaceleración brusca (como en un impacto automovilístico), ¿por qué los polos frontales y temporales presentan mayor vulnerabilidad biomecánica?',
    options: [
      'Porque tienen menor densidad de vascularización arterial que los lóbulos parietales',
      'Porque colisionan contra las crestas y relieves óseos irregulares del suelo de la fosa craneal anterior y media (alas del esfenoides)',
      'Porque están protegidos por una capa de meninges mucho más delgada',
      'Porque carecen de células gliales mielinizantes en la sustancia blanca subcortical'
    ],
    correctAnswerIndex: 1,
    explanation: 'El movimiento inercial del encéfalo dentro de la cavidad craneal genera contusiones mecánicas por cizallamiento y fricción contra las protuberancias rugosas del suelo del cráneo anterior y la cresta esfenoidal, produciendo lesiones contusivas focales especialmente en la cara orbitofrontal y polos temporales.',
    unitId: 'unidad-2',
    relatedStructureId: 'lobulo-frontal-izquierdo',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 4, 5, 6)'
  },
  {
    id: 'q-4',
    question: '¿Cuál es la función neurofuncional primordial de la Capa IV (Capa Granular Interna) de la neocorteza cerebral según la organización citoarquitectónica?',
    options: [
      'Es el origen de las fibras comisurales que cruzan por el cuerpo calloso hacia el hemisferio contralateral',
      'Es la principal diana de entrada que recibe las aferencias sensoriales talámicas específicas (altamente desarrollada en V1 y S1)',
      'Origina los axones de la vía piramidal corticoespinal motora (células gigantes de Betz)',
      'Envía proyecciones de retroalimentación córtico-talámica hacia la capa molecular'
    ],
    correctAnswerIndex: 1,
    explanation: 'La Capa IV está densamente poblada de células estrelladas y constituye la estación primaria de recepción para las fibras tálamo-corticales específicas (como el haz geniculocalcarino en el área 17 / V1, visible como la estría de Gennari). Las eferencias motoras subcorticales se originan en la Capa V.',
    unitId: 'unidad-1',
    relatedStructureId: 'lobulo-occipital',
    sourceReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 27: Figure 5.8)'
  },
  {
    id: 'q-5',
    question: 'Un paciente de 72 años consulta por marcha a pequeños pasos "como pegada al suelo", incontinencia urinaria involuntaria y lentitud cognitiva. En la neuroimagen se observa marcada dilatación de los ventrículos cerebrales sin atrofia cortical proporcional. ¿Cuál es la sospecha diagnóstica?',
    options: [
      'Enfermedad de Alzheimer en etapa terminal',
      'Demencia por Cuerpos de Lewy',
      'Hidrocefalia Normotensiva (Síndrome de Hakim-Adams)',
      'Degeneración Lobar Frontotemporal variante conductual'
    ],
    correctAnswerIndex: 2,
    explanation: 'La tríada clásica de Hakim-Adams está compuesta por: apraxia de la marcha ("marcha magnética"), incontinencia de esfínteres y deterioro cognitivo subcortical, acompañada en neuroimagen de ventriculomegalia desproporcionada. Es una de las causas potencialmente reversibles de deterioro cognitivo.',
    unitId: 'unidad-5',
    relatedStructureId: 'hipocampo',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositiva 33: Tabla 2)'
  },
  {
    id: 'q-6',
    question: 'Un paciente presenta incapacidad para leer palabras impresas (alexia), pero conserva perfectamente la capacidad de escribir de forma espontánea y al dictado (sin agrafia). ¿Qué mecanismo fisiopatológico explica este fenómeno?',
    options: [
      'Lesión en la corteza prefrontal ventromedial bilateral',
      'Infarto en territorio de la Arteria Cerebral Posterior (ACP) izquierda que destruye la corteza visual occipital izquierda y el esplenio del cuerpo calloso',
      'Isquemia transitoria en el territorio de la arteria cerebral media anterior derecha',
      'Destrucción bilateral de los núcleos basales caudado y putamen'
    ],
    correctAnswerIndex: 1,
    explanation: 'El Síndrome de Déjerine (alexia sin agrafia) es el ejemplo clásico de síndrome de desconexión: el campo visual derecho está ciego por el infarto occipital izquierdo; la corteza visual derecha intacta percibe las letras en el hemicampo izquierdo, pero no puede transferir esa información al área del lenguaje (giro angular izquierdo) debido a la destrucción simultánea del esplenio del cuerpo calloso.',
    unitId: 'unidad-3',
    relatedStructureId: 'cuerpo-calloso',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 51: PCA deficits)'
  },
  {
    id: 'q-7',
    question: '¿Qué tríada clínica distingue característicamente a la Demencia por Cuerpos de Lewy (DL)?',
    options: [
      'Amnesia retrógrada aislada, hiperfagia y crisis convulsivas focales',
      'Alucinaciones visuales vívidas y complejas, fluctuaciones en la atención/conciencia y parkinsonismo motor espontáneo',
      'Pérdida rápida de la palabra, mutismo acinético y atrofia cerebelosa pura',
      'Marcha magnética, cefalea matutina y anosmia'
    ],
    correctAnswerIndex: 1,
    explanation: 'La Demencia por Cuerpos de Lewy se identifica por la coexistencia de alucinaciones visuales bien estructuradas (personas, animales), fluctuaciones cognitivas marcadas de un día a otro, y parkinsonismo espontáneo no farmacológico (con gran hipersensibilidad a los neurolépticos).',
    unitId: 'unidad-5',
    relatedStructureId: 'ganglios-de-la-base',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositivas 31, 33: Tabla 2)'
  },
  {
    id: 'q-8',
    question: '¿Qué manifestaciones neuropsicológicas y conductuales son típicas de un infarto en el territorio de la Arteria Cerebral Anterior (ACA)?',
    options: [
      'Afasia fluente con jergafasia y sordera pura para las palabras',
      'Acinesia, mutismo acinético, abulia (descritos en clase como apatía severa) y déficit en evocación mnésica',
      'Prosopagnosia, acromatopsia y heminegligencia visual bilateral',
      'Corea, distonía focal y temblor cerebeloso de intención'
    ],
    correctAnswerIndex: 1,
    explanation: 'La ACA irriga la cara medial del lóbulo frontal (área motora suplementaria y corteza cingulada anterior). El daño en estas áreas desconecta el circuito motivacional del inicio de la acción, provocando acinesia, abulia profunda y mutismo acinético.',
    unitId: 'unidad-3',
    relatedStructureId: 'lobulo-frontal-izquierdo',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 49: Left ACA)'
  }
];
