import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { sql, createPool } from '@vercel/postgres';
// import { Kysely, PostgresDialect } from 'kysely';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Database, Data, periodicTable } from '../../types';

const NUM_REQUESTS = 100;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const vercelPool = createPool({
  connectionString: process.env.POSTGRES_URL
})

const drizzleDb = drizzle(pool);
  

async function pgSelectAll() {
    await pool.query('select * from periodic_table');
}

async function drizzleSelectAll() {
    await drizzleDb.select().from(periodicTable);
}
  
async function getLatencies(selectAll: Function) {
    const results: { requestLatency: number }[] = [];
    for (let i = 0; i < NUM_REQUESTS; i++) {
        const requestStartTime = Date.now();
        await selectAll();
        const requestEndTime = Date.now();
        const requestLatency = requestEndTime - requestStartTime;
        console.log(`Latency for request ${i + 1}: ${requestLatency} ms`);
        results.push({ requestLatency });
    }
    return results;
}
  
  function average(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
  
  function percentile(arr: number[], percentile: number) {
    const index = Math.ceil((percentile / NUM_REQUESTS) * arr.length) - 1;
    return arr[index];
  }
  
  function calculatePercentiles(latencies: number[]) {
    const sortedLatencies = [...latencies].sort((a, b) => a - b);
    const p75 = percentile(sortedLatencies, 75);
    const p90 = percentile(sortedLatencies, 90);
    const p99 = percentile(sortedLatencies, 99);
    return { p75, p90, p99 };
  }

export const config = {
  runtime: 'edge',
  regions: ['fra1'],
};

export default async function edgeFunction(request: NextRequest) {
  try {
    
    // Query the database to establish the connection to avoid outliers
    await pool.query('select 1');

    // const kyselyResults = await getLatencies(kyselySelectAll);
    // const kyselyLatencies = kyselyResults.map(r => r.requestLatency);
    // const kyselyPercentiles = calculatePercentiles(kyselyLatencies);
    
    // const pgResults = await getLatencies(pgSelectAll);
    // const pgLatencies = pgResults.map(r => r.requestLatency);
    // const pgPercentiles = calculatePercentiles(pgLatencies);
    
    const drizzleResults = await getLatencies(drizzleSelectAll);
    const drizzleLatencies = drizzleResults.map(r => r.requestLatency);
    const drizzlePercentiles = calculatePercentiles(drizzleLatencies);
    
    // console.log(`Pg avg: ${average(pgLatencies)} ms, p75: ${pgPercentiles.p75} ms, p90: ${pgPercentiles.p90} ms, p99: ${pgPercentiles.p99} ms`);
    // console.log(`Kysely avg: ${average(kyselyLatencies)}, ms p75: ${kyselyPercentiles.p75} ms, p90: ${kyselyPercentiles.p90} ms, p99: ${kyselyPercentiles.p99} ms`);
    console.log(`Drizzle avg: ${average(drizzleLatencies)} ms, p75: ${drizzlePercentiles.p75} ms, p90: ${drizzlePercentiles.p90} ms, p99: ${drizzlePercentiles.p99} ms`);

    return NextResponse.json({ 
    //   pgLatencies,
    //   kyselyLatencies, 
      drizzleLatencies, 
    //   pgPercentiles,
    //   kyselyPercentiles, 
      drizzlePercentiles 
    });
  } catch (error) {
    console.error('An error occurred while making requests:', error);
    return NextResponse.error();
  }
}
