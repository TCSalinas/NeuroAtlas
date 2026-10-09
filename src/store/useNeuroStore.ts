import { create } from 'zustand';
import { ActiveAppView, VascularTerritoryId } from '../types/neuro';

interface ClippingState {
  enabled: boolean;
  sagittal: number; // -2 to 2 (X axis)
  coronal: number;  // -2 to 2 (Z axis)
  axial: number;    // -2 to 2 (Y axis)
}

interface NeuroState {
  selectedStructureId: string | null;
  hoveredStructureId: string | null;
  activeView: ActiveAppView;
  activeUnitId: string | null;
  isXRayMode: boolean;
  isolatedStructureId: string | null;
  clipping: ClippingState;
  activeVascularFilter: VascularTerritoryId | 'all';
  isSearchOpen: boolean;
  searchQuery: string;
  masteredStructureIds: string[];
  quizAnswers: Record<string, number>;
  cameraPresetTarget: string | null; // Trigger camera transition to specific view
  
  // Actions
  selectStructure: (id: string | null) => void;
  hoverStructure: (id: string | null) => void;
  setActiveView: (view: ActiveAppView) => void;
  setActiveUnit: (unitId: string | null) => void;
  toggleXRayMode: () => void;
  setIsolatedStructure: (id: string | null) => void;
  updateClipping: (partial: Partial<ClippingState>) => void;
  resetClipping: () => void;
  setActiveVascularFilter: (filter: VascularTerritoryId | 'all') => void;
  setIsSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  toggleStructureMastered: (id: string) => void;
  recordQuizAnswer: (questionId: string, answerIndex: number) => void;
  resetQuizAnswers: () => void;
  triggerCameraPreset: (presetName: string) => void;
}

const LOCAL_STORAGE_KEY_MASTERED = 'neuroatlas_mastered_structures';
const LOCAL_STORAGE_KEY_QUIZ = 'neuroatlas_quiz_answers';

const loadStoredMastered = (): string[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_MASTERED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadStoredQuiz = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_QUIZ);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const useNeuroStore = create<NeuroState>((set, get) => ({
  selectedStructureId: 'lobulo-frontal-izquierdo',
  hoveredStructureId: null,
  activeView: 'atlas3d',
  activeUnitId: 'unidad-1',
  isXRayMode: false,
  isolatedStructureId: null,
  clipping: {
    enabled: false,
    sagittal: 0,
    coronal: 0,
    axial: 0,
  },
  activeVascularFilter: 'all',
  isSearchOpen: false,
  searchQuery: '',
  masteredStructureIds: loadStoredMastered(),
  quizAnswers: loadStoredQuiz(),
  cameraPresetTarget: null,

  selectStructure: (id) => {
    set({ selectedStructureId: id });
  },

  hoverStructure: (id) => {
    set({ hoveredStructureId: id });
  },

  setActiveView: (view) => {
    set({ activeView: view });
  },

  setActiveUnit: (unitId) => {
    set({ activeUnitId: unitId });
  },

  toggleXRayMode: () => {
    set((state) => ({ isXRayMode: !state.isXRayMode }));
  },

  setIsolatedStructure: (id) => {
    set({ isolatedStructureId: id });
  },

  updateClipping: (partial) => {
    set((state) => ({
      clipping: { ...state.clipping, ...partial }
    }));
  },

  resetClipping: () => {
    set({
      clipping: {
        enabled: false,
        sagittal: 0,
        coronal: 0,
        axial: 0,
      }
    });
  },

  setActiveVascularFilter: (filter) => {
    set({ activeVascularFilter: filter });
  },

  setIsSearchOpen: (open) => {
    set({ isSearchOpen: open });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  toggleStructureMastered: (id) => {
    const current = get().masteredStructureIds;
    const next = current.includes(id) 
      ? current.filter(x => x !== id)
      : [...current, id];
    set({ masteredStructureIds: next });
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_MASTERED, JSON.stringify(next));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  recordQuizAnswer: (questionId, answerIndex) => {
    const current = { ...get().quizAnswers, [questionId]: answerIndex };
    set({ quizAnswers: current });
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_QUIZ, JSON.stringify(current));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  resetQuizAnswers: () => {
    set({ quizAnswers: {} });
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_QUIZ);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  triggerCameraPreset: (presetName) => {
    set({ cameraPresetTarget: presetName });
    // Reset preset trigger after short tick
    setTimeout(() => {
      set({ cameraPresetTarget: null });
    }, 100);
  }
}));
