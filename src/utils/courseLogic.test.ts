import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCourseProgress,
  evaluateQuiz,
  formatPerformanceFeedback,
  sanitizeCertificateName,
} from './courseLogic';
import type { QuizQuestion } from '../types/course';

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'Fácil',
    moduleRef: 1,
    question: 'Q1',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
    explanation: 'Exp 1',
  },
  {
    id: 2,
    difficulty: 'Intermediário',
    moduleRef: 5,
    question: 'Q2',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 2,
    explanation: 'Exp 2',
  },
  {
    id: 3,
    difficulty: 'Avançado',
    moduleRef: 7,
    question: 'Q3',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 3,
    explanation: 'Exp 3',
  },
];

test('calculateCourseProgress deduplicates and clamps module IDs', () => {
  assert.equal(calculateCourseProgress([], 9), 0);
  assert.equal(calculateCourseProgress([1, 1, 2, 3], 9), 33);
  assert.equal(calculateCourseProgress([1, 2, 3, 4, 5, 6, 7, 8, 9, 99], 9), 100);
});

test('evaluateQuiz computes totals, difficulty breakdown, and pass threshold', () => {
  const fullScore = evaluateQuiz(sampleQuestions, { 1: 0, 2: 2, 3: 3 });
  assert.equal(fullScore.correctCount, 3);
  assert.equal(fullScore.incorrectCount, 0);
  assert.equal(fullScore.percentage, 100);
  assert.equal(fullScore.passed, true);
  assert.equal(fullScore.byDifficulty['Fácil'].correct, 1);
  assert.equal(fullScore.byDifficulty['Avançado'].correct, 1);

  const partialScore = evaluateQuiz(sampleQuestions, { 1: 0, 2: 1, 3: 0 });
  assert.equal(partialScore.correctCount, 1);
  assert.equal(partialScore.percentage, 33);
  assert.equal(partialScore.passed, false);
});

test('formatPerformanceFeedback classifies scores accurately', () => {
  assert.match(formatPerformanceFeedback(95).title, /Excelente/);
  assert.match(formatPerformanceFeedback(75).title, /Bom/);
  assert.match(formatPerformanceFeedback(50).title, /Continue/);
});

test('sanitizeCertificateName trims whitespace and falls back safely', () => {
  assert.equal(sanitizeCertificateName('   '), 'Estudante P2P');
  assert.equal(sanitizeCertificateName('  Maria   Clara  '), 'Maria Clara');
});
