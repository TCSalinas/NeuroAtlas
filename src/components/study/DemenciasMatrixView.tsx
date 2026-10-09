import React, { useState } from 'react';
import { DEMENTIA_DIFFERENTIAL_MATRIX } from '../../data/clinicalCorrelates';
import {
  Brain,
  Search,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const DemenciasMatrixView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'todos', label: 'Matriz Completa (Tabla 2)' },
    { id: 'clinica', label: 'Clínica Inicial' },
    { id: 'cognitivo', label: 'Perfil Cognitivo' },
    { id: 'neurologico', label: 'Exploración Neurológica' },
    { id: 'psiquiatrico', label: 'Exploración Psiquiátrica' },
    { id: 'neuroimagen', label: 'Hallazgos en Neuroimagen' },
    { id: 'fisiopato', label: 'Fisiopatología' },
  ];

  const filteredData = DEMENTIA_DIFFERENTIAL_MATRIX.filter((item) => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(s) ||
      item.acronym.toLowerCase().includes(s) ||
      item.initialClinic.toLowerCase().includes(s) ||
      item.cognitiveProfile.toLowerCase().includes(s) ||
      item.neurologicalExam.toLowerCase().includes(s) ||
      item.psychiatricFeatures.toLowerCase().includes(s) ||
      item.neuroimagingFindings.toLowerCase().includes(s)
    );
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 p-6 space-y-6 text-slate-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/40 p-6 rounded-2xl border border-amber-900/40 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
          <Brain className="w-4 h-4" />
          <span>Unidad 5 • Diagnóstico Diferencial de Trastornos Neurocognitivos Mayores</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Tabla Comparativa Diferencial de Demencias
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Matriz diagnóstica oficial de la cátedra (Tabla 2: Diapositiva 33). Permite contrastar los perfiles clínicos, cognitivos, psiquiátricos y de neuroimagen de las demencias más frecuentes.
        </p>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar síntoma (ej: alucinaciones, marcha, apatía, atrofia)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  activeCategory === c.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Responsive Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredData.map((d) => (
          <div
            key={d.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold font-mono">
                    {d.acronym}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 leading-tight">
                    {d.name}
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  Tabla 2
                </span>
              </div>

              {/* Sections based on activeCategory filter */}
              {(activeCategory === 'todos' || activeCategory === 'clinica') && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <span className="font-semibold text-amber-400 block mb-1">Clínica Inicial:</span>
                  <p className="text-slate-300 leading-relaxed">{d.initialClinic}</p>
                </div>
              )}

              {(activeCategory === 'todos' || activeCategory === 'cognitivo') && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <span className="font-semibold text-sky-400 block mb-1">Deterioro Cognitivo:</span>
                  <p className="text-slate-300 leading-relaxed">{d.cognitiveProfile}</p>
                </div>
              )}

              {(activeCategory === 'todos' || activeCategory === 'neurologico') && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <span className="font-semibold text-emerald-400 block mb-1">Exploración Neurológica:</span>
                  <p className="text-slate-300 leading-relaxed">{d.neurologicalExam}</p>
                </div>
              )}

              {(activeCategory === 'todos' || activeCategory === 'psiquiatrico') && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <span className="font-semibold text-rose-400 block mb-1">Exploración Psiquiátrica:</span>
                  <p className="text-slate-300 leading-relaxed">{d.psychiatricFeatures}</p>
                </div>
              )}

              {(activeCategory === 'todos' || activeCategory === 'neuroimagen') && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <span className="font-semibold text-purple-400 block mb-1">Hallazgos en Neuroimagen:</span>
                  <p className="text-slate-300 leading-relaxed">{d.neuroimagingFindings}</p>
                </div>
              )}

              {(activeCategory === 'todos' || activeCategory === 'fisiopato') && (
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <span className="font-semibold text-indigo-400 block mb-1">Fisiopatología / Proteínas:</span>
                  <p className="text-slate-300 leading-relaxed">{d.pathophysiology}</p>
                </div>
              )}
            </div>

            {/* Footer reference */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-sky-400" />
                {d.courseSlideReference}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
