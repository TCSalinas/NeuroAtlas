import React, { useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ClippingPanel } from './ClippingPanel';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import {
  RotateCcw,
  Eye,
  Scissors,
  Focus,
  Compass,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

export const BrainControls: React.FC = () => {
  const {
    triggerCameraPreset,
    isXRayMode,
    toggleXRayMode,
    isolatedStructureId,
    setIsolatedStructure,
    selectedStructureId,
    selectStructure,
    activeVascularFilter,
    setActiveVascularFilter,
  } = useNeuroStore();

  const [showClipping, setShowClipping] = useState(false);

  const presets = [
    { id: 'lateral_izq', label: 'Lat. Izq' },
    { id: 'lateral_der', label: 'Lat. Der' },
    { id: 'medial_sagital', label: 'Medial' },
    { id: 'superior', label: 'Dorsal' },
    { id: 'inferior', label: 'Ventral' },
    { id: 'anterior', label: 'Frontal' },
    { id: 'posterior', label: 'Occipital' },
  ];

  return (
    <>
      {/* Unified, Responsive Top Control Bar (Never overlaps!) */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: View Presets Group */}
        <div className="pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#e2ded4] shadow-md shadow-stone-200/50">
          <button
            onClick={() => triggerCameraPreset('reset')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl bg-amber-100/90 hover:bg-amber-200 text-amber-950 border border-amber-300 transition-all active:scale-95 shrink-0 shadow-xs"
            title="Centrar el cerebro en la pantalla (Doble toque en pantalla también centra)"
          >
            <Focus className="w-3.5 h-3.5 text-amber-700" />
            <span>Centrar</span>
          </button>

          <div className="flex items-center gap-1.5 px-2 py-1 text-slate-500 text-xs font-semibold border-x border-slate-200">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Vistas</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => triggerCameraPreset(p.id)}
                className="px-2 py-1 text-xs rounded-xl font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95 whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => triggerCameraPreset('reset')}
              className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all"
              title="Restablecer vista inicial"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: Selected Structure Indicator */}
        {selectedStructureId && (() => {
          const s = ANATOMICAL_STRUCTURES.find((x) => x.id === selectedStructureId);
          if (!s) return null;
          return (
            <div className="pointer-events-auto flex items-center gap-2 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-2xl text-xs font-black shadow-md border border-amber-300 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-slate-950" />
              <span>📍 {s.name}</span>
              {isolatedStructureId && (
                <span className="px-1.5 py-0.5 rounded-md bg-slate-950 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Aislado
                </span>
              )}
              <button
                onClick={() => {
                  selectStructure(null);
                  setIsolatedStructure(null);
                }}
                className="p-0.5 hover:bg-amber-600 rounded-lg text-slate-950 transition-colors ml-1"
                title="Deseleccionar estructura y restaurar encéfalo completo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })()}

        {/* If isolatedStructureId is active but selectedStructureId is null, show clear indicator */}
        {!selectedStructureId && isolatedStructureId && (() => {
          const s = ANATOMICAL_STRUCTURES.find((x) => x.id === isolatedStructureId);
          return (
            <div className="pointer-events-auto flex items-center gap-2 bg-amber-600 text-white px-3 py-1.5 rounded-2xl text-xs font-bold shadow-md border border-amber-400 animate-fadeIn">
              <Focus className="w-3.5 h-3.5 text-amber-200" />
              <span>Aislado: {s?.name || 'Estructura'}</span>
              <button
                onClick={() => setIsolatedStructure(null)}
                className="p-0.5 hover:bg-amber-700 rounded-lg text-white transition-colors ml-1 font-bold flex items-center gap-1"
                title="Restaurar encéfalo completo"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[10px]">Restaurar</span>
              </button>
            </div>
          );
        })()}

        {/* Right: Inspection Tools (X-Ray, Isolation, Slicing) */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#e2ded4] shadow-md shadow-stone-200/50">
          {/* Active Vascular Filter Reset Indicator */}
          {activeVascularFilter !== 'all' && (
            <button
              onClick={() => setActiveVascularFilter('all')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-50 border border-rose-300 text-rose-800 hover:bg-rose-100 transition-all shadow-sm"
              title="Restablecer iluminación normal de todas las arterias"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Ver Todo ({activeVascularFilter.toUpperCase()})</span>
            </button>
          )}

          {/* Toggle Ghosting / X-Ray */}
          <button
            onClick={toggleXRayMode}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
              isXRayMode
                ? 'bg-sky-100 border-sky-300 text-sky-800 shadow-sm'
                : 'bg-white border-transparent text-slate-700 hover:bg-slate-100'
            }`}
            title="Atenúa la corteza para explorar estructuras profundas y subcorticales"
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>Rayos X</span>
          </button>

          {/* Toggle Structure Isolation */}
          <button
            disabled={!selectedStructureId && !isolatedStructureId}
            onClick={() => {
              if (isolatedStructureId) {
                setIsolatedStructure(null);
              } else if (selectedStructureId) {
                setIsolatedStructure(selectedStructureId);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              isolatedStructureId
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm'
                : 'bg-white border-transparent text-slate-700 hover:bg-slate-100'
            }`}
            title={isolatedStructureId ? "Restaurar encéfalo completo" : "Aislar la estructura actualmente seleccionada"}
          >
            <Focus className="w-3.5 h-3.5 text-amber-600" />
            <span>{isolatedStructureId ? 'Restaurar' : 'Aislar'}</span>
          </button>

          {/* Toggle Anatomical Slicing Panel */}
          <button
            onClick={() => setShowClipping((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
              showClipping
                ? 'bg-purple-100 border-purple-300 text-purple-900 shadow-sm'
                : 'bg-white border-transparent text-slate-700 hover:bg-slate-100'
            }`}
            title="Abrir controles de cortes anatómicos dinámicos"
          >
            <Scissors className="w-3.5 h-3.5 text-purple-600" />
            <span>Cortes 3D</span>
          </button>
        </div>
      </div>

      {/* Slicing Controls Modal/Panel */}
      {showClipping && <ClippingPanel onClose={() => setShowClipping(false)} />}

      {/* Interaction Hint (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[#e2ded4] px-4 py-1.5 rounded-full text-xs text-slate-600 shadow-md">
        <span className="flex items-center gap-1.5 font-medium text-slate-700">
          <Layers className="w-3.5 h-3.5 text-sky-600" />
          Clic: seleccionar
        </span>
        <span className="text-slate-300">•</span>
        <span>Arrastrar: rotar</span>
        <span className="text-slate-300">•</span>
        <span>Rueda: zoom</span>
      </div>

      {/* Floating Mobile Quick-Center Action (Visible on phones when no bottom sheet is active) */}
      {!selectedStructureId && (
        <div className="absolute bottom-4 right-4 z-20 md:hidden pointer-events-auto">
          <button
            onClick={() => triggerCameraPreset('reset')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-amber-400 text-amber-950 font-bold text-xs shadow-xl active:scale-95 transition-all shadow-amber-900/10"
            title="Centrar cerebro en la pantalla"
          >
            <Focus className="w-4 h-4 text-amber-600" />
            <span>Centrar</span>
          </button>
        </div>
      )}
    </>
  );
};
