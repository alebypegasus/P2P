import type { QuizDifficulty, QuizQuestion } from '../types/course';

export interface QuizEvaluationResult {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  passed: boolean;
  byDifficulty: Record<
    QuizDifficulty,
    {
      total: number;
      correct: number;
    }
  >;
  questionOutcomes: Array<{
    questionId: number;
    selectedIndex: number | null;
    correctIndex: number;
    isCorrect: boolean;
    difficulty: QuizDifficulty;
  }>;
}

export function calculateCourseProgress(
  completedModuleIds: number[],
  totalModules: number
): number {
  if (totalModules <= 0) return 0;
  const uniqueValid = new Set(
    completedModuleIds.filter((id) => id >= 1 && id <= totalModules)
  );
  return Math.round((uniqueValid.size / totalModules) * 100);
}

export function evaluateQuiz(
  questions: QuizQuestion[],
  answers: Record<number, number>
): QuizEvaluationResult {
  const byDifficulty: QuizEvaluationResult['byDifficulty'] = {
    Fácil: { total: 0, correct: 0 },
    Intermediário: { total: 0, correct: 0 },
    Avançado: { total: 0, correct: 0 },
  };

  let correctCount = 0;
  const questionOutcomes: QuizEvaluationResult['questionOutcomes'] = [];

  for (const q of questions) {
    byDifficulty[q.difficulty].total += 1;
    const selectedIndex =
      typeof answers[q.id] === 'number' ? answers[q.id] : null;
    const isCorrect = selectedIndex === q.correctIndex;
    if (isCorrect) {
      correctCount += 1;
      byDifficulty[q.difficulty].correct += 1;
    }
    questionOutcomes.push({
      questionId: q.id,
      selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect,
      difficulty: q.difficulty,
    });
  }

  const totalQuestions = questions.length;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    totalQuestions,
    correctCount,
    incorrectCount: totalQuestions - correctCount,
    percentage,
    passed: percentage >= 70,
    byDifficulty,
    questionOutcomes,
  };
}

export function formatPerformanceFeedback(percentage: number): {
  title: string;
  subtitle: string;
} {
  if (percentage >= 90) {
    return {
      title: 'Excelente domínio dos conceitos P2P',
      subtitle:
        'Você demonstrou compreensão sólida sobre funcionamento, custódia, boas práticas e identificação de golpes.',
    };
  }
  if (percentage >= 70) {
    return {
      title: 'Bom aproveitamento no curso introdutório',
      subtitle:
        'Você compreendeu os fundamentos e cuidados essenciais. Vale revisar apenas os pontos que geraram dúvida.',
    };
  }
  return {
    title: 'Continue revisando os módulos principais',
    subtitle:
      'Recomendamos reler os módulos de custódia e prevenção de fraudes antes de refazer o quiz.',
  };
}

export function sanitizeCertificateName(rawName: string): string {
  const trimmed = rawName.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'Estudante P2P';
  return trimmed.slice(0, 64);
}
