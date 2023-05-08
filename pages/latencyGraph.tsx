import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
import { ChartData, ChartDataset } from 'chart.js';

// type LatencyDataset = ChartDataset<'line', number[]>;
// type LatencyData = ChartData<'line', number[], string>;

// const LatencyGraph = () => {
//   const [latencyData, setLatencyData] = useState<LatencyData | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseKysely = await fetch('/api/latency?query=kysely');
//         const dataKysely = await responseKysely.json();

//         const responseDrizzle = await fetch('/api/latency?query=drizzle');
//         const dataDrizzle = await responseDrizzle.json();

//         setLatencyData({
//           labels: dataKysely.latencies.map((_: any, index: number) => index + 1),
//           datasets: [
//             {
//               label: 'Kysely Latency',
//               data: dataKysely.latencies,
//               borderColor: 'rgba(75,192,192,1)',
//               backgroundColor: 'rgba(75,192,192,0.2)',
//             },
//             {
//               label: 'Drizzle Latency',
//               data: dataDrizzle.latencies,
//               borderColor: 'rgba(255,99,132,1)',
//               backgroundColor: 'rgba(255,99,132,0.2)',
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('An error occurred while fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!latencyData) {
//     return <div>Loading...</div>;
//   }

//  const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart',
//       },
//     },
//   };
  

//   return (
//     <div>
//       <h2>Latency Graph</h2>
//       <Line data={latencyData} options={chartOptions} />
//     </div>
//   );
// };

// export default LatencyGraph;


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


function LatencyGraph() {
  const [latencyData, setLatencyData] = useState<ChartData<'line', number[], string> | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseKysely = await fetch('/api/latency?query=kysely');
        const dataKysely = await responseKysely.json();

        const responseDrizzle = await fetch('/api/latency?query=drizzle');
        const dataDrizzle = await responseDrizzle.json();

        setLatencyData({
          labels: dataKysely.latencies.map((_: any, index: number) => index + 1),
          datasets: [
            {
              label: 'Kysely Latency',
              data: dataKysely.latencies,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
            },
            {
              label: 'Drizzle Latency',
              data: dataDrizzle.latencies,
              borderColor: 'rgba(255,99,132,1)',
              backgroundColor: 'rgba(255,99,132,0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, []);


  if (!latencyData) {
    return <div>Loading...</div>;
  }

  return latencyData && <Line options={options} data={latencyData} />;
}

export default LatencyGraph