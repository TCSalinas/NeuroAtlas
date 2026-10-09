import React, { useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import { VASCULAR_TERRITORIES } from '../../data/clinicalCorrelates';
import {
  BookOpen,
  Activity,
  GitFork,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  MapPin,
  X
} from 'lucide-react';

export const StructureDrawer: React.FC = () => {
  const {
    selectedStructureId,
    selectStructure,
    masteredStructureIds,
    toggleStructureMastered,
  } = useNeuroStore();

  const [activeTab, setActiveTab] = useState<'anatomia' | 'funciones' | 'circuitos' | 'clinica' | 'fuentes'>('anatomia');

  if (!selectedStructureId) {
    return (
      <aside className="w-full md:w-96 lg:w-[420px] h-full bg-slate-900/95 border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Layers className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
        <h3 className="text-base font-semibold text-slate-300">Exploración Anatómica</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Haz clic sobre cualquier estructura en el cerebro 3D o en el menú lateral para abrir su ficha de estudio detallada.
        </p>
      </aside>
    );
  }

  const struct = ANATOMICAL_STRUCTURES.find((s) => s.id === selectedStructureId);

  if (!struct) return null;

  const isMastered = masteredStructureIds.includes(struct.id);
  const vascularTerritory = VASCULAR_TERRITORIES[struct.vascularTerritory];

  return (
    <aside className="w-full md:w-96 lg:w-[420px] h-full bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 flex flex-col shadow-2xl z-20 overflow-hidden text-slate-200">
      {/* Header of Drawer */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: struct.color }}
              />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-400">
                {struct.level.replace('_', ' • ')}
              </span>
              {struct.isDeepStructure && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800/60 text-purple-300 font-medium">
                  Subcortical
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-white leading-tight">{struct.name}</h2>
            {struct.latinName && (
              <p className="text-xs text-slate-400 italic mt-0.5">{struct.latinName}</p>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleStructureMastered(struct.id)}
              className={`p-1.5 rounded-lg border transition-all ${
                isMastered
                  ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title={isMastered ? 'Marcado como dominado' : 'Marcar como dominado'}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => selectStructure(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Cerrar ficha"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Synonyms & Quick Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          {struct.brodmannAreas && struct.brodmannAreas.length > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-950/70 border border-blue-800/50 text-blue-300 font-mono">
              Brodmann: {struct.brodmannAreas.join(', ')}
            </span>
          )}
          {vascularTerritory && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-950/70 border border-rose-800/50 text-rose-300">
              Irrigación: {vascularTerritory.id.toUpperCase()}
            </span>
          )}
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
            Hemisferio: {struct.hemisphere}
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/20 px-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'anatomia', label: 'Anatomía', icon: BookOpen },
          { id: 'funciones', label: 'Funciones', icon: Activity },
          { id: 'circuitos', label: 'Circuitos', icon: GitFork },
          { id: 'clinica', label: 'Neuropatología', icon: AlertTriangle },
          { id: 'fuentes', label: 'Fuentes y Citas', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-sky-400 text-sky-400 bg-sky-950/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area with smooth scrolling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
        {/* TAB: ANATOMIA */}
        {activeTab === 'anatomia' && (
          <div className="space-y-4">
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <span className="text-sky-400 font-semibold block mb-1">Descripción General:</span>
              <p className="text-slate-300">{struct.overview}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Ubicación Topográfica
              </span>
              <p className="text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                {struct.anatomicalLocation}
              </p>
            </div>

            {struct.organizationAndSubdivisions.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-slate-400 font-medium block text-[11px] uppercase tracking-wider">
                  Organización y Subdivisiones Anatómicas
                </span>
                <ul className="space-y-1">
                  {struct.organizationAndSubdivisions.map((sub, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 bg-slate-950/30 p-2 rounded-lg border border-slate-800/50">
                      <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {struct.synonyms.length > 0 && (
              <div className="text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Términos sinónimos: </span>
                {struct.synonyms.join(', ')}
              </div>
            )}
          </div>
        )}

        {/* TAB: FUNCIONES */}
        {activeTab === 'funciones' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-emerald-400 font-semibold block text-[11px] uppercase tracking-wider">
                Funciones Principales
              </span>
              <ul className="space-y-1.5">
                {struct.primaryFunctions.map((fn, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded-lg text-emerald-200">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <span className="text-sky-400 font-semibold block text-[11px] uppercase tracking-wider">
                Procesos Cognitivos Asociados (Neuropsicología)
              </span>
              <ul className="space-y-1.5">
                {struct.associatedCognitiveProcesses.map((proc, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/40 border border-slate-800/80 p-2.5 rounded-lg text-slate-300">
                    <Activity className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{proc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB: CIRCUITOS */}
        {activeTab === 'circuitos' && (
          <div className="space-y-3">
            <span className="text-purple-400 font-semibold block text-[11px] uppercase tracking-wider">
              Conexiones Sinápticas y Fascículos de Asociación
            </span>
            {struct.neuralCircuitsAndConnections.map((conn, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-purple-950/20 border border-purple-900/40 p-3 rounded-lg text-purple-200">
                <GitFork className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>{conn}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB: CLINICA */}
        {activeTab === 'clinica' && (
          <div className="space-y-4">
            <span className="text-rose-400 font-semibold block text-[11px] uppercase tracking-wider">
              Síndromes Clínicos y Lesiones (Materias de Cátedra)
            </span>
            {struct.clinicalCorrelates.map((correlate, idx) => (
              <div key={idx} className="bg-slate-950/50 border border-rose-900/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    {correlate.title}
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    {correlate.courseUnitReference}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">{correlate.syndrome}</p>
                
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Signos y Síntomas Clave:</span>
                  <ul className="space-y-1">
                    {correlate.symptoms.map((sym, sIdx) => (
                      <li key={sIdx} className="text-slate-300 flex items-start gap-1.5 text-[11px]">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: FUENTES */}
        {activeTab === 'fuentes' && (
          <div className="space-y-3">
            <span className="text-sky-400 font-semibold block text-[11px] uppercase tracking-wider">
              Trazabilidad Académica (Apuntes y Clases)
            </span>
            {struct.sources.map((src, idx) => (
              <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-sky-300 text-xs">{src.documentTitle}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    src.type === 'presentacion_catedra' 
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {src.slideOrPage}
                  </span>
                </div>
                <blockquote className="border-l-2 border-sky-500 pl-2.5 text-slate-300 italic text-[11px] my-1">
                  "{src.directQuoteOrSummary}"
                </blockquote>
                <div className="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Archivo: {src.fileReference}</span>
                  {src.externalUrl && (
                    <a
                      href={src.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:underline flex items-center gap-1"
                    >
                      Enlace <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
        <button
          onClick={() => toggleStructureMastered(struct.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
            isMastered
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{isMastered ? 'Concepto Dominado' : 'Marcar para Repaso'}</span>
        </button>

        <span className="text-[11px] text-slate-500">
          ID: <code className="text-slate-400 font-mono">{struct.id}</code>
        </span>
      </div>
    </aside>
  );
};
