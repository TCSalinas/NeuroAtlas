import { CourseUnit } from '../types/neuro';

export const COURSE_INFO = {
  university: 'Universidad Diego Portales (UDP)',
  faculty: 'Facultad de Psicología',
  courseName: 'Introducción a la Neuropsicología Clínica',
  courseCode: 'PSI4436',
  professor: 'Prof. Dr. Christian Salas Riquelme',
  teachingAssistant: 'Antonia Quevedo',
  academicYear: '2026',
};

export const COURSE_UNITS: CourseUnit[] = [
  {
    id: 'unidad-1',
    unitNumber: 1,
    title: 'Panorámica Neurofuncional y Arquitectura Cerebral',
    description: 'Introducción a la relación entre estructuras neuroanatómicas y funciones cognitivas, conductuales y socioemocionales. Sustancia gris y blanca, tractos comisurales y de asociación, organización jerárquica y citoarquitectura.',
    fileSource: 'Cápsula Panorámica Neurofuncional (Dr. Christian Salas) & UBC Neuroanatomy (Dr. Claudia Krebs)',
    keyTopics: [
      'Sustancia gris (cuerpos celulares) y sustancia blanca (axones mielinizados y glía)',
      'Tractos de asociación (SLF, ILF, fascículo uncinado, cíngulo) y comisuras (cuerpo calloso)',
      'Organización filogenética y ontogenética ("Growing the brain", Baars & Gage)',
      'Tallo cerebral (bulbo, puente, mesencéfalo), formación reticular y cerebelo',
      'Diencéfalo: Tálamo e Hipotálamo (homeostasis, SNA y sistema endocrino)',
      'Telencéfalo: Sistema límbico, ganglios de la base y corteza cerebral',
      'Citoarquitectura neocortical: 6 capas celulares, columnas en V1 (BA17) y áreas de Brodmann',
      'Corteza de asociación: áreas primarias, unimodales y heteromodales (Mesulam)'
    ],
    associatedStructureIds: [
      'lobulo-frontal-izquierdo',
      'lobulo-frontal-derecho',
      'lobulo-parietal-izquierdo',
      'lobulo-temporal-izquierdo',
      'lobulo-occipital',
      'hipocampo',
      'amigdala',
      'talamo',
      'hipotalamo',
      'ganglios-de-la-base',
      'cuerpo-calloso',
      'cerebelo',
      'tronco-encefalico'
    ]
  },
  {
    id: 'unidad-2',
    unitNumber: 2,
    title: 'Traumatismo Craneoencefálico (TEC) y Lesión Mecánica',
    description: 'Mecanismos neuropatológicos del trauma craneal: aceleración-desaceleración, lesión de golpe y contragolpe, daño axonal difuso (DAD), hematomas y escala de Glasgow.',
    fileSource: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (pp. 1-21)',
    keyTopics: [
      'Intercambio brusco de energía mecánica y fuerzas físicas inerciales',
      'Lesión por golpe (coup en sitio de impacto) y contragolpe (countercoup por rebote)',
      'Vulnerabilidad mecánica crítica de polos frontales y temporales sobre el suelo óseo',
      'Cizallamiento axonal y Daño Axonal Difuso (DAD)',
      'Hemorragias y hematomas (epidural, subdural, intraparenquimatoso)',
      'Edema cerebral y compromiso de estructuras profundas',
      'Pérdida de conciencia y Escala de Coma de Glasgow (GCS) como pronóstico'
    ],
    associatedStructureIds: [
      'lobulo-frontal-izquierdo',
      'lobulo-frontal-derecho',
      'lobulo-temporal-izquierdo',
      'lobulo-temporal-derecho',
      'tronco-encefalico'
    ]
  },
  {
    id: 'unidad-3',
    unitNumber: 3,
    title: 'Patología Vascular Encefálica (ACV / AVE) y Síndromes Hemisféricos',
    description: 'Accidente cerebrovascular isquémico y hemorrágico. Territorios vasculares de irrigación (ACA, ACM, ACP, Polígono de Willis), correlatos neuropsicológicos y asimetría hemisférica.',
    fileSource: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (pp. 22-55)',
    keyTopics: [
      'Interrupción del flujo sanguíneo cerebral (oxígeno y glucosa): necrosis isquémica',
      'Clasificación MINSAL: TIA (<24h), ACV isquémico (~80%) y ACV hemorrágico (15-20%)',
      'Aneurismas saculares y malformaciones arteriovenosas (angiomas)',
      'Infartos lacunares en sustancia blanca profunda y núcleos subcorticales',
      'Polígono de Willis y ramas principales: ACA, ACM, ACP',
      'Síndrome de ACA: acinesia, mutismo acinético, abulia, baja evocación mnésica',
      'Síndrome de ACM izquierda: afasias (Broca/Wernicke), apraxias, acalculia, rigidez cognitiva',
      'Síndrome de ACM derecha: heminegligencia espacial, anosognosia, aprosodia, conducta heboide',
      'Síndrome de ACP: hemianopsia homónima, alexia sin agrafia, agnosia visual, amnesia',
      'Fenómeno de diásquisis (desactivación remota por pérdida de aferencias)'
    ],
    associatedStructureIds: [
      'lobulo-frontal-izquierdo',
      'lobulo-frontal-derecho',
      'lobulo-parietal-izquierdo',
      'lobulo-parietal-derecho',
      'lobulo-temporal-izquierdo',
      'lobulo-temporal-derecho',
      'lobulo-occipital'
    ]
  },
  {
    id: 'unidad-4',
    unitNumber: 4,
    title: 'Infecciones y Neoplasias del Sistema Nervioso',
    description: 'Procesos expansivos tumorales e infecciones neurotrópicas. Encefalitis herpética y su selectividad por el lóbulo temporal medial, meningitis y perfiles cognitivos.',
    fileSource: 'nauropatologia Ev Neuropsicologica 2020 Demencia y otros.pdf (pp. 1-14)',
    keyTopics: [
      'Neoplasias cerebrales primarias y metastásicas: grados de malignidad OMS',
      'Mecanismos de déficit por tumor: compresión arquitectónica, isquemia focal, edema',
      'Efectos neurotóxicos de cirugía, radioterapia y quimioterapia en cognición',
      'Procesos infecciosos víricos, bacterianos y parasitarios',
      'Encefalitis herpética (VHS-1): necrosis hemorrágica selectiva en lóbulo temporal, hipocampo y amígdala',
      'Perfil neuropsicológico en encefalitis herpética: amnesia retrógrada y anterógrada severa, afasia/anomia, disfunción ejecutiva',
      'Meningitis vírica y bacteriana: inflamación leptomeníngea, bloqueo de LCR, compromiso ejecutivo y velocidad de procesamiento'
    ],
    associatedStructureIds: [
      'hipocampo',
      'amigdala',
      'lobulo-temporal-izquierdo',
      'lobulo-temporal-derecho'
    ]
  },
  {
    id: 'unidad-5',
    unitNumber: 5,
    title: 'Demencias y Trastornos Neurocognitivos (Diagnóstico Diferencial)',
    description: 'Deterioro Cognitivo Leve (DCL) y Trastorno Neurocognitivo Mayor y Menor (DSM-5). Matriz comparativa entre Alzheimer, Demencia Vascular, Frontotemporal, Cuerpos de Lewy e Hidrocefalia.',
    fileSource: 'nauropatologia Ev Neuropsicologica 2020 Demencia y otros.pdf (pp. 15-43)',
    keyTopics: [
      'Criterios DSM-5 para Trastorno Neurocognitivo Menor y Mayor',
      'Diagnóstico diferencial entre cuadros adquiridos, congénitos y psiquiátricos (pseudodemencias)',
      'Enfermedad de Alzheimer (EA): depósito de placas amiloides y proteína Tau hiperfosforilada, atrofia entorrinal e hipocampal precoz',
      'Demencia Vascular (DV): inicio súbito, deterioro escalonado, infartos múltiples y compromiso disejecutivo',
      'Degeneración Lobar Frontotemporal (DLFT): variante conductual (bvFTD), afasia progresiva primaria no fluente (nfvPPA) y demencia semántica (sdPPA)',
      'Demencia por Cuerpos de Lewy (DL): alucinaciones visuales vívidas, fluctuaciones cognitivas, parkinsonismo espontáneo, pareidolias y trastorno del sueño REM',
      'Hidrocefalia Normotensiva (Hakim-Adams): tríada de apraxia de marcha, incontinencia y lentitud cognitiva',
      'Demencia en Enfermedad de Parkinson: afectación motora previa y posterior deterioro subcortical'
    ],
    associatedStructureIds: [
      'hipocampo',
      'lobulo-temporal-izquierdo',
      'lobulo-frontal-izquierdo',
      'ganglios-de-la-base'
    ]
  }
];
