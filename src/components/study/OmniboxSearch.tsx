import React, { useEffect, useRef } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import { COURSE_UNITS } from '../../data/courseUnits';
import { Search, X, ChevronRight, GraduationCap } from 'lucide-react';

export const OmniboxSearch: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    selectStructure,
    setActiveView,
    setActiveUnit,
  } = useNeuroStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.trim().toLowerCase();

  // Search in anatomical structures
  const matchingStructures = query
    ? ANATOMICAL_STRUCTURES.filter((s) => {
        return (
          s.name.toLowerCase().includes(query) ||
          s.synonyms.some((syn) => syn.toLowerCase().includes(query)) ||
          s.primaryFunctions.some((f) => f.toLowerCase().includes(query)) ||
          s.clinicalCorrelates.some((c) =>
            c.title.toLowerCase().includes(query) ||
            c.syndrome.toLowerCase().includes(query) ||
            c.symptoms.some((sym) => sym.toLowerCase().includes(query))
          )
        );
      })
    : [];

  // Search in course units
  const matchingUnits = query
    ? COURSE_UNITS.filter((u) => {
        return (
          u.title.toLowerCase().includes(query) ||
          u.keyTopics.some((t) => t.toLowerCase().includes(query))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-4 pt-20 animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-950/40">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar estructura, afasia, amnesia, capa, arteria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-3 text-xs">
          {!query && (
            <div className="py-8 text-center text-slate-500 space-y-1">
              <p>Escribe cualquier término del curso para buscar al instante.</p>
              <p className="text-[11px] text-slate-600">Ejemplos: "Broca", "Alzheimer", "neglect", "capa IV", "cuerpo calloso", "Hakim"</p>
            </div>
          )}

          {query && matchingStructures.length === 0 && matchingUnits.length === 0 && (
            <div className="py-8 text-center text-slate-500">
              No se encontraron coincidencias para "{searchQuery}".
            </div>
          )}

          {/* Structures Matches */}
          {matchingStructures.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider px-2 block">
                Estructuras Anatómicas ({matchingStructures.length})
              </span>
              {matchingStructures.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    selectStructure(s.id);
                    setActiveView('atlas3d');
                    setIsSearchOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl text-left bg-slate-950/40 hover:bg-slate-800 border border-slate-800/60 hover:border-slate-700 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <div>
                      <span className="font-bold text-slate-100 block group-hover:text-sky-300">
                        {s.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {s.level} • {s.lobe}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                </button>
              ))}
            </div>
          )}

          {/* Course Units Matches */}
          {matchingUnits.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider px-2 block">
                Unidades del Curso ({matchingUnits.length})
              </span>
              {matchingUnits.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setActiveUnit(u.id);
                    setActiveView('atlas3d');
                    setIsSearchOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl text-left bg-slate-950/40 hover:bg-slate-800 border border-slate-800/60 hover:border-slate-700 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-100 block group-hover:text-emerald-300">
                        Unidad {u.unitNumber}: {u.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block line-clamp-1">
                        {u.description}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>Pulsa <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ESC</kbd> para cerrar</span>
          <span>Búsqueda instantánea en cliente</span>
        </div>
      </div>
    </div>
  );
};
