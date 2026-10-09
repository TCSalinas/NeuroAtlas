import { DementiaDifferential, VascularTerritoryId } from '../types/neuro';

export interface VascularTerritoryDetail {
  id: VascularTerritoryId;
  name: string;
  artery: string;
  colorHex: string;
  irrigatedRegions: string[];
  cognitiveAndBehavioralProfile: string[];
  characteristicSyndromes: string[];
  courseSlideReference: string;
}

export const VASCULAR_TERRITORIES: Record<VascularTerritoryId, VascularTerritoryDetail> = {
  aca: {
    id: 'aca',
    name: 'Arteria Cerebral Anterior (ACA)',
    artery: 'Arteria cerebral anterior (ramas corticales y callosas)',
    colorHex: '#38bdf8', // Sky blue
    irrigatedRegions: [
      'Superficie medial del lóbulo frontal y parietal',
      'Corteza motora y somatosensorial primaria correspondiente a miembros inferiores (piernas y pies)',
      'Área motora suplementaria (SMA)',
      'Porción anterior del cuerpo calloso y corteza cingulada anterior'
    ],
    cognitiveAndBehavioralProfile: [
      'Acinesia y lentitud psicomotora marcada',
      'Mutismo acinético (ausencia de habla espontánea con preservación de la comprensión)',
      'Abulia (falta extrema de iniciativa, descritos en clase coloquialmente como "flojos o despreocupados")',
      'Déficit de memoria de trabajo y baja tasa de evocación espontánea',
      'Reflejos patológicos de prensión (grasping) liberados',
      'Incontinencia de esfínteres'
    ],
    characteristicSyndromes: [
      'Monoparesia o hemiparesia contralateral con predominio crural (pierna > brazo)',
      'Síndrome de desconexión callosa anterior',
      'Síndrome de desinhibición medial o apatía profunda'
    ],
    courseSlideReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 40, 48, 49)'
  },
  acm_izq: {
    id: 'acm_izq',
    name: 'Arteria Cerebral Media Izquierda (ACM Dominante)',
    artery: 'Arteria cerebral media izquierda (tronco y divisiones superior/inferior)',
    colorHex: '#f43f5e', // Rose/Red
    irrigatedRegions: [
      'Convexidad lateral completa del hemisferio izquierdo (frontal lateral, parietal lateral, temporal superior y medio)',
      'Área de Broca (pars opercularis y triangularis)',
      'Área de Wernicke (giro temporal superior posterior)',
      'Giro supramarginal y giro angular izquierdo',
      'Corteza motora y sensitiva de cara y miembro superior izquierdo'
    ],
    cognitiveAndBehavioralProfile: [
      'Afasias graves: Afasia de Broca (no fluente), Wernicke (fluente/sensitiva) o Afasia Global',
      'Apraxias ideomotoras e ideatorias (dificultad para ejecutar actos motores bajo orden o imitación)',
      'Acalculia y discalculia',
      'Alteración del habla interna y pensamiento verbal',
      'Déficits graves de memoria verbal y memoria de trabajo fonológica',
      'Pensamiento excesivamente concreto y rigidez cognitiva',
      'Reacción catastrófica y depresión reactiva frecuente'
    ],
    characteristicSyndromes: [
      'Síndrome de Gerstmann (acalculia, agrafia, agnosia digital y desorientación derecha-izquierda tras lesión del giro angular)',
      'Hemiplejía y hemihipoestesia faciobraquial derecha',
      'Apraxia verbal y bucofacial'
    ],
    courseSlideReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 40, 48, 50)'
  },
  acm_der: {
    id: 'acm_der',
    name: 'Arteria Cerebral Media Derecha (ACM No Dominante)',
    artery: 'Arteria cerebral media derecha (tronco y divisiones)',
    colorHex: '#f59e0b', // Amber/Orange
    irrigatedRegions: [
      'Convexidad lateral completa del hemisferio derecho (frontal, parietal posterior, temporal)',
      'Corteza parietal posterior y unión temporoparietal derecha (red atencional visuoespacial)',
      'Corteza frontoorbitaria y frontolateral derecha'
    ],
    cognitiveAndBehavioralProfile: [
      'Hemi-negligencia espacial unilateral izquierda y hemi-inatención sensorial severa',
      'Anosognosia (completa falta de conciencia de la enfermedad o de la parálisis contralateral)',
      'Déficits visoconstructivos y topográficos (dificultad para dibujar, copiar figuras tridimensionales u orientarse)',
      'Apraxia del vestir y apraxia constructiva',
      'Déficits pragmáticos del lenguaje (dificultad para captar metáforas, sarcasmo o dobles sentidos)',
      'Aprosodia expresiva y receptiva (pérdida de entonación emocional)',
      'Cambios anímicos y de personalidad: conducta heboide, pueril, hipomanía o afecto aplanado'
    ],
    characteristicSyndromes: [
      'Síndrome de Heminegligencia Espacial Izquierda',
      'Hemiplejía y hemihipoestesia faciobraquial izquierda',
      'Síndrome de Asomatognosia y Anosodiaforia'
    ],
    courseSlideReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 40, 48, 53)'
  },
  acp: {
    id: 'acp',
    name: 'Arteria Cerebral Posterior (ACP)',
    artery: 'Arteria cerebral posterior (ramas calcarinas, temporales y talámicas)',
    colorHex: '#10b981', // Emerald green
    irrigatedRegions: [
      'Lóbulo occipital medial y polo occipital (corteza visual primaria V1 y áreas secundarias)',
      'Superficie inferomedial del lóbulo temporal (giro parahipocámpico, hipocampo posterior, giro fusiforme)',
      'Esplenio del cuerpo calloso',
      'Tálamo posterior (núcleos pulvinar y geniculados)'
    ],
    cognitiveAndBehavioralProfile: [
      'Defectos campimétricos visuales: Hemianopsia homónima contralateral congruente o cuadrantanopsias',
      'Agnosias visuales: Prosopagnosia (incapacidad para reconocer rostros familiares), agnosia visual de objetos, acromatopsia cortical',
      'Alexia sin agrafia (ceguera para las palabras: lee pero no comprende, o puede escribir pero no leer lo que escribió)',
      'Amnesia episódica y déficits severos de retención mnésica si compromete el hipocampo',
      'Aprosodia receptiva',
      'Cambios del estado de ánimo: ansiedad marcada y estados depresivos'
    ],
    characteristicSyndromes: [
      'Síndrome de Desconexión Occipitocallosa (Alexia sin agrafia por lesión occipital izquierda + esplenio calloso)',
      'Síndrome de Anton-Babinski (ceguera cortical con confabulación y anosognosia si es bilateral)',
      'Síndrome de Balint (lesión parietooccipital bilateral: simultanagnosia, ataxia óptica y apraxia de la mirada)'
    ],
    courseSlideReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 40, 48, 51, 54)'
  },
  tronco_basilar: {
    id: 'tronco_basilar',
    name: 'Arteria Basilar y Vertebrales (Circulación Posterior)',
    artery: 'Sistema vértebro-basilar',
    colorHex: '#8b5cf6', // Violet
    irrigatedRegions: [
      'Tronco encefálico (bulbo, puente y mesencéfalo)',
      'Formación reticular activadora ascendente',
      'Núcleos de los pares craneales (III al XII)',
      'Cerebelo (vía arterias cerebelosas PICA, AICA, SCA)'
    ],
    cognitiveAndBehavioralProfile: [
      'Compromiso del nivel de vigilia, estado de alerta, somnolencia, estupor o coma',
      'Déficit atencional masivo y alteración del ciclo sueño-vigilia',
      'Síndrome de cautiverio (Locked-in syndrome por infarto ventral del puente): tetraplejía y anartria con conciencia intacta'
    ],
    characteristicSyndromes: [
      'Síndromes alternos del tronco (ataxia, parálisis de pares craneales ipsilaterales y déficit sensitivo/motor contralateral)',
      'Ataxia cerebelosa y dismetría',
      'Vértigo y disartria'
    ],
    courseSlideReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositivas 23, 48)'
  },
  perforantes: {
    id: 'perforantes',
    name: 'Arterias Perforantes / Lenticuloestriadas (Infarto Lacunar)',
    artery: 'Ramas penetrantes profundas de ACM y basilar',
    colorHex: '#ec4899', // Pink
    irrigatedRegions: [
      'Cápsula interna (brazo posterior y rodilla)',
      'Ganglios de la base (putamen, caudado)',
      'Núcleos talámicos'
    ],
    cognitiveAndBehavioralProfile: [
      'Infartos lacunares pequeños (<15 mm) por microangiopatía hipertensiva',
      'Enlentecimiento cognitivo subcortical',
      'Labilidad emocional',
      'Disminución de fluidez verbal ejecutiva'
    ],
    characteristicSyndromes: [
      'Ictus motor puro (brazo posterior cápsula interna)',
      'Ictus sensitivo puro (núcleo ventral posterolateral del tálamo)',
      'Hemiparesia-ataxia y disartria-mano torpe'
    ],
    courseSlideReference: 'NEUROPATOLOGIA TEC Y ACV 2022.pdf (Diapositiva 36)'
  }
};

export const DEMENTIA_DIFFERENTIAL_MATRIX: DementiaDifferential[] = [
  {
    id: 'ea',
    name: 'Enfermedad de Alzheimer',
    acronym: 'EA',
    initialClinic: 'Pérdida insidiosa y progresiva de memoria episódica reciente (olvidos cotidianos, no fija nuevos aprendizajes).',
    cognitiveProfile: 'Predomina la pérdida de memoria declarativa con compromiso progresivo posterior de otros dominios (lenguaje, praxias, gnosias: síndrome afaso-apraxo-agnósico).',
    neurologicalExam: 'Inicialmente normal. Signos extrapiramidales y motores aparecen solo en etapas avanzadas.',
    psychiatricFeatures: 'Inicialmente normal o apatía leve; en fases medias pueden presentarse depresión, irritabilidad, anosognosia y falsos reconocimientos.',
    neuroimagingFindings: 'Atrofia precoz en corteza entorrinal e hipocampo; luego atrofia cortical parietotemporal bilateral y dilatación ventricular ex vacuo.',
    pathophysiology: 'Depósito extracelular de placas seniles de péptido beta-amiloide (Aβ42) y ovillos neurofibrilares intracelulares de proteína Tau hiperfosforilada.',
    courseSlideReference: 'Demencias y otras patologías 2022 (Diapositivas 23, 24, 25, 33: Tabla 2)'
  },
  {
    id: 'dv',
    name: 'Demencia Vascular',
    acronym: 'DV',
    initialClinic: 'Aparición súbita o curso temporal escalonado ("stepwise") con fluctuaciones en relación a eventos isquémicos focales.',
    cognitiveProfile: 'Compromiso predominante de función ejecutiva, atención sostenida y lentitud generalizada del procesamiento (la memoria se afecta secundariamente por falla de evocación, no de almacenamiento).',
    neurologicalExam: 'Focalidad neurológica clara: debilidad, hiperreflexia, respuesta plantar extensora (Babinski), espasticidad o signos pseudobulbares.',
    psychiatricFeatures: 'Marcada labilidad emocional, depresión mayor precoz, apatía intensa, oscilación de síntomas a lo largo del día e ilusiones.',
    neuroimagingFindings: 'Infartos corticales o subcorticales únicos estratégicos o múltiples, lesiones isquémicas lacunares y leucoaraiosis (hiperintensidades en sustancia blanca periventricular en T2/FLAIR).',
    pathophysiology: 'Enfermedad cerebrovascular oclusiva o tromboembólica, aterosclerosis cerebral y arteriolosclerosis que causan hipoperfusión crónica y necrosis.',
    courseSlideReference: 'Demencias y otras patologías 2022 (Diapositivas 26, 33: Tabla 2)'
  },
  {
    id: 'dlft',
    name: 'Degeneración Lobar Frontotemporal',
    acronym: 'DLFT',
    initialClinic: 'Cambios drásticos precoces en el comportamiento social, la personalidad, la conducta moral o el lenguaje formal (la memoria cotidiana está relativamente preservada).',
    cognitiveProfile: 'Severo fallo de función ejecutiva, razonamiento abstracto, control inhibitorio, juicio social y alteraciones progresivas del lenguaje (variante conductual bvFTD, afasia no fluente nfvPPA o demencia semántica sdPPA).',
    neurologicalExam: 'Reflejos de liberación frontal primitivos (prensión, succión), distonía, rigidez axial o parkinsonismo atípico.',
    psychiatricFeatures: 'Desinhibición social prominente, impulsividad, conducta heboide, hiperoralidad/glotonería, pérdida de empatía, apatía profunda y anomia moral.',
    neuroimagingFindings: 'Atrofia lobar circunscrita anterior (corteza frontal y polos temporales), a menudo marcadamente asimétrica, con relativo respeto de regiones posteriores.',
    pathophysiology: 'Inclusiones proteicas anormales en neuronas frontales y glía (taupatías FTLD-Tau o proteinopatías FTLD-TDP43).',
    courseSlideReference: 'Demencias y otras patologías 2022 (Diapositivas 27, 28, 33: Tabla 2)'
  },
  {
    id: 'dl',
    name: 'Demencia por Cuerpos de Lewy',
    acronym: 'DL',
    initialClinic: 'Alucinaciones visuales tempranas, fluctuaciones de atención/conciencia y parkinsonismo motor espontáneo.',
    cognitiveProfile: 'Deterioro precoz visoespacial y atencional-ejecutivo con fluctuaciones cognitivas marcadas de un día a otro o a lo largo de horas.',
    neurologicalExam: 'Parkinsonismo motor espontáneo (rigidez en rueda dentada, bradicinesia, inestabilidad postural) NO inducido por fármacos; hipersensibilidad severa a neurolépticos.',
    psychiatricFeatures: 'Alucinaciones visuales complejas, vívidas y bien estructuradas (personas, animales), delirios paranoides, depresión, trastornos del sueño REM y pareidolias (ver caras en patrones aleatorios).',
    neuroimagingFindings: 'Atrofia cortical difusa con respeto relativo del hipocampo (a diferencia de EA), menor tamaño mesencefálico y pérdida de transportadores de dopamina en estriado (DaTscan).',
    pathophysiology: 'Agregación patológica intracitoplasmática de alfa-sinucleína formando cuerpos de Lewy en corteza cerebral, sistema límbico y tronco encefálico.',
    courseSlideReference: 'Demencias y otras patologías 2022 (Diapositivas 31, 32, 33: Tabla 2)'
  },
  {
    id: 'hidrocefalia',
    name: 'Hidrocefalia Normotensiva (Hakim-Adams)',
    acronym: 'HNT',
    initialClinic: 'Tríada clásica: alteraciones precoces de la marcha ("apraxia de la marcha"), incontinencia de esfínteres y deterioro cognitivo subcortical.',
    cognitiveProfile: 'Defecto cognitivo leve a moderado de tipo subcortical: bradipsiquia (lentitud del pensamiento), inatención, apatía y confusión.',
    neurologicalExam: 'Marcha "magnética" a pequeños pasos, con base amplia y pies pegados al piso (apraxia de la marcha); espasticidad discreta.',
    psychiatricFeatures: 'Apatía, abulia, desinterés progresivo y estados confusionales.',
    neuroimagingFindings: 'Marcada dilatación ventricular desproporcionada (ventriculomegalia evidente con índice de Evans >0.3) con escasa o nula atrofia de surcos corticales superficiales.',
    pathophysiology: 'Alteración en la reabsorción del líquido cerebroespinal (LCR) a nivel de las vellosidades aracnoideas, provocando aumento de presión intermitente que deforma las fibras periventriculares frontales.',
    courseSlideReference: 'Demencias y otras patologías 2022 (Diapositiva 33: Tabla 2)'
  },
  {
    id: 'parkinson_demencia',
    name: 'Enfermedad de Parkinson con Demencia',
    acronym: 'EPD',
    initialClinic: 'Cuadro motor idiopático bien establecido por más de 1 año (temblor en reposo, rigidez, bradicinesia) que años más tarde desarrolla deterioro cognitivo.',
    cognitiveProfile: 'Perfil disejecutivo-subcortical: lentitud en la velocidad de procesamiento, déficits en atención alternante y planificación, memoria con preservación del reconocimiento tras facilitación.',
    neurologicalExam: 'Tríada parkinsoniana plena: temblor de reposo asimétrico, rigidez con fenómeno de rueda dentada, marcha festinante y fascies inexpresiva.',
    psychiatricFeatures: 'Apatía, depresión (muy frecuente por desaferentación dopaminérgica), ansiedad y alucinaciones secundarias al tratamiento dopaminérgico crónico.',
    neuroimagingFindings: 'Pérdida de sustancia negra en pars compacta mesencefálica con atrofia cortical tardía.',
    pathophysiology: 'Pérdida progresiva de neuronas dopaminérgicas en la sustancia negra compacta con propagación ascendente de cuerpos de Lewy hacia corteza (estadios de Braak).',
    courseSlideReference: 'Demencias y otras patologías 2022 (Diapositivas 29, 30, 33)'
  }
];
