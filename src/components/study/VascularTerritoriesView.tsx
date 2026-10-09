import React from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { VASCULAR_TERRITORIES } from '../../data/clinicalCorrelates';
import { VascularTerritoryId } from '../../types/neuro';
import {
  Activity,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export const VascularTerritoriesView: React.FC = () => {
  const {
    activeVascularFilter,
    setActiveVascularFilter,
    setActiveView,
  } = useNeuroStore();

  const territoryKeys = Object.keys(VASCULAR_TERRITORIES) as VascularTerritoryId[];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 p-6 space-y-6 text-slate-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-sky-950/40 p-6 rounded-2xl border border-rose-900/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold tracking-wider uppercase mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Unidad 3 • Neuropatología Vascular Encefálica</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              Territorios Vasculares Cerebrales y Perfiles de ACV
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              La interrupción del flujo sanguíneo cerebral ocasiona necrosis isquémica cuyos déficits neuropsicológicos dependen estrictamente de la arteria comprometida y la asimetría hemisférica.
            </p>
          </div>

          <button
            onClick={() => setActiveView('atlas3d')}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-sky-500/20 shrink-0 self-start md:self-auto"
          >
            <Layers className="w-4 h-4" />
            <span>Ver Mapeo en Cerebro 3D</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Territory Selector Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 mr-2">Filtrar Territorio:</span>
          <button
            onClick={() => setActiveVascularFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeVascularFilter === 'all'
                ? 'bg-slate-100 text-slate-950 shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Todos los Territorios
          </button>
          {territoryKeys.map((key) => {
            const t = VASCULAR_TERRITORIES[key];
            const isActive = activeVascularFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveVascularFilter(key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isActive
                    ? 'border-white text-white shadow-lg'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
                style={{
                  backgroundColor: isActive ? t.colorHex : undefined,
                  color: isActive ? '#020617' : undefined,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: t.colorHex }}
                />
                <span>{t.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Vascular Territory Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {territoryKeys
          .filter((k) => activeVascularFilter === 'all' || activeVascularFilter === k)
          .map((key) => {
            const territory = VASCULAR_TERRITORIES[key];

            return (
              <div
                key={key}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Title */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-md"
                        style={{ backgroundColor: territory.colorHex }}
                      />
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {territory.name}
                        </h3>
                        <span className="text-[11px] text-slate-400">{territory.artery}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                      {territory.courseSlideReference}
                    </span>
                  </div>

                  {/* Irrigated Regions */}
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <span className="font-semibold text-sky-400 block mb-1">Regiones Irrigadas:</span>
                    <ul className="space-y-1 text-slate-300">
                      {territory.irrigatedRegions.map((reg, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-sky-400 font-bold">•</span>
                          <span>{reg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cognitive & Behavioral Profile */}
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <span className="font-semibold text-rose-400 block mb-1 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      Perfil Neuropsicológico tras Infarto:
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {territory.cognitiveAndBehavioralProfile.map((prof, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{prof}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Characteristic Syndromes */}
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 text-xs">
                    <span className="font-semibold text-amber-400 block mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Síndromes Cardinales:
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {territory.characteristicSyndromes.map((syn, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{syn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-sky-400" />
                    Cátedra de Neuropatología
                  </span>
                  <button
                    onClick={() => {
                      setActiveVascularFilter(key);
                      setActiveView('atlas3d');
                    }}
                    className="text-sky-400 hover:text-sky-300 hover:underline font-semibold"
                  >
                    Resaltar en maqueta 3D →
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
