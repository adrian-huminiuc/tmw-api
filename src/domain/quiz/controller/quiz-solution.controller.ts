import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { QuizSolverService } from '../services/quiz-solver.service';
import { QuizEntity } from '../entities/quiz.entity';
import { EntityByIdPipe } from '../../../core/nest/pipes/entity-by-id.pipe';
import { QuizSolutionInputDto } from '../dtos/quiz-solution-input.dto';
import { QuizSolutionOutcomeDto } from '../dtos/quiz-solution-outcome.dto';

@Controller('quiz-solution')
export class QuizSolutionController {
  constructor(private readonly quizSolver: QuizSolverService) {}

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async getSolutionOutcome(
    @Param('id', EntityByIdPipe) quiz: QuizEntity,
    @Body()
    dto: QuizSolutionInputDto,
  ): Promise<QuizSolutionOutcomeDto> {
    const solOutcome = new QuizSolutionOutcomeDto();
    solOutcome.outcome = await this.quizSolver.solveQuiz(quiz, dto);
    solOutcome.quiz = quiz.id;
    return solOutcome;
  }
}
