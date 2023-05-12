import { Module } from '@nestjs/common';
import { QuizService } from './services/quiz.service';
import { QuizRepository } from './repositories/quiz.repository';
import { QuizEntityToDtoFactory } from './factories/quiz.entity-to-dto.factory';
import { QuizController } from './controller/quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuizSolutionController } from './controller/quiz-solution.controller';
import { QuizSolverService } from './services/quiz-solver.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity])],
  controllers: [QuizController, QuizSolutionController],
  providers: [
    QuizService,
    QuizSolverService,
    QuizRepository,
    QuizEntityToDtoFactory,
  ],
})
export class QuizModule {}
