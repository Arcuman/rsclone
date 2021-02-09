import { Level, levelModel } from '@/resources/level/level.model';

const getLevelById = (id: number): Promise<Level> => levelModel.getLevelById(id);

const getLevelByExp = (exp: number): Promise<number> => levelModel.getLevelByExp(exp);

const getLevelByLevelValue = (levelValue: number): Promise<Level> =>
  levelModel.getLevelByLevelValue(levelValue);

const createLevel = async (data: Level): Promise<number> => {
  const levelId = await levelModel.setLevel(data);

  if (!levelId) {
    return 0;
  }
  return levelId;
};

const updateLevelById = async (id: number, data: Level): Promise<Level> => {
  const level = await levelModel.updateLevelById(id, data);
  return level;
};

const deleteLevelById = async (id: number): Promise<number> => {
  const count = await levelModel.deleteLevelById(id);
  return count;
};

export const levelService = {
  getLevelById,
  getLevelByLevelValue,
  createLevel,
  updateLevelById,
  deleteLevelById,
  getLevelByExp,
};
