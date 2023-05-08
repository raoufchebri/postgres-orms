// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import LatencyGraph from './latencyGraph'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Next.js + Vercel + Drizzle</h1>
      <LatencyGraph />
    </div>
  )
}
