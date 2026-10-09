import React from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { Scissors, RefreshCw, X } from 'lucide-react';

interface ClippingPanelProps {
  onClose: () => void;
}

export const ClippingPanel: React.FC<ClippingPanelProps> = ({ onClose }) => {
  const { clipping, updateClipping, resetClipping } = useNeuroStore();

  return (
    <div className="absolute top-16 right-4 z-20 w-80 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 shadow-2xl text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
          <Scissors className="w-4 h-4" />
          <span>Cortes Anatómicos Dinámicos 3D</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800/80 transition-colors"
          title="Cerrar panel de cortes"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        {/* Toggle Clipping Enabled */}
        <div className="flex items-center justify-between bg-slate-800/60 p-2 rounded-lg">
          <span className="font-medium text-slate-300">Habilitar Planos de Corte</span>
          <button
            onClick={() => updateClipping({ enabled: !clipping.enabled })}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              clipping.enabled
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {clipping.enabled ? 'ACTIVO' : 'INACTIVO'}
          </button>
        </div>

        {/* Sagittal Plane (X) */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Plano Sagital (Medial - Lateral)</span>
            <span className="font-mono text-sky-400">{clipping.sagittal.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.05"
            disabled={!clipping.enabled}
            value={clipping.sagittal}
            onChange={(e) => updateClipping({ sagittal: parseFloat(e.target.value) })}
            className="w-full accent-sky-500 cursor-pointer disabled:opacity-40"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Hemisferio Izq</span>
            <span>Centro</span>
            <span>Hemisferio Der</span>
          </div>
        </div>

        {/* Coronal Plane (Z) */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Plano Coronal (Anterior - Posterior)</span>
            <span className="font-mono text-sky-400">{clipping.coronal.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.05"
            disabled={!clipping.enabled}
            value={clipping.coronal}
            onChange={(e) => updateClipping({ coronal: parseFloat(e.target.value) })}
            className="w-full accent-sky-500 cursor-pointer disabled:opacity-40"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Polo Occipital</span>
            <span>Centro</span>
            <span>Polo Frontal</span>
          </div>
        </div>

        {/* Axial Plane (Y) */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Plano Axial / Horizontal (Dorsal - Ventral)</span>
            <span className="font-mono text-sky-400">{clipping.axial.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.05"
            disabled={!clipping.enabled}
            value={clipping.axial}
            onChange={(e) => updateClipping({ axial: parseFloat(e.target.value) })}
            className="w-full accent-sky-500 cursor-pointer disabled:opacity-40"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Ventral (Base)</span>
            <span>Centro</span>
            <span>Dorsal (Córtex superior)</span>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetClipping}
          className="w-full flex items-center justify-center gap-2 py-2 mt-2 bg-slate-800 hover:bg-slate-700/80 rounded-lg text-slate-300 hover:text-white transition-colors text-xs font-medium"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restablecer Planos
        </button>
      </div>
    </div>
  );
};
