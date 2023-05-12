import { QuizEntity } from '../../../src/domain/quiz/entities/quiz.entity';

export class QuizMockDataGenerator {
  generate(): QuizEntity {
    const quizEntity = new QuizEntity();
    quizEntity.outcomeHighWeight = 'Good';
    quizEntity.outcomeMiddleWeight = 'So-and-so';
    quizEntity.outcomeLowWeight = 'not so great';
    quizEntity.name = 'sample';
    quizEntity.description = 'sample quiz';
    return quizEntity;
  }
}
