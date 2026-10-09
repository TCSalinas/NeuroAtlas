import React, { useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { Scissors, RefreshCw, X, Check, Layers } from 'lucide-react';

interface ClippingPanelProps {
  onClose: () => void;
}

export const ClippingPanel: React.FC<ClippingPanelProps> = ({ onClose }) => {
  const { clipping, updateClipping, resetClipping, triggerCameraPreset, setActiveView } = useNeuroStore();
  const [activeTab, setActiveTab] = useState<'sagital' | 'coronal' | 'axial'>('sagital');

  // Check which preset is currently matching
  const isSagittalPreset =
    clipping.enabled &&
    clipping.sagittalEnabled &&
    !clipping.coronalEnabled &&
    !clipping.axialEnabled &&
    Math.abs(clipping.sagittal) <= 0.05;

  const isCoronalPreset =
    clipping.enabled &&
    !clipping.sagittalEnabled &&
    clipping.coronalEnabled &&
    !clipping.axialEnabled &&
    Math.abs(clipping.coronal - 0.08) <= 0.05;

  const isAxialPreset =
    clipping.enabled &&
    !clipping.sagittalEnabled &&
    !clipping.coronalEnabled &&
    clipping.axialEnabled &&
    Math.abs(clipping.axial - 0.10) <= 0.05;

  // Toggle presets cleanly (undo if clicked again!)
  const handlePreset = (type: 'sagital' | 'coronal' | 'axial') => {
    if (type === 'sagital') {
      if (isSagittalPreset) {
        // Toggle OFF (Undo)
        updateClipping({ enabled: false });
      } else {
        updateClipping({
          enabled: true,
          sagittalEnabled: true,
          sagittal: 0.0,
          coronalEnabled: false,
          axialEnabled: false,
        });
        setActiveTab('sagital');
        triggerCameraPreset('medial_sagital');
      }
    } else if (type === 'coronal') {
      if (isCoronalPreset) {
        // Toggle OFF (Undo)
        updateClipping({ enabled: false });
      } else {
        updateClipping({
          enabled: true,
          sagittalEnabled: false,
          coronalEnabled: true,
          coronal: 0.08,
          axialEnabled: false,
        });
        setActiveTab('coronal');
        triggerCameraPreset('anterior');
      }
    } else if (type === 'axial') {
      if (isAxialPreset) {
        // Toggle OFF (Undo)
        updateClipping({ enabled: false });
      } else {
        updateClipping({
          enabled: true,
          sagittalEnabled: false,
          coronalEnabled: false,
          axialEnabled: true,
          axial: 0.10,
        });
        setActiveTab('axial');
        triggerCameraPreset('superior');
      }
    }
  };

  // Count active planes
  const activePlanesCount =
    (clipping.sagittalEnabled ? 1 : 0) +
    (clipping.coronalEnabled ? 1 : 0) +
    (clipping.axialEnabled ? 1 : 0);

  return (
    <div className="absolute top-16 right-2 sm:right-4 z-20 w-[calc(100%-1rem)] max-w-sm sm:w-88 bg-[#faf8f5]/95 backdrop-blur-md border border-[#e6e1d6] rounded-2xl p-4 shadow-xl text-slate-800 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d5]">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
          <Scissors className="w-4 h-4 text-amber-700" />
          <span>Cortes Anatómicos Dinámicos 3D</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-[#ede7da] transition-colors"
          title="Cerrar panel de cortes"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 space-y-3.5 text-xs">
        {/* Master Switch and Undo Button */}
        <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#e6e1d6] shadow-sm">
          <div>
            <span className="font-bold text-slate-900 block text-xs">Estado de Corte 3D</span>
            <span className="text-[10px] text-slate-500">
              {clipping.enabled ? 'Corte activo en modelo' : 'Modelo íntegro (sin cortes)'}
            </span>
          </div>
          <button
            onClick={() => updateClipping({ enabled: !clipping.enabled })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              clipping.enabled
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-[#ede7da] text-slate-700 hover:bg-[#e2dacb]'
            }`}
          >
            {clipping.enabled ? '✓ ACTIVO' : 'INACTIVO'}
          </button>
        </div>

        {/* Quick Presets (Togglable!) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Cortes Anatómicos Clásicos
            </span>
            <span className="text-[10px] text-amber-800 font-medium">Toca para activar / deshacer</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handlePreset('sagital')}
              className={`p-2 rounded-xl text-[11px] font-bold transition-all text-center border ${
                isSagittalPreset
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm ring-1 ring-amber-400'
                  : 'bg-white hover:bg-[#fbf9f5] text-slate-700 border-[#e6e1d6]'
              }`}
              title="Corte sagital medio: expone cuerpo calloso, tálamo y tronco"
            >
              <div className="flex items-center justify-center gap-1">
                {isSagittalPreset && <Check className="w-3 h-3 text-slate-950" />}
                <span>Sagital</span>
              </div>
            </button>

            <button
              onClick={() => handlePreset('coronal')}
              className={`p-2 rounded-xl text-[11px] font-bold transition-all text-center border ${
                isCoronalPreset
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm ring-1 ring-amber-400'
                  : 'bg-white hover:bg-[#fbf9f5] text-slate-700 border-[#e6e1d6]'
              }`}
              title="Corte coronal frontal: expone ganglios y sustancia blanca"
            >
              <div className="flex items-center justify-center gap-1">
                {isCoronalPreset && <Check className="w-3 h-3 text-slate-950" />}
                <span>Coronal</span>
              </div>
            </button>

            <button
              onClick={() => handlePreset('axial')}
              className={`p-2 rounded-xl text-[11px] font-bold transition-all text-center border ${
                isAxialPreset
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm ring-1 ring-amber-400'
                  : 'bg-white hover:bg-[#fbf9f5] text-slate-700 border-[#e6e1d6]'
              }`}
              title="Corte horizontal/axial: vista transversal del encéfalo"
            >
              <div className="flex items-center justify-center gap-1">
                {isAxialPreset && <Check className="w-3 h-3 text-slate-950" />}
                <span>Axial</span>
              </div>
            </button>
          </div>
        </div>

        {/* Warning if multiple planes active */}
        {clipping.enabled && activePlanesCount > 1 && (
          <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-center justify-between gap-2">
            <span>⚠️ Corte simultáneo en {activePlanesCount} planos.</span>
            <button
              onClick={() =>
                updateClipping({
                  sagittalEnabled: activeTab === 'sagital',
                  coronalEnabled: activeTab === 'coronal',
                  axialEnabled: activeTab === 'axial',
                })
              }
              className="text-[10px] font-bold text-amber-800 underline hover:text-amber-950"
            >
              Aislar plano actual
            </button>
          </div>
        )}

        {/* Custom Plane Sliders Tabs */}
        <div className="bg-white rounded-xl border border-[#e6e1d6] p-3 shadow-sm space-y-3">
          <div className="flex border-b border-[#ede7da] pb-1.5 gap-1">
            {[
              { id: 'sagital', label: 'Sagital (X)' },
              { id: 'coronal', label: 'Coronal (Z)' },
              { id: 'axial', label: 'Axial (Y)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  // Ensure this plane is active when switching tabs
                  updateClipping({
                    enabled: true,
                    [`${tab.id === 'sagital' ? 'sagittal' : tab.id}Enabled`]: true,
                  });
                }}
                className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#ede7da] text-amber-950 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Plane Controls */}
          {activeTab === 'sagital' && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-slate-700">
                <span className="font-semibold text-slate-800 text-xs">Posición Sagital (Izquierda ↔ Derecha)</span>
                <span className="font-mono text-amber-800 font-bold text-[11px]">
                  {clipping.sagittal.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-1.4"
                max="1.4"
                step="0.02"
                value={clipping.sagittal}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateClipping({
                    enabled: true,
                    sagittalEnabled: true,
                    sagittal: val,
                  });
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Hemisferio Izq</span>
                <span>Centro (0)</span>
                <span>Hemisferio Der</span>
              </div>
            </div>
          )}

          {activeTab === 'coronal' && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-slate-700">
                <span className="font-semibold text-slate-800 text-xs">Posición Coronal (Anterior ↔ Posterior)</span>
                <span className="font-mono text-amber-800 font-bold text-[11px]">
                  {clipping.coronal.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-1.4"
                max="1.4"
                step="0.02"
                value={clipping.coronal}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateClipping({
                    enabled: true,
                    coronalEnabled: true,
                    coronal: val,
                  });
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Occipital</span>
                <span>Centro (0)</span>
                <span>Frontal</span>
              </div>
            </div>
          )}

          {activeTab === 'axial' && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-slate-700">
                <span className="font-semibold text-slate-800 text-xs">Posición Axial (Ventral ↔ Dorsal)</span>
                <span className="font-mono text-amber-800 font-bold text-[11px]">
                  {clipping.axial.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-1.2"
                max="1.2"
                step="0.02"
                value={clipping.axial}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateClipping({
                    enabled: true,
                    axialEnabled: true,
                    axial: val,
                  });
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Base (Tronco)</span>
                <span>Centro (0)</span>
                <span>Vértice dorsal</span>
              </div>
            </div>
          )}
        </div>

        {/* Big Clear / Undo Button */}
        <button
          onClick={resetClipping}
          className="w-full flex items-center justify-center gap-2 py-2 bg-white hover:bg-[#fbf9f5] border border-[#e2ded4] rounded-xl text-slate-700 transition-colors text-xs font-bold shadow-xs active:scale-95"
          title="Elimina todos los cortes y muestra el encéfalo íntegro"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
          <span>Quitar Todos los Cortes (Encéfalo Íntegro)</span>
        </button>

        {/* Button to open Classical Slices 2D View */}
        <button
          onClick={() => {
            setActiveView('cortes');
            onClose();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-semibold border border-amber-200 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>Ver Cortes Clásicos 2D (Charcot, Flechsig)</span>
        </button>
      </div>
    </div>
  );
};
