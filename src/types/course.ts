export type AppView = 'course' | 'faq' | 'quiz' | 'certificate' | 'minigame';

export type QuizDifficulty = 'Fácil' | 'Intermediário' | 'Avançado';

export interface ModuleSectionBlock {
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: {
    type: 'info' | 'warning' | 'tip';
    title: string;
    text: string;
  };
}

export interface ModuleExample {
  title: string;
  scenario: string;
  takeaway: string;
}

export interface ReflectionQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  estimatedMinutes: number;
  introduction: string;
  imageUrl?: string;
  imageAlt?: string;
  diagramId:
    | 'traditional-vs-p2p'
    | 'p2p-practice-flow'
    | 'p2p-sectors'
    | 'crypto-orderbook-escrow'
    | 'six-step-trade'
    | 'advantages-matrix'
    | 'scam-detector'
    | 'glossary-explorer'
    | 'safety-checklist';
  blocks: ModuleSectionBlock[];
  examples: ModuleExample[];
  summaryPoints: string[];
  reflection: ReflectionQuestion;
}

export interface GlossaryItem {
  term: string;
  category: 'Fundamentos' | 'Negociação' | 'Segurança' | 'Tecnologia';
  simpleDefinition: string;
  practicalExample: string;
}

export interface FaqItem {
  id: string;
  category: 'Conceito' | 'Funcionamento' | 'Segurança' | 'Regras e Brasil';
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  difficulty: QuizDifficulty;
  moduleRef: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}
