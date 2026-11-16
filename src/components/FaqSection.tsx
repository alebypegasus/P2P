import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/glossaryFaqQuizData';
import { GlossaryHighlightedText } from './GlossaryHighlightedText';

interface FaqSectionProps {
  onGoToQuiz: () => void;
  onBackToCourse: () => void;
  onSelectGlossaryTerm: (term: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onGoToQuiz,
  onBackToCourse,
  onSelectGlossaryTerm,
}) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('Todas');

  const categories = [
    'Todas',
    'Conceito',
    'Funcionamento',
    'Segurança',
    'Regras e Brasil',
  ];

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCat = category === 'Todas' || item.category === category;
    const q = search.trim().toLowerCase();
    const matchText =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q);
    return matchCat && matchText;
  });

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-medium text-sky-700">
          Dúvidas Frequentes · {FAQ_ITEMS.length} perguntas respondidas
        </p>
        <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl headline-balance">
          Perguntas e Respostas sobre P2P
        </h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Reunimos as principais dúvidas de quem está dando os primeiros passos.
          Clique em qualquer pergunta para ler a resposta direta e sem jargões.
        </p>
      </div>

      {/* Busca e Filtro */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="faq-search" className="sr-only">
            Pesquisar nas perguntas frequentes
          </label>
          <input
            id="faq-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar dúvida (ex.: imposto, Pix, golpe, custódia)..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'border-sky-600 bg-sky-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista expansível */}
      <div className="mt-6 grid grid-cols-1 items-start gap-3 lg:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
            Nenhuma pergunta encontrada para "{search}".
          </div>
        ) : (
          filtered.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-panel`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-xs font-medium text-slate-400 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="block text-sm font-semibold text-slate-900 sm:text-base">
                        {item.question}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`${item.id}-panel`}
                    className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 text-sm leading-relaxed text-slate-700"
                  >
                    <GlossaryHighlightedText
                      text={item.answer}
                      onSelectTerm={onSelectGlossaryTerm}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Pronto para testar seus conhecimentos?
            </h3>
            <p className="text-xs text-slate-600">
              Faça o quiz interativo com 18 questões e desbloqueie seu resumo e certificado de conclusão.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onBackToCourse}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            Revisar Módulos
          </button>
          <button
            type="button"
            onClick={onGoToQuiz}
            className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
          >
            Ir para o Quiz Interativo
          </button>
        </div>
      </div>
    </section>
  );
};
