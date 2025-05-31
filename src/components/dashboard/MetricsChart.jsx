const MetricsChart = () => {
  const metrics = [
    { label: 'Cost Reduction', value: 85, color: 'bg-green-500' },
    { label: 'Efficiency Gain', value: 70, color: 'bg-blue-500' },
    { label: 'Accuracy Improvement', value: 90, color: 'bg-purple-500' },
    { label: 'Customer Satisfaction', value: 75, color: 'bg-yellow-500' }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-6">Expected Impact Metrics</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{metric.label}</span>
              <span className="text-sm text-primary-500 dark:text-primary-400">{metric.value}%</span>
            </div>
            <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${metric.color}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-primary-200 dark:border-primary-700">
        <p className="text-xs text-primary-500 dark:text-primary-400">
          * Metrics based on industry benchmarks and your specific requirements
        </p>
      </div>
    </div>
  );
};

export default MetricsChart; 