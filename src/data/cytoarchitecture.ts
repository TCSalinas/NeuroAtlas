import { CorticalLayer } from '../types/neuro';

export const CORTICAL_LAYERS: CorticalLayer[] = [
  {
    number: 1,
    roman: 'I',
    name: 'Capa Molecular (Plexiforme)',
    composition: 'Escasa en somas neuronales; contiene principalmente axones horizontales, dendritas apicales de células piramidales subyacentes y células gliales.',
    mainInputs: 'Fibras tálamo-corticales inespecíficas difusas y axones de asociación de otras áreas corticales.',
    mainOutputs: 'Conexiones intracorticales locales con capas II y III.',
    functionDescription: 'Capa sináptica receptora de modulación inespecífica y retroalimentación (feedback) asociativa interhemisférica.',
    thicknessMicrons: 200
  },
  {
    number: 2,
    roman: 'II',
    name: 'Capa Granular Externa',
    composition: 'Densamente poblada de pequeñas neuronas estrelladas (granulares) y pequeñas neuronas piramidales con dendritas apicales ascendentes a la capa I.',
    mainInputs: 'Aferencias intracorticales y axones de otras regiones corticales (asociación cortico-cortical).',
    mainOutputs: 'Proyecciones hacia capas corticales más profundas (V y VI) del mismo hemisferio o hemisferio contralateral.',
    functionDescription: 'Procesamiento asociativo local y comunicación entre áreas corticales adyacentes.',
    thicknessMicrons: 250
  },
  {
    number: 3,
    roman: 'III',
    name: 'Capa Piramidal Externa',
    composition: 'Predominio de células piramidales de tamaño mediano y grande cuyo tamaño se incrementa progresivamente en la profundidad de la capa.',
    mainInputs: 'Fibras asociativas y comisurales de otras regiones corticales.',
    mainOutputs: 'Eferencias córtico-corticales principales: origen de los fascículos de asociación (SLF, ILF, uncinado) y fibras comisurales que cruzan el cuerpo calloso.',
    functionDescription: 'Centro emisor fundamental para la interconexión entre hemisferios y entre lóbulos cerebrales distantes.',
    thicknessMicrons: 500
  },
  {
    number: 4,
    roman: 'IV',
    name: 'Capa Granular Interna',
    composition: 'Empaque denso de células estrelladas pequeñas (interneuronas espinosas) que reciben axones aferentes mielinizados (banda externa de Baillarger). Altamente desarrollada en corteza sensorial primaria (corteza heterotípica granular / V1 con estría de Gennari).',
    mainInputs: 'Aferencias talámicas sensoriales específicas directas (vía visual del NGL, vía auditiva del NGM, vía somestésica del VPL/VPM).',
    mainOutputs: 'Proyecciones ascendentes a capas II/III y descendentes a capas V/VI para iniciar el circuito de procesamiento en columna.',
    functionDescription: 'Diana primaria receptora de las vías aferentes sensoriales del encéfalo; estación de entrada sensorial a la neocorteza.',
    thicknessMicrons: 300
  },
  {
    number: 5,
    roman: 'V',
    name: 'Capa Piramidal Interna (Ganglionar)',
    composition: 'Grandes células piramidales (incluyendo las células gigantes de Betz en el giro precentral motor BA4). Contiene la banda interna de Baillarger.',
    mainInputs: 'Aferencias procesadas desde las capas superficiales (II, III y IV) e interneuronas inhibidoras locales.',
    mainOutputs: 'Principal fuente de eferencias subcorticales: tracto corticoespinal (vía piramidal hacia médula), corticobulbar (pares craneales), corticoestriatal (ganglios basales) y corticopontino (hacia cerebelo).',
    functionDescription: 'Capa de salida motora y ejecutiva principal de la corteza cerebral hacia el resto del neuroeje.',
    thicknessMicrons: 600
  },
  {
    number: 6,
    roman: 'VI',
    name: 'Capa Multiforme (Fusiforme)',
    composition: 'Células fusiformes, piramidales modificadas y neuronas polimórficas adyacentes a la sustancia blanca subcortical.',
    mainInputs: 'Proyecciones locales intracorticales y colaterales tálamo-corticales.',
    mainOutputs: 'Eferencias recíprocas córtico-talámicas dirigidas de vuelta a los núcleos del tálamo para regular y retroalimentar el filtro sensorial de entrada.',
    functionDescription: 'Bucle de modulación tálamo-cortical recíproco y estabilización de la dinámica oscilatoria cortical.',
    thicknessMicrons: 450
  }
];

export const BRODMANN_KEY_AREAS = [
  { area: 4, name: 'Corteza Motora Primaria (M1)', location: 'Giro precentral', function: 'Generación de impulsos motores voluntarios contralaterales' },
  { area: 6, name: 'Corteza Premotora y Motora Suplementaria', location: 'Circunvolución frontal superior y media', function: 'Planificación y secuenciación motora' },
  { area: 8, name: 'Campos Oculares Frontales (FEF)', location: 'Corteza frontal anterior a la premotora', function: 'Control de movimientos sacádicos oculares voluntarios' },
  { area: '9/46', name: 'Corteza Prefrontal Dorsolateral (DLPFC)', location: 'Circunvolución frontal media y superior', function: 'Memoria de trabajo, monitorización, flexibilidad cognitiva y funciones ejecutivas' },
  { area: '44/45', name: 'Área de Broca', location: 'Giro frontal inferior (pars opercularis y triangularis)', function: 'Programación motora del habla y procesamiento morfosintáctico' },
  { area: '1/2/3', name: 'Corteza Somatosensorial Primaria (S1)', location: 'Giro postcentral', function: 'Recepción y discriminación táctil, térmica y propioceptiva contralateral' },
  { area: '5/7', name: 'Corteza Parietal Posterior', location: 'Lóbulo parietal superior', function: 'Integración visuoespacial y guía de la acción en el espacio' },
  { area: 39, name: 'Giro Angular', location: 'Lóbulo parietal inferior posterior', function: 'Lectoescritura, cálculo y procesamiento semántico cross-modal' },
  { area: 40, name: 'Giro Supramarginal', location: 'Lóbulo parietal inferior anterior', function: 'Esquema corporal, praxias ideomotoras y procesamiento fonológico' },
  { area: 17, name: 'Corteza Visual Primaria (V1 / Estriada)', location: 'Bordes de la cisura calcarina (occipital medial)', function: 'Procesamiento de bordes, orientación y estímulos visuales primarios' },
  { area: '18/19', name: 'Corteza Visual Secundaria (V2-V5)', location: 'Lóbulo occipital lateral y medial', function: 'Procesamiento de color (V4), movimiento (V5/MT) y reconocimiento visual' },
  { area: '41/42', name: 'Corteza Auditiva Primaria (A1)', location: 'Giros temporales transversos de Heschl', function: 'Recepción tonotópica y discriminación de frecuencias sonoras' },
  { area: 22, name: 'Área de Wernicke', location: 'Giro temporal superior posterior izquierdo', function: 'Comprensión y decodificación léxica del lenguaje hablado' },
  { area: '11/47', name: 'Corteza Orbitofrontal', location: 'Cara ventral del lóbulo frontal', function: 'Inhibición de impulsos, evaluación del valor hedónico y conducta social' }
];
