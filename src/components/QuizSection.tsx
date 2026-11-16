import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  Gamepad2,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/glossaryFaqQuizData';
import {
  evaluateQuiz,
  formatPerformanceFeedback,
  type QuizEvaluationResult,
} from '../utils/courseLogic';

interface QuizSectionProps {
  onQuizCompleted: (result: QuizEvaluationResult) => void;
  onGoToCertificate: () => void;
  onReviewModules: () => void;
  onOpenMiniGame: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onQuizCompleted,
  onGoToCertificate,
  onReviewModules,
  onOpenMiniGame,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = answers[currentQuestion.id];
  const hasAnsweredCurrent = typeof selectedOption === 'number';
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const evaluation = evaluateQuiz(QUIZ_QUESTIONS, answers);

  const handleSelectOption = (optIndex: number) => {
    if (hasAnsweredCurrent) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setFinished(true);
      onQuizCompleted(evaluation);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setFinished(false);
  };

  if (finished) {
    const feedback = formatPerformanceFeedback(evaluation.percentage);
    return (
      <section className="w-full px-4 py-8 sm:px-6 lg:px-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <p className="text-xs font-medium text-sky-700">
                Resultado Final da Avaliação
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                {feedback.title}
              </h2>
              <p className="mt-2 max-w-4xl text-sm text-slate-600">
                {feedback.subtitle}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-right">
              <div className="font-mono text-3xl font-bold text-slate-900 tabular-nums">
                {evaluation.percentage}%
              </div>
              <div className="mt-0.5 text-xs text-slate-600 tabular-nums">
                {evaluation.correctCount} de {evaluation.totalQuestions} acertos
              </div>
            </div>
          </div>

          {/* Desempenho por nível */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(['Fácil', 'Intermediário', 'Avançado'] as const).map((lvl) => {
              const stat = evaluation.byDifficulty[lvl];
              return (
                <div
                  key={lvl}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-xs font-medium text-slate-500">
                    Nível {lvl}
                  </div>
                  <div className="mt-1 font-mono text-lg font-bold text-slate-900 tabular-nums">
                    {stat.correct}/{stat.total} acertos
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ações */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenMiniGame}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 whitespace-nowrap shrink-0"
            >
              <Gamepad2 className="h-4 w-4 text-sky-400" />
              <span>Jogar Mini-Game 3D</span>
            </button>
            <button
              type="button"
              onClick={onGoToCertificate}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
            >
              <Award className="h-4 w-4" />
              <span>Ver Tela de Conclusão e Certificado</span>
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Refazer Quiz</span>
            </button>
            <button
              type="button"
              onClick={onReviewModules}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              Revisar Módulos
            </button>
          </div>

          {/* Revisão detalhada questão por questão */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-base font-semibold text-slate-900">
              Gabarito Comentado · Todas as {evaluation.totalQuestions} questões
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const chosen = answers[q.id];
                const isCorrect = chosen === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`rounded-lg border p-4 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        {isCorrect ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        ) : (
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                        )}
                        <div>
                          <div className="text-xs font-medium text-slate-500">
                            Questão {idx + 1} · Nível {q.difficulty} · Módulo{' '}
                            {q.moduleRef}
                          </div>
                          <p className="mt-1 text-sm font-semibold text-slate-900">
                            {q.question}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold whitespace-nowrap shrink-0 ${
                          isCorrect ? 'text-emerald-700' : 'text-red-700'
                        }`}
                      >
                        {isCorrect ? 'Acertou' : 'Errou'}
                      </span>
                    </div>

                    <div className="mt-2.5 pl-6 text-xs space-y-1 text-slate-700">
                      {!isCorrect && typeof chosen === 'number' && (
                        <p className="text-red-800">
                          <strong>Sua resposta:</strong> {q.options[chosen]}
                        </p>
                      )}
                      <p className="text-emerald-900">
                        <strong>Resposta correta:</strong>{' '}
                        {q.options[q.correctIndex]}
                      </p>
                      <p className="pt-1 text-slate-600">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isCurrentCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-sky-700">
            Avaliação de Fixação · 3 Níveis de Dificuldade
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Quiz Interativo P2P
          </h2>
        </div>
        <div className="font-mono text-xs font-semibold text-slate-600 tabular-nums">
          Questão {currentIndex + 1} de {totalQuestions} · {answeredCount} respondidas
        </div>
      </div>

      {/* Barra de progresso do Quiz */}
      <div
        className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={Math.round(((currentIndex + 1) / totalQuestions) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-sky-600 transition-transform duration-300"
          style={{
            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 lg:col-span-8 xl:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Nível:{' '}
              <strong className="text-slate-900">
                {currentQuestion.difficulty}
              </strong>
            </span>
            <span>Referência: Módulo {currentQuestion.moduleRef}</span>
          </div>

          <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
            {currentQuestion.question}
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {currentQuestion.options.map((optionText, idx) => {
            const isSelected = selectedOption === idx;
            const isRight = idx === currentQuestion.correctIndex;
            const letter = ['A', 'B', 'C', 'D'][idx];

            let btnStyle =
              'border-slate-200 bg-white text-slate-800 hover:border-sky-400 hover:bg-sky-50/40';
            if (hasAnsweredCurrent) {
              if (isRight) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950';
              } else if (isSelected) {
                btnStyle = 'border-red-400 bg-red-50 text-red-950';
              } else {
                btnStyle = 'border-slate-200 bg-slate-50 text-slate-500';
              }
            }

            return (
              <button
                key={letter}
                type="button"
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectOption(idx)}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${btnStyle}`}
              >
                <span className="mt-0.5 font-mono text-xs font-bold shrink-0">
                  {letter}.
                </span>
                <span className="flex-1">{optionText}</span>
                {hasAnsweredCurrent && isRight && (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                )}
                {hasAnsweredCurrent && isSelected && !isRight && (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                )}
              </button>
            );
          })}
        </div>

        {hasAnsweredCurrent && (
          <div
            className={`mt-5 rounded-lg border p-4 text-sm ${
              isCurrentCorrect
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-amber-200 bg-amber-50 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isCurrentCorrect ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              )}
              <div>
                <div className="font-semibold">
                  {isCurrentCorrect
                    ? 'Resposta correta!'
                    : `Incorreta — a alternativa correta é a letra ${
                        ['A', 'B', 'C', 'D'][currentQuestion.correctIndex]
                      }.`}
                </div>
                <p className="mt-1 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleRestart}
            className="text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            Reiniciar Quiz
          </button>

          <button
            type="button"
            disabled={!hasAnsweredCurrent}
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap shrink-0"
          >
            <span>
              {currentIndex < totalQuestions - 1
                ? 'Próxima Questão'
                : 'Finalizar e Ver Resultado'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-4 xl:col-span-3">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-900">
              Mapa das Questões
            </h4>
            <span className="font-mono text-xs text-slate-500 tabular-nums">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Acompanhe seu avanço pelos níveis Fácil, Intermediário e Avançado.
          </p>

          <div className="mt-4 grid grid-cols-6 gap-2">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const ans = answers[q.id];
              const answered = typeof ans === 'number';
              const right = answered && ans === q.correctIndex;
              const isCurrent = idx === currentIndex;
              let boxClass = 'border-slate-200 bg-slate-50 text-slate-600';
              if (answered) {
                boxClass = right
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-red-400 bg-red-50 text-red-800';
              }
              if (isCurrent) {
                boxClass += ' ring-2 ring-sky-500 ring-offset-1';
              }
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Ir para questão ${idx + 1} (${q.difficulty})`}
                  className={`flex h-9 items-center justify-center rounded-lg border font-mono text-xs font-semibold tabular-nums transition-colors ${boxClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>Nível Fácil</span>
              <span className="font-mono tabular-nums">Questões 1–6</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Nível Intermediário</span>
              <span className="font-mono tabular-nums">Questões 7–12</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Nível Avançado</span>
              <span className="font-mono tabular-nums">Questões 13–18</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
