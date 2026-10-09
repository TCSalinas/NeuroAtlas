export type NeuroaxialLevel = 
  | 'telencefalo_corteza'
  | 'telencefalo_subcortical'
  | 'diencefalo'
  | 'tronco_encefalico'
  | 'cerebelo';

export type Lobe = 'frontal' | 'parietal' | 'temporal' | 'occipital' | 'insula' | 'limbico' | 'subcortical' | 'tronco' | 'cerebelo';

export type Hemisphere = 'izquierdo' | 'derecho' | 'bilateral' | 'medial';

export type CorticalHierarchy = 
  | 'primaria_sensoriomotora'
  | 'asociacion_unimodal'
  | 'asociacion_heteromodal'
  | 'paralimbica'
  | 'limbica'
  | 'no_aplica';

export type VascularTerritoryId = 'aca' | 'acm_izq' | 'acm_der' | 'acp' | 'tronco_basilar' | 'perforantes';

export interface AcademicSource {
  documentTitle: string;
  fileReference: string;
  slideOrPage: string;
  type: 'apunte_clase' | 'presentacion_catedra' | 'fuente_complementaria';
  directQuoteOrSummary: string;
  externalUrl?: string;
}

export interface ClinicalCorrelate {
  title: string;
  syndrome: string;
  symptoms: string[];
  courseUnitReference: string;
  notes?: string;
}

export interface AnatomicalStructure {
  id: string;
  name: string;
  latinName?: string;
  synonyms: string[];
  level: NeuroaxialLevel;
  lobe: Lobe;
  hemisphere: Hemisphere;
  brodmannAreas?: number[];
  hierarchy: CorticalHierarchy;
  vascularTerritory: VascularTerritoryId;
  color: string;
  isDeepStructure: boolean;
  
  // 3D placement metadata
  meshPosition: [number, number, number];
  meshScale: [number, number, number];
  meshRotation?: [number, number, number];
  meshType?: 'sphere' | 'box' | 'cylinder' | 'ellipsoid' | 'complex';

  // Pedagogical & Neuropsychological content
  overview: string;
  anatomicalLocation: string;
  organizationAndSubdivisions: string[];
  primaryFunctions: string[];
  associatedCognitiveProcesses: string[];
  neuralCircuitsAndConnections: string[];
  clinicalCorrelates: ClinicalCorrelate[];
  sources: AcademicSource[];
}

export interface CourseUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  fileSource: string;
  keyTopics: string[];
  associatedStructureIds: string[];
}

export interface CorticalLayer {
  number: number;
  roman: string;
  name: string;
  composition: string;
  mainInputs: string;
  mainOutputs: string;
  functionDescription: string;
  thicknessMicrons: number;
}

export interface DementiaDifferential {
  id: string;
  name: string;
  acronym: string;
  initialClinic: string;
  cognitiveProfile: string;
  neurologicalExam: string;
  psychiatricFeatures: string;
  neuroimagingFindings: string;
  pathophysiology: string;
  courseSlideReference: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  unitId: string;
  relatedStructureId?: string;
  sourceReference: string;
}

export type ActiveAppView = 
  | 'atlas3d'
  | 'vascular'
  | 'citoarquitectura'
  | 'demencias'
  | 'quiz'
  | 'atlas2d';
