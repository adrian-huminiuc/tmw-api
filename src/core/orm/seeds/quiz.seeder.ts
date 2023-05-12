import { EntityManager } from 'typeorm';
import { QuizEntity } from '../../../domain/quiz/entities/quiz.entity';
import { AnswerEntity } from '../../../domain/quiz/entities/answer.entity';
import { QuestionEntity } from '../../../domain/quiz/entities/question.entity';

export async function loadQuiz(em: EntityManager) {
  const quiz = {
    outcomeHighWeight: 'You are very introverted',
    outcomeMiddleWeight:
      'You have mixed introverted/extroverted personality traits',
    outcomeLowWeight: 'You are extroverted',
    questions: [
      {
        text: 'You’re really busy at work and a colleague is telling you their life story and personal woes. You:',
        answers: [
          {
            text: 'Don’t dare to interrupt them',
            weight: 25,
          },
          {
            text: 'Think it’s more important to give them some of your time; work can wait',
            weight: 25,
          },
          {
            text: 'Listen, but with only with half an ear',
            weight: 75,
          },
          {
            text: 'Interrupt and explain that you are really busy at the moment',
            weight: 0,
          },
        ],
      },
      {
        text: 'You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:',
        answers: [
          {
            text: 'Look at your watch every two minutes',
            weight: 50,
          },
          {
            text: 'Bubble with inner anger, but keep quiet',
            weight: 100,
          },
          {
            text: 'Explain to other people in the room that the doctor is always late',
            weight: 25,
          },
          {
            text: 'Complain in a loud voice, while tapping your foot impatiently',
            weight: 0,
          },
        ],
      },
      {
        text: 'You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:',
        answers: [
          {
            text: 'Don’t dare contradict them',
            weight: 100,
          },
          {
            text: 'Think that they are obviously right',
            weight: 25,
          },
          {
            text: 'Defend your own point of view, tooth and nail',
            weight: 25,
          },
          {
            text: 'Continuously interrupt your colleague',
            weight: 50,
          },
        ],
      },
      {
        text: 'You are taking part in a guided tour of a museum. You:',
        answers: [
          {
            text: 'Are a bit too far towards the back so don’t really hear what the guide is saying',
            weight: 100,
          },
          {
            text: 'Follow the group without question',
            weight: 50,
          },
          {
            text: 'Make sure that everyone is able to hear properly',
            weight: 25,
          },
          {
            text: 'Are right up the front, adding your own comments in a loud voice',
            weight: 0,
          },
        ],
      },
    ],
  };

  const quizEntity = new QuizEntity();
  quizEntity.outcomeHighWeight = quiz.outcomeHighWeight;
  quizEntity.outcomeMiddleWeight = quiz.outcomeMiddleWeight;
  quizEntity.outcomeLowWeight = quiz.outcomeLowWeight;
  quizEntity.name = 'ie';
  quizEntity.description = 'Are you an introvert or an extrovert?';
  await em.save(quizEntity);

  await Promise.all(
    quiz.questions.map(async (it) => {
      const answers = await Promise.all(
        it.answers.map(async (it) => {
          const answerEntity = new AnswerEntity();
          answerEntity.text = it.text;
          answerEntity.weight = it.weight;
          return await em.save(answerEntity);
        }),
      );

      const questionEntity = new QuestionEntity();
      questionEntity.text = it.text;
      questionEntity.answers = Promise.resolve(answers);
      questionEntity.quiz = Promise.resolve(quizEntity);
      return await em.save(questionEntity);
    }),
  );
}
