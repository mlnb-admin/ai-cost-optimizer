import React from 'react';
import ImplementationComplexityChart from './ImplementationComplexityChart';

const ImplementationComplexityExample = () => {
  // Sample complexity data
  const sampleComplexityData = {
    overallComplexity: 'Medium', // 'Low', 'Medium', 'High'
    integrationEffort: 6, // weeks
    timelineEstimate: '4-6 months',
    timelineMonths: 5,
    resourcesRequired: 3, // FTE
    technicalComplexity: 'Medium',
    dataIntegration: 'High',
    complianceRequirements: 'Low'
  };

  // Low complexity example
  const lowComplexityData = {
    overallComplexity: 'Low',
    integrationEffort: 2,
    timelineEstimate: '1-2 months',
    timelineMonths: 2,
    resourcesRequired: 1,
    technicalComplexity: 'Low',
    dataIntegration: 'Low',
    complianceRequirements: 'Low'
  };

  // High complexity example
  const highComplexityData = {
    overallComplexity: 'High',
    integrationEffort: 12,
    timelineEstimate: '8-12 months',
    timelineMonths: 10,
    resourcesRequired: 8,
    technicalComplexity: 'High',
    dataIntegration: 'High',
    complianceRequirements: 'High'
  };

  return (
    <div className="p-8 space-y-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Implementation Complexity Chart Examples
        </h1>
        
        {/* Three size examples side by side */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Small Chart
            </h3>
            <ImplementationComplexityChart 
              complexityData={lowComplexityData}
              size="small"
            />
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Medium Chart (Default)
            </h3>
            <ImplementationComplexityChart 
              complexityData={sampleComplexityData}
              size="medium"
            />
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Large Chart
            </h3>
            <ImplementationComplexityChart 
              complexityData={highComplexityData}
              size="large"
            />
          </div>
        </div>

        {/* Detailed examples for different complexity levels */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Complexity Level Examples
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Low Complexity */}
            <div className="card">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Low Complexity Implementation
              </h3>
              <ImplementationComplexityChart 
                complexityData={lowComplexityData}
                size="medium"
              />
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  Characteristics:
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Minimal integration required</li>
                  <li>• Standard APIs available</li>
                  <li>• Low compliance overhead</li>
                  <li>• Quick deployment possible</li>
                </ul>
              </div>
            </div>

            {/* High Complexity */}
            <div className="card">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                High Complexity Implementation
              </h3>
              <ImplementationComplexityChart 
                complexityData={highComplexityData}
                size="medium"
              />
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                  Characteristics:
                </h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• Extensive system integration</li>
                  <li>• Custom development required</li>
                  <li>• High compliance requirements</li>
                  <li>• Significant testing needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Usage Example
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import ImplementationComplexityChart from './ImplementationComplexityChart';

const complexityData = {
  overallComplexity: 'Medium', // 'Low', 'Medium', 'High'
  integrationEffort: 6, // weeks
  timelineEstimate: '4-6 months',
  timelineMonths: 5,
  resourcesRequired: 3, // FTE
  technicalComplexity: 'Medium'
};

<ImplementationComplexityChart 
  complexityData={complexityData}
  size="medium" // 'small', 'medium', 'large'
  className="my-custom-class"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ImplementationComplexityExample; 