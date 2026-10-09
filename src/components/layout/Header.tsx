import React from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ActiveAppView } from '../../types/neuro';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import {
  Brain,
  Layers,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  GraduationCap,
  Activity,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setIsSearchOpen,
    masteredStructureIds,
  } = useNeuroStore();

  const totalStructures = ANATOMICAL_STRUCTURES.length;
  const masteredCount = masteredStructureIds.length;
  const progressPercent = Math.round((masteredCount / totalStructures) * 100);

  const views: { id: ActiveAppView; label: string; icon: any }[] = [
    { id: 'atlas3d', label: 'Cerebro 3D', icon: Brain },
    { id: 'vascular', label: 'Territorios ACV', icon: Activity },
    { id: 'citoarquitectura', label: 'Citoarquitectura', icon: Layers },
    { id: 'demencias', label: 'Matriz Demencias', icon: FileSpreadsheet },
    { id: 'quiz', label: 'Autoevaluación', icon: GraduationCap },
    { id: 'atlas2d', label: 'Atlas 2D Accesible', icon: CheckCircle2 },
  ];

  return (
    <header className="h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 md:px-6 flex items-center justify-between gap-4 z-30 select-none">
      {/* Brand */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
              NeuroAtlas
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40 font-mono font-normal">v1.0</span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            Neuropsicología Clínica • UDP (PSI4436)
          </p>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <nav className="flex items-center gap-1 bg-slate-950/50 p-1 rounded-xl border border-slate-800/80 overflow-x-auto no-scrollbar">
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = activeView === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{v.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Search and Study Progress */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-300 rounded-xl text-xs transition-colors"
          title="Buscar en el Atlas (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden md:inline text-[11px]">Buscar</span>
          <kbd className="hidden lg:inline text-[9px] bg-slate-900 text-slate-400 px-1 rounded border border-slate-700 font-mono">⌘K</kbd>
        </button>

        {/* Progress Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-300 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold">{progressPercent}%</span>
          <span className="text-[10px] text-emerald-400/80 hidden lg:inline">Dominado</span>
        </div>
      </div>
    </header>
  );
};
