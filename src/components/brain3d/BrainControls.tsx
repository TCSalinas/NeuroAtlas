import React, { useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ClippingPanel } from './ClippingPanel';
import {
  RotateCcw,
  Eye,
  Layers,
  Scissors,
  Focus,
  Compass,
} from 'lucide-react';

export const BrainControls: React.FC = () => {
  const {
    triggerCameraPreset,
    isXRayMode,
    toggleXRayMode,
    isolatedStructureId,
    setIsolatedStructure,
    selectedStructureId,
  } = useNeuroStore();

  const [showClipping, setShowClipping] = useState(false);

  const presets = [
    { id: 'lateral_izq', label: 'Lateral Izq' },
    { id: 'lateral_der', label: 'Lateral Der' },
    { id: 'medial_sagital', label: 'Medial' },
    { id: 'superior', label: 'Dorsal' },
    { id: 'inferior', label: 'Ventral' },
    { id: 'anterior', label: 'Frontal' },
    { id: 'posterior', label: 'Occipital' },
  ];

  return (
    <>
      {/* View Presets Bar (Top of 3D Canvas) */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 text-xs font-medium border-r border-slate-800">
          <Compass className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Vistas:</span>
        </div>
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => triggerCameraPreset(p.id)}
            className="px-2.5 py-1 text-xs rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800/90 transition-all active:scale-95"
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => triggerCameraPreset('reset')}
          className="p-1.5 text-xs text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-all"
          title="Restablecer posición inicial de la cámara"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Action Controls (Right side of 3D Canvas) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Toggle Ghosting / X-Ray */}
        <button
          onClick={toggleXRayMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-md transition-all shadow-lg active:scale-95 ${
            isXRayMode
              ? 'bg-sky-500/20 border-sky-400/80 text-sky-300 shadow-sky-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
          title="Atenúa la corteza para explorar estructuras profundas y subcorticales"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Rayos X</span>
        </button>

        {/* Toggle Structure Isolation */}
        <button
          disabled={!selectedStructureId}
          onClick={() => {
            if (isolatedStructureId) {
              setIsolatedStructure(null);
            } else if (selectedStructureId) {
              setIsolatedStructure(selectedStructureId);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-md transition-all shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
            isolatedStructureId
              ? 'bg-amber-500/20 border-amber-400/80 text-amber-300 shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
          title="Aislar la estructura actualmente seleccionada"
        >
          <Focus className="w-3.5 h-3.5" />
          <span>{isolatedStructureId ? 'Mostrar Todo' : 'Aislar'}</span>
        </button>

        {/* Toggle Anatomical Slicing Panel */}
        <button
          onClick={() => setShowClipping((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border backdrop-blur-md transition-all shadow-lg active:scale-95 ${
            showClipping
              ? 'bg-purple-500/20 border-purple-400/80 text-purple-300 shadow-purple-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
          title="Abrir controles de cortes anatómicos dinámicos"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Cortes 3D</span>
        </button>
      </div>

      {/* Slicing Controls Modal/Panel */}
      {showClipping && <ClippingPanel onClose={() => setShowClipping(false)} />}

      {/* Interaction Hint (Bottom Center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:flex items-center gap-3 bg-slate-950/70 backdrop-blur-md border border-slate-800/80 px-4 py-1.5 rounded-full text-[11px] text-slate-400 shadow-xl">
        <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-sky-400" /> Clic: seleccionar estructura</span>
        <span>•</span>
        <span>Arrastrar: rotar 360°</span>
        <span>•</span>
        <span>Rueda: zoom</span>
      </div>
    </>
  );
};
