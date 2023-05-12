import { INestApplication } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Test } from '@nestjs/testing';
import { QuizController } from '../../../../src/domain/quiz/controller/quiz.controller';
import { CleanDbHelper } from '../../../utils/db/clean-db.helper';
import { QuizService } from '../../../../src/domain/quiz/services/quiz.service';
import { QuizEntityToDtoFactory } from '../../../../src/domain/quiz/factories/quiz.entity-to-dto.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from '../../../../src/core/orm/data-source';
import { QuizEntity } from '../../../../src/domain/quiz/entities/quiz.entity';
import { QuestionEntity } from '../../../../src/domain/quiz/entities/question.entity';
import { AnswerEntity } from '../../../../src/domain/quiz/entities/answer.entity';
import { QuizRepository } from '../../../../src/domain/quiz/repositories/quiz.repository';
import request from 'supertest';
import { ResponseStub } from '../../../utils/stubs/response.stub';
import { QuizDto } from '../../../../src/domain/quiz/dtos/quiz.dto';
import { FullQuizDataGeneratorInstance } from '../../../utils/generators/full-quiz.data-generator';
import { EntityNotFoundInterceptor } from '../../../../src/core/nest/interceptors/entity-not-found.interceptor';

describe('QuizController', () => {
  let app: INestApplication;
  let em: EntityManager;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...options,
          entities: [QuizEntity, QuestionEntity, AnswerEntity],
        }),
      ],
      controllers: [QuizController],
      providers: [QuizService, QuizRepository, QuizEntityToDtoFactory],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalInterceptors(new EntityNotFoundInterceptor());
    await app.init();
    em = app.get(EntityManager);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await CleanDbHelper.reset(em, ['quizes', 'questions', 'answers']);
  });

  describe('getQuizByName', () => {
    it.each([
      {
        description: 'will return normal response for known sample',
        quizName: 'sample',
        expected: { code: 200 },
      },
      {
        description: 'will return a 404 for non existing quiz',
        quizName: 'NON EXISTING QUIZ',
        expected: { code: 404 },
      },
    ])('handles $description', async ({ quizName, expected }) => {
      await FullQuizDataGeneratorInstance.generate(em, 10);

      const response: ResponseStub<QuizDto> = await request(app.getHttpServer())
        .get(`/quiz/${quizName}`)
        .set('Accept', 'application/json');

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toEqual(expected.code);
      if (expected.code > 400) {
        return;
      }

      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toEqual('sample');
      expect(response.body.questions.length).toEqual(10);
      expect(response.body.questions[0].id).toBeTruthy();
      expect(response.body.questions[0].text).toBeTruthy();
      expect(response.body.questions[0].answers.length).toEqual(2);
      expect(response.body.questions[0].answers[0].id).toBeTruthy();
      expect(response.body.questions[0].answers[0].text).toBeTruthy();
    });
  });
});
