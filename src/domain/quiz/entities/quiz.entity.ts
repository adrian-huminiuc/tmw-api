import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('quizes')
export class QuizEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar', { unique: true })
  description: string;

  @Column('varchar')
  outcomeHighWeight: string;

  @Column('varchar')
  outcomeMiddleWeight: string;

  @Column('varchar')
  outcomeLowWeight: string;

  @OneToMany(() => QuestionEntity, (question) => question.quiz, {
    lazy: true,
    cascade: ['insert', 'update'],
  })
  questions: Promise<QuestionEntity[]>;

  @CreateDateColumn()
  createdAt;
}
