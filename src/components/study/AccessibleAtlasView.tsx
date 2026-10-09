import React from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import {
  Layers,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Image as ImageIcon,
  ArrowRight,
  Brain,
} from 'lucide-react';

export const AccessibleAtlasView: React.FC = () => {
  const {
    selectedStructureId,
    selectStructure,
    masteredStructureIds,
    setActiveView,
    resetClipping,
    triggerCameraPreset,
    setActiveVascularFilter,
    setIsolatedStructure,
  } = useNeuroStore();

  const getStructureCameraPreset = (structureId: string): string => {
    if (['hipocampo', 'amigdala', 'hipotalamo', 'cuerpo-calloso', 'talamo', 'ganglios-de-la-base'].includes(structureId)) {
      return 'medial_sagital';
    }
    if (structureId.includes('izquierdo')) {
      return 'lateral_izq';
    }
    if (structureId.includes('derecho')) {
      return 'lateral_der';
    }
    if (structureId === 'lobulo-occipital' || structureId === 'cerebelo') {
      return 'posterior';
    }
    if (structureId === 'tronco-encefalico') {
      return 'medial_sagital';
    }
    return 'medial_sagital';
  };

  const handleSelectAndGo3D = (structureId: string) => {
    resetClipping();
    setActiveVascularFilter('all');
    setIsolatedStructure(null);
    selectStructure(structureId);
    triggerCameraPreset(getStructureCameraPreset(structureId));
    setActiveView('atlas3d');
  };

  const corticalStructures = ANATOMICAL_STRUCTURES.filter((s) => s.level === 'telencefalo_corteza');
  
  // Limbic structures (Hipocampo, Amígdala, Hipotálamo, Cuerpo Calloso / Fórnix)
  const limbicStructures = ANATOMICAL_STRUCTURES.filter(
    (s) => s.hierarchy === 'limbica' || s.id === 'hipocampo' || s.id === 'amigdala' || s.id === 'hipotalamo' || s.id === 'cuerpo-calloso'
  );

  // Subcortical & Diencephalon non-limbic (Tálamo, Ganglios de la Base)
  const subcorticalStructures = ANATOMICAL_STRUCTURES.filter(
    (s) => (s.level === 'telencefalo_subcortical' || s.level === 'diencefalo') &&
           s.hierarchy !== 'limbica' &&
           s.id !== 'cuerpo-calloso' &&
           s.id !== 'hipotalamo'
  );

  const infratentorialStructures = ANATOMICAL_STRUCTURES.filter(
    (s) => s.level === 'tronco_encefalico' || s.level === 'cerebelo'
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#faf8f5] p-4 sm:p-6 space-y-6 text-slate-800 font-sans min-w-0">
      {/* Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e6e1d6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold tracking-wider uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Modo Accesibilidad y Navegación Taxonómica</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight break-words">
            Atlas Anatómico 2D Estructurado
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed break-words">
            Navegación taxonómica y funcional directa sin requerir aceleración gráfica 3D.
            Incluye secciones específicas para la Corteza, el Sistema Límbico, los Ganglios Basales y el Tronco Encefálico.
          </p>
        </div>

        <button
          onClick={() => {
            resetClipping();
            setActiveVascularFilter('all');
            setIsolatedStructure(null);
            setActiveView('atlas3d');
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0 self-start md:self-auto"
        >
          <Layers className="w-4 h-4" />
          <span>Volver al Visor 3D</span>
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-8 min-w-0">
        {/* Section 1: Corteza Cerebral y Lóbulos */}
        <div className="space-y-3 min-w-0">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0" />
            <span>1. Telencéfalo: Corteza Cerebral y Convexidad Hemisférica</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {corticalStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <div
                  key={struct.id}
                  onClick={() => handleSelectAndGo3D(struct.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between min-w-0 ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-sm ring-2 ring-amber-400'
                      : 'bg-white border-[#e6e1d6] hover:border-[#ded7c8] hover:bg-[#fbf9f5]'
                  }`}
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm ring-1 ring-black/10"
                          style={{ backgroundColor: struct.color }}
                        />
                        <h3 className="font-bold text-slate-900 text-sm truncate">{struct.name}</h3>
                      </div>
                      {isMastered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed break-words">
                      {struct.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#f0ede6] flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-medium truncate">Irrigación: {struct.vascularTerritory.toUpperCase()}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndGo3D(struct.id);
                      }}
                      className="text-amber-700 hover:text-amber-900 flex items-center gap-1 font-bold shrink-0 hover:underline"
                    >
                      <span>Ver en 3D</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Sistema Límbico y Memoria / Afecto */}
        <div className="space-y-3 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
              <span>2. Sistema Límbico: Memoria, Emoción y Redes Socioemocionales</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectAndGo3D('hipocampo')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all shrink-0"
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Explorar Sistema Límbico en 3D</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="text-[11px] text-emerald-800 font-semibold hidden lg:flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                Circuito de Papez y Regulación Afectiva
              </span>
            </div>
          </div>

          {/* Featured Academic Banner for Limbic Circuit */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-[#faf8f5] p-4 rounded-xl border border-emerald-200/80 flex flex-col md:flex-row items-center gap-4 shadow-sm">
            <div className="w-full md:w-48 h-28 rounded-lg overflow-hidden border border-emerald-300 shrink-0 bg-slate-900 relative">
              <img 
                src="./assets/figures/slide_limbico.png" 
                alt="Sistema Límbico Cátedra" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white font-mono flex items-center gap-1">
                <ImageIcon className="w-2.5 h-2.5 text-amber-300" />
                Diapositiva 16
              </span>
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Arquitectura del Circuito Límbico y de Papez
              </span>
              <p className="text-xs text-slate-700 leading-relaxed break-words">
                El sistema límbico integra la <strong>formación hipocampal</strong> (consolidación de memoria declarativa), la <strong>amígdala</strong> (procesamiento de amenaza y saliencia hedónica), el <strong>hipotálamo</strong> (homeostasis corporal) y los tractos comisurales del <strong>cuerpo calloso</strong> y fórnix.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {limbicStructures.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectAndGo3D(s.id)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-emerald-300 text-emerald-950 hover:bg-emerald-100 transition-colors flex items-center gap-1 shadow-xs"
                    title={`Ver ${s.name} en 3D`}
                  >
                    <span>✦ {s.name}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-emerald-700" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {limbicStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <div
                  key={struct.id}
                  onClick={() => handleSelectAndGo3D(struct.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between min-w-0 ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-400'
                      : 'bg-white border-[#e6e1d6] hover:border-emerald-300 hover:bg-[#f8fdf9]'
                  }`}
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm ring-1 ring-black/10"
                          style={{ backgroundColor: struct.color }}
                        />
                        <h3 className="font-bold text-slate-900 text-sm truncate">{struct.name}</h3>
                      </div>
                      {isMastered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed break-words">
                      {struct.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#f0ede6] flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-medium truncate">Jerarquía: Límbica</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndGo3D(struct.id);
                      }}
                      className="text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-bold shrink-0 hover:underline"
                    >
                      <span>Ver en 3D</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Diencéfalo y Ganglios de la Base */}
        <div className="space-y-3 min-w-0">
          <h2 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
            <span>3. Diencéfalo y Ganglios Basales (Relevo y Bucles Motores)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subcorticalStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <div
                  key={struct.id}
                  onClick={() => handleSelectAndGo3D(struct.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between min-w-0 ${
                    isSelected
                      ? 'bg-white border-purple-500 shadow-sm ring-2 ring-purple-400'
                      : 'bg-white border-[#e6e1d6] hover:border-[#ded7c8] hover:bg-[#fbf9f5]'
                  }`}
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm ring-1 ring-black/10"
                          style={{ backgroundColor: struct.color }}
                        />
                        <h3 className="font-bold text-slate-900 text-sm truncate">{struct.name}</h3>
                      </div>
                      {isMastered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed break-words">
                      {struct.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#f0ede6] flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-medium truncate">Nivel: {struct.level.replace('_', ' • ')}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndGo3D(struct.id);
                      }}
                      className="text-purple-800 hover:text-purple-950 flex items-center gap-1 font-bold shrink-0 hover:underline"
                    >
                      <span>Ver en 3D</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Tronco Encefálico y Cerebelo */}
        <div className="space-y-3 min-w-0">
          <h2 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-700 shrink-0" />
            <span>4. Estructuras Infratentoriales (Tronco Encefálico y Cerebelo)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {infratentorialStructures.map((struct) => {
              const isSelected = selectedStructureId === struct.id;
              const isMastered = masteredStructureIds.includes(struct.id);

              return (
                <div
                  key={struct.id}
                  onClick={() => handleSelectAndGo3D(struct.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between min-w-0 ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-sm ring-2 ring-amber-400'
                      : 'bg-white border-[#e6e1d6] hover:border-[#ded7c8] hover:bg-[#fbf9f5]'
                  }`}
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm ring-1 ring-black/10"
                          style={{ backgroundColor: struct.color }}
                        />
                        <h3 className="font-bold text-slate-900 text-sm truncate">{struct.name}</h3>
                      </div>
                      {isMastered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed break-words">
                      {struct.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#f0ede6] flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-medium truncate">Nivel: {struct.level.replace('_', ' • ')}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndGo3D(struct.id);
                      }}
                      className="text-amber-800 hover:text-amber-950 flex items-center gap-1 font-bold shrink-0 hover:underline"
                    >
                      <span>Ver en 3D</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
