import { average, calculatePercentiles } from '@/lib/util';

export const config = {
  runtime: 'edge',
  regions: ['fra1'],  // fra1 = Frankfurt: pick the Vercel region nearest your Neon DB
};


export default async (req: Request, ctx: any) => {
  const latencies = [];
  for (let i = 0; i < 100; i++) {
    const startTime = Date.now();
    
    await fetch(`${process.env.HTTP_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': `${process.env.HTTP_DATABASE_URL}`,
      },
      body: JSON.stringify({
        query: "SELECT * FROM atoms",
        params: [],
      }),
    });
    
    const endTime = Date.now();
    latencies.push(endTime - startTime);
  }

  return new Response(JSON.stringify({ avg: average(latencies), ...calculatePercentiles(latencies), latencies }));
}