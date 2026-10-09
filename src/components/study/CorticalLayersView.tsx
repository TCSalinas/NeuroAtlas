import React, { useState } from 'react';
import { CORTICAL_LAYERS, BRODMANN_KEY_AREAS } from '../../data/cytoarchitecture';
import {
  Layers,
  ArrowDownCircle,
  ArrowUpCircle,
  Sparkles,
  Info
} from 'lucide-react';

export const CorticalLayersView: React.FC = () => {
  const [selectedLayerNum, setSelectedLayerNum] = useState<number>(4);

  const selectedLayer = CORTICAL_LAYERS.find((l) => l.number === selectedLayerNum) || CORTICAL_LAYERS[3];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 p-6 space-y-6 text-slate-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-sky-950/40 p-6 rounded-2xl border border-indigo-900/40 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-1">
          <Layers className="w-4 h-4" />
          <span>Unidad 1 • Citoarquitectura Neocortical y Organización en Columnas</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Las 6 Capas de la Neocorteza Cerebral (Isocorteza)
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          La corteza cerebral humana posee una estructura laminar horizontal de 6 capas citoarquitectónicas (de superficial a profunda) y una organización vertical en microcolumnas corticales de procesamiento (Squire et al., 2003 / Diapositivas 25-28).
        </p>
      </div>

      {/* Main Interactive Diagram & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Vertical Cortical Slice (6 layers) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Corte Histológico Transversal
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Piamadre (Superficie)</span>
            </div>

            {/* Vertical Stack of Layers */}
            <div className="space-y-2">
              {CORTICAL_LAYERS.map((layer) => {
                const isSelected = selectedLayerNum === layer.number;
                return (
                  <button
                    key={layer.number}
                    onClick={() => setSelectedLayerNum(layer.number)}
                    className={`w-full p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                        : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono transition-colors ${
                          isSelected ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                        }`}>
                          {layer.roman}
                        </span>
                        <div>
                          <span className="text-xs font-bold block leading-tight">
                            Capa {layer.roman}: {layer.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Grosor medio: ~{layer.thicknessMicrons} µm
                          </span>
                        </div>
                      </div>

                      {layer.number === 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                          Entrada Tálamo
                        </span>
                      )}
                      {layer.number === 5 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-semibold">
                          Salida Motora Betz
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Sustancia Blanca Subcortical (Profundidad)</span>
              <span>Total: ~2.5 - 4 mm</span>
            </div>
          </div>

          <div className="mt-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/70 text-xs text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <p>
              Haz clic en cualquier capa para explorar su composición neuronal, aferencias talámicas y eferencias de salida.
            </p>
          </div>
        </div>

        {/* Right: Detailed Layer Card & Function */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  Capa Neocortical {selectedLayer.roman} ({selectedLayer.number}ª de 6)
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">
                  {selectedLayer.name}
                </h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
                {selectedLayer.thicknessMicrons} micrones
              </span>
            </div>

            {/* Cellular Composition */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Morfología Celular y Componentes:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedLayer.composition}
              </p>
            </div>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl space-y-1.5">
                <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
                  Principales Aferencias (Entradas):
                </span>
                <p className="text-emerald-200/90 leading-relaxed text-[11px]">
                  {selectedLayer.mainInputs}
                </p>
              </div>

              <div className="bg-purple-950/20 border border-purple-900/40 p-4 rounded-xl space-y-1.5">
                <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                  <ArrowUpCircle className="w-4 h-4 text-purple-400" />
                  Principales Eferencias (Salidas):
                </span>
                <p className="text-purple-200/90 leading-relaxed text-[11px]">
                  {selectedLayer.mainOutputs}
                </p>
              </div>
            </div>

            {/* Functional Description */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
              <span className="font-semibold text-sky-400 block">
                Significado Funcional y Computacional:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedLayer.functionDescription}
              </p>
            </div>
          </div>

          {/* Brodmann Cytoarchitectonic Quick Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Áreas de Brodmann Clave y Diferencias Citoarquitectónicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {BRODMANN_KEY_AREAS.slice(0, 6).map((b, idx) => (
                <div key={idx} className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/70">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono font-bold text-[10px] border border-indigo-800">
                      BA {b.area}
                    </span>
                    <span className="font-bold text-slate-200 text-[11px] truncate">{b.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{b.function}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
