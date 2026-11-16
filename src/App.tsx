import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { COURSE_MODULES } from './data/modulesData';
import { ModuleContentView } from './components/ModuleContentView';
import { FaqSection } from './components/FaqSection';
import { QuizSection } from './components/QuizSection';
import { CertificateView } from './components/CertificateView';
import { BlockchainGame3D } from './components/BlockchainGame3D';
import { GlossaryDrawer } from './components/GlossaryDrawer';
import {
  calculateCourseProgress,
  type QuizEvaluationResult,
} from './utils/courseLogic';
import type { AppView } from './types/course';

export default function App() {
  const urlParams = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const initialAutoGame =
    urlParams.get('mode') === 'minigame' || urlParams.get('game') === '1';
  const initialAutoStart = urlParams.get('autostart') === '1';

  const [view, setView] = useState<AppView>(
    initialAutoGame ? 'minigame' : 'course'
  );
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [completedModuleIds, setCompletedModuleIds] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizEvaluationResult | null>(
    null
  );
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryTerm, setGlossaryTerm] = useState<string | null>(null);

  const openGlossary = (term: string | null = null) => {
    setGlossaryTerm(term);
    setGlossaryOpen(true);
  };

  const courseSectionRef = useRef<HTMLDivElement | null>(null);

  const progressPercent = calculateCourseProgress(
    completedModuleIds,
    COURSE_MODULES.length
  );

  const activeModule =
    COURSE_MODULES.find((m) => m.id === activeModuleId) ?? COURSE_MODULES[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeModuleId, view]);

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
    setView('course');
  };

  const handleMarkCompleteAndNext = () => {
    setCompletedModuleIds((prev) =>
      prev.includes(activeModuleId) ? prev : [...prev, activeModuleId]
    );
    if (activeModuleId < COURSE_MODULES.length) {
      setActiveModuleId(activeModuleId + 1);
    }
  };

  const handleContinueLearning = () => {
    const nextIncomplete = COURSE_MODULES.find(
      (m) => !completedModuleIds.includes(m.id)
    );
    setActiveModuleId(nextIncomplete ? nextIncomplete.id : 1);
    setView('course');
    courseSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetCourse = () => {
    setCompletedModuleIds([]);
    setActiveModuleId(1);
    setQuizResult(null);
    setView('course');
  };

  // Full-viewport 3D Game Shell when Mini-Game is active
  if (view === 'minigame') {
    return (
      <BlockchainGame3D
        initialAutoStart={initialAutoStart}
        onExitToCourse={() => setView('course')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 zones (Wordmark — 4 nav links — 1 primary CTA) */}
      <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95">
        <div className="flex w-full items-center justify-between gap-8 px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-10">
          <button
            type="button"
            onClick={() => {
              setView('course');
              setActiveModuleId(1);
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Rede Direta
          </button>

          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <button
              type="button"
              onClick={() => setView('course')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                view === 'course'
                  ? 'text-sky-700 underline underline-offset-4'
                  : 'hover:text-slate-900'
              }`}
            >
              Curso (9 Módulos)
            </button>
            <button
              type="button"
              onClick={() => openGlossary(null)}
              className="transition-colors hover:text-slate-900 whitespace-nowrap shrink-0"
            >
              Glossário
            </button>
            <button
              type="button"
              onClick={() => setView('faq')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                view === 'faq'
                  ? 'text-sky-700 underline underline-offset-4'
                  : 'hover:text-slate-900'
              }`}
            >
              Dúvidas (FAQ)
            </button>
            <button
              type="button"
              onClick={() => setView('quiz')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                view === 'quiz'
                  ? 'text-sky-700 underline underline-offset-4'
                  : 'hover:text-slate-900'
              }`}
            >
              Quiz Final
            </button>
            <button
              type="button"
              onClick={() => setView('minigame')}
              className="transition-colors hover:text-slate-900 whitespace-nowrap shrink-0"
            >
              Mini-Game 3D
            </button>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={
                progressPercent === 100
                  ? () => setView('quiz')
                  : handleContinueLearning
              }
              className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700 transition-colors whitespace-nowrap shrink-0"
            >
              {completedModuleIds.length === 0
                ? 'Começar Agora'
                : progressPercent === 100
                  ? 'Fazer Quiz Final'
                  : 'Continuar Aprendendo'}
            </button>
          </div>
        </div>

        {/* Barra de navegação rápida no mobile */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-100 px-2 py-2 text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setView('course')}
            className={`px-2 py-1 rounded ${
              view === 'course' ? 'bg-sky-50 text-sky-700' : ''
            }`}
          >
            Módulos
          </button>
          <button
            type="button"
            onClick={() => openGlossary(null)}
            className="px-2 py-1 rounded"
          >
            Glossário
          </button>
          <button
            type="button"
            onClick={() => setView('faq')}
            className={`px-2 py-1 rounded ${
              view === 'faq' ? 'bg-sky-50 text-sky-700' : ''
            }`}
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={() => setView('quiz')}
            className={`px-2 py-1 rounded ${
              view === 'quiz' ? 'bg-sky-50 text-sky-700' : ''
            }`}
          >
            Quiz
          </button>
          <button
            type="button"
            onClick={() => setView('minigame')}
            className="px-2 py-1 rounded"
          >
            Jogo 3D
          </button>
        </div>
      </header>

      <main className="flex-1">
        {view === 'course' && (
          <>
            {/* Hero Introdutório (apenas no Módulo 1 para não atrapalhar leitura avançada, ou compacto no topo) */}
            {activeModuleId === 1 && (
              <section className="border-b border-slate-200 bg-white">
                <div className="grid w-full grid-cols-1 items-stretch gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-10">
                  <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-5">
                    <p className="text-xs font-semibold text-sky-700">
                      Curso Introdutório Gratuito · Sem Jargões Técnicos
                    </p>
                    <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl headline-balance">
                      Entenda o que é P2P (Peer-to-Peer) do zero ao uso seguro
                    </h1>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                      Aprenda em 9 módulos práticos como funcionam as negociações
                      diretas entre pessoas, o papel da custódia (Escrow), como
                      identificar golpes antes que aconteçam e pratique validando
                      nós de uma rede em 3D.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleContinueLearning}
                        className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
                      >
                        <Play className="h-4 w-4" />
                        <span>
                          {completedModuleIds.length > 0
                            ? 'Continuar Aprendendo'
                            : 'Iniciar Módulo 1'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setView('minigame')}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
                      >
                        <Gamepad2 className="h-4 w-4 text-sky-600" />
                        <span>Abrir Mini-Game 3D</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 xl:col-span-7">
                    <div className="h-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img
                        src="/src/assets/images/hero_p2p_network_1794850223284.jpg"
                        alt="Rede descentralizada de nós conectados diretamente por pontes luminosas representando arquitetura Peer-to-Peer"
                        referrerPolicy="no-referrer"
                        className="h-full min-h-[220px] max-h-[360px] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Barra de Progresso Global do Curso */}
            <div
              ref={courseSectionRef}
              className="border-b border-slate-200 bg-white"
            >
              <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-10">
                <div className="flex items-center gap-4 flex-1 min-w-[240px]">
                  <div className="text-xs font-semibold text-slate-700 whitespace-nowrap tabular-nums">
                    Progresso do Curso: {progressPercent}% ({completedModuleIds.length}/
                    {COURSE_MODULES.length})
                  </div>
                  <div
                    className="h-2 flex-1 max-w-2xl overflow-hidden rounded-full bg-slate-200"
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progresso de conclusão dos módulos"
                  >
                    <div
                      className="h-full bg-emerald-600 transition-transform duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {completedModuleIds.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetCourse}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reiniciar Curso</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Layout 2 Colunas: Índice de Módulos + Conteúdo Didático */}
            <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-start lg:px-10">
              <aside className="w-full shrink-0 lg:w-72 xl:w-[300px]">
                <div className="sticky top-20 space-y-4">
                  {/* Seletor compacto no mobile */}
                  <div className="lg:hidden">
                    <label
                      htmlFor="mobile-module-select"
                      className="block text-xs font-medium text-slate-600"
                    >
                      Escolher módulo
                    </label>
                    <select
                      id="mobile-module-select"
                      value={activeModuleId}
                      onChange={(e) =>
                        handleSelectModule(Number(e.target.value))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900"
                    >
                      {COURSE_MODULES.map((m) => (
                        <option key={m.id} value={m.id}>
                          {completedModuleIds.includes(m.id) ? '✓ ' : ''}
                          {m.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Menu lateral no desktop */}
                  <nav
                    aria-label="Módulos do curso"
                    className="hidden lg:block rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div className="px-2.5 pb-2 text-xs font-semibold text-slate-500">
                      Trilha de Aprendizagem
                    </div>
                    <ul className="space-y-1">
                      {COURSE_MODULES.map((m) => {
                        const isActive = m.id === activeModuleId;
                        const isDone = completedModuleIds.includes(m.id);
                        return (
                          <li key={m.id}>
                            <button
                              type="button"
                              onClick={() => handleSelectModule(m.id)}
                              className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                                isActive
                                  ? 'bg-sky-50 text-sky-800 font-semibold'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              <span className="truncate">{m.shortTitle}</span>
                              {isDone && (
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-3 border-t border-slate-100 pt-3 space-y-1">
                      <button
                        type="button"
                        onClick={() => setView('faq')}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                        <span>Dúvidas Frequentes (22)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setView('quiz')}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                        <span>Quiz Final (18 questões)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setView('certificate')}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Award className="h-3.5 w-3.5 text-slate-400" />
                        <span>Certificado</span>
                      </button>
                    </div>
                  </nav>

                  {/* Chamada discreta para o Mini-Game 3D */}
                  <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
                      <Gamepad2 className="h-4 w-4" />
                      <span>Prática Interativa 3D</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                      Conecte nós em uma rede blockchain 3D para validar blocos
                      sem depender de um mediador central.
                    </p>
                    <button
                      type="button"
                      onClick={() => setView('minigame')}
                      className="mt-3 w-full rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
                    >
                      Jogar Consenso 3D
                    </button>
                  </div>
                </div>
              </aside>

              <div className="min-w-0 flex-1">
                <ModuleContentView
                  module={activeModule}
                  totalModules={COURSE_MODULES.length}
                  isCompleted={completedModuleIds.includes(activeModule.id)}
                  onPrev={() =>
                    setActiveModuleId((id) => Math.max(1, id - 1))
                  }
                  onNext={() =>
                    setActiveModuleId((id) =>
                      Math.min(COURSE_MODULES.length, id + 1)
                    )
                  }
                  onMarkCompleteAndNext={handleMarkCompleteAndNext}
                  onGoToFaq={() => setView('faq')}
                  onSelectGlossaryTerm={(term) => openGlossary(term)}
                />
              </div>
            </div>
          </>
        )}

        {view === 'faq' && (
          <FaqSection
            onGoToQuiz={() => setView('quiz')}
            onBackToCourse={() => setView('course')}
            onSelectGlossaryTerm={(term) => openGlossary(term)}
          />
        )}

        {view === 'quiz' && (
          <QuizSection
            onQuizCompleted={(result) => setQuizResult(result)}
            onGoToCertificate={() => setView('certificate')}
            onReviewModules={() => setView('course')}
            onOpenMiniGame={() => setView('minigame')}
          />
        )}

        {view === 'certificate' && (
          <CertificateView
            quizResult={quizResult}
            completedModuleIds={completedModuleIds}
            onReviewModules={() => setView('course')}
            onRetakeQuiz={() => setView('quiz')}
            onOpenMiniGame={() => setView('minigame')}
          />
        )}
      </main>

      <GlossaryDrawer
        isOpen={glossaryOpen}
        initialTerm={glossaryTerm}
        onClose={() => setGlossaryOpen(false)}
      />

      <footer className="no-print border-t border-slate-200 bg-white">
        <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-10">
          <p>
            Rede Direta · Conteúdo estritamente educacional e informativo sobre
            Peer-to-Peer. Não constitui recomendação de investimento nem garante
            ganhos financeiros.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => openGlossary(null)}
              className="hover:text-slate-900"
            >
              Glossário
            </button>
            <button
              type="button"
              onClick={() => setView('faq')}
              className="hover:text-slate-900"
            >
              Perguntas Frequentes
            </button>
            <button
              type="button"
              onClick={() => setView('quiz')}
              className="hover:text-slate-900"
            >
              Quiz Final
            </button>
            <button
              type="button"
              onClick={() => setView('minigame')}
              className="hover:text-slate-900"
            >
              Mini-Game 3D
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
