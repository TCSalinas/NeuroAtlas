import { create } from 'zustand';
import { ActiveAppView, VascularTerritoryId } from '../types/neuro';

export interface ClippingState {
  enabled: boolean;
  sagittalEnabled: boolean;
  sagittal: number; // -2 to 2 (X axis)
  coronalEnabled: boolean;
  coronal: number;  // -2 to 2 (Z axis)
  axialEnabled: boolean;
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
  selectedClassicalSlice: 'charcot' | 'flechsig' | 'sagital' | null;
  selectedSliceStructureKey: string | null;
  dementiaFilterQuery: string | null;
  selectedLayerNum: number | null;
  isSidebarOpen: boolean;
  
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
  setSelectedClassicalSlice: (slice: 'charcot' | 'flechsig' | 'sagital' | null) => void;
  setSelectedSliceStructureKey: (key: string | null) => void;
  setDementiaFilterQuery: (query: string | null) => void;
  setSelectedLayerNum: (layer: number | null) => void;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
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
  selectedStructureId: null,
  hoveredStructureId: null,
  activeView: 'atlas3d',
  activeUnitId: 'unidad-1',
  isXRayMode: false,
  isolatedStructureId: null,
  clipping: {
    enabled: false,
    sagittalEnabled: true,
    sagittal: 0,
    coronalEnabled: false,
    coronal: 0,
    axialEnabled: false,
    axial: 0,
  },
  activeVascularFilter: 'all',
  isSearchOpen: false,
  searchQuery: '',
  masteredStructureIds: loadStoredMastered(),
  quizAnswers: loadStoredQuiz(),
  cameraPresetTarget: null,
  selectedClassicalSlice: null,
  selectedSliceStructureKey: null,
  dementiaFilterQuery: null,
  selectedLayerNum: null,
  isSidebarOpen: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,

  selectStructure: (id) => {
    set((state) => ({
      selectedStructureId: id,
      // If deselecting structure (id === null) or switching, reset isolation so 3D view restores
      isolatedStructureId: id === null ? null : (state.isolatedStructureId === id ? state.isolatedStructureId : null),
    }));
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
        sagittalEnabled: true,
        sagittal: 0,
        coronalEnabled: false,
        coronal: 0,
        axialEnabled: false,
        axial: 0,
      }
    });
  },

  setActiveVascularFilter: (filter) => {
    set({
      activeVascularFilter: filter,
      // When activating a vascular territory, reset clipping cuts so the entire vascular distribution is intact and visible
      clipping: {
        enabled: false,
        sagittalEnabled: true,
        sagittal: 0,
        coronalEnabled: false,
        coronal: 0,
        axialEnabled: false,
        axial: 0,
      },
    });
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
  },

  setSelectedClassicalSlice: (slice) => set({ selectedClassicalSlice: slice }),
  setSelectedSliceStructureKey: (key) => set({ selectedSliceStructureKey: key }),
  setDementiaFilterQuery: (query) => set({ dementiaFilterQuery: query }),
  setSelectedLayerNum: (layer) => set({ selectedLayerNum: layer }),
  setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
