import test from 'node:test';
import assert from 'node:assert/strict';
import { segmentTextWithGlossary } from './glossaryHighlight';

test('segmentTextWithGlossary highlights longest matching terms with word boundaries', () => {
  const input =
    'Em uma corretora ou no P2P, a Confirmação de transação e o Escrow protegem a rede.';
  const segments = segmentTextWithGlossary(input);
  const highlighted = segments
    .filter((s) => s.canonicalTerm !== null)
    .map((s) => s.canonicalTerm);

  assert.deepEqual(highlighted, [
    'Corretora',
    'P2P',
    'Confirmação de transação',
    'Escrow',
    'Rede',
  ]);
  assert.equal(segments.map((s) => s.text).join(''), input);
});

test('segmentTextWithGlossary does not match inside unrelated words or repeat terms in same paragraph', () => {
  const input =
    'As credenciais ficam na carteira digital. Outra carteira digital não altera o P2P nem o P2P.';
  const segments = segmentTextWithGlossary(input);
  const highlighted = segments
    .filter((s) => s.canonicalTerm !== null)
    .map((s) => s.canonicalTerm);

  assert.deepEqual(highlighted, ['Carteira digital', 'P2P']);
});
