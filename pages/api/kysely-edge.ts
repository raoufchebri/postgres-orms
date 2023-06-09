import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect, sql } from 'kysely';
import type { DB } from '../../kysely-types';

export const config = {
  runtime: 'edge',
  regions: ['fra1'],  // fra1 = Frankfurt: pick the Vercel region nearest your Neon DB
};

export default async (req: Request, ctx: any) => {
  const pool = new Pool({ connectionString: process.env.KYSELY_DATABASE_URL });
  const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });
  const query = db
    .selectFrom('atoms')
    .selectAll()
    .limit(10);

  const atoms = await query.execute();
  ctx.waitUntil(pool.end());

  return new Response(JSON.stringify({ atoms }));
}
