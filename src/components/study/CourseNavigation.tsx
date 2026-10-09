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
    if (levelFilter === 'subcortical') return s.level === 'telencefalo_subcortical' || s.level === 'diencefalo';
    if (levelFilter === 'tronco_cerebelo') return s.level === 'tronco_encefalico' || s.level === 'cerebelo';
    return true;
  });

  return (
    <aside className="w-full md:w-80 lg:w-84 h-full bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 flex flex-col z-20 text-slate-200">
      {/* Search Bar Trigger */}
      <div className="p-3 border-b border-slate-800 bg-slate-950/40">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl border border-slate-700/60 text-xs transition-all shadow-inner"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <span>Buscar estructura, síndrome o concepto...</span>
          </span>
          <kbd className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">⌘K</kbd>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/20 p-1">
        <button
          onClick={() => setActiveTab('unidades')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'unidades'
              ? 'bg-slate-800 text-sky-400 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Unidades del Curso</span>
        </button>
        <button
          onClick={() => setActiveTab('estructuras')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'estructuras'
              ? 'bg-slate-800 text-sky-400 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Atlas Anatómico</span>
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
                    ? 'bg-slate-800/90 border-sky-500/70 shadow-lg shadow-sky-500/5'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setActiveUnit(unit.id)}
                  className="w-full p-3 text-left flex items-start justify-between gap-2"
                >
                  <div>
                    <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase">
                      Unidad {unit.unitNumber}
                    </span>
                    <h4 className="text-xs font-bold text-slate-100 leading-snug mt-0.5">
                      {unit.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {unit.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-sky-400' : ''}`} />
                </button>

                {isSelected && (
                  <div className="px-3 pb-3 pt-1 border-t border-slate-800/60 bg-slate-900/60 text-[11px] space-y-2">
                    <div className="text-slate-400 font-medium flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-sky-400" />
                      <span>Fuente: {unit.fileSource}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-500">Temas Clave:</span>
                      <ul className="space-y-1">
                        {unit.keyTopics.slice(0, 4).map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                            <span className="text-sky-400 font-bold">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1.5">
                        Estructuras Vinculadas:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {unit.associatedStructureIds.map((sId) => {
                          const struct = ANATOMICAL_STRUCTURES.find((x) => x.id === sId);
                          if (!struct) return null;
                          const isStructActive = selectedStructureId === struct.id;
                          return (
                            <button
                              key={sId}
                              onClick={() => selectStructure(struct.id)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                                isStructActive
                                  ? 'bg-sky-500 text-slate-950 font-bold'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                              }`}
                            >
                              {struct.name}
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
          <div className="p-2 border-b border-slate-800 bg-slate-950/30 flex items-center gap-1 overflow-x-auto no-scrollbar text-[11px]">
            <Filter className="w-3 h-3 text-slate-500 ml-1 shrink-0" />
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'corteza', label: 'Corteza' },
              { id: 'subcortical', label: 'Subcortical' },
              { id: 'tronco_cerebelo', label: 'Tronco/Cerebelo' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setLevelFilter(f.id)}
                className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                  levelFilter === f.id
                    ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/40'
                    : 'text-slate-400 hover:text-slate-200'
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
                  onClick={() => selectStructure(struct.id)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 transition-all ${
                    isSelected
                      ? 'bg-sky-500/20 border border-sky-500/60 text-white shadow-md'
                      : 'bg-slate-950/30 border border-slate-800/60 hover:bg-slate-800/70 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: struct.color }}
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold block truncate">
                        {struct.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {struct.lobe.toUpperCase()} • {struct.hemisphere}
                      </span>
                    </div>
                  </div>

                  {isMastered && (
                    <span title="Dominado">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300 text-[11px]">
            {masteredStructureIds.length} de {ANATOMICAL_STRUCTURES.length} dominados
          </span>
        </div>
        <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-400 h-full rounded-full transition-all duration-500"
            style={{
              width: `${(masteredStructureIds.length / ANATOMICAL_STRUCTURES.length) * 100}%`
            }}
          />
        </div>
      </div>
    </aside>
  );
};
