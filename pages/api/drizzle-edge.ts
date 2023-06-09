import { Pool } from '@neondatabase/serverless';
import { periodicTable } from '../../drizzle-types';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { average, calculatePercentiles } from '@/lib/util';

export const config = {
  runtime: 'edge',
  regions: ['fra1'],  // fra1 = Frankfurt: pick the Vercel region nearest your Neon DB
};


export default async (req: Request, ctx: any) => {
  const pool = new Pool({ connectionString: process.env.DRIZZLE_DATABASE_URL });
  const db = drizzle(pool);

  console.log(db.select().from(periodicTable).toSQL())
  
  const latencies = [];
  for (let i = 0; i < 100; i++) {
    const startTime = Date.now();
    await db.select().from(periodicTable);
    const endTime = Date.now();
    latencies.push(endTime - startTime);
  }
  ctx.waitUntil(pool.end());

  return new Response(JSON.stringify({ avg: average(latencies), ...calculatePercentiles(latencies), latencies }));
}