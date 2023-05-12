import { QuestionEntity } from '../../../src/domain/quiz/entities/question.entity';
import { faker } from '@faker-js/faker';

export class QuestionsMockDataGenerator {
  generate(): QuestionEntity {
    const questionEntity = new QuestionEntity();
    questionEntity.text = faker.datatype.string(55);
    return questionEntity;
  }
}
