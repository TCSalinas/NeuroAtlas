import React, { useState, useEffect } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import {
  ClassicalSliceType,
  CHARCOT_STRUCTURES,
  FLECHSIG_STRUCTURES,
  SAGITAL_STRUCTURES,
} from '../../data/classicalSlices';
import {
  Scissors,
  Layers,
  Brain,
  Info,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const ClassicalSlicesView: React.FC = () => {
  const {
    selectStructure,
    setIsolatedStructure,
    setActiveView,
    triggerCameraPreset,
    updateClipping,
    selectedClassicalSlice,
    selectedSliceStructureKey,
  } = useNeuroStore();

  const [selectedSlice, setSelectedSlice] = useState<ClassicalSliceType>(selectedClassicalSlice || 'charcot');
  const [activeTab, setActiveTab] = useState<'esquema' | 'catedra'>('esquema');
  const [selectedStructureKey, setSelectedStructureKey] = useState<string>(selectedSliceStructureKey || 'capsula-interna');

  useEffect(() => {
    if (selectedClassicalSlice) {
      setSelectedSlice(selectedClassicalSlice);
    }
  }, [selectedClassicalSlice]);

  useEffect(() => {
    if (selectedSliceStructureKey) {
      setSelectedStructureKey(selectedSliceStructureKey);
    }
  }, [selectedSliceStructureKey]);

  const handleGoTo3D = (_structureId?: string) => {
    // User requirement: "cuando en la seccion de cortesclasicos eligo ver en modelo 3d, deberia des-seleccionarse la parte del cerebro."
    // Clear selection and isolation so the entire sliced brain is visible in full color and solid cross section!
    selectStructure(null);
    setIsolatedStructure(null);

    // Configure cutting plane for this classical slice
    if (selectedSlice === 'charcot') {
      updateClipping({
        enabled: true,
        sagittalEnabled: false,
        coronalEnabled: true,
        coronal: 0.05,
        axialEnabled: false,
      });
      triggerCameraPreset('anterior');
    } else if (selectedSlice === 'flechsig') {
      updateClipping({
        enabled: true,
        sagittalEnabled: false,
        coronalEnabled: false,
        axialEnabled: true,
        axial: 0.15,
      });
      triggerCameraPreset('superior');
    } else if (selectedSlice === 'sagital') {
      updateClipping({
        enabled: true,
        sagittalEnabled: true,
        sagittal: 0.0,
        coronalEnabled: false,
        axialEnabled: false,
      });
      triggerCameraPreset('medial_sagital');
    }
    setActiveView('atlas3d');
  };

  // Structures metadata for each slice (imported from centralized data)
  const charcotStructures = CHARCOT_STRUCTURES;
  const flechsigStructures = FLECHSIG_STRUCTURES;
  const sagitalStructures = SAGITAL_STRUCTURES;

  const currentDict =
    selectedSlice === 'charcot'
      ? charcotStructures
      : selectedSlice === 'flechsig'
      ? flechsigStructures
      : sagitalStructures;

  const currentStructure = currentDict[selectedStructureKey] || Object.values(currentDict)[0];

  return (
    <div className="w-full h-full flex flex-col bg-[#faf8f5] overflow-y-auto font-sans text-slate-800">
      {/* Header bar */}
      <div className="bg-white/90 border-b border-[#e6e1d6] px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-0 z-10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
              <Scissors className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Cortes Neuroanatómicos Clásicos
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-200">
              Charcot • Flechsig • Sagital Medial
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Estudio de la configuración interna del encéfalo, ganglios de la base, cápsula interna y vías de proyección del curso.
          </p>
        </div>

        {/* Slice Selection Pills */}
        <div className="flex items-center gap-1.5 bg-[#f4f0e8] p-1.5 rounded-xl border border-[#e6e1d6]">
          <button
            onClick={() => {
              setSelectedSlice('charcot');
              setSelectedStructureKey('capsula-interna');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSlice === 'charcot'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            1. Corte de Charcot (Coronal)
          </button>
          <button
            onClick={() => {
              setSelectedSlice('flechsig');
              setSelectedStructureKey('capsula-interna-v');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSlice === 'flechsig'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            2. Corte de Flechsig (Axial)
          </button>
          <button
            onClick={() => {
              setSelectedSlice('sagital');
              setSelectedStructureKey('cuerpo-calloso-arco');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSlice === 'sagital'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            3. Sagital Medial
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Diagram or Course Slide (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Sub-tabs: Esquema Interactivo vs Diapositiva de Cátedra */}
          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-[#e6e1d6] shadow-sm">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('esquema')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'esquema'
                    ? 'bg-purple-100 text-purple-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Esquema Anatómico Interactivo</span>
              </button>
              <button
                onClick={() => setActiveTab('catedra')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'catedra'
                    ? 'bg-purple-100 text-purple-800'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Figura Original de Cátedra (PDF)</span>
              </button>
            </div>

            <button
              onClick={() => handleGoTo3D(currentStructure.linked3DStructureId)}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition-all shadow-sm"
              title="Alinear el corte en el visor 3D"
            >
              <Brain className="w-3.5 h-3.5 text-amber-600" />
              <span>Ver en Modelo 3D</span>
            </button>
          </div>

          {/* Diagram Canvas Box */}
          <div className="bg-white rounded-2xl border border-[#e6e1d6] p-6 shadow-sm flex flex-col items-center justify-center relative min-h-[460px]">
            {activeTab === 'esquema' ? (
              <div className="w-full flex flex-col items-center">
                {/* SVG DIAGRAM: CORTE DE CHARCOT CON RELLENOS ANATÓMICOS */}
                {selectedSlice === 'charcot' && (
                  <div className="w-full max-w-lg aspect-square relative select-none">
                    <svg viewBox="0 0 540 520" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="charcotCortexGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#dcd4c8" />
                          <stop offset="100%" stopColor="#cfc7b9" />
                        </linearGradient>
                        <linearGradient id="charcotWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="100%" stopColor="#faf6ec" />
                        </linearGradient>
                        <linearGradient id="charcotCapsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#93c5fd" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <linearGradient id="charcotCsfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#bae6fd" />
                          <stop offset="100%" stopColor="#7dd3fc" />
                        </linearGradient>
                      </defs>

                      {/* 1. Outer Cortical Ribbon: Sustancia Gris Neocortical (3-4 mm) */}
                      <path
                        d="M 270,45 
                           C 310,45 345,55 375,70 C 405,85 435,115 455,150 C 475,185 485,225 480,265 C 475,305 455,340 435,370 C 415,400 375,430 345,435 C 320,440 310,395 300,370 C 290,345 280,330 270,330 C 260,330 250,345 240,370 C 230,395 220,440 195,435 C 165,430 125,400 105,370 C 85,340 65,305 60,265 C 55,225 65,185 85,150 C 105,115 135,85 165,70 C 195,55 230,45 270,45 Z"
                        fill="url(#charcotCortexGrad)"
                        stroke="#8c8275"
                        strokeWidth="3.5"
                      />

                      {/* Sulcal Indentations in Gray Matter */}
                      <path d="M 60,250 C 120,255 160,265 175,280" fill="none" stroke="#8c8275" strokeWidth="3" />
                      <path d="M 480,250 C 420,255 380,265 365,280" fill="none" stroke="#8c8275" strokeWidth="3" />
                      <line x1="270" y1="45" x2="270" y2="140" stroke="#8c8275" strokeWidth="3.5" />

                      {/* 2. Subcortical White Matter Core: Sustancia Blanca (Centrum Semiovale) */}
                      <path
                        d="M 270,68
                           C 305,68 335,78 360,92 C 385,106 412,132 430,162 C 448,192 456,224 452,255 C 448,286 432,316 415,342 C 398,368 365,395 340,398 C 322,400 315,372 306,352 C 298,332 288,318 270,318 C 252,318 242,332 234,352 C 225,372 218,400 200,398 C 175,395 142,368 125,342 C 108,316 92,286 88,255 C 84,224 92,192 110,162 C 128,132 155,106 180,92 C 205,78 235,68 270,68 Z"
                        fill="url(#charcotWhiteGrad)"
                        stroke="#d6d0c4"
                        strokeWidth="1.5"
                      />

                      {/* 3. Corpus Callosum (Filled Commissural Bridge) */}
                      <path
                        d="M 205,140 C 235,130 305,130 335,140 C 345,155 315,164 270,164 C 225,164 195,155 205,140 Z"
                        fill={selectedStructureKey === 'cuerpo-calloso' ? '#f59e0b' : '#cbd5e1'}
                        stroke="#475569"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('cuerpo-calloso')}
                      />

                      {/* 4. Lateral Ventricles (Frontal Horns filled with CSF) */}
                      <path
                        d="M 255,166 C 230,186 225,225 255,255 C 265,220 265,185 265,166 Z"
                        fill="url(#charcotCsfGrad)"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 285,166 C 310,186 315,225 285,255 C 275,220 275,185 275,166 Z"
                        fill="url(#charcotCsfGrad)"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />

                      {/* Third Ventricle (Filled central slit) */}
                      <ellipse cx="270" cy="250" rx="3.5" ry="38" fill="url(#charcotCsfGrad)" stroke="#3b82f6" strokeWidth="1" />

                      {/* 5. Caudate Nucleus (Filled bulge in lateral ventricle wall) */}
                      <ellipse
                        cx="228"
                        cy="192"
                        rx="18"
                        ry="24"
                        fill={selectedStructureKey === 'nucleo-caudado' ? '#f59e0b' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('nucleo-caudado')}
                      />
                      <ellipse
                        cx="312"
                        cy="192"
                        rx="18"
                        ry="24"
                        fill={selectedStructureKey === 'nucleo-caudado' ? '#f59e0b' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('nucleo-caudado')}
                      />

                      {/* 6. Internal Capsule (Solid filled projection tract band) */}
                      <polygon
                        points="212,175 192,285 212,290 230,180"
                        fill={selectedStructureKey === 'capsula-interna' ? '#f59e0b' : 'url(#charcotCapsuleGrad)'}
                        stroke="#2563eb"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('capsula-interna')}
                      />
                      <polygon
                        points="328,175 348,285 328,290 310,180"
                        fill={selectedStructureKey === 'capsula-interna' ? '#f59e0b' : 'url(#charcotCapsuleGrad)'}
                        stroke="#2563eb"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('capsula-interna')}
                      />

                      {/* 7. Lenticular: Globus Pallidus (Medial triangular apex) */}
                      <polygon
                        points="190,225 160,238 160,272 190,282"
                        fill={selectedStructureKey === 'globo-palido' ? '#f59e0b' : '#ddd6fe'}
                        stroke="#9333ea"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('globo-palido')}
                      />
                      <polygon
                        points="350,225 380,238 380,272 350,282"
                        fill={selectedStructureKey === 'globo-palido' ? '#f59e0b' : '#ddd6fe'}
                        stroke="#9333ea"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('globo-palido')}
                      />

                      {/* 8. Lenticular: Putamen (Lateral convex filled mass) */}
                      <path
                        d="M 158,230 C 125,242 125,274 158,282 Z"
                        fill={selectedStructureKey === 'putamen' ? '#f59e0b' : '#c4b5fd'}
                        stroke="#7c3aed"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('putamen')}
                      />
                      <path
                        d="M 382,230 C 415,242 415,274 382,282 Z"
                        fill={selectedStructureKey === 'putamen' ? '#f59e0b' : '#c4b5fd'}
                        stroke="#7c3aed"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('putamen')}
                      />

                      {/* 9. Thalamus (Filled egg masses flanking 3rd ventricle) */}
                      <ellipse
                        cx="244"
                        cy="252"
                        rx="22"
                        ry="28"
                        fill={selectedStructureKey === 'talamo' ? '#f59e0b' : '#fef08a'}
                        stroke="#ca8a04"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('talamo')}
                      />
                      <ellipse
                        cx="296"
                        cy="252"
                        rx="22"
                        ry="28"
                        fill={selectedStructureKey === 'talamo' ? '#f59e0b' : '#fef08a'}
                        stroke="#ca8a04"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('talamo')}
                      />

                      {/* 10. Insular Cortex (Filled strip in Sylvian fissure) */}
                      <path
                        d="M 112,242 C 105,260 105,280 112,298 L 118,296 C 112,280 112,260 118,244 Z"
                        fill={selectedStructureKey === 'insula' ? '#f59e0b' : '#f43f5e'}
                        stroke="#be123c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('insula')}
                      />
                      <path
                        d="M 428,242 C 435,260 435,280 428,298 L 422,296 C 428,280 428,260 422,244 Z"
                        fill={selectedStructureKey === 'insula' ? '#f59e0b' : '#f43f5e'}
                        stroke="#be123c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('insula')}
                      />

                      {/* 11. Hippocampus (Filled spiral in temporal horn floor) */}
                      <path
                        d="M 215,365 C 195,380 178,368 180,350 C 182,332 200,332 212,348 Z"
                        fill={selectedStructureKey === 'hipocampo' ? '#f59e0b' : '#99f6e4'}
                        stroke="#0d9488"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('hipocampo')}
                      />
                      <path
                        d="M 325,365 C 345,380 362,368 360,350 C 358,332 340,332 328,348 Z"
                        fill={selectedStructureKey === 'hipocampo' ? '#f59e0b' : '#99f6e4'}
                        stroke="#0d9488"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('hipocampo')}
                      />
                    </svg>
                  </div>
                )}

                {/* SVG DIAGRAM: CORTE DE FLECHSIG (AXIAL CON RELLENOS COMPLETOS) */}
                {selectedSlice === 'flechsig' && (
                  <div className="w-full max-w-lg aspect-square relative select-none">
                    <svg viewBox="0 0 540 520" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="flechsigCortexGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#dcd4c8" />
                          <stop offset="100%" stopColor="#cfc7b9" />
                        </linearGradient>
                        <linearGradient id="flechsigWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="100%" stopColor="#faf6ec" />
                        </linearGradient>
                        <linearGradient id="flechsigCapsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#93c5fd" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <linearGradient id="flechsigCsfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#bae6fd" />
                          <stop offset="100%" stopColor="#7dd3fc" />
                        </linearGradient>
                      </defs>

                      {/* 1. Outer Cortical Ribbon: Sustancia Gris (Axial Profile) */}
                      <ellipse cx="270" cy="260" rx="205" ry="230" fill="url(#flechsigCortexGrad)" stroke="#8c8275" strokeWidth="3.5" />

                      {/* Interhemispheric Anterior & Posterior Fissures */}
                      <line x1="270" y1="30" x2="270" y2="135" stroke="#8c8275" strokeWidth="3" />
                      <line x1="270" y1="385" x2="270" y2="490" stroke="#8c8275" strokeWidth="3" />

                      {/* 2. Subcortical White Matter Core: Sustancia Blanca (Centrum Semiovale) */}
                      <ellipse cx="270" cy="260" rx="185" ry="210" fill="url(#flechsigWhiteGrad)" stroke="#d6d0c4" strokeWidth="1.5" />

                      {/* 3. Genu of Corpus Callosum (Filled Anterior Arch) */}
                      <path
                        d="M 230,145 C 255,125 285,125 310,145 C 300,160 280,152 260,152 C 240,152 240,160 230,145 Z"
                        fill={selectedStructureKey === 'genu-calloso' ? '#f59e0b' : '#cbd5e1'}
                        stroke="#475569"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('genu-calloso')}
                      />

                      {/* 4. Splenium of Corpus Callosum (Filled Posterior Thick Arch) */}
                      <path
                        d="M 215,360 C 250,375 290,375 325,360 C 335,375 305,390 270,390 C 235,390 205,375 215,360 Z"
                        fill={selectedStructureKey === 'splenium-calloso' ? '#f59e0b' : '#475569'}
                        stroke="#334155"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('splenium-calloso')}
                      />

                      {/* 5. Lateral Ventricles (Frontal & Occipital Horns with CSF) */}
                      <path d="M 255,155 C 240,180 240,210 255,230 Z" fill="url(#flechsigCsfGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                      <path d="M 285,155 C 300,180 300,210 285,230 Z" fill="url(#flechsigCsfGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                      <path d="M 250,330 C 235,355 235,375 245,395 Z" fill="url(#flechsigCsfGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                      <path d="M 290,330 C 305,355 305,375 295,395 Z" fill="url(#flechsigCsfGrad)" stroke="#38bdf8" strokeWidth="1.5" />

                      {/* 6. Caudate Head (Filled oval anterior medial to internal capsule) */}
                      <ellipse
                        cx="230"
                        cy="195"
                        rx="16"
                        ry="22"
                        fill={selectedStructureKey === 'cabeza-caudado' ? '#f59e0b' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('cabeza-caudado')}
                      />
                      <ellipse
                        cx="310"
                        cy="195"
                        rx="16"
                        ry="22"
                        fill={selectedStructureKey === 'cabeza-caudado' ? '#f59e0b' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('cabeza-caudado')}
                      />

                      {/* 7. INTERNAL CAPSULE: Solid Filled Band in "V" */}
                      {/* Left "V" polygon */}
                      <polygon
                        points="215,160 178,225 215,310 230,305 194,225 228,165"
                        fill={selectedStructureKey === 'capsula-interna-v' ? '#f59e0b' : 'url(#flechsigCapsuleGrad)'}
                        stroke="#2563eb"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('capsula-interna-v')}
                      />
                      {/* Right "V" polygon */}
                      <polygon
                        points="325,160 362,225 325,310 310,305 346,225 312,165"
                        fill={selectedStructureKey === 'capsula-interna-v' ? '#f59e0b' : 'url(#flechsigCapsuleGrad)'}
                        stroke="#2563eb"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('capsula-interna-v')}
                      />

                      {/* 8. Lenticular: Globus Pallidus (Medial triangular apex) */}
                      <polygon
                        points="180,215 155,225 155,260 180,270"
                        fill={selectedStructureKey === 'globo-palido' ? '#f59e0b' : '#ddd6fe'}
                        stroke="#9333ea"
                        strokeWidth="1.5"
                        className="cursor-pointer"
                        onClick={() => setSelectedStructureKey('putamen')}
                      />
                      <polygon
                        points="360,215 385,225 385,260 360,270"
                        fill={selectedStructureKey === 'globo-palido' ? '#f59e0b' : '#ddd6fe'}
                        stroke="#9333ea"
                        strokeWidth="1.5"
                        className="cursor-pointer"
                        onClick={() => setSelectedStructureKey('putamen')}
                      />

                      {/* 9. Lenticular: Putamen (Filled lateral mass in the V angle) */}
                      <path
                        d="M 154,212 C 122,235 122,268 154,285 C 160,255 160,235 154,212 Z"
                        fill={selectedStructureKey === 'putamen' ? '#f59e0b' : '#c4b5fd'}
                        stroke="#7c3aed"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('putamen')}
                      />
                      <path
                        d="M 386,212 C 418,235 418,268 386,285 C 380,255 380,235 386,212 Z"
                        fill={selectedStructureKey === 'putamen' ? '#f59e0b' : '#c4b5fd'}
                        stroke="#7c3aed"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('putamen')}
                      />

                      {/* 10. Thalamus (Filled posterior medial mass) */}
                      <ellipse
                        cx="245"
                        cy="282"
                        rx="24"
                        ry="32"
                        fill={selectedStructureKey === 'talamo' ? '#f59e0b' : '#fef08a'}
                        stroke="#ca8a04"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('talamo')}
                      />
                      <ellipse
                        cx="295"
                        cy="282"
                        rx="24"
                        ry="32"
                        fill={selectedStructureKey === 'talamo' ? '#f59e0b' : '#fef08a'}
                        stroke="#ca8a04"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('talamo')}
                      />
                    </svg>
                  </div>
                )}

                {/* SVG DIAGRAM: CORTE SAGITAL MEDIAL CON RELLENOS ANATÓMICOS */}
                {selectedSlice === 'sagital' && (
                  <div className="w-full max-w-lg aspect-square relative select-none">
                    <svg viewBox="0 0 540 520" className="w-full h-full drop-shadow-md">
                      <defs>
                        <linearGradient id="sagitalCortexGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#dcd4c8" />
                          <stop offset="100%" stopColor="#cfc7b9" />
                        </linearGradient>
                        <linearGradient id="sagitalWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="100%" stopColor="#faf6ec" />
                        </linearGradient>
                        <linearGradient id="sagitalCsfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#bae6fd" />
                          <stop offset="100%" stopColor="#7dd3fc" />
                        </linearGradient>
                        <linearGradient id="sagitalBrainstemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fef3c7" />
                          <stop offset="100%" stopColor="#fde68a" />
                        </linearGradient>
                      </defs>

                      {/* 1. Medial Neocortex Ribbon: Sustancia Gris Medial (3-4 mm) */}
                      <path
                        d="M 80,265
                           C 70,220 85,160 120,115 C 160,70 215,50 270,50 C 335,50 395,75 435,120 C 470,160 480,215 470,265 C 460,310 430,340 395,350 C 365,355 345,340 330,315 C 320,295 305,280 290,280 C 275,280 250,295 240,315 C 230,335 205,345 180,340 C 150,335 110,320 90,295 C 80,285 80,275 80,265 Z"
                        fill="url(#sagitalCortexGrad)"
                        stroke="#8c8275"
                        strokeWidth="3.5"
                      />

                      {/* Medial Sulcal Indentations (Surco parietooccipital, surco calcarino, surco central) */}
                      <path d="M 385,85 C 350,140 320,170 300,185" fill="none" stroke="#8c8275" strokeWidth="2.5" />
                      <path d="M 470,265 C 420,265 375,275 345,285" fill="none" stroke="#8c8275" strokeWidth="2.5" />
                      <path d="M 270,50 C 265,95 255,130 250,150" fill="none" stroke="#8c8275" strokeWidth="2" />

                      {/* 2. Subcortical Medial White Matter Core: Sustancia Blanca Subcortical */}
                      <path
                        d="M 98,258
                           C 90,222 102,172 132,132 C 168,92 218,74 268,74 C 328,74 382,96 418,136 C 448,172 458,220 448,258 C 438,296 412,324 382,332 C 358,336 340,322 328,302 C 318,284 302,270 288,270 C 274,270 254,284 244,302 C 234,320 212,328 190,324 C 164,320 128,306 108,284 C 98,274 98,266 98,258 Z"
                        fill="url(#sagitalWhiteGrad)"
                        stroke="#d6d0c4"
                        strokeWidth="1.5"
                      />

                      {/* 3. Cingulate Gyrus: Giro del Cíngulo (Solid Paralimbic Ribbon) */}
                      <path
                        d="M 180,248
                           C 155,232 145,188 170,152 C 200,118 250,110 295,114 C 340,118 378,144 388,185 C 394,212 384,242 360,256
                           C 342,238 348,212 344,196 C 336,168 308,148 274,146 C 238,144 204,152 188,176 C 176,194 178,224 192,238 Z"
                        fill={selectedStructureKey === 'giro-cingulado' ? '#f59e0b' : '#fde68a'}
                        stroke="#d97706"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('giro-cingulado')}
                      />

                      {/* 4. Corpus Callosum: Cuerpo Calloso (Arco Comisural Sólido Completo) */}
                      {/* Rostrum, Genu, Truncus & Splenium in anatomical C-profile */}
                      <path
                        d="M 194,244
                           C 178,244 162,228 162,204 C 162,176 186,158 220,154 C 260,150 304,154 336,172 C 352,182 358,202 350,222 C 344,236 328,240 318,226 C 308,210 296,192 268,188 C 238,184 206,188 194,204 C 188,214 194,228 202,234 Z"
                        fill={selectedStructureKey === 'cuerpo-calloso-arco' ? '#f59e0b' : '#cbd5e1'}
                        stroke="#475569"
                        strokeWidth="2.5"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('cuerpo-calloso-arco')}
                      />

                      {/* 5. Septum Pellucidum (Thin medial curtain) */}
                      <path d="M 194,204 C 205,224 230,230 255,230 L 255,210 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

                      {/* 6. Fornix: Fórnix (Commissural & projection arch descending to mammillary bodies) */}
                      <path
                        d="M 318,226 C 295,215 260,215 240,230 C 230,240 230,258 238,272"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* 7. Thalamus: Tálamo (Solid Oval Nuclear Center) */}
                      <ellipse
                        cx="272"
                        cy="242"
                        rx="30"
                        ry="22"
                        fill={selectedStructureKey === 'talamo' ? '#f59e0b' : '#fef08a'}
                        stroke="#ca8a04"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('talamo')}
                      />
                      {/* Adhesio interthalamica (Massa intermedia) */}
                      <circle cx="272" cy="242" r="5" fill="#a16207" />

                      {/* 8. Hypothalamus & Mammillary Body: Hipotálamo */}
                      <polygon
                        points="238,252 270,252 258,284 228,274"
                        fill={selectedStructureKey === 'hipotalamo' ? '#f59e0b' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('hipotalamo')}
                      />
                      {/* Mammillary Body */}
                      <circle cx="258" cy="284" r="4.5" fill="#c2410c" />
                      {/* Optic Chiasm */}
                      <circle cx="228" cy="274" r="4.5" fill="#f97316" />

                      {/* 9. Fourth Ventricle: Cuarto Ventrículo (Tent-shaped CSF space) */}
                      <polygon points="280,340 310,360 280,390" fill="url(#sagitalCsfGrad)" stroke="#38bdf8" strokeWidth="1.5" />

                      {/* 10. Brainstem: Tronco Encefálico (Mesencéfalo, Vientre Pontino y Bulbo Raquídeo) */}
                      <path
                        d="M 256,286
                           L 282,286
                           C 292,305 292,320 280,338
                           C 280,340 280,390 274,455
                           L 238,455
                           C 238,400 240,380 236,368
                           C 220,350 218,322 232,305
                           Z"
                        fill={selectedStructureKey === 'tronco-encefalico' ? '#f59e0b' : 'url(#sagitalBrainstemGrad)'}
                        stroke="#ca8a04"
                        strokeWidth="2.5"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('tronco-encefalico')}
                      />
                      {/* Tectum / Colliculi on dorsal midbrain */}
                      <path d="M 284,295 C 292,298 292,308 284,312" fill="#ca8a04" stroke="#a16207" strokeWidth="1" />
                      {/* Transverse pontine fibers detail */}
                      <path d="M 226,335 C 245,340 265,340 278,335" fill="none" stroke="#eab308" strokeWidth="1.5" opacity="0.6" />

                      {/* 11. Cerebellum: Cerebelo con Árbol de la Vida (Arbor Vitae) */}
                      {/* Solid Cerebellar Cortex Folia Profile */}
                      <path
                        d="M 285,335
                           C 305,310 338,300 372,308
                           C 408,318 424,350 416,386
                           C 406,420 370,436 332,430
                           C 305,425 285,405 280,392
                           Z"
                        fill={selectedStructureKey === 'cerebelo-arbor' ? '#f59e0b' : '#cbd5e1'}
                        stroke="#475569"
                        strokeWidth="2.5"
                        className="cursor-pointer transition-all hover:brightness-110"
                        onClick={() => setSelectedStructureKey('cerebelo-arbor')}
                      />

                      {/* Cerebellar Horizontal Folia Ridges */}
                      <path d="M 320,314 C 360,320 395,335 412,356" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
                      <path d="M 312,418 C 350,422 385,410 408,390" fill="none" stroke="#94a3b8" strokeWidth="1.2" />

                      {/* Arbor Vitae (Árbol de la Vida): White Matter Core & Branching Twigs */}
                      <g stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round">
                        {/* Main trunk radiating from hilum */}
                        <path d="M 292,364 Q 325,364 350,360" fill="none" strokeWidth="4" />
                        {/* Primary superior branch */}
                        <path d="M 325,364 Q 340,335 365,325" fill="none" strokeWidth="2.8" />
                        <path d="M 345,336 Q 360,326 385,332" fill="none" strokeWidth="1.8" />
                        <path d="M 358,348 Q 382,342 398,348" fill="none" strokeWidth="1.8" />
                        {/* Primary horizontal branch */}
                        <path d="M 350,360 Q 375,360 398,368" fill="none" strokeWidth="2.5" />
                        {/* Primary inferior branch */}
                        <path d="M 330,364 Q 345,392 370,405" fill="none" strokeWidth="2.8" />
                        <path d="M 348,388 Q 370,390 390,384" fill="none" strokeWidth="1.8" />
                        <path d="M 358,400 Q 375,416 388,410" fill="none" strokeWidth="1.8" />
                      </g>
                    </svg>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  💡 Haz clic en cualquier estructura de la lámina para examinar su función, límites anatómicos y correlato clínico de cátedra.
                </p>
              </div>
            ) : (
              /* REAL COURSE SLIDE FIGURE */
              <div className="w-full flex flex-col items-center">
                {selectedSlice === 'charcot' && (
                  <div className="w-full flex flex-col items-center">
                    <img
                      src="./assets/figures/slide_tractos.png"
                      alt="Corte Coronal de Cátedra"
                      className="max-h-[380px] object-contain rounded-xl shadow-sm border border-slate-200"
                    />
                    <div className="mt-3 text-center">
                      <span className="text-xs font-bold text-slate-800">
                        Figure 13.21: Coronal section of the cerebral hemisphere
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Fuente: -1656795872_Panoramica neurofuncional .pdf (Diapositiva 7). Muestra la Cápsula Interna, Cuerpo Calloso, Cíngulo y Fascículos de asociación.
                      </p>
                    </div>
                  </div>
                )}

                {selectedSlice === 'flechsig' && (
                  <div className="w-full flex flex-col items-center">
                    <img
                      src="./assets/figures/slide_ganglios.png"
                      alt="Ganglios de la base y tálamo"
                      className="max-h-[380px] object-contain rounded-xl shadow-sm border border-slate-200"
                    />
                    <div className="mt-3 text-center">
                      <span className="text-xs font-bold text-slate-800">
                        FIGURE 5.14: Overview of the thalamus and basal ganglia loop
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Fuente: -1656795872_Panoramica neurofuncional .pdf (Diapositiva 19). Muestra la disposición del caudado, putamen y tálamo seccionados en corte axial.
                      </p>
                    </div>
                  </div>
                )}

                {selectedSlice === 'sagital' && (
                  <div className="w-full flex flex-col items-center">
                    <img
                      src="./assets/figures/slide_limbico.png"
                      alt="Corte Sagital Medial del Sistema Límbico"
                      className="max-h-[380px] object-contain rounded-xl shadow-sm border border-slate-200"
                    />
                    <div className="mt-3 text-center">
                      <span className="text-xs font-bold text-slate-800">
                        FIGURE 2.26: The human limbic system (Medial View)
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Fuente: -1656795872_Panoramica neurofuncional .pdf (Diapositiva 16). Vista sagital medial con el Cuerpo Calloso, Giro Cingulado, Tálamo, Hipocampo y Amígdala.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Structure Clinical & Pedagogical Dossier (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#e6e1d6] p-6 shadow-sm flex flex-col gap-4">
            <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
                  Estructura Seleccionada
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {currentStructure.name}
                </h3>
                <p className="text-xs italic text-slate-400 font-serif">
                  {currentStructure.latinName}
                </p>
              </div>

              <div
                className="w-4 h-4 rounded-full mt-1 shrink-0 border border-slate-200 shadow-sm"
                style={{ backgroundColor: currentStructure.colorHex }}
              />
            </div>

            {/* Location in this slice */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-purple-600" />
                <span>Ubicación y Límites en este Corte:</span>
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                {currentStructure.sliceLocation}
              </p>
            </div>

            {/* Functional role */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-emerald-600" />
                <span>Función Neuropsicológica:</span>
              </span>
              <p className="text-xs text-slate-600 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 leading-relaxed">
                {currentStructure.functionalRole}
              </p>
            </div>

            {/* Clinical significance */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-rose-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Correlato Clínico de Cátedra (ACV / TEC / Demencia):</span>
              </span>
              <p className="text-xs text-rose-950 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100 leading-relaxed">
                {currentStructure.clinicalSignificance}
              </p>
            </div>

            {/* Interactive button to go to 3D */}
            <button
              onClick={() => handleGoTo3D(currentStructure.linked3DStructureId)}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-xs transition-all shadow-md shadow-purple-500/10"
            >
              <Brain className="w-4 h-4" />
              <span>Ver esta Estructura en el Cerebro 3D</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Structures List in this Slice */}
          <div className="bg-white rounded-2xl border border-[#e6e1d6] p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-800 block mb-2">
              Estructuras Clave en {selectedSlice === 'charcot' ? 'Corte de Charcot' : selectedSlice === 'flechsig' ? 'Corte de Flechsig' : 'Sagital Medial'}:
            </span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {Object.values(currentDict).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStructureKey(s.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-left transition-all ${
                    selectedStructureKey === s.id
                      ? 'bg-purple-100 text-purple-900 font-bold border border-purple-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.colorHex }}
                    />
                    <span>{s.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
