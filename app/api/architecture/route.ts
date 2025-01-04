import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this would fetch the current architecture from a database or service
  const architecture = {
    nodes: [
      { id: "Service A", type: "service" },
      { id: "Service B", type: "service" },
      { id: "Service C", type: "service" },
      { id: "Database", type: "database" },
    ],
    links: [
      { source: "Service A", target: "Service B" },
      { source: "Service B", target: "Service C" },
      { source: "Service C", target: "Database" },
    ]
  }

  return NextResponse.json(architecture)
}

