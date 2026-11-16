import React from 'react';
import { segmentTextWithGlossary } from '../utils/glossaryHighlight';

interface GlossaryHighlightedTextProps {
  text: string;
  onSelectTerm?: (term: string) => void;
}

export const GlossaryHighlightedText: React.FC<
  GlossaryHighlightedTextProps
> = ({ text, onSelectTerm }) => {
  if (!onSelectTerm) {
    return <>{text}</>;
  }

  const segments = segmentTextWithGlossary(text);

  return (
    <>
      {segments.map((seg, idx) => {
        if (!seg.canonicalTerm) {
          return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
        }
        return (
          <button
            key={`${seg.canonicalTerm}-${idx}`}
            type="button"
            onClick={() => onSelectTerm(seg.canonicalTerm!)}
            title={`Abrir definição de "${seg.canonicalTerm}" no glossário`}
            className="inline font-medium text-sky-800 underline decoration-sky-500/70 decoration-dotted underline-offset-4 transition-colors hover:bg-sky-50 hover:text-sky-950 focus-visible:outline-2 focus-visible:outline-sky-600 rounded-sm"
          >
            {seg.text}
          </button>
        );
      })}
    </>
  );
};
