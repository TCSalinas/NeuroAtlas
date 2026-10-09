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
  ChevronLeft,
  Sparkles,
  MapPin,
  X,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';

export const StructureDrawer: React.FC = () => {
  const {
    selectedStructureId,
    selectStructure,
    masteredStructureIds,
    toggleStructureMastered,
  } = useNeuroStore();

  const [activeTab, setActiveTab] = useState<'anatomia' | 'funciones' | 'circuitos' | 'clinica' | 'fuentes'>('anatomia');
  const [activeFigureModal, setActiveFigureModal] = useState<{
    url: string;
    caption?: string;
    title: string;
    slideOrPage?: string;
  } | null>(null);

  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkTabsScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  React.useEffect(() => {
    checkTabsScroll();
    const el = tabsRef.current;
    if (el) {
      el.addEventListener('scroll', checkTabsScroll);
      window.addEventListener('resize', checkTabsScroll);
      return () => {
        el.removeEventListener('scroll', checkTabsScroll);
        window.removeEventListener('resize', checkTabsScroll);
      };
    }
  }, [selectedStructureId]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: direction === 'right' ? 130 : -130,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeFigureModal) {
          setActiveFigureModal(null);
        } else {
          selectStructure(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectStructure, activeFigureModal]);

  if (!selectedStructureId) {
    return null;
  }

  const struct = ANATOMICAL_STRUCTURES.find((s) => s.id === selectedStructureId);

  if (!struct) return null;

  const isMastered = masteredStructureIds.includes(struct.id);
  const vascularTerritory = VASCULAR_TERRITORIES[struct.vascularTerritory];

  return (
    <>
      {/* Tablet & Mobile Backdrop */}
      <div
        onClick={() => selectStructure(null)}
        className="fixed inset-0 bg-stone-950/30 backdrop-blur-xs z-30 xl:hidden animate-fadeIn"
      />

      <aside className="fixed xl:static top-0 bottom-0 right-0 z-40 w-full sm:w-[400px] xl:w-[420px] h-full bg-[#faf8f5] backdrop-blur-xl border-l border-[#e6e1d6] flex flex-col shadow-2xl xl:shadow-none overflow-hidden text-slate-800 font-sans min-w-0">
        {/* Header of Drawer */}
        <div className="p-4 border-b border-[#e8e2d5] bg-white shrink-0">
          <div className="flex items-start justify-between gap-3 min-w-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm ring-1 ring-black/10"
                  style={{ backgroundColor: struct.color }}
                />
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800 truncate">
                  {struct.level.replace('_', ' • ')}
                </span>
                {struct.isDeepStructure && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 border border-purple-300 text-purple-900 font-bold shrink-0">
                    Subcortical
                  </span>
                )}
                {struct.hierarchy === 'limbica' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold shrink-0">
                    Límbico
                  </span>
                )}
              </div>
              <h2 className="text-lg font-black text-slate-900 leading-tight break-words">{struct.name}</h2>
              {struct.latinName && (
                <p className="text-xs text-slate-500 italic mt-0.5 break-words">{struct.latinName}</p>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => toggleStructureMastered(struct.id)}
                className={`p-1.5 rounded-xl border transition-all ${
                  isMastered
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-sm'
                    : 'bg-[#f4efe4] border-[#ded7c8] text-slate-600 hover:text-slate-900 hover:bg-[#ede7da]'
                }`}
                title={isMastered ? 'Concepto dominado' : 'Marcar como dominado'}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => selectStructure(null)}
                className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-[#f4efe4] border border-[#e2ded4] rounded-xl transition-colors flex items-center gap-1"
                title="Cerrar ficha (o presiona Escape)"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-bold">Cerrar</span>
              </button>
            </div>
          </div>

          {/* Synonyms & Quick Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {struct.brodmannAreas && struct.brodmannAreas.length > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 font-mono font-bold">
                Brodmann: {struct.brodmannAreas.join(', ')}
              </span>
            )}
            {vascularTerritory && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-50 border border-rose-300 text-rose-900 font-semibold">
                Irrigación: {vascularTerritory.id.toUpperCase()}
              </span>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f4efe4] border border-[#e2dcd0] text-slate-700 font-medium">
              Hemisferio: {struct.hemisphere}
            </span>
          </div>
        </div>

        {/* Tabs Bar with Overflow Indicators & Quick Cues */}
        <div className="relative border-b border-[#e8e2d5] bg-[#f5f1e8] shrink-0">
          {/* Left Scroll Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scrollTabs('left')}
              className="absolute left-0 top-0 bottom-0 pl-1.5 pr-3 bg-gradient-to-r from-[#f5f1e8] via-[#f5f1e8]/95 to-transparent flex items-center z-10 transition-opacity"
              title="Ver pestañas anteriores"
            >
              <span className="p-1 rounded-full bg-white text-slate-700 border border-[#ded8cb] shadow-xs hover:bg-[#ede7da] transition-all flex items-center justify-center">
                <ChevronLeft className="w-3 h-3 text-slate-700" />
              </span>
            </button>
          )}

          {/* Tab items list */}
          <div
            ref={tabsRef}
            onScroll={checkTabsScroll}
            className="flex items-center px-2 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {[
              { id: 'anatomia', label: 'Anatomía', icon: BookOpen },
              { id: 'funciones', label: 'Funciones', icon: Activity },
              { id: 'circuitos', label: 'Circuitos', icon: GitFork },
              { id: 'clinica', label: 'Clínica', icon: AlertTriangle },
              { id: 'fuentes', label: 'Fuentes', icon: FileText, badge: struct.sources.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    setActiveTab(tab.id as any);
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'border-amber-600 text-amber-900 bg-white shadow-sm'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                      isActive ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-[#e7e1d5] text-slate-700'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Scroll Indicator & Pill */}
          {canScrollRight && (
            <button
              onClick={() => {
                scrollTabs('right');
                if (activeTab !== 'fuentes' && tabsRef.current && tabsRef.current.scrollLeft > 60) {
                  setActiveTab('fuentes');
                }
              }}
              className="absolute right-0 top-0 bottom-0 pr-1.5 pl-4 bg-gradient-to-l from-[#f5f1e8] via-[#f5f1e8]/95 to-transparent flex items-center z-10"
              title="Deslizar para ver Fuentes e Ilustraciones"
            >
              <span className="text-[10px] bg-amber-100/95 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-bold shadow-xs flex items-center gap-1 hover:bg-amber-200 transition-all cursor-pointer">
                <FileText className="w-2.5 h-2.5 text-amber-700" />
                <span>Fuentes</span>
                <ChevronRight className="w-3 h-3 text-amber-700" />
              </span>
            </button>
          )}
        </div>

        {/* Content Area with smooth scrolling */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed min-w-0">
          {/* TAB: ANATOMIA */}
          {activeTab === 'anatomia' && (
            <div className="space-y-4 min-w-0">
              <div className="bg-white p-3.5 rounded-xl border border-[#e6e1d6] shadow-sm min-w-0">
                <span className="text-amber-800 font-bold block mb-1">Descripción General:</span>
                <p className="text-slate-700 leading-relaxed break-words">{struct.overview}</p>
              </div>

              <div className="space-y-1.5 min-w-0">
                <span className="text-slate-700 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  Ubicación Topográfica
                </span>
                <p className="text-slate-700 bg-white p-3 rounded-xl border border-[#e6e1d6] shadow-sm break-words">
                  {struct.anatomicalLocation}
                </p>
              </div>

              {struct.organizationAndSubdivisions.length > 0 && (
                <div className="space-y-1.5 min-w-0">
                  <span className="text-slate-700 font-bold block text-[11px] uppercase tracking-wider">
                    Organización y Subdivisiones Anatómicas
                  </span>
                  <ul className="space-y-1.5">
                    {struct.organizationAndSubdivisions.map((sub, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-[#e6e1d6] shadow-sm min-w-0">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="break-words min-w-0">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {struct.synonyms.length > 0 && (
                <div className="text-[11px] text-slate-600 bg-[#f6f2e9] p-2.5 rounded-lg border border-[#e5decb] break-words">
                  <span className="font-bold text-slate-800">Términos sinónimos: </span>
                  {struct.synonyms.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* TAB: FUNCIONES */}
          {activeTab === 'funciones' && (
            <div className="space-y-4 min-w-0">
              <div className="space-y-1.5 min-w-0">
                <span className="text-emerald-900 font-bold block text-[11px] uppercase tracking-wider">
                  Funciones Principales
                </span>
                <ul className="space-y-1.5">
                  {struct.primaryFunctions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-xl text-emerald-950 font-medium shadow-sm min-w-0">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="break-words min-w-0">{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 min-w-0">
                <span className="text-amber-900 font-bold block text-[11px] uppercase tracking-wider">
                  Procesos Cognitivos Asociados (Neuropsicología)
                </span>
                <ul className="space-y-1.5">
                  {struct.associatedCognitiveProcesses.map((proc, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white border border-[#e6e1d6] p-2.5 rounded-xl text-slate-700 shadow-sm min-w-0">
                      <Activity className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="break-words min-w-0">{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB: CIRCUITOS */}
          {activeTab === 'circuitos' && (
            <div className="space-y-3 min-w-0">
              <span className="text-purple-900 font-bold block text-[11px] uppercase tracking-wider">
                Conexiones Sinápticas y Fascículos de Asociación
              </span>
              {struct.neuralCircuitsAndConnections.map((conn, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-purple-50/70 border border-purple-200 p-3 rounded-xl text-purple-950 shadow-sm font-medium min-w-0">
                  <GitFork className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <span className="break-words min-w-0">{conn}</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB: CLINICA */}
          {activeTab === 'clinica' && (
            <div className="space-y-4 min-w-0">
              <span className="text-rose-900 font-bold block text-[11px] uppercase tracking-wider">
                Síndromes Clínicos y Lesiones (Materias de Cátedra)
              </span>
              {struct.clinicalCorrelates.map((correlate, idx) => (
                <div key={idx} className="bg-white border border-rose-200/90 rounded-xl p-3.5 space-y-2 shadow-sm min-w-0 overflow-hidden">
                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <h4 className="font-bold text-rose-900 text-xs flex items-center gap-1.5 break-words min-w-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{correlate.title}</span>
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold shrink-0 max-w-[150px] truncate" title={correlate.courseUnitReference}>
                      {correlate.courseUnitReference}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-800 font-semibold break-words">{correlate.syndrome}</p>
                  
                  <div className="space-y-1 pt-1 min-w-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Signos y Síntomas Clave:</span>
                    <ul className="space-y-1">
                      {correlate.symptoms.map((sym, sIdx) => (
                        <li key={sIdx} className="text-slate-700 flex items-start gap-1.5 text-[11px] min-w-0">
                          <span className="text-rose-600 font-bold shrink-0">•</span>
                          <span className="break-words min-w-0">{sym}</span>
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
            <div className="space-y-3 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-amber-900 font-bold block text-[11px] uppercase tracking-wider">
                  Trazabilidad Académica e Ilustraciones
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {struct.sources.length} fuente{struct.sources.length !== 1 ? 's' : ''}
                </span>
              </div>

              {struct.sources.map((src, idx) => (
                <div key={idx} className="bg-white border border-[#e6e1d6] rounded-xl p-3.5 space-y-2.5 shadow-sm overflow-hidden min-w-0">
                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <span className="font-bold text-slate-900 text-xs break-words min-w-0">{src.documentTitle}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold shrink-0 whitespace-nowrap ${
                      src.type === 'presentacion_catedra' 
                        ? 'bg-amber-50 text-amber-900 border border-amber-300'
                        : 'bg-blue-50 text-blue-900 border border-blue-300'
                    }`}>
                      {src.slideOrPage}
                    </span>
                  </div>

                  {/* Figure Preview Card if available */}
                  {src.figureUrl && (
                    <div className="rounded-xl overflow-hidden border border-[#e2dcd0] bg-[#fbf9f5] group shadow-sm">
                      <div 
                        onClick={() => setActiveFigureModal({
                          url: src.figureUrl!,
                          caption: src.figureCaption,
                          title: src.documentTitle,
                          slideOrPage: src.slideOrPage
                        })}
                        className="relative cursor-pointer overflow-hidden aspect-[16/10] bg-slate-900 flex items-center justify-center transition-all"
                      >
                        <img 
                          src={src.figureUrl} 
                          alt={src.figureCaption || src.documentTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold backdrop-blur-[2px]">
                          <Maximize2 className="w-4 h-4" />
                          <span>Ver Ilustración Completa</span>
                        </div>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold backdrop-blur-sm flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-amber-400" />
                          Diapositiva Cátedra
                        </span>
                      </div>
                      {src.figureCaption && (
                        <div className="p-2.5 text-[11px] text-slate-700 bg-white border-t border-[#f0ebe1] flex items-start gap-1.5">
                          <span className="text-amber-700 font-bold shrink-0">✦</span>
                          <p className="leading-snug break-words">{src.figureCaption}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <blockquote className="border-l-2 border-amber-500 pl-2.5 text-slate-700 italic text-[11px] my-1 bg-[#fbf9f5] py-1.5 rounded-r break-words min-w-0">
                    "{src.directQuoteOrSummary}"
                  </blockquote>

                  <div className="text-[10px] text-slate-500 flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-[#f2ede4] min-w-0">
                    <span className="break-all min-w-0">Archivo: {src.fileReference}</span>
                    {src.externalUrl && (
                      <a
                        href={src.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-700 hover:underline flex items-center gap-1 font-semibold shrink-0"
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
        <div className="p-3 border-t border-[#e8e2d5] bg-white flex items-center justify-between text-xs shrink-0">
          <button
            onClick={() => toggleStructureMastered(struct.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
              isMastered
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-[#f4efe4] hover:bg-[#ede7da] text-slate-800 border border-[#ded7c8]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isMastered ? 'Concepto Dominado' : 'Marcar para Repaso'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              <code className="text-slate-700 font-mono font-semibold">{struct.id}</code>
            </span>
            <button
              onClick={() => selectStructure(null)}
              className="px-3 py-1.5 rounded-xl font-bold bg-[#ede7da] text-slate-700 hover:bg-[#e2dacb] hover:text-slate-900 text-xs transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </aside>

      {/* Lightbox Modal for High-Resolution Figure */}
      {activeFigureModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveFigureModal(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[92vh] w-full bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 border-b border-stone-200 flex items-center justify-between bg-[#faf8f5]">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  {activeFigureModal.slideOrPage || 'Material de Cátedra'}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                  {activeFigureModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveFigureModal(null)}
                className="p-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-slate-700 hover:text-slate-900 transition-colors shrink-0"
                title="Cerrar (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-2 sm:p-4 bg-stone-900 flex items-center justify-center min-h-[300px]">
              <img 
                src={activeFigureModal.url} 
                alt={activeFigureModal.caption || activeFigureModal.title}
                className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Caption Footer */}
            {activeFigureModal.caption && (
              <div className="p-3 sm:p-4 bg-white border-t border-stone-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                <span className="text-amber-700 font-bold shrink-0">✦</span>
                <p className="leading-relaxed break-words">{activeFigureModal.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
