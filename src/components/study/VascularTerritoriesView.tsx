import React, { useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { VASCULAR_TERRITORIES } from '../../data/clinicalCorrelates';
import { VascularTerritoryId } from '../../types/neuro';
import {
  Activity,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Maximize2,
  X,
  BookOpen,
  ImageIcon
} from 'lucide-react';

interface VascularFigure {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  description: string;
  slideRef: string;
}

const VASCULAR_FIGURES: VascularFigure[] = [
  {
    id: 'fig-territorios',
    title: 'Territorios Vasculares de las Tres Arterias Principales',
    subtitle: 'Distribución coronal, sagital medial y axial de ACA, ACM y ACP',
    src: './assets/figures/slide_territorios_vasculares.png',
    description: 'Esquema anatómico canónico presentado en la cátedra de Neuropatología. Muestra la distribución de la ACA en la cara medial y borde superior, la ACM en la convexidad lateral cerebral y la ACP en los polos occipitales y cara basal inferotemporal.',
    slideRef: 'Neuropatología TEC y ACV • Diapositiva 40'
  },
  {
    id: 'fig-willis',
    title: 'Polígono de Willis y Anastomosis Arterial',
    subtitle: 'Anillo anastomótico en la base del cráneo (carótidas y sistema vértebro-basilar)',
    src: './assets/figures/slide_poligono_willis.png',
    description: 'Anatomía de la base del encéfalo ilustrando las arterias carótidas internas, vertebrales, tronco basilar, y las arterias comunicantes anterior y posteriores que permiten la compensación colateral de flujo sanguíneo.',
    slideRef: 'Neuropatología TEC y ACV • Diapositiva 39'
  },
  {
    id: 'fig-acv-aca',
    title: 'Infarto en Territorio de Arteria Cerebral Anterior (ACA)',
    subtitle: 'Tomografía axial computarizada y correlato clínico de abulia',
    src: './assets/figures/slide_acv_aca.png',
    description: 'Caso clínico de infarto isquémico frontal medial y cingulado con hipodensidad focal. Produce acinesia, mutismo acinético, pérdida de iniciativa ejecutiva y paresia crural contralateral.',
    slideRef: 'Neuropatología TEC y ACV • Diapositiva 49'
  },
  {
    id: 'fig-acv-mca-izq',
    title: 'Infarto Masivo de Tronco de ACM Izquierda',
    subtitle: 'Síndrome perisilviano dominante: Afasia global y hemiplejía faciobraquial',
    src: './assets/figures/slide_acv_mca_izq.png',
    description: 'Neuroimagen por TAC que evidencia necrosis isquémica extensa en todo el hemisferio dominante perisilviano. Provoca colapso del lenguaje (áreas de Broca y Wernicke), apraxias y déficit motor derecho.',
    slideRef: 'Neuropatología TEC y ACV • Diapositiva 50'
  },
  {
    id: 'fig-acv-mca-der',
    title: 'Infarto en Territorio de ACM Derecha',
    subtitle: 'Síndrome de Heminegligencia Visuoespacial Izquierda y Anosognosia',
    src: './assets/figures/slide_acv_mca_der.png',
    description: 'Lesión temporoparietal derecha que destruye los circuitos de atención espacial hemisférica, condicionando desatención masiva hacia el espacio y hemicuerpo izquierdo y falta de conciencia de la parálisis (anosognosia).',
    slideRef: 'Neuropatología TEC y ACV • Diapositiva 53'
  }
];

export const VascularTerritoriesView: React.FC = () => {
  const {
    activeVascularFilter,
    setActiveVascularFilter,
    setActiveView,
    triggerCameraPreset,
    selectStructure,
    setIsolatedStructure,
    resetClipping,
  } = useNeuroStore();

  const [activeTab, setActiveTab] = useState<'territorios' | 'neuroimagenes'>('territorios');
  const [activeFigureModal, setActiveFigureModal] = useState<VascularFigure | null>(null);

  const territoryKeys = Object.keys(VASCULAR_TERRITORIES) as VascularTerritoryId[];

  // Handles clicking "Destacar": sets filter, resets cuts, moves camera to ideal anatomical vantage point, deselects individual structure, switches to 3D atlas
  const handleHighlight = (key: VascularTerritoryId) => {
    resetClipping(); // Clear any persistent cuts so the entire vascular distribution is visible intact
    setActiveVascularFilter(key);
    selectStructure(null); // Clear individual selection so full vascular distribution is visible
    setIsolatedStructure(null);
    
    // Smooth camera transition targeting the irrigated anatomical region
    if (key === 'aca') {
      triggerCameraPreset('medial_sagital');
    } else if (key === 'acm_izq') {
      triggerCameraPreset('lateral_izq');
    } else if (key === 'acm_der') {
      triggerCameraPreset('lateral_der');
    } else if (key === 'acp') {
      triggerCameraPreset('posterior');
    }

    setActiveView('atlas3d');
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#faf8f5] p-6 space-y-6 text-slate-800 font-sans">
      {/* Banner - Warm Academic Linen Aesthetic */}
      <div className="bg-white p-6 rounded-2xl border border-[#e6e1d6] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-800 text-xs font-bold tracking-wider uppercase mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Unidad 3 • Neuropatología Vascular Encefálica y ACV</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Territorios Vasculares Cerebrales y Perfiles de Accidente Cerebrovascular
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              La interrupción del flujo sanguíneo cerebral ocasiona necrosis isquémica o hemorragia focal.
              Las secuelas cognitivas, conductuales y sensoriomotoras dependen de la arteria comprometida (ACA, ACM o ACP)
              y de la asimetría funcional hemisférica (lenguaje en el hemisferio izquierdo vs. orientación atencional en el derecho).
            </p>
          </div>

          {/* Tab selector and switch to 3D */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
            <div className="flex items-center bg-[#f3efe6] p-1 rounded-xl border border-[#ded7c8]">
              <button
                onClick={() => setActiveTab('territorios')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'territorios'
                    ? 'bg-white text-slate-900 shadow-sm border border-[#d6cfbe]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Territorios ({territoryKeys.length})
              </button>
              <button
                onClick={() => setActiveTab('neuroimagenes')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'neuroimagenes'
                    ? 'bg-white text-slate-900 shadow-sm border border-[#d6cfbe]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-rose-700" />
                <span>Figuras y TAC ({VASCULAR_FIGURES.length})</span>
              </button>
            </div>

            <button
              onClick={() => {
                resetClipping();
                setActiveView('atlas3d');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-amber-600/20"
            >
              <Layers className="w-4 h-4" />
              <span>Ver Cerebro 3D</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Territory Selector Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#f0ede6]">
          <span className="text-xs font-bold text-slate-700 mr-1">Filtrar Arteria:</span>
          <span className="text-[11px] text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-bold mr-2">
            3D: Rojo = Irrigado • Pálido = No irrigado
          </span>
          <button
            onClick={() => setActiveVascularFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeVascularFilter === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-[#f4efe4] text-slate-700 hover:bg-[#ede7da] border border-[#e5dfd2]'
            }`}
          >
            Todas las Arterias
          </button>
          {territoryKeys.map((key) => {
            const t = VASCULAR_TERRITORIES[key];
            const isActive = activeVascularFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveVascularFilter(key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isActive
                    ? 'shadow-sm text-slate-950 font-black ring-2'
                    : 'bg-white border-[#ded8cb] text-slate-700 hover:bg-[#faf7f0]'
                }`}
                style={{
                  backgroundColor: isActive ? '#ffffff' : undefined,
                  borderColor: isActive ? t.colorHex : undefined,
                  boxShadow: isActive ? `0 0 0 2px ${t.colorHex}40` : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: t.colorHex }}
                />
                <span>{t.id.toUpperCase()}: {t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'territorios' ? (
        /* Grid of Vascular Territory Cards */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {territoryKeys
            .filter((k) => activeVascularFilter === 'all' || activeVascularFilter === k)
            .map((key) => {
              const territory = VASCULAR_TERRITORIES[key];

              return (
                <div
                  key={key}
                  className="bg-white border border-[#e6e1d6] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-400/80 transition-all"
                >
                  <div className="space-y-3">
                    {/* Card Title */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full shadow-sm ring-2 ring-white"
                          style={{ backgroundColor: territory.colorHex }}
                        />
                        <div>
                          <h3 className="text-base font-bold text-slate-900 leading-tight">
                            {territory.name}
                          </h3>
                          <span className="text-[11px] text-slate-500 font-semibold">{territory.artery}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f4efe4] text-slate-600 border border-[#e2dcd0] font-mono">
                        {territory.courseSlideReference}
                      </span>
                    </div>

                    {/* Irrigated Regions */}
                    <div className="bg-[#fbf9f5] p-3.5 rounded-xl border border-[#ede7da] text-xs">
                      <span className="font-bold text-slate-800 block mb-1">Estructuras y Regiones Irrigadas:</span>
                      <ul className="space-y-1 text-slate-600">
                        {territory.irrigatedRegions.map((reg, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="font-black text-amber-700">•</span>
                            <span>{reg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cognitive & Behavioral Profile */}
                    <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-200/70 text-xs">
                      <span className="font-bold text-rose-900 block mb-1 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-rose-700" />
                        Perfil Neuropsicológico tras Infarto Isquémico:
                      </span>
                      <ul className="space-y-1 text-rose-950">
                        {territory.cognitiveAndBehavioralProfile.map((prof, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="font-black text-rose-600">•</span>
                            <span>{prof}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Characteristic Syndromes */}
                    <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 text-xs">
                      <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        Síndromes Cardinales:
                      </span>
                      <ul className="space-y-1 text-amber-950">
                        {territory.characteristicSyndromes.map((syn, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="font-black text-amber-700">•</span>
                            <span>{syn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Highlight Action Footer */}
                  <div className="pt-3 border-t border-[#f0ede6] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Código: {territory.id.toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleHighlight(key)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-sm transition-all active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>Destacar en Rojo (3D)</span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        /* Figures & CT Gallery */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VASCULAR_FIGURES.map((fig) => (
              <div
                key={fig.id}
                className="bg-white border border-[#e6e1d6] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-rose-400 transition-all"
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
                        <Maximize2 className="w-3.5 h-3.5 text-rose-700" />
                        Ampliar Figura y Tomografía
                      </span>
                    </div>
                  </div>

                  {/* Figure Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-rose-800 uppercase tracking-wider">
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
                    <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                    Cátedra de Neuropatología UDP
                  </span>
                  <button
                    onClick={() => setActiveFigureModal(fig)}
                    className="font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1"
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

      {/* Modal Zoom for Vascular Figures */}
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
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
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
                Fuente: Presentación docente oficial "NEUROPATOLOGIA TEC Y ACV 2022.pdf" (Prof. Dr. Christian Salas).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
