import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookCheck,
  CheckCircle2,
  Clock,
  Info,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import type { CourseModule } from '../types/course';
import { InteractiveDiagram } from './InteractiveDiagrams';
import { GlossaryHighlightedText } from './GlossaryHighlightedText';

interface ModuleContentViewProps {
  module: CourseModule;
  totalModules: number;
  isCompleted: boolean;
  onPrev: () => void;
  onNext: () => void;
  onMarkCompleteAndNext: () => void;
  onGoToFaq: () => void;
  onSelectGlossaryTerm: (term: string) => void;
}

export const ModuleContentView: React.FC<ModuleContentViewProps> = ({
  module,
  totalModules,
  isCompleted,
  onPrev,
  onNext,
  onMarkCompleteAndNext,
  onGoToFaq,
  onSelectGlossaryTerm,
}) => {
  const [reflectionAnswers, setReflectionAnswers] = useState<
    Record<number, number>
  >({});

  const selectedReflection = reflectionAnswers[module.id];
  const hasAnsweredReflection = typeof selectedReflection === 'number';
  const isReflectionCorrect =
    selectedReflection === module.reflection.correctIndex;

  return (
    <article className="space-y-8">
      {/* Cabeçalho do Módulo */}
      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
          <span>
            Módulo {module.id} de {totalModules}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{module.estimatedMinutes} min de leitura</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Termos sublinhados abrem o glossário</span>
          {isCompleted && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Concluído</span>
              </span>
            </>
          )}
        </div>

        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl headline-balance">
          {module.title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          <GlossaryHighlightedText
            text={module.introduction}
            onSelectTerm={onSelectGlossaryTerm}
          />
        </p>

        {module.imageUrl && (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <img
              src={module.imageUrl}
              alt={module.imageAlt ?? module.title}
              referrerPolicy="no-referrer"
              className="aspect-[16/9] max-h-[340px] w-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Explicação Didática em Blocos */}
      <div className="space-y-6">
        {module.blocks.map((block) => (
          <section
            key={block.heading}
            className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
          >
            <h3 className="font-display text-lg font-bold text-slate-900">
              {block.heading}
            </h3>

            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>
                  <GlossaryHighlightedText
                    text={paragraph}
                    onSelectTerm={onSelectGlossaryTerm}
                  />
                </p>
              ))}
            </div>

            {block.bulletPoints && block.bulletPoints.length > 0 && (
              <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-700">
                {block.bulletPoints.map((point) => (
                  <li key={point.slice(0, 48)} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600"
                    />
                    <span>
                      <GlossaryHighlightedText
                        text={point}
                        onSelectTerm={onSelectGlossaryTerm}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {block.callout && (
              <div
                className={`mt-4 flex items-start gap-3 rounded-lg border p-4 text-sm ${
                  block.callout.type === 'warning'
                    ? 'border-amber-200 bg-amber-50 text-amber-950'
                    : block.callout.type === 'tip'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                      : 'border-sky-200 bg-sky-50 text-sky-950'
                }`}
              >
                {block.callout.type === 'warning' ? (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                ) : block.callout.type === 'tip' ? (
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                ) : (
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                )}
                <div>
                  <div className="font-semibold">{block.callout.title}</div>
                  <p className="mt-1 leading-relaxed">
                    <GlossaryHighlightedText
                      text={block.callout.text}
                      onSelectTerm={onSelectGlossaryTerm}
                    />
                  </p>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Diagrama / Simulador Interativo do Módulo */}
      <section aria-label="Simulador interativo do módulo">
        <InteractiveDiagram diagramId={module.diagramId} />
      </section>

      {/* Exemplos Práticos */}
      {module.examples.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Exemplos práticos do cotidiano
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {module.examples.map((ex) => (
              <div
                key={ex.title}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <h4 className="font-display text-sm font-bold text-slate-900">
                  {ex.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  <GlossaryHighlightedText
                    text={ex.scenario}
                    onSelectTerm={onSelectGlossaryTerm}
                  />
                </p>
                <p className="mt-3 border-t border-slate-100 pt-2.5 text-xs leading-relaxed text-sky-800">
                  <strong>Lição prática:</strong> {ex.takeaway}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Resumo dos Principais Aprendizados */}
      <section className="rounded-xl border border-slate-200 bg-slate-900 p-6 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
          <BookCheck className="h-4 w-4" />
          <span>Resumo dos Principais Aprendizados</span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          {module.summaryPoints.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pergunta Rápida de Reflexão */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
          <Sparkles className="h-4 w-4" />
          <span>Pergunta Rápida para Fixação</span>
        </div>
        <h3 className="mt-2 text-base font-semibold text-slate-900">
          {module.reflection.prompt}
        </h3>

        <div className="mt-4 space-y-2">
          {module.reflection.options.map((option, idx) => {
            const isSelected = selectedReflection === idx;
            const isRight = idx === module.reflection.correctIndex;
            let style =
              'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
            if (hasAnsweredReflection) {
              if (isRight) {
                style = 'border-emerald-500 bg-emerald-50 text-emerald-950';
              } else if (isSelected) {
                style = 'border-red-400 bg-red-50 text-red-950';
              } else {
                style = 'border-slate-200 bg-slate-50 text-slate-500';
              }
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setReflectionAnswers((prev) => ({
                    ...prev,
                    [module.id]: idx,
                  }))
                }
                className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {hasAnsweredReflection && (
          <div
            className={`mt-4 rounded-lg border p-3.5 text-sm ${
              isReflectionCorrect
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-amber-200 bg-amber-50 text-amber-950'
            }`}
          >
            <strong>
              {isReflectionCorrect
                ? 'Muito bem! Você acertou:'
                : 'Quase lá! Veja o porquê:'}
            </strong>{' '}
            {module.reflection.explanation}
          </div>
        )}
      </section>

      {/* Navegação Inferior (Voltar / Concluir e Avançar) */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={onPrev}
          disabled={module.id === 1}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Módulo Anterior</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          {module.id < totalModules ? (
            <>
              <button
                type="button"
                onClick={onNext}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                Pular para Próximo
              </button>
              <button
                type="button"
                onClick={onMarkCompleteAndNext}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
              >
                <span>Concluir e Avançar</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                onMarkCompleteAndNext();
                onGoToFaq();
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 whitespace-nowrap shrink-0"
            >
              <span>Concluir Trilha e Ir às Dúvidas (FAQ)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </footer>
    </article>
  );
};
