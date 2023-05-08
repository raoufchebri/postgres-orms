// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'
import {
  Kysely,
  PostgresDialect,
} from 'kysely'
import { Database, Data, periodicTable } from '../../types';
import { getLatencies, calculatePercentiles, average } from '@/lib/util';
import { drizzle } from 'drizzle-orm/node-postgres';

const drizzlePool = new Pool({
  connectionString: process.env.DRIZZLE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
})

const kyselyPool = new Pool({
  connectionString: process.env.KYSELY_DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
})

const kyselyDb = new Kysely<Database>({
  dialect: new PostgresDialect({ pool: kyselyPool })
});

async function kyselySelectAll() {
  await kyselyDb
  .selectFrom('atoms')
  .selectAll()
  .execute();
}

const drizzleDb = drizzle(drizzlePool);

async function drizzleSelectAll() {
  await drizzleDb.select().from(periodicTable);
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{query?: string, latencies?: number[], percentiles?: {p75:number, p90:number, p99:number}, error?: string}>
) {
  try {
    const query = req.query.query as string;
    
    const selectAll = query === 'kysely' ? kyselySelectAll : (drizzleSelectAll);
    
    const results = await getLatencies(selectAll);
    const latencies = results.map(r => r.requestLatency);
    const percentiles = calculatePercentiles(latencies);
    
    // console.log(`${query} avg: ${average(latencies)}, ms p75: ${percentiles.p75} ms, p90: ${percentiles.p90} ms, p99: ${percentiles.p99} ms`);
    
    res.status(200).json({ 
      query,
      latencies, 
      percentiles,
    });
  } catch (error) {
    console.error('An error occurred while making requests:', error);
    res.status(500).json({ error: 'An error occurred while making requests' });
  }
}
