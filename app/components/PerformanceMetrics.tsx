const PerformanceMetrics = ({ metrics }) => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-3">Performance Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Average Response Time</p>
          <p>{metrics.averageResponseTime} ms</p>
        </div>
        <div>
          <p className="font-medium">Requests Per Second</p>
          <p>{metrics.requestsPerSecond}</p>
        </div>
        <div>
          <p className="font-medium">Error Rate</p>
          <p>{metrics.errorRate}%</p>
        </div>
        <div>
          <p className="font-medium">CPU Usage</p>
          <p>{metrics.cpuUsage}%</p>
        </div>
      </div>
    </div>
  )
}

export default PerformanceMetrics

