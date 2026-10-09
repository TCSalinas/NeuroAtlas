import React, { useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { QUIZ_QUESTIONS } from '../../data/quizBank';
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { quizAnswers, recordQuizAnswer, resetQuizAnswers } = useNeuroStore();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('todas');

  const unitPills = [
    { id: 'todas', label: 'Todas las Unidades' },
    { id: 'unidad-1', label: 'U1: Citoarquitectura' },
    { id: 'unidad-2', label: 'U2: TEC y Glasgow' },
    { id: 'unidad-3', label: 'U3: ACV y Vascular' },
    { id: 'unidad-4', label: 'U4: Infecciones SNC' },
    { id: 'unidad-5', label: 'U5: Demencias (Tabla 2)' },
  ];

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedUnitFilter === 'todas') return true;
    return q.unitId === selectedUnitFilter;
  });

  const totalQuestions = filteredQuestions.length;
  const answeredCount = filteredQuestions.filter((q) => quizAnswers[q.id] !== undefined).length;

  const score = filteredQuestions.reduce((acc, q) => {
    const selectedIdx = quizAnswers[q.id];
    if (selectedIdx !== undefined && q.correctAnswerIndex === selectedIdx) {
      return acc + 1;
    }
    return acc;
  }, 0);

  // Keep question index clamped
  const safeIdx = Math.min(activeQuestionIdx, Math.max(0, totalQuestions - 1));
  const currentQ = filteredQuestions[safeIdx] || filteredQuestions[0];
  const userAnswer = currentQ ? quizAnswers[currentQ.id] : undefined;
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && currentQ && userAnswer === currentQ.correctAnswerIndex;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#faf8f5] p-6 space-y-6 text-slate-800 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#e6e1d6] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-1">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Herramienta de Autoevaluación Formativa • UDP</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Banco de Preguntas Clínicas y Neuropsicológicas
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
            24 preguntas rigurosas con retroalimentación inmediata, citaciones exactas de diapositivas y explicaciones
            detalladas sobre citoarquitectura, TEC, ACV, infecciones y demencias.
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-[#fbf9f5] border border-[#e5decb] p-4 rounded-xl flex items-center gap-6 shadow-sm shrink-0">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Respondidas:</span>
            <span className="text-lg font-black text-slate-900">{answeredCount} / {totalQuestions}</span>
          </div>
          <div className="border-l border-[#ded6c3] pl-6">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Aciertos:</span>
            <span className="text-lg font-black text-emerald-800">{score} correctas</span>
          </div>
          <button
            onClick={resetQuizAnswers}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-[#ede7da] rounded-lg transition-colors"
            title="Reiniciar respuestas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Unit Filter Selector */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
        {unitPills.map((u) => (
          <button
            key={u.id}
            onClick={() => {
              setSelectedUnitFilter(u.id);
              setActiveQuestionIdx(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedUnitFilter === u.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-[#f3eee4] border border-[#ded7c8]'
            }`}
          >
            {u.label}
          </button>
        ))}
      </div>

      {/* Question Stepper / Navigator Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {filteredQuestions.map((q, idx) => {
          const ans = quizAnswers[q.id];
          const hasAns = ans !== undefined;
          const correct = hasAns && ans === q.correctAnswerIndex;
          const isActive = idx === safeIdx;

          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIdx(idx)}
              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all shrink-0 ${
                isActive
                  ? 'bg-amber-600 text-white font-black shadow-md ring-2 ring-amber-400'
                  : hasAns
                  ? correct
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold'
                    : 'bg-rose-100 text-rose-900 border border-rose-400 font-bold'
                  : 'bg-white border border-[#ded7c8] text-slate-600 hover:bg-[#f6f2e8]'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question Box */}
      {currentQ && (
        <div className="bg-white border border-[#e6e1d6] rounded-2xl p-6 shadow-sm space-y-6 max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#f0ede6]">
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-300 font-bold font-mono">
              Pregunta {safeIdx + 1} de {totalQuestions}
            </span>
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              {currentQ.sourceReference}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isThisSelected = userAnswer === optIdx;
              const isThisCorrect = currentQ.correctAnswerIndex === optIdx;

              let btnStyle = 'bg-[#fbf9f5] border-[#e2dcd0] text-slate-800 hover:bg-[#f5f0e4] hover:border-amber-400';

              if (isAnswered) {
                if (isThisCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm ring-1 ring-emerald-400';
                } else if (isThisSelected && !isThisCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold shadow-sm ring-1 ring-rose-400';
                } else {
                  btnStyle = 'opacity-40 bg-[#f9f7f2] border-[#e5decb] text-slate-400';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswered}
                  onClick={() => recordQuizAnswer(currentQ.id, optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-[#ede7da] text-slate-800 flex items-center justify-center font-bold font-mono shrink-0 text-xs">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed mt-0.5">{opt}</span>

                  {isAnswered && isThisCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isThisSelected && !isThisCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Justification Box (Rendered after answer) */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/70 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {isCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span className="text-emerald-900">¡Respuesta Correcta! Justificación Académica:</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-rose-700" />
                    <span className="text-rose-900">Respuesta Incorrecta. Explicación del Curso:</span>
                  </>
                )}
              </div>
              <p className="text-slate-800 pl-6 leading-relaxed font-medium">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Question Navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-[#f0ede6]">
            <button
              disabled={safeIdx === 0}
              onClick={() => setActiveQuestionIdx((v) => Math.max(0, v - 1))}
              className="px-4 py-2 bg-[#ede7da] hover:bg-[#e2dacb] disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs font-bold text-slate-800 transition-colors"
            >
              ← Anterior
            </button>
            <button
              disabled={safeIdx === totalQuestions - 1}
              onClick={() => setActiveQuestionIdx((v) => Math.min(totalQuestions - 1, v + 1))}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs transition-colors shadow-sm"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
