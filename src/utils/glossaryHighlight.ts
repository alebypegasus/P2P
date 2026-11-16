import { GLOSSARY_ITEMS } from '../data/glossaryFaqQuizData';

export interface TextSegment {
  text: string;
  canonicalTerm: string | null;
}

interface AliasEntry {
  pattern: string;
  canonicalTerm: string;
}

const TERM_ALIASES: AliasEntry[] = [
  { pattern: 'Confirmação de transação', canonicalTerm: 'Confirmação de transação' },
  { pattern: 'confirmações de transação', canonicalTerm: 'Confirmação de transação' },
  { pattern: 'Carteira digital', canonicalTerm: 'Carteira digital' },
  { pattern: 'carteiras digitais', canonicalTerm: 'Carteira digital' },
  { pattern: 'Ordem de compra', canonicalTerm: 'Ordem de compra' },
  { pattern: 'ordens de compra', canonicalTerm: 'Ordem de compra' },
  { pattern: 'Ordem de venda', canonicalTerm: 'Ordem de venda' },
  { pattern: 'ordens de venda', canonicalTerm: 'Ordem de venda' },
  { pattern: 'Peer-to-Peer', canonicalTerm: 'Peer-to-Peer' },
  { pattern: 'Criptomoeda', canonicalTerm: 'Criptomoeda' },
  { pattern: 'criptomoedas', canonicalTerm: 'Criptomoeda' },
  { pattern: 'Blockchain', canonicalTerm: 'Blockchain' },
  { pattern: 'blockchains', canonicalTerm: 'Blockchain' },
  { pattern: 'Corretora', canonicalTerm: 'Corretora' },
  { pattern: 'corretoras', canonicalTerm: 'Corretora' },
  { pattern: 'Exchange', canonicalTerm: 'Exchange' },
  { pattern: 'exchanges', canonicalTerm: 'Exchange' },
  { pattern: 'Custódia', canonicalTerm: 'Custódia' },
  { pattern: 'Liquidez', canonicalTerm: 'Liquidez' },
  { pattern: 'Bitcoin', canonicalTerm: 'Bitcoin' },
  { pattern: 'bitcoins', canonicalTerm: 'Bitcoin' },
  { pattern: 'Wallet', canonicalTerm: 'Wallet' },
  { pattern: 'wallets', canonicalTerm: 'Wallet' },
  { pattern: 'Escrow', canonicalTerm: 'Escrow' },
  { pattern: 'Spread', canonicalTerm: 'Spread' },
  { pattern: 'TXID', canonicalTerm: 'TXID' },
  { pattern: 'Taxa', canonicalTerm: 'Taxa' },
  { pattern: 'taxas', canonicalTerm: 'Taxa' },
  { pattern: 'Rede', canonicalTerm: 'Rede' },
  { pattern: 'redes', canonicalTerm: 'Rede' },
  { pattern: 'P2P', canonicalTerm: 'P2P' },
];

const SORTED_ALIASES = [...TERM_ALIASES].sort(
  (a, b) => b.pattern.length - a.pattern.length
);

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const COMBINED_REGEX = new RegExp(
  `(?<![\\p{L}\\p{N}])(${SORTED_ALIASES.map((a) => escapeRegex(a.pattern)).join(
    '|'
  )})(?![\\p{L}\\p{N}])`,
  'giu'
);

const ALIAS_MAP = new Map<string, string>(
  SORTED_ALIASES.map((a) => [a.pattern.toLowerCase(), a.canonicalTerm])
);

const VALID_CANONICAL = new Set(GLOSSARY_ITEMS.map((g) => g.term));

/**
 * Splits a plain text string into normal text and clickable glossary term segments.
 * Highlights the first occurrence of each distinct canonical term per text block
 * to keep prose readable and uncluttered.
 */
export function segmentTextWithGlossary(text: string): TextSegment[] {
  if (!text) return [];

  const segments: TextSegment[] = [];
  const seenCanonical = new Set<string>();
  let lastIndex = 0;

  COMBINED_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = COMBINED_REGEX.exec(text)) !== null) {
    const matchedText = match[0];
    const start = match.index;
    const canonical = ALIAS_MAP.get(matchedText.toLowerCase()) ?? null;

    if (!canonical || !VALID_CANONICAL.has(canonical)) {
      continue;
    }

    if (seenCanonical.has(canonical)) {
      continue;
    }
    seenCanonical.add(canonical);

    if (start > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, start),
        canonicalTerm: null,
      });
    }
    segments.push({
      text: matchedText,
      canonicalTerm: canonical,
    });
    lastIndex = start + matchedText.length;
  }

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      canonicalTerm: null,
    });
  }

  return segments.length > 0 ? segments : [{ text, canonicalTerm: null }];
}
