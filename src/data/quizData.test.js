import { describe, expect, test } from 'bun:test';
import { quizQuestions } from './quizData';

describe('Supplied questionnaire', () => {
  test('contains exactly the 20 supplied questions with distinct identifiers', () => {
    expect(quizQuestions).toHaveLength(20);
    expect(new Set(quizQuestions.map(question => question.id)).size).toBe(20);
  });

  test('keeps the supplied zero-based correct answer for each question', () => {
    expect(quizQuestions.map(question => question.correctAnswer)).toEqual([
      1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1,
    ]);
    for (const question of quizQuestions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctAnswer).toBeLessThan(question.options.length);
    }
  });
});