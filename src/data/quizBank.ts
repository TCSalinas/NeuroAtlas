import { QuizQuestion } from '../types/neuro';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // UNIDAD 1: PANORÁMICA NEUROFUNCIONAL Y CITOARQUITECTURA
  // ==========================================
  {
    id: 'q-u1-1',
    question: '¿Cuál es la función neurofuncional primordial de la Capa IV (Capa Granular Interna) de la neocorteza cerebral según la organización citoarquitectónica?',
    options: [
      'Es el origen de las fibras comisurales que cruzan por el cuerpo calloso hacia el hemisferio contralateral',
      'Es la principal diana de entrada que recibe las aferencias sensoriales talámicas específicas (altamente desarrollada en V1 y S1)',
      'Origina los axones de la vía piramidal corticoespinal motora (células gigantes de Betz)',
      'Envía proyecciones de retroalimentación córtico-talámica hacia la capa molecular'
    ],
    correctAnswerIndex: 1,
    explanation: 'La Capa IV está densamente poblada de células estrelladas y constituye la estación primaria de recepción para las fibras tálamo-corticales específicas (como el haz geniculocalcarino en el área 17 / V1, visible macroscopicamente como la estría de Gennari). Las eferencias motoras subcorticales se originan en la Capa V.',
    unitId: 'unidad-1',
    relatedStructureId: 'lobulo-occipital',
    sourceReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 27: Figure 5.8)'
  },
  {
    id: 'q-u1-2',
    question: 'En la clasificación de la corteza motora primaria (Área 4 de Brodmann / Giro Precentral), ¿qué característica histológica distintiva presenta en comparación con las cortezas sensoriales primarias?',
    options: [
      'Es una corteza coniocorteza con una Capa IV hipertrofiada de células estrelladas',
      'Es una corteza agranular donde la Capa IV está prácticamente ausente y la Capa V posee células piramidales gigantes (células de Betz)',
      'Consta únicamente de 3 capas neuronales por tratarse de arquicorteza filogenéticamente primitiva',
      'Carece de células gliales y mielina en sus capas intermedias'
    ],
    correctAnswerIndex: 1,
    explanation: 'La corteza motora primaria es agranular: su función no es recibir información sensorial talámica directa (Capa IV reducida o ausente), sino emitir potentes eferencias descendentes motoras a través del tracto corticoespinal originado en las neuronas piramidales de la Capa V (Betz).',
    unitId: 'unidad-1',
    relatedStructureId: 'lobulo-frontal-izquierdo',
    sourceReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositivas 25, 27)'
  },
  {
    id: 'q-u1-3',
    question: 'Según el modelo jerárquico de procesamiento cortical expuesto en clases (Mesulam / Diapositiva 29), ¿qué distingue a las áreas de asociación heteromodal de las áreas unimodales?',
    options: [
      'Las áreas heteromodales reciben información directamente de los receptores sensoriales periféricos sin relevo talámico',
      'Las áreas unimodales procesan información combinada de múltiples sentidos, mientras que las heteromodales procesan únicamente visión',
      'Las áreas heteromodales integran aferencias de múltiples modalidades sensoriales para construir representaciones abstractas, lenguaje y funciones ejecutivas (e.g. corteza prefrontal y unión temporo-parieto-occipital)',
      'Las áreas heteromodales se ubican exclusivamente en el cerebelo y tronco encefálico'
    ],
    correctAnswerIndex: 2,
    explanation: 'Las áreas de asociación unimodal procesan atributos específicos de una sola modalidad sensorial (e.g. áreas visuales 18 y 19). Las áreas heteromodales o multimodales (corteza prefrontal, córtex parietal posterior y temporal superior) convergen información de diversos canales sensoriales para la cognición de orden superior.',
    unitId: 'unidad-1',
    relatedStructureId: 'lobulo-parietal-izquierdo',
    sourceReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 29: Unimodal and Heteromodal Association Areas)'
  },
  {
    id: 'q-u1-4',
    question: '¿Qué tipo de tracto de sustancia blanca es el Fascículo Arqueado y cuál es su función neurocognitiva clave?',
    options: [
      'Es un tracto comisural que une los dos polos frontales a través del rostrum del cuerpo calloso',
      'Es un tracto de asociación intrahemisférico que interconecta el área de Wernicke (temporal superior) con el área de Broca (frontal opercular/triangular)',
      'Es un tracto de proyección descendente que conecta la corteza premotora con la médula espinal',
      'Es una vía ascendente talámica que transporta sensibilidad termoalgésica'
    ],
    correctAnswerIndex: 1,
    explanation: 'El fascículo arqueado es el tracto de asociación de largo alcance por excelencia del hemisferio izquierdo, crucial para la repetición lingüística y la integración sensoriomotora del habla entre la comprensión auditiva (Wernicke) y la articulación motora fonológica (Broca). Su lesión produce afasia de conducción.',
    unitId: 'unidad-1',
    relatedStructureId: 'lobulo-temporal-izquierdo',
    sourceReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 7: Association and Commissural Tracts)'
  },
  {
    id: 'q-u1-5',
    question: 'El circuito de Papez es la red anatómica clásica implicada en la consolidación de la memoria y la emoción. ¿Cuál es el orden secuencial correcto de sus estructuras principales?',
    options: [
      'Corteza motora → Núcleo rojo → Médula espinal → Tálamo',
      'Hipocampo → Fórnix → Cuerpos mamilares → Tracto mamilotalámico → Núcleo anterior del tálamo → Giro cingulado → Corteza entorrinal → Hipocampo',
      'Amígdala → Globo pálido → Sustancia negra → Núcleo subtalámico → Putamen',
      'Bulbo olfatorio → Quiasma óptico → Colículo superior → Lóbulo occipital'
    ],
    correctAnswerIndex: 1,
    explanation: 'El circuito de Papez (descrito en la Diapositiva 16) fluye desde el hipocampo vía fórnix hacia los cuerpos mamilares del hipotálamo, de allí al núcleo anterior del tálamo por el haz mamilotalámico (de Vicq d\'Azyr), se proyecta a la corteza del cíngulo y regresa vía giro parahipocampal/corteza entorrinal al hipocampo.',
    unitId: 'unidad-1',
    relatedStructureId: 'hipocampo',
    sourceReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 16: Limbic System & Papez Circuit)'
  },

  // ==========================================
  // UNIDAD 2: TRAUMATISMO CRANEOENCEFÁLICO (TEC)
  // ==========================================
  {
    id: 'q-u2-1',
    question: 'En un Traumatismo Craneoencefálico (TEC) cerrado por aceleración-desaceleración brusca (como en un impacto automovilístico), ¿por qué los polos frontales y temporales presentan mayor vulnerabilidad biomecánica?',
    options: [
      'Porque tienen menor densidad de vascularización arterial que los lóbulos parietales',
      'Porque colisionan contra las crestas y relieves óseos irregulares del suelo de la fosa craneal anterior y media (alas del esfenoides y techo orbitario)',
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
    id: 'q-u2-2',
    question: '¿Cuál es el mecanismo fisiopatológico fundamental del Daño Axonal Difuso (DAD) en el TEC moderado a grave?',
    options: [
      'Trombosis inmediata de los senos venosos durales con infarto hemorrágico masivo',
      'Fuerzas inerciales angulares y rotacionales de estiramiento y cizallamiento que deforman y rompen el citoesqueleto axonal en las zonas de transición entre sustancia gris y blanca',
      'Infección bacteriana oportunista transmitida por fractura de base de cráneo',
      'Depósito inmediato de placas seniles de beta-amiloide en el tronco encefálico'
    ],
    correctAnswerIndex: 1,
    explanation: 'El DAD es una lesión difusa microscópica producida por la deformación y tensión mecánica de axones durante la aceleración rotacional. Afecta característicamente la interfase sustancia gris-blanca, el cuerpo calloso y el tronco encefálico dorsolateral, generando desconexión funcional difusa.',
    unitId: 'unidad-2',
    relatedStructureId: 'cuerpo-calloso',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 8, 9, 10)'
  },
  {
    id: 'q-u2-3',
    question: 'Un paciente que ingresa al servicio de urgencias tras un TEC abre los ojos solo ante estímulos dolorosos (2 pts), emite sonidos incomprensibles como quejidos (2 pts) y localiza el dolor retirando la extremidad (4 pts). ¿Cuál es su puntaje en la Escala de Coma de Glasgow (GCS) y su gravedad clínica?',
    options: [
      'GCS = 11 (TEC moderado)',
      'GCS = 8 (TEC grave / severo)',
      'GCS = 14 (TEC leve)',
      'GCS = 5 (Coma arreactivo irreversible)'
    ],
    correctAnswerIndex: 1,
    explanation: 'Puntaje: Ocular = 2, Verbal = 2, Motor = 4. Total = 8 puntos. Un puntaje GCS ≤ 8 define por consenso internacional un TEC grave (coma), requiriendo habitualmente intubación orotraqueal y monitorización invasiva de presión intracraneana (PIC).',
    unitId: 'unidad-2',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 11-14: Glasgow Coma Scale)'
  },
  {
    id: 'q-u2-4',
    question: '¿Qué alteración neuropsicológica cardinal y de personalidad es característica de un paciente con contusión focal orbitofrontal bilateral secundaria a un TEC?',
    options: [
      'Afasia no fluente con pérdida de la comprensión gramatical',
      'Síndrome de desinhibición orbitofrontal: impulsividad, fallas en el juicio social, conducta jocosa inapropiada (moria) y dificultad en autorregulación emocional',
      'Ceguera cortical con anosognosia de la ceguera (Síndrome de Anton)',
      'Apraxia constructiva pura con preservación total de la conducta social'
    ],
    correctAnswerIndex: 1,
    explanation: 'La corteza orbitofrontal modula la inhibición conductual, el procesamiento de normas sociales y la evaluación del riesgo/recompensa. Su lesión contusiva genera el cuadro clásico de \'pseudopsicopatía\' o síndrome desinhibido, contrastando con el síndrome apático/pseudodepresivo del córtex dorsolateral.',
    unitId: 'unidad-2',
    relatedStructureId: 'lobulo-frontal-izquierdo',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 6, 7: Contusiones frontales)'
  },
  {
    id: 'q-u2-5',
    question: 'En la evaluación pronóstica del TEC, ¿qué indicador clínico ha demostrado ser el correlato más potente de la recuperación funcional a largo plazo y la gravedad del daño encefálico difuso?',
    options: [
      'La duración de la cefalea postraumática aguda en las primeras 24 horas',
      'La duración de la Amnesia Postraumática (APT), medida como el tiempo transcurrido hasta que el paciente recupera el registro continuo y ordenado de recuerdos día a día',
      'El número de fracturas lineales observadas en la calota en la radiografía simple',
      'La presencia de acúfenos unilaterales transitorios'
    ],
    correctAnswerIndex: 1,
    explanation: 'La duración de la Amnesia Postraumática (APT / PTA) es el mejor predictor neuropsicológico de la severidad del daño difuso: una APT mayor a 28 días indica un traumatismo encefálico extremadamente grave con secuelas cognitivas y funcionales permanentes.',
    unitId: 'unidad-2',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 15-18)'
  },

  // ==========================================
  // UNIDAD 3: ACCIDENTES CEREBROVASCULARES (ACV)
  // ==========================================
  {
    id: 'q-u3-1',
    question: 'En un paciente que ha sufrido un ACV isquémico con oclusión en el tronco principal de la Arteria Cerebral Media (ACM) Izquierda, ¿cuál de las siguientes combinaciones de déficits es más probable encontrar?',
    options: [
      'Heminegligencia espacial izquierda, anosognosia y aprosodia afectiva',
      'Afasia global o mixta (Broca y Wernicke), apraxia ideomotora, acalculia, hemiparesia faciobraquial derecha y depresión reactiva frecuente',
      'Hemianopsia homónima bilateral, prosopagnosia aislada y alexia con agrafia',
      'Acinesia profunda, mutismo acinético e incontinencia de esfínteres sin déficit del lenguaje'
    ],
    correctAnswerIndex: 1,
    explanation: 'El tronco de la ACM izquierda irriga las áreas perisilvianas del hemisferio dominante (Broca en F3, Wernicke en T1, corteza motora faciobraquial y giro angular/supramarginal). Su oclusión genera afasias severas, apraxias, déficit sensorimotor hemicorporal derecho y acalculia.',
    unitId: 'unidad-3',
    relatedStructureId: 'lobulo-frontal-izquierdo',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 50: Left MCA stem)'
  },
  {
    id: 'q-u3-2',
    question: 'En contraste con el hemisferio izquierdo, ¿qué síndrome neuropsicológico cardinal caracteriza a los infartos extensos en el territorio de la Arteria Cerebral Media (ACM) Derecha?',
    options: [
      'Afasia transcortical motora y apraxia bucofonatoria pura',
      'Síndrome de Heminegligencia Espacial Izquierda con Anosognosia (falta de conciencia del déficit), aprosodia afectiva y asomatognosia',
      'Mutismo acinético con pérdida total del impulso verbal',
      'Amnesia anterógrada pura para material verbal con preservación visuoespacial'
    ],
    correctAnswerIndex: 1,
    explanation: 'La ACM derecha irriga la corteza temporoparietal y frontal derecha, especializada en la orientación atencional espacial y el esquema corporal. Su infarto genera desatención masiva del hemiespacio y hemicuerpo izquierdo, anosognosia (desconocimiento de su hemiplejía) y aplanamiento prosódico.',
    unitId: 'unidad-3',
    relatedStructureId: 'lobulo-parietal-derecho',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 53: Right MCA)'
  },
  {
    id: 'q-u3-3',
    question: '¿Qué manifestaciones neuropsicológicas y conductuales son típicas de un infarto en el territorio de la Arteria Cerebral Anterior (ACA)?',
    options: [
      'Afasia fluente de Wernicke con jergafasia incomprensible',
      'Acinesia, mutismo acinético, abulia profunda (apatía severa y falta de iniciativa motora/verbal) y paresia de predominio crural (pierna contralateral)',
      'Prosopagnosia, acromatopsia y ceguera al movimiento (acinetopsia)',
      'Corea generalizada, distonía focal y temblor cerebeloso'
    ],
    correctAnswerIndex: 1,
    explanation: 'La ACA irriga la cara medial del lóbulo frontal (área motora suplementaria y corteza cingulada anterior) y la porción medial del homúnculo motor (representación de la extremidad inferior). La desconexión motivacional medial causa mutismo acinético y abulia.',
    unitId: 'unidad-3',
    relatedStructureId: 'lobulo-frontal-izquierdo',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 49: Left ACA)'
  },
  {
    id: 'q-u3-4',
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
    id: 'q-u3-5',
    question: 'En el Polígono de Willis, ¿cuál es la función de las arterias comunicantes anterior y posteriores en la hemodinámica cerebral?',
    options: [
      'Secretar factor de crecimiento endotelial vascular hacia los ventrículos',
      'Proporcionar vías anastomóticas colaterales que permiten compensar el flujo sanguíneo si se ocluye una de las arterias carótidas internas o el sistema vértebro-basilar',
      'Drenar directamente la sangre desoxigenada hacia el seno sagital superior',
      'Filtrar mecánicamente las proteínas de alto peso molecular del torrente sanguíneo'
    ],
    correctAnswerIndex: 1,
    explanation: 'El polígono de Willis es un anillo anastomótico en la base del cráneo que comunica la circulación anterior (carotídea) y posterior (basilar) mediante las comunicantes posteriores, y ambos hemisferios mediante la comunicante anterior, ofreciendo rutas colaterales de rescate ante estenosis.',
    unitId: 'unidad-3',
    sourceReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 39: Circle of Willis)'
  },

  // ==========================================
  // UNIDAD 4: INFECCIONES DEL SNC
  // ==========================================
  {
    id: 'q-u4-1',
    question: 'En un cuadro de Encefalitis por Virus Herpes Simple tipo 1 (VHS-1), ¿qué estructuras neuroanatómicas presentan un tropismo y vulnerabilidad selectiva necrótica?',
    options: [
      'Los núcleos del puente y el vermis cerebeloso inferior',
      'Las cortezas temporales mediales (hipocampo, amígdala, giro parahipocampal) y la corteza orbitofrontal/ínsula',
      'El cuerpo estriado y la sustancia negra exclusivamente',
      'La corteza occipital primaria y las radiaciones ópticas'
    ],
    correctAnswerIndex: 1,
    explanation: 'El VHS-1 muestra una predilección destructiva casi patognomónica por el sistema límbico temporal medial y la corteza frontobasal. La necrosis hemorrágica asimétrica de estas áreas genera cuadros agudos de amnesia profunda, desorientación, afasia y en ocasiones síndrome de Klüver-Bucy.',
    unitId: 'unidad-4',
    relatedStructureId: 'hipocampo',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Infecciones del SNC, Diapositivas 18-22)'
  },
  {
    id: 'q-u4-2',
    question: '¿Cuál es la diferencia fisiopatológica y de localización cardinal entre una Meningitis y una Encefalitis aguda?',
    options: [
      'La meningitis compromete el parénquima neuronal profundo, mientras que la encefalitis solo afecta los huesos del cráneo',
      'La meningitis es una inflamación de las membranas que envuelven el SNC (piamadre y aracnoides) en el espacio subaracnoideo, mientras que la encefalitis implica invasión inflamatoria directa del parénquima cerebral con alteración de funciones cerebrales superiores',
      'La meningitis no produce fiebre ni cefalea, a diferencia de la encefalitis',
      'La meningitis se cura siempre de forma espontánea en 48 horas sin tratamiento'
    ],
    correctAnswerIndex: 1,
    explanation: 'La meningitis se manifiesta clásicamente con síndrome meníngeo (cefalea, fotofobia, rigidez de nuca, signos de Kernig y Brudzinski) sin déficit focal temprano; la encefalitis presenta de forma precoz alteración de conciencia, confusión, crisis epilépticas y focalidad neuropsicológica por lesión parenquimatosa.',
    unitId: 'unidad-4',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Infecciones del SNC, Diapositivas 14-17)'
  },
  {
    id: 'q-u4-3',
    question: '¿Qué manifestaciones neuropsicológicas y de conducta caracterizan al Síndrome de Klüver-Bucy, descriptible tras encefalitis herpética bilateral destructiva?',
    options: [
      'Mutismo cataléptico, rechazo de alimentos y ceguera cortical completa',
      'Agnosia visual psíquica (no reconocen el significado de los objetos), hiperoralidad (tendencia a examinar todo con la boca), hipermetamorfosis, hipoemocionalidad/placidez extrema e hipersexualidad',
      'Corea de Huntington severa con alucinaciones gustativas',
      'Afasia no fluente con preservación de la lectura silenciosa'
    ],
    correctAnswerIndex: 1,
    explanation: 'El síndrome de Klüver-Bucy resulta de la ablación o necrosis bilateral de las porciones anteriores de los lóbulos temporales, afectando la amígdala y la corteza visual de orden superior. Los pacientes pierden el miedo natural (placidez) y exploran el mundo llevándose todo a la boca.',
    unitId: 'unidad-4',
    relatedStructureId: 'lobulo-temporal-izquierdo',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositivas 20-22)'
  },
  {
    id: 'q-u4-4',
    question: '¿Qué función cumple la Barrera Hematoencefálica (BHE) y cómo altera su permeabilidad en procesos infecciosos graves como un absceso cerebral?',
    options: [
      'Permite el paso irrestricto de todas las bacterias hacia el cerebro; en las infecciones se cierra por completo impidiendo el flujo de sangre',
      'Regula el intercambio estricto mediante uniones estrechas (tight junctions) endoteliales y pies astrocitarios; en la inflamación se rompe, causando edema vasogénico y aumento crítico de la presión intracraneana',
      'Es una capa de tejido óseo situada entre la duramadre y la aracnoides',
      'Solo existe en niños menores de 2 años y desaparece en la edad adulta'
    ],
    correctAnswerIndex: 1,
    explanation: 'La BHE protege el microambiente neural. Los mediadores inflamatorios en infecciones bacterianas y abscesos degradan las uniones estrechas del endotelio cerebral, permitiendo la extravasación de proteínas plasmáticas y agua, desencadenando edema cerebral vasogénico con riesgo de herniación.',
    unitId: 'unidad-4',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositivas 15, 23)'
  },
  {
    id: 'q-u4-5',
    question: 'En un paciente con sospecha de meningitis bacteriana aguda que presenta rigidez de nuca y fiebre alta, ¿qué prueba paraclínica es urgente para determinar el agente etiológico y guiar la antibioticoterapia?',
    options: [
      'Ecocardiograma transesofágico ambulatorio',
      'Punción lumbar para estudio citoquímico, tinción de Gram y cultivo de Líquido Cefalorraquídeo (LCR)',
      'Espirometría forzada en decúbito supino',
      'Audiometría tonal de alta frecuencia'
    ],
    correctAnswerIndex: 1,
    explanation: 'La punción lumbar permite analizar la presión de apertura, el recuento de leucocitos polimorfonucleares (pleocitosis), el consumo de glucosa (hipoglucorraquia) y el aumento proteico (hiperproteinorraquia), así como la visualización directa del germen por tinción de Gram.',
    unitId: 'unidad-4',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositiva 16)'
  },

  // ==========================================
  // UNIDAD 5: DEMENCIAS Y PATOLOGÍAS NEURODEGENERATIVAS
  // ==========================================
  {
    id: 'q-u5-1',
    question: '¿Cuáles son los dos sellos histopatológicos cardinales que definen a la Enfermedad de Alzheimer a nivel neuropatológico?',
    options: [
      'Inclusiones de cuerpos de Lewy intracitoplasmáticos y desmielinización de cordones posteriores',
      'Placas seniles extracelulares compuestas por péptido Beta-Amiloide (Aβ42) y Ovillos Neurofibrilares intraneuronales de proteína Tau hiperfosforilada',
      'Espongiosis cortical masiva por priones insolubles y atrofia cerebelosa',
      'Depósitos de hemosiderina subaracnoidea e hipertrofia astrocítica pura'
    ],
    correctAnswerIndex: 1,
    explanation: 'La neuropatología de la Enfermedad de Alzheimer descrita en clase (Diapositiva 23) se define por la cascada amiloide: acumulación extracelular de placas de amiloide-β y desintegración del citoesqueleto microtubular por ovillos neurofibrilares de tau hiperfosforilada, iniciándose en la corteza entorrinal e hipocampo.',
    unitId: 'unidad-5',
    relatedStructureId: 'hipocampo',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositiva 23: Amyloid & Tau)'
  },
  {
    id: 'q-u5-2',
    question: '¿Qué rasgo clínico y de neuroimagen permite diferenciar con mayor certeza la Degeneración Lobar Frontotemporal (DLFT, variante conductual) de la Enfermedad de Alzheimer (EA) en etapas iniciales?',
    options: [
      'La DLFT inicia con amnesia episódica anterógrada severa y atrofia hipocampal precoz',
      'La DLFT presenta cambios tempranos prominentes en la personalidad, desinhibición o conducta moral con atrofia frontal/temporal anterior, mientras que en la EA predomina el olvido episódico con atrofia entorrinal e hipocampal',
      'La DLFT siempre presenta parkinsonismo simétrico y alucinaciones visuales tempranas',
      'La EA cursa con deterioro súbito escalonado y signos neurológicos focales espásticos'
    ],
    correctAnswerIndex: 1,
    explanation: 'Según la Tabla 2 de la clase, la clínica inicial de la DLFT se caracteriza por cambios en el comportamiento, la personalidad y el lenguaje (desinhibición, apatía, hiperoralidad, pérdida de empatía), con atrofia lobar anterior circunscrita. La EA, en cambio, debuta con pérdida de memoria episódica reciente y atrofia hipocampal.',
    unitId: 'unidad-5',
    relatedStructureId: 'hipocampo',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositiva 33: Tabla 2)'
  },
  {
    id: 'q-u5-3',
    question: '¿Qué tríada clínica distingue característicamente a la Demencia por Cuerpos de Lewy (DL)?',
    options: [
      'Amnesia retrógrada aislada, hiperfagia y crisis convulsivas focales',
      'Alucinaciones visuales vívidas y complejas, fluctuaciones notables en la atención/conciencia a lo largo del día y parkinsonismo motor espontáneo no farmacológico',
      'Pérdida rápida de la palabra, mutismo acinético y atrofia cerebelosa pura',
      'Marcha magnética, cefalea matutina y anosmia'
    ],
    correctAnswerIndex: 1,
    explanation: 'La Demencia por Cuerpos de Lewy (DL) se identifica por la coexistencia de alucinaciones visuales bien estructuradas (personas, animales), fluctuaciones cognitivas marcadas de un día a otro, y parkinsonismo espontáneo no farmacológico (con gran hipersensibilidad a los neurolépticos).',
    unitId: 'unidad-5',
    relatedStructureId: 'ganglios-de-la-base',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositivas 31, 33: Tabla 2)'
  },
  {
    id: 'q-u5-4',
    question: 'Un paciente de 72 años consulta por marcha a pequeños pasos "como pegada al suelo" (marcha magnética), incontinencia urinaria involuntaria y lentitud cognitiva disejecutiva. En la neuroimagen se observa marcada dilatación de los ventrículos cerebrales sin atrofia cortical proporcional. ¿Cuál es la sospecha diagnóstica?',
    options: [
      'Enfermedad de Alzheimer en etapa terminal',
      'Demencia por Cuerpos de Lewy',
      'Hidrocefalia Normotensiva (Síndrome de Hakim-Adams)',
      'Degeneración Lobar Frontotemporal variante conductual'
    ],
    correctAnswerIndex: 2,
    explanation: 'La tríada clásica de Hakim-Adams está compuesta por: apraxia de la marcha ("marcha magnética"), incontinencia de esfínteres y deterioro cognitivo subcortical, acompañada en neuroimagen de ventriculomegalia desproporcionada. Es una de las causas potencialmente reversibles mediante derivación ventrículo-peritoneal.',
    unitId: 'unidad-5',
    relatedStructureId: 'hipocampo',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositiva 33: Tabla 2)'
  },
  {
    id: 'q-u5-5',
    question: '¿Cuál es el patrón clínico y temporal típico que orienta hacia una Demencia Vascular (DV) por enfermedad de pequeños vasos / infartos lacunares múltiples en comparación con las demencias neurodegenerativas primarias?',
    options: [
      'Inicio insidioso e imperceptible a lo largo de 10 años sin ningún factor de riesgo cardiovascular',
      'Curso clínico escalonado o fluctuante ("en peldaños"), estrechamente ligado a antecedentes de hipertensión o diabetes, con enlentecimiento del procesamiento psicomotor y disfunción ejecutiva subcortical temprana',
      'Pérdida exclusiva de memoria semántica con preservación intacta de la velocidad de marcha',
      'Demencia de instalación fulminante en 4 semanas con mioclonías generalizadas'
    ],
    correctAnswerIndex: 1,
    explanation: 'La Demencia Vascular se caracteriza típicamente por un curso escalonado (deterioros bruscos seguidos de mesetas de estabilidad relativa o fluctuaciones), presencia de lesiones isquémicas en neuroimagen (leucoaraiosis, infartos lacunares) y predominio de un perfil cognitivo disejecutivo-subcortical.',
    unitId: 'unidad-5',
    relatedStructureId: 'ganglios-de-la-base',
    sourceReference: 'Demencias y otras patologías 2022.pdf (Diapositivas 27, 33: Tabla 2)'
  }
];
