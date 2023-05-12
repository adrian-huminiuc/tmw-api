import { EntityManager } from 'typeorm';

export class CleanDbHelper {
  static async reset(em: EntityManager, tables: string[]): Promise<void> {
    const deleteEntriesSql = tables.map((table) => {
      return `TRUNCATE TABLE ${table};`;
    });
    const disableKeyCheck = 'SET foreign_key_checks = 0;';
    const enableKeyCheck = 'SET FOREIGN_KEY_CHECKS = 1;';

    await em.transaction(async (em) => {
      await em.query(disableKeyCheck);
      await Promise.all(deleteEntriesSql.map(async (it) => em.query(it)));
      await em.query(enableKeyCheck);
    });
  }
}
