import React, { useState, useRef, useEffect } from 'react';
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
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Check,
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

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile dropdown when tapping outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMobileNavOpen(false);
      }
    };
    if (isMobileNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileNavOpen]);

  const totalStructures = ANATOMICAL_STRUCTURES.length;
  const masteredCount = masteredStructureIds.length;
  const progressPercent = Math.round((masteredCount / totalStructures) * 100);

  const views: { id: ActiveAppView; label: string; desc: string; icon: any }[] = [
    { id: 'atlas3d', label: 'Cerebro 3D', desc: 'Modelo 3D interactivo y cortes', icon: Brain },
    { id: 'cortes', label: 'Cortes Clásicos', desc: 'Charcot, Flechsig y Sagital clínico', icon: Scissors },
    { id: 'vascular', label: 'Territorios ACV', desc: 'ACA, ACM, ACP y síndromes', icon: Activity },
    { id: 'citoarquitectura', label: 'Citoarquitectura', desc: 'Brodmann y capas corticales', icon: Layers },
    { id: 'demencias', label: 'Matriz Demencias', desc: 'Alzheimer, FTD, Lewy y perfiles', icon: FileSpreadsheet },
    { id: 'quiz', label: 'Autoevaluación', desc: 'Casos clínicos y preguntas', icon: GraduationCap },
    { id: 'atlas2d', label: 'Atlas 2D Accesible', desc: 'Diagramas vectoriales ligeros', icon: CheckCircle2 },
  ];

  const currentView = views.find((v) => v.id === activeView) || views[0];
  const CurrentIcon = currentView.icon;

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#e6e1d6] px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 sm:gap-4 z-30 select-none shadow-sm shrink-0">
      {/* Brand & Sidebar Toggle (Always accessible) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={toggleSidebar}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all shrink-0 ${
            isSidebarOpen
              ? 'bg-amber-100/90 text-amber-950 border-amber-300 shadow-xs'
              : 'bg-[#f4f0e8] hover:bg-[#ede7da] text-slate-700 hover:text-slate-900 border-[#ded7c8]'
          }`}
          title={isSidebarOpen ? 'Ocultar panel lateral (Temario)' : 'Mostrar panel lateral (Temario)'}
          aria-label={isSidebarOpen ? 'Ocultar temario' : 'Mostrar temario'}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-4 h-4 text-amber-900" />
          ) : (
            <PanelLeftOpen className="w-4 h-4 text-slate-700" />
          )}
          <span className="hidden sm:inline text-xs font-bold">
            {isSidebarOpen ? 'Ocultar' : 'Temario'}
          </span>
        </button>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-md shadow-amber-500/10 text-white shrink-0">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5 font-sans">
              <span className="hidden xs:inline">NeuroAtlas</span>
              <span className="xs:hidden">Atlas</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono font-normal">v1.0</span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-500 hidden lg:block">
            Neuropsicología Clínica • UDP (PSI4436)
          </p>
        </div>
      </div>

      {/* Mobile Prominent Dropdown Selector (md:hidden) */}
      <div className="relative md:hidden shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all active:scale-95 shadow-sm ${
            isMobileNavOpen
              ? 'bg-amber-100 border-amber-500 text-amber-950 ring-2 ring-amber-400/30'
              : 'bg-amber-50/90 hover:bg-amber-100 border-amber-400 text-slate-900'
          }`}
          aria-expanded={isMobileNavOpen}
          aria-label="Seleccionar sección o vista"
        >
          <CurrentIcon className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-bold text-xs truncate max-w-[95px] xs:max-w-[130px]">
            {currentView.label}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-amber-800 transition-transform duration-200 shrink-0 ${
              isMobileNavOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Card */}
        {isMobileNavOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setIsMobileNavOpen(false)}
            />

            {/* Menu List: 100% Solid White Card */}
            <div
              style={{ backgroundColor: '#ffffff', opacity: 1 }}
              className="fixed top-16 left-3 right-3 sm:absolute sm:left-0 sm:right-auto sm:top-full sm:mt-2 sm:w-80 bg-white rounded-2xl border-2 border-amber-400 shadow-2xl z-50 p-2.5 flex flex-col max-h-[75vh]"
            >
              <div className="px-3 py-2 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-xl mb-1 shrink-0">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-amber-600" />
                  Secciones del Atlas (7)
                </span>
                <span className="text-[10px] text-slate-600 font-bold bg-white px-2 py-0.5 rounded-md border border-stone-200">
                  Toca para cambiar
                </span>
              </div>

              <div className="py-1.5 flex flex-col gap-1 overflow-y-auto no-scrollbar">
                {views.map((v) => {
                  const Icon = v.icon;
                  const isActive = activeView === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setActiveView(v.id);
                        setIsMobileNavOpen(false);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-all active:scale-[0.98] ${
                        isActive
                          ? 'bg-amber-100/90 text-amber-950 font-bold border border-amber-300 shadow-xs'
                          : 'hover:bg-[#f7f4ee] text-slate-700 active:bg-[#eee8dc]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-[#ede7da] text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold leading-tight text-slate-900 truncate">
                            {v.label}
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight truncate">
                            {v.desc}
                          </div>
                        </div>
                      </div>
                      {isActive ? (
                        <span className="flex items-center gap-1 text-[10px] font-black text-amber-800 bg-white/95 px-2 py-0.5 rounded-md border border-amber-300 shrink-0 ml-2">
                          <Check className="w-3 h-3 text-amber-600" />
                          Activo
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Mode Navigation Tabs in Warm Pastel Style (hidden on mobile) */}
      <nav className="hidden md:flex items-center gap-1 bg-[#f4f0e8] p-1 rounded-xl border border-[#e6e1d6] overflow-x-auto no-scrollbar">
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
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
