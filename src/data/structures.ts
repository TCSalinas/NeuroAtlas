import { AnatomicalStructure } from '../types/neuro';

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  // ================= CORTICAL LOBES & REGIONS =================
  {
    id: 'lobulo-frontal-izquierdo',
    name: 'Lóbulo Frontal Izquierdo',
    latinName: 'Lobus frontalis sinister',
    synonyms: ['Corteza frontal izquierda', 'Hemisferio frontal dominante'],
    level: 'telencefalo_corteza',
    lobe: 'frontal',
    hemisphere: 'izquierdo',
    brodmannAreas: [4, 6, 8, 9, 10, 11, 44, 45, 46, 47],
    hierarchy: 'asociacion_heteromodal',
    vascularTerritory: 'acm_izq',
    color: '#ef4444', // Red
    isDeepStructure: false,
    meshPosition: [-0.9, 0.45, 0.8],
    meshScale: [1.1, 0.95, 1.3],
    meshType: 'complex',
    overview: 'Estructura encefálica anterior más desarrollada filogenéticamente. En el hemisferio izquierdo alberga los centros motores del lenguaje (Broca), la programación ejecutiva, el control atencional y la autorregulación.',
    anatomicalLocation: 'Porción anterior de la cavidad craneal, delimitado posteriormente por la cisura central (de Rolando) e inferiormente por la cisura lateral (de Silvio).',
    organizationAndSubdivisions: [
      'Corteza Motora Primaria (M1 / Giro precentral)',
      'Corteza Premotora y Área Motora Suplementaria (SMA)',
      'Área de Broca (Pars opercularis BA44 y pars triangularis BA45)',
      'Corteza Prefrontal Dorsolateral (DLPFC)',
      'Corteza Prefrontal Ventrolateral y Orbitofrontal',
      'Campos Oculares Frontales (FEF BA8)'
    ],
    primaryFunctions: [
      'Producción y articulación motora del lenguaje verbal',
      'Control de funciones ejecutivas (memoria de trabajo, monitorización, inhibición y cambio de set)',
      'Ejecución de movimientos voluntarios contralaterales',
      'Regulación conductual y secuenciación de acciones intencionadas'
    ],
    associatedCognitiveProcesses: [
      'Memoria de trabajo verbal y bucle fonológico',
      'Razonamiento lógico-formal y formulación de metas',
      'Habla interna y planificación sintáctica',
      'Iniciativa conductual y fluidez fonológica'
    ],
    neuralCircuitsAndConnections: [
      'Fascículo arqueado y longitudinal superior (conexión con Wernicke y parietal posterior)',
      'Bucle cortico-estriado-pálido-talámico-cortical (circuito motor y ejecutivo)',
      'Fascículo uncinado (conexión con polo temporal y amígdala)',
      'Proyecciones del haz corticoespinal y corticobulbar (vía piramidal)'
    ],
    clinicalCorrelates: [
      {
        title: 'Afasia de Broca (ACV ACM Izquierda)',
        syndrome: 'Afasia motora no fluente con agramatismo',
        symptoms: ['Habla telegráfica y esforzada', 'Articulación lenta y disártrica', 'Comprensión auditiva relativamente preservada', 'Frustración y reacción depresiva catastrófica'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 48, 50)'
      },
      {
        title: 'Síndrome Disejecutivo Dorsolateral',
        syndrome: 'Deterioro de funciones ejecutivas frías',
        symptoms: ['Rigidez cognitiva y perseveración', 'Fallo en pruebas de clasificación (WCST)', 'Pérdida de iniciativa espontánea y memoria de trabajo'],
        courseUnitReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 31)'
      }
    ],
    sources: [
      {
        documentTitle: 'NEUROPATOLOGIA TEC Y ACV 2022',
        fileReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf',
        slideOrPage: 'Diapositiva 50: Left MCA stem',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Déficits de Language impairments, apraxias, acalculia, deficits de memoria, pensamiento concreto, rigidez cognitiva, deficits memoria trabajo, habla interna, depression.'
      },
      {
        documentTitle: 'Apuntes Neuroanatomía UFRO',
        fileReference: 'https://neuroanatomia.ufro.cl/configuracion-externa-de-cerebro/',
        slideOrPage: 'Capítulo 8: Configuración externa de cerebro',
        type: 'fuente_complementaria',
        directQuoteOrSummary: 'El lóbulo frontal presenta los giros frontal superior, medio, inferior y el giro precentral, delimitado por el surco central.'
      }
    ]
  },
  {
    id: 'lobulo-frontal-derecho',
    name: 'Lóbulo Frontal Derecho',
    latinName: 'Lobus frontalis dexter',
    synonyms: ['Corteza frontal derecha', 'Córtex frontal no dominante'],
    level: 'telencefalo_corteza',
    lobe: 'frontal',
    hemisphere: 'derecho',
    brodmannAreas: [4, 6, 8, 9, 10, 11, 44, 45, 46, 47],
    hierarchy: 'asociacion_heteromodal',
    vascularTerritory: 'acm_der',
    color: '#f97316', // Orange
    isDeepStructure: false,
    meshPosition: [0.9, 0.45, 0.8],
    meshScale: [1.1, 0.95, 1.3],
    meshType: 'complex',
    overview: 'Lóbulo anterior del hemisferio derecho, fundamental en la modulación pragmática y prosódica del lenguaje, la empatía, el monitoreo atencional sostenido y la regulación de la afectividad.',
    anatomicalLocation: 'Porción anterior derecha del neurocráneo.',
    organizationAndSubdivisions: [
      'Corteza Motora Primaria derecha',
      'Corteza Prefrontal Ventrolateral y Dorsolateral derecha',
      'Corteza Orbitofrontal derecha (juicio social)',
      'Áreas homólogas a Broca (prosodia y entonación)'
    ],
    primaryFunctions: [
      'Expresión y modulación prosódica emocional del habla (entonación y tono afectivo)',
      'Atención sostenida y vigilancia atencional continua',
      'Inhibición de impulsos y cognición social (Teoría de la Mente)',
      'Toma de decisiones basadas en riesgo y recompensa'
    ],
    associatedCognitiveProcesses: [
      'Procesamiento pragmático (ironía, chistes, metáforas)',
      'Regulación conductual socioemocional y empatía',
      'Flexibilidad afectiva y control de impulsividad'
    ],
    neuralCircuitsAndConnections: [
      'Conexiones recíprocas con amígdala y corteza insular derecha',
      'Conexión frontoparietal derecha (red atencional dorsal y ventral)',
      'Vía corticoestriatal fronto-basal derecha (inhibición motora)'
    ],
    clinicalCorrelates: [
      {
        title: 'Aprosodia Expresiva y Cambios de Conducta (ACV ACM Derecha)',
        syndrome: 'Síndrome frontal no dominante / frontoorbitario',
        symptoms: ['Disprosodia o pérdida de entonación emocional al hablar', 'Conducta desinhibida o heboide (chistosa, pueril)', 'Hipomanía o euforia superficial', 'Falta de tacto social y empatía'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 52, 53)'
      }
    ],
    sources: [
      {
        documentTitle: 'NEUROPATOLOGIA TEC Y ACV 2022',
        fileReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf',
        slideOrPage: 'Diapositiva 52 y 53: Right MCA',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Conductas frontales: apatia, dependencia ambiental, humor heboide, hipomania... deficits pragmaticos de lenguaje, cambios animicos.'
      }
    ]
  },
  {
    id: 'lobulo-parietal-izquierdo',
    name: 'Lóbulo Parietal Izquierdo',
    latinName: 'Lobus parietalis sinister',
    synonyms: ['Corteza parietal dominante'],
    level: 'telencefalo_corteza',
    lobe: 'parietal',
    hemisphere: 'izquierdo',
    brodmannAreas: [1, 2, 3, 5, 7, 39, 40],
    hierarchy: 'asociacion_heteromodal',
    vascularTerritory: 'acm_izq',
    color: '#3b82f6', // Blue
    isDeepStructure: false,
    meshPosition: [-0.95, 0.7, -0.4],
    meshScale: [1.05, 0.9, 1.1],
    meshType: 'complex',
    overview: 'Centro superior de integración somatosensorial, procesamiento simbólico multimodal, cálculo matemático, lectoescritura y praxias motoras.',
    anatomicalLocation: 'Situado detrás de la cisura central de Rolando y sobre la cisura de Silvio; limitado posteriormente por la cisura parietooccipital.',
    organizationAndSubdivisions: [
      'Giro Postcentral (Corteza Somatosensorial Primaria S1 / BA1-3)',
      'Lóbulo Parietal Superior (BA5 y BA7 / Integración somatosensorial)',
      'Lóbulo Parietal Inferior: Giro Supramarginal (BA40)',
      'Lóbulo Parietal Inferior: Giro Angular (BA39 / Placa giratoria multimodal)'
    ],
    primaryFunctions: [
      'Procesamiento somatosensorial consciente táctil y propioceptivo',
      'Praxias: programación y conocimiento del uso de objetos y gestos (praxis ideomotora e ideatoria)',
      'Cálculo aritmético formal y manipulación numérica espacial',
      'Lectoescritura e integración grafema-fonema'
    ],
    associatedCognitiveProcesses: [
      'Cálculo mental y procesamiento cuantitativo',
      'Esquema corporal y somatognosia digital',
      'Orientación espacial y discriminación derecha-izquierda'
    ],
    neuralCircuitsAndConnections: [
      'Fascículo longitudinal superior (conexión con corteza premotora para praxias)',
      'Aferencias talámicas somestésicas del núcleo ventral posterolateral (VPL)',
      'Conexiones con corteza temporal posterior y corteza occipital'
    ],
    clinicalCorrelates: [
      {
        title: 'Síndrome de Gerstmann (Lesión en Giro Angular Izquierdo BA39)',
        syndrome: 'Tetráda clásica de déficit parietal multimodal',
        symptoms: ['Acalculia (incapacidad para realizar operaciones matemáticas)', 'Agrafia (incapacidad para escribir conservando lectura parcial)', 'Agnosia digital (incapacidad para nombrar o reconocer los dedos de la mano)', 'Desorientación derecha-izquierda'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 50)'
      },
      {
        title: 'Apraxia Ideomotora e Ideatoria',
        syndrome: 'Desconexión parieto-frontal izquierda',
        symptoms: ['Incapacidad para gesticular o imitar el uso de herramientas a la orden verbal (p. ej. usar martillo)', 'Uso del cuerpo como objeto'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 50)'
      }
    ],
    sources: [
      {
        documentTitle: 'NEUROPATOLOGIA TEC Y ACV 2022',
        fileReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf',
        slideOrPage: 'Diapositiva 50: Left MCA stem',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Deficits: apraxias, acalculia, deficits de memoria, pensamiento concreto.'
      }
    ]
  },
  {
    id: 'lobulo-parietal-derecho',
    name: 'Lóbulo Parietal Derecho',
    latinName: 'Lobus parietalis dexter',
    synonyms: ['Corteza parietal no dominante', 'Nodo visuoespacial hemisférico'],
    level: 'telencefalo_corteza',
    lobe: 'parietal',
    hemisphere: 'derecho',
    brodmannAreas: [1, 2, 3, 5, 7, 39, 40],
    hierarchy: 'asociacion_heteromodal',
    vascularTerritory: 'acm_der',
    color: '#06b6d4', // Cyan
    isDeepStructure: false,
    meshPosition: [0.95, 0.7, -0.4],
    meshScale: [1.05, 0.9, 1.1],
    meshType: 'complex',
    overview: 'Estructura cardinal de la red atencional visuoespacial y del esquema corporal global. Su lesión genera el cuadro neuropsicológico más dramático de desconexión atencional: la heminegligencia espacial izquierda.',
    anatomicalLocation: 'Lóbulo parietal posterosuperior derecho.',
    organizationAndSubdivisions: [
      'Corteza somatosensorial primaria derecha (S1)',
      'Lóbulo parietal superior derecho (mapeo espacial tridimensional)',
      'Unión temporoparietal derecha (TPJ / nodo de atención exógena)'
    ],
    primaryFunctions: [
      'Orientación atencional hacia el espacio extrapersonal izquierdo y derecho',
      'Habilidades visoconstructivas (dibujo, ensamblaje, copia de cubos)',
      'Conciencia del propio hemicuerpo y estado neurológico (anosognosia)',
      'Praxis del vestir y navegación topográfica en el entorno'
    ],
    associatedCognitiveProcesses: [
      'Atención espacial distribuida y focalizada',
      'Transformaciones espaciales mentales (rotación mental)',
      'Integración multisensorial visuo-propioceptiva'
    ],
    neuralCircuitsAndConnections: [
      'Red atencional fronto-parietal dorsal (SLF I y II)',
      'Red de saliencia y cambio de foco atencional (SLF III)',
      'Conexión con colículos superiores y núcleo pulvinar del tálamo'
    ],
    clinicalCorrelates: [
      {
        title: 'Síndrome de Heminegligencia Espacial Unilateral Izquierda',
        syndrome: 'Negligencia hemiespacial y hemi-inatención (ACV ACM Derecha)',
        symptoms: ['Omisión completa de estímulos en el hemiespacio izquierdo', 'Dificultad para vestir el lado izquierdo (apraxia del vestir)', 'Al dibujar un reloj o casa omiten la mitad izquierda', 'Desviación cefálica y de la mirada hacia la derecha'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 53)'
      },
      {
        title: 'Anosognosia y Asomatognosia',
        syndrome: 'Pérdida de conciencia del déficit motor',
        symptoms: ['El paciente niega rotundamente su hemiplejía izquierda', 'Niega que su extremidad izquierda le pertenezca', 'Anosodiaforia (indiferencia afectiva ante la parálisis)'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 53)'
      }
    ],
    sources: [
      {
        documentTitle: 'NEUROPATOLOGIA TEC Y ACV 2022',
        fileReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf',
        slideOrPage: 'Diapositiva 53: Right MCA',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Hemi-negligencia, hemi-inatencion, deficits visoconstructivos, apraxia motora, deficits de memoria, anosognosia.'
      }
    ]
  },
  {
    id: 'lobulo-temporal-izquierdo',
    name: 'Lóbulo Temporal Izquierdo',
    latinName: 'Lobus temporalis sinister',
    synonyms: ['Corteza temporal izquierda', 'Lóbulo del lenguaje comprensivo'],
    level: 'telencefalo_corteza',
    lobe: 'temporal',
    hemisphere: 'izquierdo',
    brodmannAreas: [41, 42, 22, 21, 20, 38],
    hierarchy: 'asociacion_heteromodal',
    vascularTerritory: 'acm_izq',
    color: '#8b5cf6', // Purple
    isDeepStructure: false,
    meshPosition: [-1.05, -0.2, 0.1],
    meshScale: [0.95, 0.85, 1.3],
    meshType: 'complex',
    overview: 'Lóbulo lateral inferior implicado de forma decisiva en la audición, decodificación fonológica, comprensión del lenguaje oral (Wernicke), memoria semántica conceptual y memoria verbal episódica en su cara medial.',
    anatomicalLocation: 'Fosa craneal media izquierda, por debajo de la cisura lateral de Silvio.',
    organizationAndSubdivisions: [
      'Giro temporal transverso de Heschl (A1 / BA41-42)',
      'Área de Wernicke (Giro temporal superior posterior BA22)',
      'Giro temporal medio e inferior (procesamiento léxico-semántico BA21/20)',
      'Polo temporal izquierdo (BA38 / almacén semántico conceptual)',
      'Superficie inferomedial: hipocampo y giro parahipocámpico'
    ],
    primaryFunctions: [
      'Decodificación fonológica y comprensión del lenguaje hablado',
      'Acceso al léxico mental y denominación de objetos (memoria semántica)',
      'Recepción y análisis auditivo tonotópico',
      'Consolidación de memoria declarativa verbal (cara medial)'
    ],
    associatedCognitiveProcesses: [
      'Comprensión verbal oral y escrita',
      'Almacén conceptual semántico del mundo',
      'Recuperación de palabras (evocación léxica)'
    ],
    neuralCircuitsAndConnections: [
      'Fascículo arqueado hacia corteza frontal de Broca',
      'Fascículo longitudinal inferior (ILF hacia corteza occipital visual)',
      'Conexión hipocampal vía corteza entorrinal'
    ],
    clinicalCorrelates: [
      {
        title: 'Afasia de Wernicke (ACV ACM Izquierda)',
        syndrome: 'Afasia sensitiva o fluente',
        symptoms: ['Habla fluente pero vacía de contenido o jergafasia', 'Severa alteración de la comprensión auditiva', 'Parafasias fonémicas y semánticas', 'Anosognosia frecuente respecto al propio déficit lingüístico'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 50)'
      },
      {
        title: 'Demencia Semántica (DLFT Variante Temporal)',
        syndrome: 'Degeneración lobar frontotemporal semántica (sdPPA)',
        symptoms: ['Atrofia circunscrita del polo temporal anterior izquierdo', 'Pérdida progresiva del significado de palabras y conceptos', 'Anomia severa con habla fluente y gramaticalmente correcta'],
        courseUnitReference: 'Demencias y otras patologías 2022 (Diapositiva 28)'
      }
    ],
    sources: [
      {
        documentTitle: 'Demencias y otras patologías 2022',
        fileReference: 'nauropatologia Ev Neuropsicologica 2020 Demencia y otros.pdf',
        slideOrPage: 'Diapositiva 28: DLFT Demencia Semántica',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'DEMENCIA SEMÁNTICA: ATROFIA LÓBULO TEMPORAL (MEMORIA SEMÁNTICA, ENCONTRAR PALABRAS Y LENGUAJE COMPRENSIVO).'
      }
    ]
  },
  {
    id: 'lobulo-temporal-derecho',
    name: 'Lóbulo Temporal Derecho',
    latinName: 'Lobus temporalis dexter',
    synonyms: ['Corteza temporal derecha'],
    level: 'telencefalo_corteza',
    lobe: 'temporal',
    hemisphere: 'derecho',
    brodmannAreas: [41, 42, 22, 21, 20, 38],
    hierarchy: 'asociacion_heteromodal',
    vascularTerritory: 'acm_der',
    color: '#a855f7', // Violet
    isDeepStructure: false,
    meshPosition: [1.05, -0.2, 0.1],
    meshScale: [0.95, 0.85, 1.3],
    meshType: 'complex',
    overview: 'Lóbulo especializado en el reconocimiento auditivo no verbal (música, timbres, sonidos ambientales), percepción de la prosodia emocional y memoria visual/no verbal.',
    anatomicalLocation: 'Fosa craneal media derecha.',
    organizationAndSubdivisions: [
      'Corteza auditiva primaria y secundaria derecha',
      'Polo temporal derecho (cognición socioemocional y empatía)',
      'Giro fusiforme derecho (área de caras FFA en unión occipitotemporal)'
    ],
    primaryFunctions: [
      'Procesamiento musical (tonos, melodía, ritmo) y amusia tras lesión',
      'Identificación de voces y entonación prosódica emocional',
      'Reconocimiento visual de identidades faciales (con giro fusiforme)',
      'Memoria visual para patrones, rutas y configuraciones espaciales'
    ],
    associatedCognitiveProcesses: [
      'Discriminación tímbrica y melodía musical',
      'Percepción de prosodia afectiva receptiva',
      'Memoria de rostros y objetos complejos'
    ],
    neuralCircuitsAndConnections: [
      'Vía visual ventral (corriente "¿qué es?")',
      'Conexión temporolímbica con amígdala derecha'
    ],
    clinicalCorrelates: [
      {
        title: 'Aprosodia Receptiva y Amusia',
        syndrome: 'Déficit auditivo no verbal',
        symptoms: ['Incapacidad para interpretar el tono emocional del interlocutor (alegría, enfado, tristeza)', 'Amusia (incapacidad para reconocer melodías conocidas)'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 53, 54)'
      }
    ],
    sources: [
      {
        documentTitle: 'NEUROPATOLOGIA TEC Y ACV 2022',
        fileReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf',
        slideOrPage: 'Diapositivas 53 y 54: Right MCA & PCA',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Aprosodia receptiva, cambios animicos [ansiedad y depresion], agnosias visuales.'
      }
    ]
  },
  {
    id: 'lobulo-occipital',
    name: 'Lóbulo Occipital',
    latinName: 'Lobus occipitalis',
    synonyms: ['Corteza visual', 'Polo occipital'],
    level: 'telencefalo_corteza',
    lobe: 'occipital',
    hemisphere: 'bilateral',
    brodmannAreas: [17, 18, 19],
    hierarchy: 'primaria_sensoriomotora',
    vascularTerritory: 'acp',
    color: '#10b981', // Emerald
    isDeepStructure: false,
    meshPosition: [0, 0.35, -1.3],
    meshScale: [1.8, 1.1, 1.1],
    meshType: 'complex',
    overview: 'Polo posterior del cerebro humano dedicado íntegramente al procesamiento de la información visual. Alberga la corteza estriada (V1) y las áreas extraestriadas de asociación.',
    anatomicalLocation: 'Polo posterior del cráneo sobre la tienda del cerebelo (tentorio).',
    organizationAndSubdivisions: [
      'Corteza Visual Primaria (V1 / BA17 / Corteza Estriada con estría de Gennari)',
      'Corteza Visual Secundaria (V2 / BA18)',
      'Áreas de Asociación Extraestriadas: V3, V4 (color) y V5/MT (movimiento / BA19)'
    ],
    primaryFunctions: [
      'Recepción de aferencias visuales retinianas vía nervio óptico y radiaciones ópticas',
      'Mapeo retinotópico de campos visuales contralaterales',
      'Segregación en dos vías funcionales: corriente dorsal (visión para la acción hacia parietal) y corriente ventral (reconocimiento visual hacia temporal)'
    ],
    associatedCognitiveProcesses: [
      'Percepción de bordes, contraste, color y movimiento',
      'Lectura visual primaria y reconocimiento de patrones'
    ],
    neuralCircuitsAndConnections: [
      'Radiaciones ópticas de Gratiolet desde el Núcleo Geniculado Lateral (NGL) talámico',
      'Comisura esplenial del cuerpo calloso (interconexión interhemisférica visual)'
    ],
    clinicalCorrelates: [
      {
        title: 'Hemianopsia Homónima y Ceguera Cortical (ACV ACP)',
        syndrome: 'Déficit visual campimétrico',
        symptoms: ['Pérdida de la mitad del campo visual contralateral en ambos ojos', 'Ceguera cortical si el daño es bilateral'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 51, 54)'
      },
      {
        title: 'Alexia sin Agrafia (Síndrome de Déjerine)',
        syndrome: 'Desconexión occipitocallosa',
        symptoms: ['Incapacidad para leer palabras impresas (alexia)', 'Capacidad de escribir al dictado o espontáneamente preservada (sin agrafia)', 'Causada por infarto occipital izquierdo + esplenio del cuerpo calloso'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 51)'
      }
    ],
    sources: [
      {
        documentTitle: 'NEUROPATOLOGIA TEC Y ACV 2022',
        fileReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf',
        slideOrPage: 'Diapositiva 51 y 54: PCA',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Deficits visuales, alexia sin agrafia, afasia transcortical, amnesia.'
      },
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositiva 27: Citoarquitectura en Área 17',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'AREA 17: Columnas corticales y seis capas principales en V1, primera área de proyección visual.'
      }
    ]
  },

  // ================= SUBCORTICAL & LIMBIC STRUCTURES =================
  {
    id: 'hipocampo',
    name: 'Hipocampo y Corteza Entorrinal',
    latinName: 'Hippocampus et cortex entorhinalis',
    synonyms: ['Formación hipocampal', 'Cuerno de Amón', 'Giro dentado'],
    level: 'telencefalo_subcortical',
    lobe: 'subcortical',
    hemisphere: 'bilateral',
    brodmannAreas: [28, 34],
    hierarchy: 'limbica',
    vascularTerritory: 'acp',
    color: '#14b8a6', // Teal
    isDeepStructure: true,
    meshPosition: [0, -0.2, -0.1],
    meshScale: [1.3, 0.4, 0.7],
    meshType: 'complex',
    overview: 'Estructura arquicortical curvada en el lóbulo temporal medial. Es la máquina biológica esencial para la consolidación de nueva memoria declarativa (episódica y semántica) y la navegación espacial.',
    anatomicalLocation: 'Suelo del asta temporal del ventrículo lateral en la porción medial del lóbulo temporal.',
    organizationAndSubdivisions: [
      'Giro Dentado (neurogénesis adulta)',
      'Cuerno de Amón (Campos CA1, CA2, CA3, CA4)',
      'Subículo (estación de salida eferente)',
      'Corteza Entorrinal (puerta de entrada bidireccional cortical)'
    ],
    primaryFunctions: [
      'Consolidación y transferencia de memoria a corto plazo a largo plazo (corteza)',
      'Mapeo y orientación espacial (células de lugar y células de red)',
      'Regulación de respuestas de estrés y modulación del eje HPA'
    ],
    associatedCognitiveProcesses: [
      'Memoria episódica autobiográfica',
      'Aprendizaje de nuevas asociaciones arbitrarias',
      'Memoria topográfica y orientación'
    ],
    neuralCircuitsAndConnections: [
      'Circuito de Papez: Hipocampo -> Fórnix -> Cuerpos Mamilares -> Núcleo Anterior Tálamo -> Cíngulo -> Corteza Entorrinal -> Hipocampo',
      'Vía perforante desde corteza entorrinal a giro dentado'
    ],
    clinicalCorrelates: [
      {
        title: 'Atrofia en Enfermedad de Alzheimer',
        syndrome: 'Amnesia anterógrada episódica precoz',
        symptoms: ['Incapacidad para consolidar nueva información (amnesia anterógrada)', 'Desorientación temporoespacial precoz', 'Atrofia volumétrica visible en RMN coronal (escala de Scheltens MTA)'],
        courseUnitReference: 'Demencias y otras patologías 2022 (Diapositivas 23, 24, 33)'
      },
      {
        title: 'Necrosis en Encefalitis Herpética (VHS-1)',
        syndrome: 'Síndrome amnésico agudo y Klüver-Bucy',
        symptoms: ['Amnesia retrógrada y anterógrada severa de inicio fulminante', 'Cambios conductuales inflamatorios', 'Edema hiperintenso en T2 en lóbulo temporal medial'],
        courseUnitReference: 'Demencias y otras patologías 2022 (Diapositivas 9, 10, 11)'
      }
    ],
    sources: [
      {
        documentTitle: 'Demencias y otras patologías 2022',
        fileReference: 'nauropatologia Ev Neuropsicologica 2020 Demencia y otros.pdf',
        slideOrPage: 'Diapositiva 23: TNC-M Alzheimer y Diapositiva 33: Tabla 2',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'EA: Atrofia en cortex entorrinal e hipocampal con predominio de pérdida de memoria episódica.'
      },
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositiva 16: Telencéfalo - Sistema Límbico',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'FIGURE 2.26 The human limbic system: Hippocampus, Fornix, Entorhinal cortex, Mammillary body, Anterior thalamic nucleus.'
      }
    ]
  },
  {
    id: 'amigdala',
    name: 'Amígdala',
    latinName: 'Corpus amygdaloideum',
    synonyms: ['Complejo amigdalino', 'Núcleo amigdaloide'],
    level: 'telencefalo_subcortical',
    lobe: 'subcortical',
    hemisphere: 'bilateral',
    brodmannAreas: [34],
    hierarchy: 'limbica',
    vascularTerritory: 'acm_izq',
    color: '#e11d48', // Crimson
    isDeepStructure: true,
    meshPosition: [0, -0.3, 0.25],
    meshScale: [0.9, 0.45, 0.45],
    meshType: 'sphere',
    overview: 'Conjunto nuclear en forma de almendra situado en el polo anterior del lóbulo temporal. Es el epicentro cerebral para la detección de amenazas, el condicionamiento al miedo y la saliencia emocional de estímulos.',
    anatomicalLocation: 'Profunda en el lóbulo temporal anterior, rostral al hipocampo.',
    organizationAndSubdivisions: [
      'Núcleo basolateral (interfaz con corteza prefrontal y sensorial)',
      'Núcleo centromedial (eferencias hacia tronco encefálico e hipotálamo para respuestas fisiológicas)',
      'Núcleos corticales y mediales (olfato)'
    ],
    primaryFunctions: [
      'Condicionamiento clásico al miedo y respuesta de lucha o huida',
      'Detección automática de saliencia afectiva (especialmente rostros con expresión de miedo)',
      'Consolidación de recuerdos emocionalmente intensos mediante activación adrenérgica del hipocampo'
    ],
    associatedCognitiveProcesses: [
      'Procesamiento de amenaza y peligro',
      'Juicio de confiabilidad facial y empatía afectiva',
      'Respuesta emocional autónoma'
    ],
    neuralCircuitsAndConnections: [
      'Vía rápida directa tálamo-amígdala (vía subcortical "baja")',
      'Vía lenta tálamo-cortico-amígdala (análisis cortical refinado)',
      'Conexión recíproca con corteza orbitofrontal y cíngulo anterior'
    ],
    clinicalCorrelates: [
      {
        title: 'Compromiso en Encefalitis Herpética',
        syndrome: 'Alteraciones conductuales agudas y Síndrome de Klüver-Bucy',
        symptoms: ['Pérdida de la respuesta normal al miedo y peligro', 'Docilidad anormal y placidez', 'Hiperoralidad y desinhibición instintiva'],
        courseUnitReference: 'Demencias y otras patologías 2022 (Diapositivas 9, 11)'
      }
    ],
    sources: [
      {
        documentTitle: 'Demencias y otras patologías 2022',
        fileReference: 'nauropatologia Ev Neuropsicologica 2020 Demencia y otros.pdf',
        slideOrPage: 'Diapositiva 9: Encefalitis herpética',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Encefalitis herpética: Afecta lóbulo temporal, hipocampo y amígdala con amnesia y desregulación.'
      }
    ]
  },
  {
    id: 'talamo',
    name: 'Tálamo',
    latinName: 'Thalamus',
    synonyms: ['Tálamo dorsal', 'Estación de relevo sensorial'],
    level: 'diencefalo',
    lobe: 'subcortical',
    hemisphere: 'bilateral',
    hierarchy: 'no_aplica',
    vascularTerritory: 'acp',
    color: '#eab308', // Yellow
    isDeepStructure: true,
    meshPosition: [0, 0.1, -0.05],
    meshScale: [0.8, 0.65, 0.75],
    meshType: 'sphere',
    overview: 'Gran masa nuclear ovoide bilateral situada en el diencéfalo. Funciona como la "estación central de peaje" de la corteza: toda la información sensorial (salvo el olfato) hace sinapsis aquí antes de alcanzar la neocorteza.',
    anatomicalLocation: 'A ambos lados del tercer ventrículo, medial a la cápsula interna y dorsal al hipotálamo.',
    organizationAndSubdivisions: [
      'Núcleo Geniculado Lateral (NGL / Relevo visual)',
      'Núcleo Geniculado Medial (NGM / Relevo auditivo)',
      'Núcleo Ventral Posterolateral y Posteromedial (VPL/VPM / Relevo somatosensorial)',
      'Núcleo Ventral Anterior y Ventral Lateral (VA/VL / Relevo motor de ganglios basales y cerebelo)',
      'Pulvinar (Atención visual y filtrado multimodal)',
      'Núcleo Mediodorsal (MD / Conexión con corteza prefrontal)'
    ],
    primaryFunctions: [
      'Filtrado y relevo selectivo de información sensorial hacia la corteza',
      'Modulación de la sincronía y ritmos oscilatorios tálamo-corticales (sueño y vigilia)',
      'Puente de integración entre ganglios de la base, cerebelo y corteza motora'
    ],
    associatedCognitiveProcesses: [
      'Atención selectiva y focalización sensorial',
      'Conciencia sensorial y umbrales perceptivos'
    ],
    neuralCircuitsAndConnections: [
      'Radiaciones tálamo-corticales a través de la cápsula interna',
      'Fibras córtico-talámicas de retroalimentación (capa VI neocortical)',
      'Núcleo reticular talámico (inhibición GABAérgica de compuerta)'
    ],
    clinicalCorrelates: [
      {
        title: 'Infarto Talámico (Síndrome de Déjerine-Roussy)',
        syndrome: 'Dolor talámico central y amnesia talámica',
        symptoms: ['Dolor neuropático hiperpatológico refractario contralateral', 'Pérdida sensorial hemiesférica', 'Amnesia diencefálica si afecta núcleos anteriores o mediodorsal'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 48)'
      }
    ],
    sources: [
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositiva 13: Diencéfalo Tálamo-Hipotálamo y Diapositiva 19 (Fig 5.14)',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'DIENCÉFALO: TÁLAMO-HIPOTÁLAMO. Figure 5.14: Transparent overview of the thalamus in the center of each hemisphere.'
      }
    ]
  },
  {
    id: 'hipotalamo',
    name: 'Hipotálamo',
    latinName: 'Hypothalamus',
    synonyms: ['Centro neuroendocrino y homeostático'],
    level: 'diencefalo',
    lobe: 'subcortical',
    hemisphere: 'medial',
    hierarchy: 'no_aplica',
    vascularTerritory: 'aca',
    color: '#f97316', // Orange
    isDeepStructure: true,
    meshPosition: [0, -0.25, 0.15],
    meshScale: [0.45, 0.35, 0.45],
    meshType: 'sphere',
    overview: 'Estructura ventral del diencéfalo que orquesta la homeostasis corporal, coordinando el sistema nervioso autónomo (simpático y parasimpático) y el sistema endocrino a través de la glándula hipófisis.',
    anatomicalLocation: 'Suelo y paredes anteroinferiores del tercer ventrículo, por debajo del surco hipotalámico.',
    organizationAndSubdivisions: [
      'Área preóptica y núcleo supraquiasmático (reloj biológico circadiano)',
      'Núcleos supraóptico y paraventricular (oxitocina y vasopresina / ADH)',
      'Núcleos ventromedial y lateral (centros de saciedad y hambre)',
      'Cuerpos mamilares (componente del circuito de Papez en la memoria)'
    ],
    primaryFunctions: [
      'Control de la homeostasis: regulación de sed, ingesta, osmolaridad y temperatura corporal',
      'Control del Sistema Nervioso Autónomo (SNA)',
      'Regulación endocrina: control de la secreción adenohipofisaria (eje HPA de estrés)',
      'Regulación del ciclo circadiano sueño-vigilia'
    ],
    associatedCognitiveProcesses: [
      'Motivaciones primarias (hambre, sed, impulso sexual, termorregulación)',
      'Respuestas somáticas asociadas a emociones'
    ],
    neuralCircuitsAndConnections: [
      'Tracto hipotálamo-hipofisario',
      'Fascículo longitudinal dorsal (eferencias autonómicas hacia tronco encefálico)',
      'Conexión con amígdala vía estría terminal'
    ],
    clinicalCorrelates: [
      {
        title: 'Desregulación Homeostática y Endocrina',
        syndrome: 'Síndrome hipotalámico',
        symptoms: ['Trastornos del apetito (hiperfagia u obesidad hipotalámica)', 'Diabetes insípida por déficit de vasopresina', 'Desregulación de ritmos circadianos'],
        courseUnitReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 15)'
      }
    ],
    sources: [
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositiva 15: Hipotálamo',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'HIPOTÁLAMO: HOMEOSTASIS - ANS: SED, HAMBRE, FATIGA, TEMPERATURA, RITMOS CIRCADIANOS. SISTEMA ENDOCRINO (HORMONAS).'
      }
    ]
  },
  {
    id: 'ganglios-de-la-base',
    name: 'Ganglios de la Base (Caudado, Putamen, Globo Pálido)',
    latinName: 'Nuclei basales',
    synonyms: ['Núcleos de la base', 'Cuerpo estriado y neoestriado'],
    level: 'telencefalo_subcortical',
    lobe: 'subcortical',
    hemisphere: 'bilateral',
    hierarchy: 'no_aplica',
    vascularTerritory: 'perforantes',
    color: '#6366f1', // Indigo
    isDeepStructure: true,
    meshPosition: [0, 0.15, 0.25],
    meshScale: [1.2, 0.6, 0.85],
    meshType: 'complex',
    overview: 'Conjunto de masas nucleares subcorticales dispuestas en forma de escudo alrededor del tálamo. Modulan el inicio, ejecución y finalización de programas motores, así como hábitos, aprendizaje procedimental y bucles ejecutivos.',
    anatomicalLocation: 'Profundos en el telencéfalo, laterales al tálamo y delimitados por la cápsula interna.',
    organizationAndSubdivisions: [
      'Núcleo Caudado (cabeza, cuerpo y cola en forma de C)',
      'Putamen (núcleo lateral del estriado)',
      'Globo Pálido (segmentos interno GPi y externo GPe)',
      'Sustancia Negra (en mesencéfalo / pars compacta y reticulata)',
      'Núcleo Subtalámico de Luys'
    ],
    primaryFunctions: [
      'Selección e inicio de patrones de acción motora y supresión de movimientos no deseados',
      'Vía directa (facilitadora / pro-movimiento) vs. Vía indirecta (inhibitoria / freno)',
      'Automatización de rutinas conductuales y aprendizaje motor procedimental',
      'Bucles asociativos y orbitofrontales (control de impulsos)'
    ],
    associatedCognitiveProcesses: [
      'Flexibilidad cognitiva y cambio de tarea motora/cognitiva',
      'Aprendizaje por refuerzo dopaminérgico',
      'Velocidad de procesamiento psicomotor'
    ],
    neuralCircuitsAndConnections: [
      'Bucle cortico-estriatal recíproco',
      'Vía nigroestriatal dopaminérgica',
      'Proyecciones pálido-talámicas hacia corteza frontal'
    ],
    clinicalCorrelates: [
      {
        title: 'Enfermedad de Parkinson (Disfunción Nigroestriatal)',
        syndrome: 'Síndrome parkinsoniano motor y cognitivo subcortical',
        symptoms: ['Temblor en reposo y rigidez en rueda dentada', 'Bradicinesia (lentitud motora) e inestabilidad postural', 'Bradipsiquia (lentitud cognitiva subcortical)', 'Apatía y depresión'],
        courseUnitReference: 'Demencias y otras patologías 2022 (Diapositivas 29, 30, 33)'
      },
      {
        title: 'Corea de Huntington (Degeneración del Caudado)',
        syndrome: 'Síndrome hipercinético y demencia subcortical',
        symptoms: ['Movimientos involuntarios coreicos', 'Deterioro ejecutivo progresivo y cambios psiquiátricos severos'],
        courseUnitReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 19)'
      }
    ],
    sources: [
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositiva 19: Ganglios de la base (Figure 5.14)',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'FIGURE 5.14 Transparent overview of the thalamus in the center of each hemisphere, and the basal ganglia looking like a shield and loop (Cd, Put, GP).'
      }
    ]
  },

  // ================= BRAINSTEM & CEREBELLUM =================
  {
    id: 'tronco-encefalico',
    name: 'Tronco Encefálico (Mesencéfalo, Puente y Bulbo)',
    latinName: 'Truncus encephali',
    synonyms: ['Tallo cerebral', 'Tronco cerebral'],
    level: 'tronco_encefalico',
    lobe: 'tronco',
    hemisphere: 'medial',
    hierarchy: 'no_aplica',
    vascularTerritory: 'tronco_basilar',
    color: '#d97706', // Amber dark
    isDeepStructure: false,
    meshPosition: [0, -0.9, -0.15],
    meshScale: [0.65, 1.25, 0.65],
    meshType: 'cylinder',
    overview: 'Tallo conductor indispensable que conecta el cerebro y cerebelo con la médula espinal. Aloja los centros vitales cardiorrespiratorios, la emergencia de casi todos los pares craneales y la formación reticular activadora (alerta y vigilia).',
    anatomicalLocation: 'Fosa craneal posterior, situado ventralmente al cerebelo e inferior al diencéfalo.',
    organizationAndSubdivisions: [
      'Mesencéfalo (Cerebro medio): colículos superiores/inferiores, sustancia negra y acueducto cerebral',
      'Puente de Varolio (Protuberancia): rodetes pontinos transversos y suelo del 4º ventrículo',
      'Bulbo Raquídeo (Médula oblongada): pirámides bulbares, olivas y decusación motora',
      'Formación Reticular / Sistema Reticular Activador Ascendente (SRAA)'
    ],
    primaryFunctions: [
      'Control de reflejos vitales vegetativos (frecuencia cardíaca, respiración, presión arterial, deglución)',
      'Mantenimiento del tono de alerta, vigilia y nivel de conciencia (SRAA)',
      'Paso obligatorio de vías aferentes y eferentes somatosensoriales y motoras',
      'Control motor de cabeza, cuello y sentidos mediante los pares craneales (III al XII)'
    ],
    associatedCognitiveProcesses: [
      'Activación atencional básica (arousal)',
      'Regulación del ciclo de sueño y vigilia',
      'Integración vestibular y reflejos óculo-motores'
    ],
    neuralCircuitsAndConnections: [
      'Vía corticoespinal (piramidal) con decusación en el bulbo inferior',
      'Lemnisco medial (vía de cordones posteriores sensitivos)',
      'Fibras pontocerebelosas hacia el hemisferio cerebeloso contralateral'
    ],
    clinicalCorrelates: [
      {
        title: 'Coma y Alteración de Conciencia en TEC',
        syndrome: 'Compromiso de tronco / SRAA en trauma',
        symptoms: ['Pérdida súbita de conciencia y coma en Escala de Glasgow baja', 'Rigidez de descerebración o decorticación por compresión o edema descendente'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 4, 48)'
      },
      {
        title: 'Síndrome de Cautiverio (Locked-in Syndrome)',
        syndrome: 'Infarto isquémico ventral pontino por oclusión basilar',
        symptoms: ['Tetraplejía completa y parálisis facial bilateral', 'Conciencia y funciones cognitivas superiores perfectamente intactas', 'Comunicación preservada solo mediante movimientos oculares verticales y parpadeo'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 48)'
      }
    ],
    sources: [
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositivas 9 y 11: Tallo cerebral',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'TALLO CEREBRAL: MÉDULA, PUENTE, CEREBELO Y CEREBRO MEDIO. Nervios craneanos, formación reticular.'
      },
      {
        documentTitle: 'NEUROPATOLOGIA TEC Y ACV 2022',
        fileReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf',
        slideOrPage: 'Diapositiva 48: Alteraciones neuropsicológicas',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Puede comprometer desde las funciones más básicas (AVE de tronco -> vigilia), hasta las más complejas (AVE LF -> fx ejecutivas).'
      }
    ]
  },
  {
    id: 'cerebelo',
    name: 'Cerebelo',
    latinName: 'Cerebellum',
    synonyms: ['Pequeño cerebro', 'Árbol de la vida'],
    level: 'cerebelo',
    lobe: 'cerebelo',
    hemisphere: 'bilateral',
    hierarchy: 'no_aplica',
    vascularTerritory: 'tronco_basilar',
    color: '#0284c7', // Sky dark
    isDeepStructure: false,
    meshPosition: [0, -0.75, -0.85],
    meshScale: [1.6, 0.85, 0.95],
    meshType: 'complex',
    overview: 'Estructura folicular densamente poblada en la fosa posterior (alberga más del 50% de las neuronas de todo el encéfalo). Tradicionalmente visto como coordinador motor, hoy se reconoce su papel crucial en la temporización y el síndrome cognitivo-afectivo cerebeloso.',
    anatomicalLocation: 'Fosa craneal posterior, situado dorsalmente al tronco encefálico y debajo del tentorio.',
    organizationAndSubdivisions: [
      'Vermis cerebeloso (postura, equilibrio y control axial)',
      'Hemisferios cerebelosos (coordinación de extremidades y cognición)',
      'Lóbulo Floculonodular (equilibrio y vestibulo-ocular)',
      'Núcleos profundos: dentado, interpuesto (emboliforme y globoso), fastigio'
    ],
    primaryFunctions: [
      'Calibración y coordinación motora fina (dismetría y adiadococinesia en lesión)',
      'Equilibrio estático y dinámico, tono muscular postural',
      'Aprendizaje motor y almacenamiento de modelos predictivos (control hacia adelante)',
      'Modulación temporal de procesos cognitivos y lingüísticos'
    ],
    associatedCognitiveProcesses: [
      'Temporización de microsegundos en habla y ritmo',
      'Automatización de rutinas cognitivas',
      'Regulación afectiva y velocidad de procesamiento'
    ],
    neuralCircuitsAndConnections: [
      'Fibras trepadoras (desde olivas bulbares inferiores)',
      'Fibras musgosas y células de Purkinje',
      'Circuito córtico-ponto-cerebelo-dentato-tálamo-cortical'
    ],
    clinicalCorrelates: [
      {
        title: 'Síndrome Cerebeloso Motor',
        syndrome: 'Ataxia cerebelosa',
        symptoms: ['Marcha atáxica con aumento de la base de sustentación', 'Dismetría en prueba dedo-nariz', 'Temblor de intención', 'Disartria escandida (habla explosiva)'],
        courseUnitReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 31)'
      },
      {
        title: 'Síndrome Cognitivo-Afectivo Cerebeloso (Schmahmann)',
        syndrome: 'Disfunción ejecutiva y afectiva cerebelosa',
        symptoms: ['Déficits en memoria de trabajo y fluidez verbal', 'Aplanamiento afectivo o labilidad emocional por lesión en hemisferio cerebeloso posterior'],
        courseUnitReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 31)'
      }
    ],
    sources: [
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositiva 31: Functional Areas of the Cerebellum',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'Functional Areas of the Cerebellum: Coordination of movement, balance and equilibrium, posture.'
      }
    ]
  },

  // ================= COMMISSURAL & WHITE MATTER PATHWAYS =================
  {
    id: 'cuerpo-calloso',
    name: 'Cuerpo Calloso',
    latinName: 'Corpus callosum',
    synonyms: ['Gran comisura interhemisférica'],
    level: 'telencefalo_subcortical',
    lobe: 'subcortical',
    hemisphere: 'medial',
    hierarchy: 'no_aplica',
    vascularTerritory: 'aca',
    color: '#cbd5e1', // Light slate
    isDeepStructure: true,
    meshPosition: [0, 0.35, -0.05],
    meshScale: [0.45, 0.25, 1.4],
    meshType: 'box',
    overview: 'El mayor haz de sustancia blanca comisural del cerebro humano (>200 millones de axones mielinizados). Interconecta de forma recíproca las áreas homólogas de ambos hemisferios cerebrales.',
    anatomicalLocation: 'Suelo de la cisura longitudinal interhemisférica, tejiendo la parte superior de los ventrículos laterales.',
    organizationAndSubdivisions: [
      'Pico o Rostro (Rostrum / anterior inferior)',
      'Rodilla (Genu / interconecta polos frontales anteriores)',
      'Cuerpo o Tronco (Truncus / fibras motoras, somestésicas y parietales)',
      'Esplenio o Rodete (Splenium / posterior, interconecta cortezas occipitales y temporales posteriores)'
    ],
    primaryFunctions: [
      'Transferencia interhemisférica continua de información sensorial, motora y cognitiva',
      'Integración perceptiva de ambos campos visuales y auditivos',
      'Coordinación bimanual compleja'
    ],
    associatedCognitiveProcesses: [
      'Síntesis perceptual global',
      'Acceso verbal a estímulos procesados en el hemisferio derecho'
    ],
    neuralCircuitsAndConnections: [
      'Fórceps Menor (radiación anterior a través de la rodilla)',
      'Fórceps Mayor (radiación posterior a través del esplenio hacia occipital)',
      'Tapetum'
    ],
    clinicalCorrelates: [
      {
        title: 'Síndrome de Desconexión Interhemisférica ("Split-Brain")',
        syndrome: 'Acallosia o callosotomía quirúrgica',
        symptoms: ['Anomia táctil izquierda (no puede nombrar un objeto tocado solo con la mano izquierda con ojos cerrados)', 'Apraxia unilateral izquierda', 'Alien Hand Syndrome (mano ajena o anárquica)'],
        courseUnitReference: '-1656795872_Panoramica neurofuncional .pdf (Diapositiva 7)'
      },
      {
        title: 'Alexia sin Agrafia por Lesión Esplenial',
        syndrome: 'Desconexión occipitocallosa',
        symptoms: ['La información visual del hemisferio derecho no puede cruzar al área del lenguaje (giro angular/Wernicke) en el hemisferio izquierdo'],
        courseUnitReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 51)'
      }
    ],
    sources: [
      {
        documentTitle: 'Panorámica Neurofuncional',
        fileReference: '-1656795872_Panoramica neurofuncional .pdf',
        slideOrPage: 'Diapositiva 7: Tractos de asociación neural y comisuras',
        type: 'presentacion_catedra',
        directQuoteOrSummary: 'TRACTOS DE ASOCIACION NEURAL - TRACTOS / COMISURAS: Coronal section showing Corpus callosum, Cingulum, SLF, ILF.'
      }
    ]
  }
];
