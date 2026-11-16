import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/glossaryFaqQuizData';

interface GlossaryDrawerProps {
  isOpen: boolean;
  initialTerm: string | null;
  onClose: () => void;
}

export const GlossaryDrawer: React.FC<GlossaryDrawerProps> = ({
  isOpen,
  initialTerm,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('Todos');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(initialTerm);

  useEffect(() => {
    if (isOpen) {
      setSelectedTerm(initialTerm);
      if (initialTerm) {
        setSearch('');
        setCategory('Todos');
      }
    }
  }, [isOpen, initialTerm]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const categories = [
    'Todos',
    'Fundamentos',
    'Negociação',
    'Segurança',
    'Tecnologia',
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return GLOSSARY_ITEMS.filter((item) => {
      const matchCat = category === 'Todos' || item.category === category;
      const matchText =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.simpleDefinition.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [search, category]);

  if (!isOpen) return null;

  const focusedItem = selectedTerm
    ? GLOSSARY_ITEMS.find(
        (g) => g.term.toLowerCase() === selectedTerm.toLowerCase()
      ) ?? null
    : null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end bg-slate-950/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-glossary-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        {/* Header do Drawer */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-sky-600" />
            <div>
              <h2
                id="global-glossary-title"
                className="font-display text-base font-bold text-slate-900"
              >
                Glossário Interativo P2P
              </h2>
              <p className="text-xs text-slate-500 tabular-nums">
                {GLOSSARY_ITEMS.length} termos essenciais explicados sem jargões
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar glossário"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Termo em destaque (quando aberto por clique no texto) */}
        {focusedItem && (
          <div className="border-b border-sky-200 bg-sky-50/80 px-5 py-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-sky-800">
                Termo selecionado · {focusedItem.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedTerm(null)}
                className="text-xs font-medium text-sky-700 hover:underline"
              >
                Ver todos os termos
              </button>
            </div>
            <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
              {focusedItem.term}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-800">
              {focusedItem.simpleDefinition}
            </p>
            <p className="mt-2.5 rounded-lg border border-sky-200 bg-white p-3 text-xs leading-relaxed text-slate-700">
              <strong className="text-slate-900">Exemplo prático:</strong>{' '}
              {focusedItem.practicalExample}
            </p>
          </div>
        )}

        {/* Busca e filtros */}
        <div className="border-b border-slate-100 px-5 py-3.5 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <label htmlFor="drawer-glossary-search" className="sr-only">
              Buscar termo no glossário global
            </label>
            <input
              id="drawer-glossary-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar termo (ex.: Escrow, TXID, Spread)..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  category === cat
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de termos */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              Nenhum termo encontrado para "{search}".
            </p>
          ) : (
            filtered.map((item) => {
              const isFocused =
                focusedItem && focusedItem.term === item.term;
              return (
                <button
                  key={item.term}
                  type="button"
                  onClick={() => setSelectedTerm(item.term)}
                  className={`w-full rounded-xl border p-4 text-left transition-colors ${
                    isFocused
                      ? 'border-sky-500 bg-sky-50/60'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-sm font-bold text-slate-900">
                      {item.term}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                    {item.simpleDefinition}
                  </p>
                  <p className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-600">
                    <strong className="text-slate-800">Exemplo prático:</strong>{' '}
                    {item.practicalExample}
                  </p>
                </button>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
};
