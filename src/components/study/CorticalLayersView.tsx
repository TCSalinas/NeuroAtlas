import React, { useState, useEffect } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { CORTICAL_LAYERS, BRODMANN_KEY_AREAS } from '../../data/cytoarchitecture';
import {
  Layers,
  ArrowDownCircle,
  ArrowUpCircle,
  Sparkles,
  Info,
  Maximize2,
  X,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';

interface SlideFigure {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  description: string;
  slideRef: string;
}

const CYTO_FIGURES: SlideFigure[] = [
  {
    id: 'capas-corteza',
    title: 'Estructura Laminar y Columnas Funcionales',
    subtitle: 'Capas I-VI, neuronas piramidales y estrelladas, y columnas de orientación (V1)',
    src: './assets/figures/slide_capas_corteza.png',
    description: 'Figura 5.8 de Squire et al. (2003) presentada en la clase. Muestra la estratificación laminar de la isocorteza cerebral (6 capas horizontales) y la organización vertical en microcolumnas y macrocolumnas con bandas de dominancia ocular.',
    slideRef: 'Panorámica neurofuncional • Diapositiva 27'
  },
  {
    id: 'mapa-brodmann',
    title: 'Mapa Citoarquitectónico de Brodmann',
    subtitle: 'Superficie lateral y medial del hemisferio cerebral',
    src: './assets/figures/slide_brodmann.png',
    description: 'Mapa original de Korbinian Brodmann (1909) con las 52 áreas corticales diferenciadas según su densidad celular laminar (Nissl). Destaca el Área 4 (motora agranular) y el Área 17 (visual estriada hipergranular).',
    slideRef: 'Panorámica neurofuncional • Diapositiva 25'
  },
  {
    id: 'jerarquia-asociacion',
    title: 'Jerarquía de Áreas Unimodales y Heteromodales',
    subtitle: 'Modelo funcional de procesamiento cortical de Mesulam',
    src: './assets/figures/slide_asociacion.png',
    description: 'Diagrama que ilustra la transición desde cortezas sensoriales primarias hacia áreas de asociación unimodal (corteza preestriada visual) y áreas heteromodales (córtex prefrontal y parietotemporal) conectadas con el sistema paralímbico.',
    slideRef: 'Panorámica neurofuncional • Diapositiva 29'
  },
  {
    id: 'areas-funcionales',
    title: 'Esquema de Áreas Funcionales Neocorticales',
    subtitle: 'Integración motora, somatosensorial, auditiva y asociativa',
    src: './assets/figures/slide_areas_funcionales.png',
    description: 'Distribución macroscópica de las cortezas primarias y secundarias con la numeración de Brodmann correlacionada con las funciones neurocognitivas centrales abordadas en la unidad.',
    slideRef: 'Panorámica neurofuncional • Diapositiva 31'
  }
];

export const CorticalLayersView: React.FC = () => {
  const { selectedLayerNum: storeLayerNum } = useNeuroStore();
  const [selectedLayerNum, setSelectedLayerNum] = useState<number>(storeLayerNum || 4);
  const [activeFigureModal, setActiveFigureModal] = useState<SlideFigure | null>(null);
  const [activeTab, setActiveTab] = useState<'laminas' | 'figuras_clase'>('laminas');

  useEffect(() => {
    if (storeLayerNum) {
      setSelectedLayerNum(storeLayerNum);
    }
  }, [storeLayerNum]);

  const selectedLayer = CORTICAL_LAYERS.find((l) => l.number === selectedLayerNum) || CORTICAL_LAYERS[3];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#faf8f5] p-6 space-y-6 text-slate-800 font-sans">
      {/* Header Banner - Warm Academic Linen Aesthetic */}
      <div className="bg-white p-6 rounded-2xl border border-[#e6e1d6] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold tracking-wider uppercase mb-1">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Unidad 1 • Citoarquitectura Neocortical y Organización en Columnas</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Estructura Laminar y Citoarquitectura de la Corteza Cerebral
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              La neocorteza humana (isocorteza) posee un espesor medio de 2 a 4 mm estructurado en 6 capas neuronales horizontales
              y unidades verticales de procesamiento (microcolumnas corticales). Esta arquitectura permite segregar las entradas
              talámicas específicas de las eferencias motoras y las conexiones de largo alcance interhemisféricas.
            </p>
          </div>

          {/* Toggle between interactive layers and lecture slide figures */}
          <div className="flex items-center bg-[#f3efe6] p-1 rounded-xl border border-[#ded7c8] shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('laminas')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'laminas'
                  ? 'bg-white text-slate-900 shadow-sm border border-[#d6cfbe]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>Capas I - VI</span>
            </button>
            <button
              onClick={() => setActiveTab('figuras_clase')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'figuras_clase'
                  ? 'bg-white text-slate-900 shadow-sm border border-[#d6cfbe]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-sky-700" />
              <span>Figuras de Clase ({CYTO_FIGURES.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'laminas' ? (
        /* Main Interactive Diagram & Detail Split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Vertical Cortical Slice (6 layers) */}
          <div className="lg:col-span-5 bg-white border border-[#e6e1d6] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f0ede6]">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Corte Histológico Transversal
                </span>
                <span className="text-[11px] text-amber-800 font-semibold">Piamadre (Superficie Externa)</span>
              </div>

              {/* Vertical Stack of Layers */}
              <div className="space-y-2">
                {CORTICAL_LAYERS.map((layer) => {
                  const isSelected = selectedLayerNum === layer.number;
                  return (
                    <button
                      key={layer.number}
                      onClick={() => setSelectedLayerNum(layer.number)}
                      className={`w-full p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#fbf7ee] border-amber-500 shadow-sm ring-1 ring-amber-400'
                          : 'bg-[#faf8f5] border-[#eae5da] hover:bg-[#f5f1e8] text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono transition-colors ${
                            isSelected 
                              ? 'bg-amber-600 text-white' 
                              : 'bg-[#ede7da] text-slate-700 group-hover:bg-[#e4dcce]'
                          }`}>
                            {layer.roman}
                          </span>
                          <div>
                            <span className="text-xs font-bold block text-slate-900 leading-tight">
                              Capa {layer.roman}: {layer.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              Espesor medio: ~{layer.thicknessMicrons} µm
                            </span>
                          </div>
                        </div>

                        {layer.number === 4 && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
                            Entrada Tálamo
                          </span>
                        )}
                        {layer.number === 5 && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-300 font-bold">
                            Salida Betz
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-2 border-t border-[#f0ede6] flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Sustancia Blanca Subcortical</span>
                <span>Espesor Total: ~2.5 - 4 mm</span>
              </div>
            </div>

            <div className="mt-5 bg-[#f6f3eb] p-3.5 rounded-xl border border-[#e5dfd2] text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Selecciona una capa para analizar su microestructura citológica, sus aferencias talámicas y sus vías eferentes subcorticales.
              </p>
            </div>
          </div>

          {/* Right: Detailed Layer Card & Function */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white border border-[#e6e1d6] rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-start justify-between pb-3 border-b border-[#f0ede6]">
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    Capa Neocortical {selectedLayer.roman} ({selectedLayer.number}ª de 6)
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-0.5">
                    {selectedLayer.name}
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-[#f4efe4] text-slate-700 border border-[#e5ded0] font-semibold">
                  {selectedLayer.thicknessMicrons} µm
                </span>
              </div>

              {/* Cellular Composition */}
              <div className="bg-[#fbf9f5] p-4 rounded-xl border border-[#ede7da] space-y-1.5 text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Morfología Celular y Componentes Histológicos:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {selectedLayer.composition}
                </p>
              </div>

              {/* Inputs & Outputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-xl space-y-1.5">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <ArrowDownCircle className="w-4 h-4 text-emerald-700" />
                    Aferencias Principales (Entradas):
                  </span>
                  <p className="text-emerald-950 leading-relaxed text-[11px]">
                    {selectedLayer.mainInputs}
                  </p>
                </div>

                <div className="bg-purple-50/60 border border-purple-200/80 p-4 rounded-xl space-y-1.5">
                  <span className="font-bold text-purple-900 flex items-center gap-1.5">
                    <ArrowUpCircle className="w-4 h-4 text-purple-700" />
                    Eferencias Principales (Salidas):
                  </span>
                  <p className="text-purple-950 leading-relaxed text-[11px]">
                    {selectedLayer.mainOutputs}
                  </p>
                </div>
              </div>

              {/* Functional Description */}
              <div className="bg-[#fbf9f5] p-4 rounded-xl border border-[#ede7da] space-y-1.5 text-xs">
                <span className="font-bold text-amber-900 block">
                  Significado Funcional y Computacional:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {selectedLayer.functionDescription}
                </p>
              </div>
            </div>

            {/* Brodmann Cytoarchitectonic Quick Table */}
            <div className="bg-white border border-[#e6e1d6] rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-700" />
                  Áreas Clave de Brodmann según Citoarquitectura
                </h3>
                <span className="text-[11px] text-slate-500">Diapositiva 25</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {BRODMANN_KEY_AREAS.slice(0, 6).map((b, idx) => (
                  <div key={idx} className="bg-[#faf8f5] p-2.5 rounded-lg border border-[#e9e3d7]">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono font-bold text-[10px] border border-amber-300">
                        BA {b.area}
                      </span>
                      <span className="font-bold text-slate-800 text-[11px] truncate">{b.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-1 line-clamp-1">{b.function}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Figures Gallery View (Actual Lecture Slides) */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CYTO_FIGURES.map((fig) => (
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
                    Material original del curso UDP
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

      {/* Modal Zoom for Slide Figures */}
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
                Fuente: Presentación docente oficial del curso Introducción a la Neuropsicología Clínica (Prof. Dr. Christian Salas).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
