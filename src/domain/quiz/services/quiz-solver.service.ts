import { QuizEntity } from '../entities/quiz.entity';
import { QuizSolutionInputDto } from '../dtos/quiz-solution-input.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class QuizSolverService {
  async solveQuiz(
    quiz: QuizEntity,
    solution: QuizSolutionInputDto,
  ): Promise<string> {
    const questions = await quiz.questions;

    const solutionWeight = (
      await Promise.all(
        questions.map(async (it) => {
          if (!solution[it.id]) {
            throw new BadRequestException({
              [quiz.id]: { [it.id]: 'unanswered' },
            });
          }

          const currentQuestionSolution = solution[it.id];
          const answer = ((await it.answers) ?? []).find(
            (answer) => Number(answer.id) === Number(currentQuestionSolution),
          );

          return answer?.weight ?? 0;
        }),
      )
    ).reduce((acc, curr) => acc + curr, 1);

    const finalSolutionWeight = Math.floor(
      solutionWeight / (await quiz.questions).length,
    );

    if (finalSolutionWeight >= 75) {
      return quiz.outcomeHighWeight;
    } else if (finalSolutionWeight >= 50) {
      return quiz.outcomeMiddleWeight;
    }

    return quiz.outcomeLowWeight;
  }
}
