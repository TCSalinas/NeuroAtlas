import React, { useState, useEffect } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { DEMENTIA_DIFFERENTIAL_MATRIX } from '../../data/clinicalCorrelates';
import {
  Brain,
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  Maximize2,
  X,
  ImageIcon
} from 'lucide-react';

interface DementiaFigure {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  description: string;
  slideRef: string;
}

const DEMENTIA_FIGURES: DementiaFigure[] = [
  {
    id: 'fig-tabla-demencias',
    title: 'Tabla 2: Diagnóstico Diferencial de las Principales Demencias',
    subtitle: 'Matriz comparativa oficial de la Cátedra (Dr. Christian Salas)',
    src: './assets/figures/slide_tabla_demencias.png',
    description: 'Tabla original presentada en la diapositiva 33. Compara sistemáticamente la clínica inicial, deterioro cognitivo, examen neurológico, esfera psiquiátrica y hallazgos en neuroimagen entre Alzheimer, Demencia Vascular, Frontotemporal, Cuerpos de Lewy y Hakim-Adams.',
    slideRef: 'Demencias y otras patologías • Diapositiva 33'
  },
  {
    id: 'fig-alzheimer-neuropatologia',
    title: 'Neuropatología de la Enfermedad de Alzheimer',
    subtitle: 'Cascada amiloide, tau hiperfosforilada y atrofia cortical coronal',
    src: './assets/figures/slide_alzheimer.png',
    description: 'Esquema histopatológico y anatómico de la diapositiva 23. Muestra la comparación coronal entre un cerebro sano y uno con atrofia masiva temporomedial, dilatación ventricular ex vacuo y la acumulación de ovillos neurofibrilares y placas seniles.',
    slideRef: 'Demencias y otras patologías • Diapositiva 23'
  }
];

export const DemenciasMatrixView: React.FC = () => {
  const { dementiaFilterQuery } = useNeuroStore();
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>(dementiaFilterQuery || '');
  const [activeTab, setActiveTab] = useState<'matriz' | 'figuras_clase'>('matriz');
  const [activeFigureModal, setActiveFigureModal] = useState<DementiaFigure | null>(null);

  useEffect(() => {
    if (dementiaFilterQuery !== null && dementiaFilterQuery !== undefined) {
      setSearchTerm(dementiaFilterQuery);
    }
  }, [dementiaFilterQuery]);

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
    <div className="flex-1 h-full overflow-y-auto bg-[#faf8f5] p-6 space-y-6 text-slate-800 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#e6e1d6] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold tracking-wider uppercase mb-1">
              <Brain className="w-4 h-4 text-amber-700" />
              <span>Unidad 5 • Diagnóstico Diferencial de Trastornos Neurocognitivos Mayores</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Matriz Diferencial de Demencias y Patologías Neurodegenerativas
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Basada estrictamente en la Tabla 2 de la cátedra de Demencias (Prof. Dr. Christian Salas). Permite contrastar
              el debut clínico, perfil amnésico vs. disejecutivo, signos neurológicos extrapiramidales y correlatos en neuroimagen
              entre Alzheimer, Demencia Vascular, DLFT, Cuerpos de Lewy y Síndrome de Hakim-Adams.
            </p>
          </div>

          {/* Toggle between Matrix and Authentic Figures */}
          <div className="flex items-center bg-[#f3efe6] p-1 rounded-xl border border-[#ded7c8] shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('matriz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'matriz'
                  ? 'bg-white text-slate-900 shadow-sm border border-[#d6cfbe]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabla 2 Comparativa
            </button>
            <button
              onClick={() => setActiveTab('figuras_clase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'figuras_clase'
                  ? 'bg-white text-slate-900 shadow-sm border border-[#d6cfbe]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
              <span>Figuras de Clase ({DEMENTIA_FIGURES.length})</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter (only active in Matrix tab) */}
        {activeTab === 'matriz' && (
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mt-5 pt-4 border-t border-[#f0ede6]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar síntoma (ej: alucinaciones, marcha magnética, apatía, atrofia)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#dcd6c8] rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all ${
                    activeCategory === c.id
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-[#f4efe4] text-slate-700 hover:bg-[#eae4d5] border border-[#ded7c8]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeTab === 'matriz' ? (
        /* Interactive Responsive Matrix Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredData.map((d) => (
            <div
              key={d.id}
              className="bg-white border border-[#e6e1d6] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-400 transition-all"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-[#f0ede6] pb-3">
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-amber-900 font-bold font-mono">
                      {d.acronym}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-tight">
                      {d.name}
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f4efe4] text-slate-600 border border-[#e2dcd0] font-mono">
                    Tabla 2
                  </span>
                </div>

                {/* Sections based on activeCategory filter */}
                {(activeCategory === 'todos' || activeCategory === 'clinica') && (
                  <div className="bg-[#fbf9f5] p-3 rounded-xl border border-[#ede7da] text-xs">
                    <span className="font-bold text-amber-800 block mb-1">Clínica Inicial:</span>
                    <p className="text-slate-600 leading-relaxed">{d.initialClinic}</p>
                  </div>
                )}

                {(activeCategory === 'todos' || activeCategory === 'cognitivo') && (
                  <div className="bg-sky-50/60 p-3 rounded-xl border border-sky-200/80 text-xs">
                    <span className="font-bold text-sky-900 block mb-1">Deterioro Cognitivo:</span>
                    <p className="text-sky-950 leading-relaxed">{d.cognitiveProfile}</p>
                  </div>
                )}

                {(activeCategory === 'todos' || activeCategory === 'neurologico') && (
                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/80 text-xs">
                    <span className="font-bold text-emerald-900 block mb-1">Exploración Neurológica:</span>
                    <p className="text-emerald-950 leading-relaxed">{d.neurologicalExam}</p>
                  </div>
                )}

                {(activeCategory === 'todos' || activeCategory === 'psiquiatrico') && (
                  <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-200/80 text-xs">
                    <span className="font-bold text-rose-900 block mb-1">Exploración Psiquiátrica:</span>
                    <p className="text-rose-950 leading-relaxed">{d.psychiatricFeatures}</p>
                  </div>
                )}

                {(activeCategory === 'todos' || activeCategory === 'neuroimagen') && (
                  <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200/80 text-xs">
                    <span className="font-bold text-purple-900 block mb-1">Hallazgos en Neuroimagen:</span>
                    <p className="text-purple-950 leading-relaxed">{d.neuroimagingFindings}</p>
                  </div>
                )}

                {(activeCategory === 'todos' || activeCategory === 'fisiopato') && (
                  <div className="bg-[#fbf9f5] p-3 rounded-xl border border-[#ede7da] text-xs">
                    <span className="font-bold text-slate-800 block mb-1">Fisiopatología / Proteínas:</span>
                    <p className="text-slate-600 leading-relaxed">{d.pathophysiology}</p>
                  </div>
                )}
              </div>

              {/* Footer reference */}
              <div className="pt-2 border-t border-[#f0ede6] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-amber-700" />
                  {d.courseSlideReference}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Figures Gallery */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMENTIA_FIGURES.map((fig) => (
              <div
                key={fig.id}
                className="bg-white border border-[#e6e1d6] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-amber-400 transition-all"
              >
                <div>
                  {/* Image Preview Container */}
                  <div
                    onClick={() => setActiveFigureModal(fig)}
                    className="relative bg-[#f4efe5] cursor-pointer overflow-hidden border-b border-[#e6e1d6] aspect-[16/10] flex items-center justify-center p-2"
                  >
                    <img
                      src={fig.src}
                      alt={fig.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-slate-900 font-bold text-xs rounded-lg shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
                        Ampliar Figura de Clase
                      </span>
                    </div>
                  </div>

                  {/* Figure Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-800 uppercase tracking-wider">
                        {fig.slideRef}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {fig.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {fig.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {fig.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#faf8f5] border-t border-[#ede7dc] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    Cátedra de Demencias UDP
                  </span>
                  <button
                    onClick={() => setActiveFigureModal(fig)}
                    className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>Ver en alta resolución</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Zoom for Figures */}
      {activeFigureModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveFigureModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#ded7c8]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-[#e8e2d5] flex items-center justify-between bg-[#faf8f5]">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  {activeFigureModal.slideRef}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {activeFigureModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveFigureModal(null)}
                className="w-8 h-8 rounded-lg bg-[#ede7dc] hover:bg-[#e2dacb] text-slate-700 flex items-center justify-center transition-colors"
                title="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="flex-1 bg-[#1a1c23] p-4 flex items-center justify-center overflow-auto min-h-[350px]">
              <img
                src={activeFigureModal.src}
                alt={activeFigureModal.title}
                className="max-h-[60vh] max-w-full object-contain rounded shadow"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 bg-white border-t border-[#e8e2d5] space-y-1">
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeFigureModal.description}
              </p>
              <p className="text-[11px] text-slate-500">
                Fuente: Presentación docente oficial "Demencias y otras patologías 2022.pdf" (Prof. Dr. Christian Salas).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
