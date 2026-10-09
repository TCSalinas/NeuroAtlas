import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import { COURSE_UNITS } from '../../data/courseUnits';
import { VASCULAR_TERRITORIES, DEMENTIA_DIFFERENTIAL_MATRIX } from '../../data/clinicalCorrelates';
import { CORTICAL_LAYERS, BRODMANN_KEY_AREAS } from '../../data/cytoarchitecture';
import { QUIZ_QUESTIONS } from '../../data/quizBank';
import {
  CHARCOT_STRUCTURES,
  FLECHSIG_STRUCTURES,
  SAGITAL_STRUCTURES,
  ClassicalSliceType,
} from '../../data/classicalSlices';
import {
  Search,
  X,
  ChevronRight,
  Brain,
  Scissors,
  Activity,
  Layers,
  FileSpreadsheet,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

export type SearchCategoryFilter =
  | 'todos'
  | 'estructuras'
  | 'cortes'
  | 'vascular'
  | 'citoarquitectura'
  | 'demencias'
  | 'quiz'
  | 'unidades';

interface UnifiedSearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategoryFilter;
  categoryLabel: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  icon: any;
  matchReason?: string;
  actionText: string;
  onSelect: () => void;
}

export const OmniboxSearch: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    selectStructure,
    setIsolatedStructure,
    resetClipping,
    setActiveView,
    setActiveUnit,
    setActiveVascularFilter,
    triggerCameraPreset,
    setSelectedClassicalSlice,
    setSelectedSliceStructureKey,
    setDementiaFilterQuery,
    setSelectedLayerNum,
  } = useNeuroStore();

  const [activeCategory, setActiveCategory] = useState<SearchCategoryFilter>('todos');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut ⌘K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Auto focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  const query = searchQuery.trim().toLowerCase();

  const getCameraPreset = (structureId: string): string => {
    if (['hipocampo', 'amigdala', 'hipotalamo', 'cuerpo-calloso', 'talamo', 'ganglios-de-la-base'].includes(structureId)) {
      return 'medial_sagital';
    }
    if (structureId.includes('izquierdo')) return 'lateral_izq';
    if (structureId.includes('derecho')) return 'lateral_der';
    if (structureId === 'lobulo-occipital' || structureId === 'cerebelo') return 'posterior';
    return 'medial_sagital';
  };

  const handleSelectStructure3D = (structId: string) => {
    resetClipping();
    setActiveVascularFilter('all');
    setIsolatedStructure(null);
    selectStructure(structId);
    triggerCameraPreset(getCameraPreset(structId));
    setActiveView('atlas3d');
    setIsSearchOpen(false);
  };

  const handleSelectClassicalSlice = (slice: ClassicalSliceType, structKey?: string) => {
    setSelectedClassicalSlice(slice);
    if (structKey) {
      setSelectedSliceStructureKey(structKey);
    }
    setActiveView('cortes');
    setIsSearchOpen(false);
  };

  const handleSelectVascularTerritory = (territoryKey: any) => {
    resetClipping();
    setIsolatedStructure(null);
    selectStructure(null);
    setActiveVascularFilter(territoryKey);
    if (territoryKey === 'aca') triggerCameraPreset('medial_sagital');
    else if (territoryKey === 'acm_izq') triggerCameraPreset('lateral_izq');
    else if (territoryKey === 'acm_der') triggerCameraPreset('lateral_der');
    else if (territoryKey === 'acp') triggerCameraPreset('posterior');
    setActiveView('vascular');
    setIsSearchOpen(false);
  };

  const handleSelectLayer = (layerNum: number) => {
    setSelectedLayerNum(layerNum);
    setActiveView('citoarquitectura');
    setIsSearchOpen(false);
  };

  const handleSelectDementia = (dementiaName: string) => {
    setDementiaFilterQuery(dementiaName);
    setActiveView('demencias');
    setIsSearchOpen(false);
  };

  const handleSelectQuiz = () => {
    setActiveView('quiz');
    setIsSearchOpen(false);
  };

  const handleSelectUnit = (unitId: string) => {
    setActiveUnit(unitId);
    setActiveView('atlas3d');
    setIsSearchOpen(false);
  };

  const handleSelectAtlas2D = () => {
    setActiveView('atlas2d');
    setIsSearchOpen(false);
  };

  // Compile unified index of all searchable items across all pages
  const allResults = useMemo<UnifiedSearchResult[]>(() => {
    if (!query) return [];

    const list: UnifiedSearchResult[] = [];

    // 1. Navigation shortcuts to application sections if matching
    const appSections = [
      { name: 'Cerebro 3D Interactivo', keywords: ['3d', 'cerebro', 'modelo', 'orbita', 'rotar'], view: 'atlas3d' as const, icon: Brain },
      { name: 'Cortes Neuroanatómicos Clásicos', keywords: ['cortes', 'charcot', 'flechsig', 'sagital', 'coronal', 'axial', 'tajada'], view: 'cortes' as const, icon: Scissors },
      { name: 'Territorios Vasculares y ACV', keywords: ['vascular', 'acv', 'arterias', 'infarto', 'isquemia', 'willis', 'flujo'], view: 'vascular' as const, icon: Activity },
      { name: 'Citoarquitectura y Capas Neocorticales', keywords: ['citoarquitectura', 'capas', 'laminas', 'brodmann', 'corteza', 'baillarger', 'betz'], view: 'citoarquitectura' as const, icon: Layers },
      { name: 'Matriz Diagnóstica de Demencias', keywords: ['demencias', 'alzheimer', 'tabla 2', 'neurodegeneracion', 'criterios', 'diferencial'], view: 'demencias' as const, icon: FileSpreadsheet },
      { name: 'Autoevaluación Formativa (Quiz)', keywords: ['quiz', 'preguntas', 'autoevaluacion', 'test', 'examen', 'casos'], view: 'quiz' as const, icon: GraduationCap },
      { name: 'Atlas Anatómico 2D Accesible', keywords: ['2d', 'atlas 2d', 'accesible', 'taxonomia', 'limbico'], view: 'atlas2d' as const, icon: CheckCircle2 },
    ];

    for (const sec of appSections) {
      if (sec.name.toLowerCase().includes(query) || sec.keywords.some((k) => k.includes(query))) {
        list.push({
          id: `sec-${sec.view}`,
          title: sec.name,
          subtitle: `Sección principal del NeuroAtlas`,
          category: 'todos',
          categoryLabel: 'Sección',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-900',
          badgeBorder: 'border-amber-300',
          icon: sec.icon,
          matchReason: `Ir a la sección de ${sec.name}`,
          actionText: 'Ir a Sección ➜',
          onSelect: () => {
            setActiveView(sec.view);
            setIsSearchOpen(false);
          },
        });
      }
    }

    // 2. Search Anatomical Structures (3D)
    for (const s of ANATOMICAL_STRUCTURES) {
      const matchName = s.name.toLowerCase().includes(query);
      const matchSyn = s.synonyms.some((syn) => syn.toLowerCase().includes(query));
      const matchFunc = s.primaryFunctions.some((f) => f.toLowerCase().includes(query));
      const matchCog = s.associatedCognitiveProcesses.some((p) => p.toLowerCase().includes(query));
      const matchBrodmann = s.brodmannAreas?.some((b) => `area ${b}`.includes(query) || `ba ${b}`.includes(query) || `${b}` === query);
      const matchClin = s.clinicalCorrelates.find(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.syndrome.toLowerCase().includes(query) ||
          c.symptoms.some((sym) => sym.toLowerCase().includes(query))
      );

      if (matchName || matchSyn || matchFunc || matchCog || matchBrodmann || matchClin) {
        let matchReason = s.overview;
        if (matchClin) matchReason = `Correlato: ${matchClin.title} • ${matchClin.syndrome}`;
        else if (matchFunc) matchReason = `Función: ${s.primaryFunctions[0]}`;

        list.push({
          id: `struct-${s.id}`,
          title: s.name,
          subtitle: `${s.level.replace('_', ' • ')} • Lóbulo ${s.lobe} • Irrigación: ${s.vascularTerritory.toUpperCase()}`,
          category: 'estructuras',
          categoryLabel: 'Estructura 3D',
          badgeBg: 'bg-amber-50',
          badgeText: 'text-amber-900',
          badgeBorder: 'border-amber-300',
          icon: Brain,
          matchReason,
          actionText: 'Ver en Cerebro 3D ➜',
          onSelect: () => handleSelectStructure3D(s.id),
        });
      }
    }

    // 3. Search Classical Slices (Charcot, Flechsig, Sagital)
    const slicesEntries: { slice: ClassicalSliceType; sliceName: string; dict: typeof CHARCOT_STRUCTURES }[] = [
      { slice: 'charcot', sliceName: 'Corte de Charcot (Coronal)', dict: CHARCOT_STRUCTURES },
      { slice: 'flechsig', sliceName: 'Corte de Flechsig (Axial)', dict: FLECHSIG_STRUCTURES },
      { slice: 'sagital', sliceName: 'Corte Sagital Medial', dict: SAGITAL_STRUCTURES },
    ];

    for (const { slice, sliceName, dict } of slicesEntries) {
      if (sliceName.toLowerCase().includes(query) || slice.includes(query)) {
        list.push({
          id: `slice-full-${slice}`,
          title: sliceName,
          subtitle: `Corte neuroanatómico canónico de cátedra`,
          category: 'cortes',
          categoryLabel: 'Cortes Clásicos',
          badgeBg: 'bg-purple-100',
          badgeText: 'text-purple-900',
          badgeBorder: 'border-purple-300',
          icon: Scissors,
          matchReason: `Explora el plano completo y sus estructuras identificadas`,
          actionText: 'Abrir Corte ➜',
          onSelect: () => handleSelectClassicalSlice(slice),
        });
      }

      for (const [key, struct] of Object.entries(dict)) {
        const matchName = struct.name.toLowerCase().includes(query) || struct.latinName.toLowerCase().includes(query);
        const matchLoc = struct.sliceLocation.toLowerCase().includes(query);
        const matchFunc = struct.functionalRole.toLowerCase().includes(query);
        const matchClin = struct.clinicalSignificance.toLowerCase().includes(query);

        if (matchName || matchLoc || matchFunc || matchClin) {
          list.push({
            id: `slice-${slice}-${key}`,
            title: `${struct.name} (${sliceName.split(' ')[2]})`,
            subtitle: `${sliceName} • ${struct.latinName}`,
            category: 'cortes',
            categoryLabel: 'Cortes Clásicos',
            badgeBg: 'bg-purple-50',
            badgeText: 'text-purple-900',
            badgeBorder: 'border-purple-300',
            icon: Scissors,
            matchReason: matchClin ? `Clínica: ${struct.clinicalSignificance}` : struct.sliceLocation,
            actionText: 'Ver en Corte Clásico ➜',
            onSelect: () => handleSelectClassicalSlice(slice, key),
          });
        }
      }
    }

    // 4. Search Vascular Territories & Stroke Profiles
    for (const [key, t] of Object.entries(VASCULAR_TERRITORIES)) {
      const matchName = t.name.toLowerCase().includes(query) || t.artery.toLowerCase().includes(query) || key.includes(query);
      const matchRegions = t.irrigatedRegions.some((r) => r.toLowerCase().includes(query));
      const matchCog = t.cognitiveAndBehavioralProfile.some((p) => p.toLowerCase().includes(query));
      const matchSyn = t.characteristicSyndromes.some((s) => s.toLowerCase().includes(query));

      if (matchName || matchRegions || matchCog || matchSyn) {
        let matchReason = t.artery;
        if (matchSyn) {
          const found = t.characteristicSyndromes.find((s) => s.toLowerCase().includes(query));
          if (found) matchReason = `Síndrome: ${found}`;
        } else if (matchCog) {
          const found = t.cognitiveAndBehavioralProfile.find((p) => p.toLowerCase().includes(query));
          if (found) matchReason = `Perfil: ${found}`;
        }

        list.push({
          id: `vasc-${key}`,
          title: t.name,
          subtitle: `${t.artery} • ${t.characteristicSyndromes[0] || ''}`,
          category: 'vascular',
          categoryLabel: 'Territorios ACV',
          badgeBg: 'bg-rose-50',
          badgeText: 'text-rose-900',
          badgeBorder: 'border-rose-300',
          icon: Activity,
          matchReason,
          actionText: 'Ver Territorio ACV ➜',
          onSelect: () => handleSelectVascularTerritory(key),
        });
      }
    }

    // 5. Search Cytoarchitecture (Cortical Layers & Brodmann Areas)
    for (const layer of CORTICAL_LAYERS) {
      const matchName = layer.name.toLowerCase().includes(query) || `capa ${layer.number}`.includes(query) || `capa ${layer.roman.toLowerCase()}`.includes(query);
      const matchComp = layer.composition.toLowerCase().includes(query);
      const matchIn = layer.mainInputs.toLowerCase().includes(query);
      const matchOut = layer.mainOutputs.toLowerCase().includes(query);
      const matchFunc = layer.functionDescription.toLowerCase().includes(query);

      if (matchName || matchComp || matchIn || matchOut || matchFunc) {
        list.push({
          id: `layer-${layer.number}`,
          title: `Capa ${layer.roman}: ${layer.name}`,
          subtitle: `Citoarquitectura Isocortical • Espesor aprox: ${layer.thicknessMicrons} µm`,
          category: 'citoarquitectura',
          categoryLabel: 'Citoarquitectura',
          badgeBg: 'bg-amber-100/70',
          badgeText: 'text-amber-950',
          badgeBorder: 'border-amber-400',
          icon: Layers,
          matchReason: matchComp ? `Composición: ${layer.composition}` : layer.functionDescription,
          actionText: 'Ver Capa Cortical ➜',
          onSelect: () => handleSelectLayer(layer.number),
        });
      }
    }

    for (const b of BRODMANN_KEY_AREAS) {
      const matchArea = `area ${b.area}`.toLowerCase().includes(query) || `ba ${b.area}`.toLowerCase().includes(query) || `${b.area}` === query;
      const matchName = b.name.toLowerCase().includes(query);
      const matchLoc = b.location.toLowerCase().includes(query);
      const matchFunc = b.function.toLowerCase().includes(query);

      if (matchArea || matchName || matchLoc || matchFunc) {
        list.push({
          id: `brodmann-${b.area}`,
          title: `Área de Brodmann ${b.area}: ${b.name}`,
          subtitle: `Ubicación: ${b.location}`,
          category: 'citoarquitectura',
          categoryLabel: 'Brodmann',
          badgeBg: 'bg-amber-50',
          badgeText: 'text-amber-900',
          badgeBorder: 'border-amber-300',
          icon: Layers,
          matchReason: `Función neurofuncional: ${b.function}`,
          actionText: 'Ver en Citoarquitectura ➜',
          onSelect: () => {
            setActiveView('citoarquitectura');
            setIsSearchOpen(false);
          },
        });
      }
    }

    // 6. Search Dementia Differential Matrix (Tabla 2)
    for (const d of DEMENTIA_DIFFERENTIAL_MATRIX) {
      const matchName = d.name.toLowerCase().includes(query) || d.acronym.toLowerCase().includes(query);
      const matchClin = d.initialClinic.toLowerCase().includes(query);
      const matchCog = d.cognitiveProfile.toLowerCase().includes(query);
      const matchNeuro = d.neurologicalExam.toLowerCase().includes(query);
      const matchPsych = d.psychiatricFeatures.toLowerCase().includes(query);
      const matchImg = d.neuroimagingFindings.toLowerCase().includes(query);
      const matchPatho = d.pathophysiology.toLowerCase().includes(query);

      if (matchName || matchClin || matchCog || matchNeuro || matchPsych || matchImg || matchPatho) {
        let matchReason = d.initialClinic;
        if (matchPatho) matchReason = `Fisiopatología: ${d.pathophysiology}`;
        else if (matchImg) matchReason = `Neuroimagen: ${d.neuroimagingFindings}`;
        else if (matchCog) matchReason = `Cognitivo: ${d.cognitiveProfile}`;

        list.push({
          id: `dem-${d.id}`,
          title: `${d.name} (${d.acronym})`,
          subtitle: `Diagnóstico Diferencial • ${d.courseSlideReference}`,
          category: 'demencias',
          categoryLabel: 'Matriz Demencias',
          badgeBg: 'bg-blue-50',
          badgeText: 'text-blue-900',
          badgeBorder: 'border-blue-300',
          icon: FileSpreadsheet,
          matchReason,
          actionText: 'Ver en Matriz Demencias ➜',
          onSelect: () => handleSelectDementia(d.name),
        });
      }
    }

    // 7. Search Quiz Clinical Questions
    for (const q of QUIZ_QUESTIONS) {
      const matchQ = q.question.toLowerCase().includes(query);
      const matchExp = q.explanation.toLowerCase().includes(query);
      const matchOpts = q.options.some((o) => o.toLowerCase().includes(query));

      if (matchQ || matchExp || matchOpts) {
        list.push({
          id: `quiz-${q.id}`,
          title: `Pregunta: ${q.question.slice(0, 75)}...`,
          subtitle: `Autoevaluación Formativa • ${q.unitId.toUpperCase()}`,
          category: 'quiz',
          categoryLabel: 'Quiz Clínico',
          badgeBg: 'bg-emerald-50',
          badgeText: 'text-emerald-900',
          badgeBorder: 'border-emerald-300',
          icon: GraduationCap,
          matchReason: `Explicación clave: ${q.explanation.slice(0, 110)}...`,
          actionText: 'Ir a Autoevaluación ➜',
          onSelect: handleSelectQuiz,
        });
      }
    }

    // 8. Search Course Units
    for (const u of COURSE_UNITS) {
      const matchTitle = u.title.toLowerCase().includes(query);
      const matchDesc = u.description.toLowerCase().includes(query);
      const matchTopics = u.keyTopics.some((t) => t.toLowerCase().includes(query));

      if (matchTitle || matchDesc || matchTopics) {
        list.push({
          id: `unit-${u.id}`,
          title: `Unidad ${u.unitNumber}: ${u.title}`,
          subtitle: `${u.description}`,
          category: 'unidades',
          categoryLabel: 'Unidad Cátedra',
          badgeBg: 'bg-teal-50',
          badgeText: 'text-teal-900',
          badgeBorder: 'border-teal-300',
          icon: BookOpen,
          matchReason: `Temas clave: ${u.keyTopics.slice(0, 3).join(', ')}`,
          actionText: 'Ver Unidad ➜',
          onSelect: () => handleSelectUnit(u.id),
        });
      }
    }

    // 9. Search Accessible 2D Atlas
    if (
      'atlas 2d accesible'.includes(query) ||
      'sistema limbico'.includes(query) ||
      'circuito de papez'.includes(query) ||
      'taxonomia'.includes(query)
    ) {
      list.push({
        id: 'nav-atlas2d',
        title: 'Atlas Anatómico 2D Estructurado',
        subtitle: 'Sección con Sistema Límbico, Circuito de Papez y Taxonomía Funcional',
        category: 'todos',
        categoryLabel: 'Atlas 2D',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-900',
        badgeBorder: 'border-emerald-300',
        icon: ShieldCheck,
        matchReason: 'Navegación 2D sin aceleración con fichas completas',
        actionText: 'Abrir Atlas 2D ➜',
        onSelect: handleSelectAtlas2D,
      });
    }

    return list;
  }, [query]);

  // Filtered results based on category pill
  const filteredResults = useMemo(() => {
    if (activeCategory === 'todos') return allResults;
    return allResults.filter((r) => r.category === activeCategory);
  }, [allResults, activeCategory]);

  // Keyboard navigation for results list (ArrowDown, ArrowUp, Enter)
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredResults[selectedIndex];
      if (current) {
        current.onSelect();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(`[data-result-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isSearchOpen) return null;

  const categoriesCounts: Record<SearchCategoryFilter, number> = {
    todos: allResults.length,
    estructuras: allResults.filter((r) => r.category === 'estructuras').length,
    cortes: allResults.filter((r) => r.category === 'cortes').length,
    vascular: allResults.filter((r) => r.category === 'vascular').length,
    citoarquitectura: allResults.filter((r) => r.category === 'citoarquitectura').length,
    demencias: allResults.filter((r) => r.category === 'demencias').length,
    quiz: allResults.filter((r) => r.category === 'quiz').length,
    unidades: allResults.filter((r) => r.category === 'unidades').length,
  };

  const categoriesTabs: { id: SearchCategoryFilter; label: string; icon: any }[] = [
    { id: 'todos', label: 'Todos', icon: Sparkles },
    { id: 'estructuras', label: 'Cerebro 3D', icon: Brain },
    { id: 'cortes', label: 'Cortes Clásicos', icon: Scissors },
    { id: 'vascular', label: 'Territorios ACV', icon: Activity },
    { id: 'citoarquitectura', label: 'Citoarquitectura', icon: Layers },
    { id: 'demencias', label: 'Demencias (Tabla 2)', icon: FileSpreadsheet },
    { id: 'quiz', label: 'Autoevaluación', icon: GraduationCap },
    { id: 'unidades', label: 'Unidades', icon: BookOpen },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-4 pt-12 sm:pt-16 animate-fadeIn font-sans"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="bg-white border border-[#ded7c8] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-[#e8e2d5] bg-[#faf8f5] shrink-0">
          <Search className="w-5 h-5 text-amber-700 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar en todo: 3D, Cortes, Territorios ACV, Capas, Demencias, Quiz..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-[#ede7da] transition-colors"
              title="Borrar texto"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-[#ede7da] transition-colors"
            title="Cerrar buscador (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filter Pills */}
        {query && (
          <div className="flex items-center gap-1 px-3 py-2 border-b border-[#ece7dc] bg-[#f5f1e8] overflow-x-auto no-scrollbar shrink-0">
            {categoriesTabs.map((tab) => {
              const count = categoriesCounts[tab.id];
              const isActive = activeCategory === tab.id;
              if (tab.id !== 'todos' && count === 0) return null;

              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-amber-700 text-white' : 'bg-[#e2dcce] text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results Body */}
        <div ref={resultsContainerRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-xs min-h-[300px]">
          {/* Empty Query Initial Dashboard */}
          {!query && (
            <div className="py-4 px-2 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Buscador Global del NeuroAtlas
                </span>
                <p className="text-xs text-slate-600 font-medium">
                  Indexa todas las secciones del curso: modelo 3D, cortes de cátedra, vascular, capas y demencias.
                </p>
              </div>

              {/* Quick Jump Grid */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-1">
                  Acceso Rápido a Secciones
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'Cerebro 3D Interactivo', desc: 'Convexidad y estructuras profundas', icon: Brain, view: 'atlas3d' as const, color: 'text-amber-700 bg-amber-50 border-amber-200' },
                    { label: 'Cortes Clásicos (Charcot / Flechsig)', desc: 'Corte axial, coronal y sagital', icon: Scissors, view: 'cortes' as const, color: 'text-purple-700 bg-purple-50 border-purple-200' },
                    { label: 'Territorios Vasculares y ACV', desc: 'ACA, ACM, ACP e infartos cerebrales', icon: Activity, view: 'vascular' as const, color: 'text-rose-700 bg-rose-50 border-rose-200' },
                    { label: 'Citoarquitectura (Capas I-VI)', desc: 'Organización laminar y mapa Brodmann', icon: Layers, view: 'citoarquitectura' as const, color: 'text-amber-800 bg-amber-100/60 border-amber-300' },
                    { label: 'Matriz de Demencias (Tabla 2)', desc: 'Alzheimer, FTD, Lewy, Hakim-Adams', icon: FileSpreadsheet, view: 'demencias' as const, color: 'text-blue-700 bg-blue-50 border-blue-200' },
                    { label: 'Autoevaluación Formativa', desc: 'Banco de casos clínicos y examen', icon: GraduationCap, view: 'quiz' as const, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { label: 'Atlas 2D Accesible', desc: 'Sistema Límbico y Taxonomía', icon: CheckCircle2, view: 'atlas2d' as const, color: 'text-teal-700 bg-teal-50 border-teal-200' },
                  ].map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.view}
                        onClick={() => {
                          setActiveView(btn.view);
                          setIsSearchOpen(false);
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all hover:shadow-xs hover:scale-[1.01] ${btn.color}`}
                      >
                        <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate">{btn.label}</span>
                          <span className="text-[10px] text-slate-600 block truncate">{btn.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Popular Search Suggestions */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-1 mb-1.5">
                  Términos de Búsqueda Frecuentes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Broca',
                    'Gerstmann',
                    'Capa IV',
                    'Células de Betz',
                    'Hakim-Adams',
                    'Alzheimer',
                    'Cápsula Interna',
                    'ACM izquierda',
                    'Cuerpo Calloso',
                    'Hipocampo',
                    'Papez',
                    'Alexia sin agrafia',
                    'Locked-in',
                    'Corea de Huntington',
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-2 py-1 rounded-lg bg-white border border-[#ded7c8] text-slate-700 hover:text-amber-900 hover:border-amber-400 hover:bg-[#faf7f0] text-[11px] font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No Results Fallback */}
          {query && filteredResults.length === 0 && (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 text-sm">
                No se encontraron resultados para "{searchQuery}"
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Prueba buscando por nombre anatómico, síndrome clínico, capa cortical, tipo de corte o autor (ej. "Charcot", "Flechsig", "Mesulam", "Betz").
              </p>
            </div>
          )}

          {/* Results List */}
          {filteredResults.length > 0 && (
            <div className="space-y-1.5">
              {filteredResults.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;

                return (
                  <button
                    key={item.id}
                    data-result-index={idx}
                    onClick={item.onSelect}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full p-3 rounded-xl text-left border flex items-start justify-between gap-3 transition-all min-w-0 ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-400 shadow-xs ring-1 ring-amber-300'
                        : 'bg-white hover:bg-[#faf8f4] border-[#e6e1d6]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="mt-0.5 p-1.5 rounded-lg bg-[#f4efe4] border border-[#ded8cb] shrink-0 text-amber-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${item.badgeBg} ${item.badgeText} ${item.badgeBorder}`}>
                            {item.categoryLabel}
                          </span>
                          <span className="font-bold text-slate-900 text-sm truncate">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium truncate">
                          {item.subtitle}
                        </p>
                        {item.matchReason && (
                          <p className="text-[11px] text-slate-700 line-clamp-2 leading-relaxed bg-[#fbf9f5] p-1.5 rounded border border-[#f0ede6]">
                            {item.matchReason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pt-1">
                      <span className="hidden sm:inline text-[10px] font-bold text-amber-800">
                        {item.actionText}
                      </span>
                      <div className="p-1 rounded bg-[#ede7da] text-slate-700">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e8e2d5] bg-[#faf8f5] flex items-center justify-between text-[11px] text-slate-500 font-medium shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-[#d6cfbe] font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-[#d6cfbe] font-mono text-[10px]">↓</kbd>
              <span>Navegar</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-[#d6cfbe] font-mono text-[10px]">↵ Enter</kbd>
              <span>Seleccionar</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-[#d6cfbe] font-mono text-[10px]">ESC</kbd>
              <span>Cerrar</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-600 font-bold">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{allResults.length > 0 ? `${allResults.length} resultados` : 'Búsqueda unificada'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
