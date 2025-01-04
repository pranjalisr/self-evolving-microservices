'use client'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ArchitectureVisualization = ({ architecture }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!architecture) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous visualization

    const width = 400
    const height = 300

    const simulation = d3.forceSimulation(architecture.nodes)
      .force("link", d3.forceLink(architecture.links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg.append("g")
      .selectAll("line")
      .data(architecture.links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)

    const node = svg.append("g")
      .selectAll("circle")
      .data(architecture.nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", d => d.type === 'service' ? "#69b3a2" : "#404080")

    node.append("title")
      .text(d => d.id)

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    })

  }, [architecture])

  return <svg ref={svgRef} width="400" height="300"></svg>
}

export default ArchitectureVisualization

