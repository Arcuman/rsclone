import { Pool, QueryResult } from 'pg';
import dbConfig from '@/config/dbConfig';

const pool = new Pool(dbConfig);

export const db = {
  query: (text: string, params: Array<string> | Array<number>): Promise<QueryResult> =>
    pool.query(text, params),
};
