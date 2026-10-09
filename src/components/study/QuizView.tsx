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
  BookOpen
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { quizAnswers, recordQuizAnswer, resetQuizAnswers } = useNeuroStore();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(quizAnswers).length;

  const score = Object.entries(quizAnswers).reduce((acc, [qId, selectedIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === qId);
    if (q && q.correctAnswerIndex === selectedIdx) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const currentQ = QUIZ_QUESTIONS[activeQuestionIdx];
  const userAnswer = quizAnswers[currentQ.id];
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === currentQ.correctAnswerIndex;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 p-6 space-y-6 text-slate-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-sky-950/40 p-6 rounded-2xl border border-emerald-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Herramienta de Autoevaluación Formativa</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Banco de Preguntas Clínicas y Neuroanatómicas
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Preguntas basadas exclusivamente en las diapositivas y apuntes del curso (TEC, ACV, Demencias y Citoarquitectura).
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center gap-6 shadow-xl shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Progreso:</span>
            <span className="text-lg font-black text-white">{answeredCount} / {totalQuestions}</span>
          </div>
          <div className="border-l border-slate-800 pl-6">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Puntuación:</span>
            <span className="text-lg font-black text-emerald-400">{score} aciertos</span>
          </div>
          <button
            onClick={resetQuizAnswers}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reiniciar cuestionario"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Stepper / Navigator Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const ans = quizAnswers[q.id];
          const hasAns = ans !== undefined;
          const correct = hasAns && ans === q.correctAnswerIndex;
          const isActive = idx === activeQuestionIdx;

          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIdx(idx)}
              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all shrink-0 ${
                isActive
                  ? 'ring-2 ring-sky-400 bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                  : hasAns
                  ? correct
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-rose-950 text-rose-300 border border-rose-700'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-w-3xl">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-sky-400 font-bold font-mono">
            Pregunta {activeQuestionIdx + 1} de {totalQuestions}
          </span>
          <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            {currentQ.sourceReference}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-100 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isThisSelected = userAnswer === optIdx;
            const isThisCorrect = currentQ.correctAnswerIndex === optIdx;

            let btnStyle = 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';

            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold shadow-md shadow-emerald-500/10';
              } else if (isThisSelected && !isThisCorrect) {
                btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200 font-semibold shadow-md shadow-rose-500/10';
              } else {
                btnStyle = 'opacity-40 bg-slate-950/30 border-slate-900 text-slate-500';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswered}
                onClick={() => recordQuizAnswer(currentQ.id, optIdx)}
                className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold font-mono shrink-0 text-xs">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1 leading-relaxed mt-0.5">{opt}</span>

                {isAnswered && isThisCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Justification Box (Rendered after answer) */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
              : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">¡Respuesta Correcta! Justificación Académica:</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-300">Respuesta Incorrecta. Explicación del Curso:</span>
                </>
              )}
            </div>
            <p className="text-slate-200 pl-6">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Question Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            disabled={activeQuestionIdx === 0}
            onClick={() => setActiveQuestionIdx((v) => v - 1)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs font-semibold text-slate-200 transition-colors"
          >
            ← Anterior
          </button>
          <button
            disabled={activeQuestionIdx === totalQuestions - 1}
            onClick={() => setActiveQuestionIdx((v) => v + 1)}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
};
