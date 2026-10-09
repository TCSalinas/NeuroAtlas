import React, { useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { COURSE_UNITS } from '../../data/courseUnits';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import {
  GraduationCap,
  Layers,
  Search,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Filter
} from 'lucide-react';

export const CourseNavigation: React.FC = () => {
  const {
    selectedStructureId,
    selectStructure,
    activeUnitId,
    setActiveUnit,
    masteredStructureIds,
    setIsSearchOpen,
  } = useNeuroStore();

  const [activeTab, setActiveTab] = useState<'unidades' | 'estructuras'>('unidades');
  const [levelFilter, setLevelFilter] = useState<string>('todos');

  // Filter structures based on selected level
  const filteredStructures = ANATOMICAL_STRUCTURES.filter((s) => {
    if (levelFilter === 'todos') return true;
    if (levelFilter === 'corteza') return s.level === 'telencefalo_corteza';
    if (levelFilter === 'limbico') {
      return s.hierarchy === 'limbica' || s.id === 'hipocampo' || s.id === 'amigdala' || s.id === 'hipotalamo' || s.id === 'cuerpo-calloso';
    }
    if (levelFilter === 'subcortical') return s.level === 'telencefalo_subcortical' || s.level === 'diencefalo';
    if (levelFilter === 'tronco_cerebelo') return s.level === 'tronco_encefalico' || s.level === 'cerebelo';
    return true;
  });

  return (
    <aside className="w-full md:w-80 lg:w-84 h-full bg-[#faf8f5] backdrop-blur-xl border-r border-[#e6e1d6] flex flex-col z-20 text-slate-800 font-sans">
      {/* Search Bar Trigger */}
      <div className="p-3 border-b border-[#e8e2d5] bg-white">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 bg-[#f4efe4] hover:bg-[#ede7da] text-slate-600 hover:text-slate-900 rounded-xl border border-[#ded7c8] text-xs transition-all shadow-sm"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-medium">Buscar estructura, síndrome...</span>
          </span>
          <kbd className="text-[10px] bg-white text-slate-500 font-mono px-1.5 py-0.5 rounded border border-[#d6cfbe]">⌘K</kbd>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-[#e8e2d5] bg-[#f5f1e8] p-1">
        <button
          onClick={() => setActiveTab('unidades')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'unidades'
              ? 'bg-white text-amber-900 shadow-sm border border-[#d8d1c2]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
          <span>Unidades ({COURSE_UNITS.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('estructuras')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'estructuras'
              ? 'bg-white text-amber-900 shadow-sm border border-[#d8d1c2]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>Estructuras ({ANATOMICAL_STRUCTURES.length})</span>
        </button>
      </div>

      {/* Tab 1: Unidades del Curso */}
      {activeTab === 'unidades' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {COURSE_UNITS.map((unit) => {
            const isSelected = activeUnitId === unit.id;
            return (
              <div
                key={unit.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-sm ring-1 ring-amber-400'
                    : 'bg-white border-[#e6e1d6] hover:border-[#ded7c8]'
                }`}
              >
                <button
                  onClick={() => setActiveUnit(unit.id)}
                  className="w-full p-3 text-left flex items-start justify-between gap-2"
                >
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase">
                      Unidad {unit.unitNumber}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                      {unit.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {unit.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-amber-700' : ''}`} />
                </button>

                {isSelected && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#f0ede6] bg-[#fbf9f5] text-[11px] space-y-2">
                    <div className="text-slate-500 font-medium flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-amber-700" />
                      <span>Fuente: {unit.fileSource}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-700">Temas Centrales:</span>
                      <ul className="space-y-1">
                        {unit.keyTopics.slice(0, 4).map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-slate-600">
                            <span className="text-amber-700 font-black">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-700 block mb-1.5">
                        Estructuras en Maqueta:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {unit.associatedStructureIds.map((sId) => {
                          const struct = ANATOMICAL_STRUCTURES.find((x) => x.id === sId);
                          if (!struct) return null;
                          const isStructActive = selectedStructureId === struct.id;
                          return (
                            <button
                              key={sId}
                              onClick={() => selectStructure(isStructActive ? null : struct.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                                isStructActive
                                  ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400 scale-105'
                                  : 'bg-[#ede7da] text-slate-800 hover:bg-[#e2dacb]'
                              }`}
                            >
                              {isStructActive && <span>📍</span>}
                              <span>{struct.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Lista Completa de Estructuras */}
      {activeTab === 'estructuras' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter Pills */}
          <div className="p-2 border-b border-[#e8e2d5] bg-white flex items-center gap-1 overflow-x-auto no-scrollbar text-[11px]">
            <Filter className="w-3 h-3 text-slate-400 ml-1 shrink-0" />
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'corteza', label: 'Corteza' },
              { id: 'limbico', label: 'Sistema Límbico' },
              { id: 'subcortical', label: 'Subcortical' },
              { id: 'tronco_cerebelo', label: 'Tronco/Cerebelo' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setLevelFilter(f.id)}
                className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors font-semibold ${
                  levelFilter === f.id
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <button
                  key={struct.id}
                  onClick={() => selectStructure(isSelected ? null : struct.id)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 transition-all ${
                    isSelected
                      ? 'bg-amber-50 border-2 border-amber-600 text-slate-900 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-white border border-[#e6e1d6] hover:bg-[#faf7f0] text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm ring-1 ring-black/10"
                      style={{ backgroundColor: struct.color }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black block truncate text-slate-900">
                          {struct.name}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-600 text-white font-black uppercase">
                            Activo
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate font-medium">
                        {struct.lobe.toUpperCase()} • {struct.hemisphere}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isMastered && (
                      <span title="Concepto dominado">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Footer */}
      <div className="p-3 border-t border-[#e8e2d5] bg-white flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-slate-700 font-medium text-[11px]">
            {masteredStructureIds.length} de {ANATOMICAL_STRUCTURES.length} dominados
          </span>
        </div>
        <div className="w-20 bg-[#ede7da] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{
              width: `${(masteredStructureIds.length / ANATOMICAL_STRUCTURES.length) * 100}%`
            }}
          />
        </div>
      </div>
    </aside>
  );
};
