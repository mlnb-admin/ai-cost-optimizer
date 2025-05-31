const ROIProjection = () => {
  const projectionData = [
    { month: 'Month 1', investment: 25000, savings: 5000, roi: -20000 },
    { month: 'Month 3', investment: 25000, savings: 15000, roi: -10000 },
    { month: 'Month 6', investment: 25000, savings: 35000, roi: 10000 },
    { month: 'Month 12', investment: 25000, savings: 75000, roi: 50000 },
    { month: 'Month 18', investment: 25000, savings: 125000, roi: 100000 },
    { month: 'Month 24', investment: 25000, savings: 175000, roi: 150000 }
  ];

  const maxValue = Math.max(...projectionData.map(d => d.savings));
  const minValue = Math.min(...projectionData.map(d => d.roi));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">ROI Projection Over Time</h3>
      
      {/* Chart Area */}
      <div className="relative h-48 mb-6">
        <div className="absolute inset-0 flex items-end justify-between space-x-2">
          {projectionData.map((data, index) => {
            const savingsHeight = (data.savings / maxValue) * 100;
            const roiHeight = data.roi > 0 ? (data.roi / maxValue) * 100 : 0;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                {/* Savings Bar */}
                <div className="w-full relative">
                  <div
                    className="bg-blue-500 rounded-t transition-all duration-1000 ease-out"
                    style={{ height: `${savingsHeight}%` }}
                  />
                  {/* ROI Overlay */}
                  {data.roi > 0 && (
                    <div
                      className="bg-green-500 rounded-t absolute bottom-0 w-full opacity-70"
                      style={{ height: `${roiHeight}%` }}
                    />
                  )}
                </div>
                
                {/* Month Label */}
                <span className="text-xs text-gray-500 transform -rotate-45 origin-center">
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>${(maxValue / 1000).toFixed(0)}k</span>
          <span>${(maxValue / 2000).toFixed(0)}k</span>
          <span>$0</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Cumulative Savings</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Net ROI</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">18 months</div>
          <div className="text-xs text-gray-500">Break-even point</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">$175k</div>
          <div className="text-xs text-gray-500">2-year savings</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">600%</div>
          <div className="text-xs text-gray-500">2-year ROI</div>
        </div>
      </div>
    </div>
  );
};

export default ROIProjection; 