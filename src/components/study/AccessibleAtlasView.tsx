import React from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import {
  Layers,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const AccessibleAtlasView: React.FC = () => {
  const {
    selectedStructureId,
    selectStructure,
    masteredStructureIds,
    setActiveView,
  } = useNeuroStore();

  const corticalStructures = ANATOMICAL_STRUCTURES.filter((s) => s.level === 'telencefalo_corteza');
  const subcorticalStructures = ANATOMICAL_STRUCTURES.filter(
    (s) => s.level === 'telencefalo_subcortical' || s.level === 'diencefalo'
  );
  const infratentorialStructures = ANATOMICAL_STRUCTURES.filter(
    (s) => s.level === 'tronco_encefalico' || s.level === 'cerebelo'
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 p-6 space-y-6 text-slate-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold tracking-wider uppercase mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Modo Accesibilidad y Baja Carga de GPU</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Atlas Anatómico 2D Estructurado
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Navegación taxonómica y funcional directa sin requerir aceleración gráfica WebGL. Compatible con lectores de pantalla y dispositivos de bajo consumo.
          </p>
        </div>

        <button
          onClick={() => setActiveView('atlas3d')}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-sky-500/20 shrink-0 self-start md:self-auto"
        >
          <Layers className="w-4 h-4" />
          <span>Volver al Visor 3D</span>
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Section 1: Corteza Cerebral y Lóbulos */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            1. Telencéfalo: Corteza Cerebral y Convexidad Hemisférica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {corticalStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <div
                  key={struct.id}
                  onClick={() => selectStructure(struct.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: struct.color }}
                        />
                        <h3 className="font-bold text-white text-sm">{struct.name}</h3>
                      </div>
                      {isMastered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {struct.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono">Irrigación: {struct.vascularTerritory.toUpperCase()}</span>
                    <span className="text-sky-400 flex items-center gap-0.5 font-semibold">
                      Ver Ficha <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Estructuras Subcorticales y Diencéfalo */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            2. Diencéfalo y Estructuras Profundas Telencefálicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {subcorticalStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <div
                  key={struct.id}
                  onClick={() => selectStructure(struct.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: struct.color }}
                        />
                        <h3 className="font-bold text-white text-sm">{struct.name}</h3>
                      </div>
                      {isMastered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {struct.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono">Nivel: {struct.level}</span>
                    <span className="text-purple-400 flex items-center gap-0.5 font-semibold">
                      Ver Ficha <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Tronco Encefálico y Cerebelo */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            3. Estructuras Infratentoriales (Tronco Encefálico y Cerebelo)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {infratentorialStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <div
                  key={struct.id}
                  onClick={() => selectStructure(struct.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: struct.color }}
                        />
                        <h3 className="font-bold text-white text-sm">{struct.name}</h3>
                      </div>
                      {isMastered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {struct.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono">Nivel: {struct.level}</span>
                    <span className="text-amber-400 flex items-center gap-0.5 font-semibold">
                      Ver Ficha <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
