import { dataSource } from '../data-source';
import { loadQuiz } from './quiz.seeder';

export async function seed() {
  console.log('Running fixtures!');
  const em = (await dataSource.initialize()).createEntityManager();

  console.log('Load quiz');
  await loadQuiz(em);
}

seed().then(() => process.exit(0));
