import { Pool } from '@neondatabase/serverless';
import { periodicTable } from '../../drizzle-types';
import { drizzle } from 'drizzle-orm/neon-serverless';

export const config = {
  runtime: 'edge',
  regions: ['fra1'],  // fra1 = Frankfurt: pick the Vercel region nearest your Neon DB
};

export default async (req: Request, ctx: any) => {
  const pool = new Pool({ connectionString: process.env.KYSELY_DATABASE_URL });
  const db = drizzle(pool);
  const atoms = await db.select().from(periodicTable);
  ctx.waitUntil(pool.end());

  return new Response(JSON.stringify({ atoms }));
}