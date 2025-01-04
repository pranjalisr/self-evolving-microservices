'use client'
import { useState, useEffect } from 'react'
import ArchitectureVisualization from './components/ArchitectureVisualization'
import PerformanceMetrics from './components/PerformanceMetrics'
import EvolutionControls from './components/EvolutionControls'

export default function Home() {
  const [architecture, setArchitecture] = useState(null)
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    // Fetch initial architecture and metrics
    fetchArchitecture()
    fetchMetrics()

    // Set up polling for updates
    const intervalId = setInterval(() => {
      fetchArchitecture()
      fetchMetrics()
    }, 5000) // Poll every 5 seconds

    return () => clearInterval(intervalId)
  }, [])

  const fetchArchitecture = async () => {
    const response = await fetch('/api/architecture')
    const data = await response.json()
    setArchitecture(data)
  }

  const fetchMetrics = async () => {
    const response = await fetch('/api/metrics')
    const data = await response.json()
    setMetrics(data)
  }

  const startEvolution = async () => {
    await fetch('/api/evolve', { method: 'POST' })
    // Fetch updated architecture and metrics immediately after starting evolution
    fetchArchitecture()
    fetchMetrics()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold mb-5 text-center">Self-Evolving Microservices Architecture</h1>
          {architecture && <ArchitectureVisualization architecture={architecture} />}
          {metrics && <PerformanceMetrics metrics={metrics} />}
          <EvolutionControls onStartEvolution={startEvolution} />
        </div>
      </div>
    </div>
  )
}

