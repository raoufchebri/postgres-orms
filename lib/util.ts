
const NUM_REQUESTS = 100;

export async function getLatencies(selectAll: Function) {
    const results: { requestLatency: number }[] = [];
    for (let i = 0; i < NUM_REQUESTS; i++) {
      const requestStartTime = Date.now();
      await selectAll();
      const requestEndTime = Date.now();
      const requestLatency = requestEndTime - requestStartTime;
      results.push({ requestLatency });
    }
    return results;
  }
  
  export function average(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
  
  export function percentile(arr: number[], percentile: number) {
    const index = Math.ceil((percentile / NUM_REQUESTS) * arr.length) - 1;
    return arr[index];
  }
  
  export function calculatePercentiles(latencies: number[]) {
    const sortedLatencies = [...latencies].sort((a, b) => a - b);
    const p75 = percentile(sortedLatencies, 75);
    const p90 = percentile(sortedLatencies, 90);
    const p99 = percentile(sortedLatencies, 99);
    return { p75, p90, p99 };
  }
  