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
  Sparkles,
  Scissors,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setIsSearchOpen,
    masteredStructureIds,
    isSidebarOpen,
    toggleSidebar,
  } = useNeuroStore();

  const totalStructures = ANATOMICAL_STRUCTURES.length;
  const masteredCount = masteredStructureIds.length;
  const progressPercent = Math.round((masteredCount / totalStructures) * 100);

  const views: { id: ActiveAppView; label: string; icon: any }[] = [
    { id: 'atlas3d', label: 'Cerebro 3D', icon: Brain },
    { id: 'cortes', label: 'Cortes Clásicos', icon: Scissors },
    { id: 'vascular', label: 'Territorios ACV', icon: Activity },
    { id: 'citoarquitectura', label: 'Citoarquitectura', icon: Layers },
    { id: 'demencias', label: 'Matriz Demencias', icon: FileSpreadsheet },
    { id: 'quiz', label: 'Autoevaluación', icon: GraduationCap },
    { id: 'atlas2d', label: 'Atlas 2D Accesible', icon: CheckCircle2 },
  ];

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#e6e1d6] px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 sm:gap-4 z-30 select-none shadow-sm shrink-0">
      {/* Brand & Mobile/Tablet Sidebar Toggle */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-[#f4f0e8] hover:bg-[#ede7da] border border-[#ded7c8] transition-colors shrink-0 flex items-center justify-center"
          title={isSidebarOpen ? 'Cerrar temario' : 'Abrir temario y estructuras'}
          aria-label="Abrir temario y estructuras"
        >
          {isSidebarOpen ? <X className="w-4 h-4 text-slate-700" /> : <Menu className="w-4 h-4 text-slate-700" />}
        </button>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-md shadow-amber-500/10 text-white shrink-0">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5 font-sans">
              NeuroAtlas
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono font-normal">v1.0</span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-500 hidden lg:block">
            Neuropsicología Clínica • UDP (PSI4436)
          </p>
        </div>
      </div>

      {/* Mode Navigation Tabs in Warm Pastel Style */}
      <nav className="flex items-center gap-1 bg-[#f4f0e8] p-1 rounded-xl border border-[#e6e1d6] overflow-x-auto no-scrollbar">
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = activeView === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-[#dfd9ce]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-500'}`} />
              <span>{v.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Search and Study Progress */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#f4f0e8] hover:bg-white border border-[#e6e1d6] text-slate-700 hover:text-slate-900 rounded-xl text-xs transition-colors shadow-sm"
          title="Buscar en el Atlas (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden md:inline text-[11px] font-medium">Buscar</span>
          <kbd className="hidden lg:inline text-[9px] bg-white text-slate-500 px-1 rounded border border-slate-300 font-mono">⌘K</kbd>
        </button>

        {/* Progress Pill in Warm Pastel */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-bold">{progressPercent}%</span>
          <span className="text-[10px] text-emerald-700 hidden lg:inline">Dominado</span>
        </div>
      </div>
    </header>
  );
};
