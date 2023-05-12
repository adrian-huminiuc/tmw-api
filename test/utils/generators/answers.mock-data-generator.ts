import { AnswerEntity } from '../../../src/domain/quiz/entities/answer.entity';
import { faker } from '@faker-js/faker';

export class AnswersMockDataGenerator {
  generate(): AnswerEntity {
    const answerEntity = new AnswerEntity();
    answerEntity.text = faker.datatype.string(15);
    answerEntity.weight = faker.datatype.number({ min: 1, max: 100 });
    return answerEntity;
  }
}
