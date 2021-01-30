import { db } from '../../../db';

export interface Level {
  level_id: number;
  level: number;
  exp_to_lvl: number;
  exp_total: number;
}

const getLevelById = async (id: number): Promise<Level> => {
  let level: Level;

  try {
    ({
      rows: [level],
    } = await db.query('Select * from "Levels"  Where level_id=$1', [id]));
  } catch (error) {
    throw new Error('500');
  }

  return level;
};

const getLevelByExp = async (exp: number): Promise<number> => {
  let res: { level: number };

  try {
    ({
      rows: [res],
    } = await db.query(
      'SELECT MAX(t.level) FROM (SELECT level FROM "Levels" WHERE exp_total - $1 <= 0) t',
      [exp],
    ));
  } catch (error) {
    throw new Error('500');
  }

  return res.level;
};

const getLevelByLevelValue = async (levelValue: number): Promise<Level> => {
  let level: Level;

  try {
    ({
      rows: [level],
    } = await db.query('Select * from "Levels"  Where level=$1', [levelValue]));
  } catch (error) {
    throw new Error('500');
  }

  return level;
};

const setLevel = async (data: Level): Promise<number> => {
  let level: Level;

  try {
    const query =
      'INSERT INTO "Levels" (level, exp_to_lvl, exp_total) ' +
      'VALUES ($1, $2, $3 ) RETURNING level_id';

    ({
      rows: [level],
    } = await db.query(query, [
      data.level.toString(),
      data.exp_to_lvl.toString(),
      data.exp_total.toString(),
    ]));

    if (!level) {
      return 0;
    }
  } catch (error) {
    throw new Error('500');
  }
  return level.level_id;
};

const deleteLevelById = async (id: number): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "Levels" WHERE level_id=$1', [id]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
};

const updateLevelById = async (id: number, data: Level): Promise<Level> => {
  let level: Level;
  try {
    const query =
      'UPDATE "Levels" Set level=$2, exp_to_lvl=$3, exp_total=$4 ' +
      'WHERE level_id=$1  RETURNING *';
    ({
      rows: [level],
    } = await db.query(query, [
      id.toString(),
      data.level.toString(),
      data.exp_to_lvl.toString(),
      data.exp_total.toString(),
    ]));
  } catch (error) {
    throw new Error('500');
  }
  return level;
};

export const levelModel = {
  getLevelById,
  getLevelByLevelValue,
  getLevelByExp,
  setLevel,
  deleteLevelById,
  updateLevelById,
};
