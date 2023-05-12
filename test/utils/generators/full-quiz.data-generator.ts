import { QuizEntity } from '../../../src/domain/quiz/entities/quiz.entity';
import { EntityManager } from 'typeorm';
import { QuizMockDataGenerator } from './quiz.mock-data-generator';
import { QuestionsMockDataGenerator } from './questions.mock-data-generator';
import { AnswersMockDataGenerator } from './answers.mock-data-generator';
import { range } from '../../../src/core/utils/array.helper';

export class FullQuizDataGenerator {
  constructor(
    private readonly quizGenerator: QuizMockDataGenerator,
    private readonly questionGenerator: QuestionsMockDataGenerator,
    private readonly answersGenerator: AnswersMockDataGenerator,
  ) {}

  async generate(em: EntityManager, nrQuestions: number): Promise<QuizEntity> {
    const quizEntity = this.quizGenerator.generate();
    await em.save(quizEntity);

    await Promise.all(
      range(0, nrQuestions).map(async () => {
        const answers = await Promise.all(
          [1, 2].map(async () => {
            const answerEntity = this.answersGenerator.generate();
            return await em.save(answerEntity);
          }),
        );

        const questionEntity = this.questionGenerator.generate();
        questionEntity.answers = Promise.resolve(answers);
        questionEntity.quiz = Promise.resolve(quizEntity);
        return await em.save(questionEntity);
      }),
    );

    return quizEntity;
  }
}

export const FullQuizDataGeneratorInstance = new FullQuizDataGenerator(
  new QuizMockDataGenerator(),
  new QuestionsMockDataGenerator(),
  new AnswersMockDataGenerator(),
);
