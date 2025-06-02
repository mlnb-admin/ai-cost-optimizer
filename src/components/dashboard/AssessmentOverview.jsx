import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Star, Shield, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.jsx";
import ImplementationComplexityChart from './ImplementationComplexityChart';

const AssessmentOverview = ({ dashboardData }) => {
  const [activeSection, setActiveSection] = useState('executive');

  // Extract data from dashboard structure
  const executiveSummary = dashboardData?.executiveSummary || {};
  const vendorComparison = dashboardData?.vendorComparison || {};
  const riskAnalysis = dashboardData?.riskAnalysis || {};
  const costBenefitAnalysis = dashboardData?.costBenefitAnalysis || {};

  // Risk Assessment Pie Chart Data
  const riskData = {
    values: [
      executiveSummary.riskAssessment?.securityRisk === 'Low' ? 1 : executiveSummary.riskAssessment?.securityRisk === 'Medium' ? 2 : 3,
      executiveSummary.riskAssessment?.complianceRisk === 'Low' ? 1 : executiveSummary.riskAssessment?.complianceRisk === 'Medium' ? 2 : 3,
      executiveSummary.riskAssessment?.implementationRisk === 'Low' ? 1 : executiveSummary.riskAssessment?.implementationRisk === 'Medium' ? 2 : 3,
      executiveSummary.riskAssessment?.vendorRisk === 'Low' ? 1 : executiveSummary.riskAssessment?.vendorRisk === 'Medium' ? 2 : 3,
      executiveSummary.riskAssessment?.dataRisk === 'Low' ? 1 : executiveSummary.riskAssessment?.dataRisk === 'Medium' ? 2 : 3,
    ],
    labels: ['Security Risk', 'Compliance Risk', 'Implementation Risk', 'Vendor Risk', 'Data Risk'],
    type: 'pie',
    hole: 0.4,
    marker: {
      colors: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#3B82F6']
    }
  };

  // Vendor Comparison Radar Chart Data
  const vendors = vendorComparison.alternatives?.slice(0, 3) || [];
  const radarData = vendors.map((vendor, index) => ({
    type: 'scatterpolar',
    r: [
      vendor.securityCompliance?.score || 0,
      vendor.performanceMetrics?.score || 0,
      vendor.integrationComplexity?.score || 0,
      vendor.vendorMaturity?.score || 0,
      vendor.overallScore || 0
    ],
    theta: ['Security', 'Performance', 'Integration', 'Maturity', 'Overall'],
    fill: 'toself',
    name: vendor.vendorName || `Vendor ${index + 1}`,
    line: {
      color: ['#3B82F6', '#10B981', '#F59E0B'][index]
    }
  }));

  // Cost Analysis Radial Chart Data
  const costData = {
    values: [
      costBenefitAnalysis.costs?.implementation?.total || 0,
      costBenefitAnalysis.costs?.operational?.total || 0,
      costBenefitAnalysis.benefits?.quantifiable?.reduce((sum, benefit) => sum + (benefit.yearlyValue || 0), 0) || 0
    ],
    labels: ['Implementation Cost', 'Operational Cost', 'Annual Benefits'],
    type: 'pie',
    hole: 0.6,
    marker: {
      colors: ['#EF4444', '#F59E0B', '#10B981']
    }
  };

  // Implementation Complexity Radial Chart
  const complexityScore = executiveSummary.implementationComplexity?.overallComplexity === 'Low' ? 30 : 
                         executiveSummary.implementationComplexity?.overallComplexity === 'Medium' ? 60 : 90;

  const complexityData = [
    {
      name: "complexity",
      value: complexityScore,
      fill: complexityScore < 40 ? "#10B981" : complexityScore < 70 ? "#F59E0B" : "#EF4444"
    }
  ];

  const complexityConfig = {
    complexity: {
      label: "Complexity Score",
      color: complexityScore < 40 ? "#10B981" : complexityScore < 70 ? "#F59E0B" : "#EF4444",
    },
  };

  return (
    <div className="space-y-8">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
            <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-white">
            {executiveSummary.recommendedSolution?.confidenceScore || 0}%
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-300">Confidence Score</p>
        </div>
        
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-white">
            {executiveSummary.costImpact?.roiProjection?.threeYearROI || 0}%
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-300">3-Year ROI</p>
        </div>
        
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
            <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-white">
            {executiveSummary.costImpact?.roiProjection?.breakEvenMonths || 0}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-300">Break-even (Months)</p>
        </div>
        
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mb-4">
            <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-white">
            {executiveSummary.recommendedSolution?.riskLevel || 'Medium'}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-300">Risk Level</p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="border-b border-primary-200 dark:border-primary-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'executive', label: 'Executive Summary' },
            { id: 'risk', label: 'Risk Analysis' },
            { id: 'vendors', label: 'Vendor Comparison' },
            { id: 'costs', label: 'Cost Analysis' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {activeSection === 'executive' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Primary Recommendation */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Recommended Solution
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-primary-900 dark:text-white">
                      {executiveSummary.recommendedSolution?.name || 'AI Solution'}
                    </h4>
                    <p className="text-sm text-primary-600 dark:text-primary-300">
                      Vendor: {executiveSummary.recommendedSolution?.vendor || 'TBD'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-primary-800 dark:text-primary-200">Key Benefits:</h5>
                  <ul className="space-y-1">
                    {(executiveSummary.recommendedSolution?.keyBenefits || []).map((benefit, index) => (
                      <li key={index} className="text-sm text-primary-600 dark:text-primary-300 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Implementation Complexity Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Implementation Complexity Analysis
              </h3>
              <ImplementationComplexityChart 
                complexityData={executiveSummary.implementationComplexity}
                size="medium"
              />
            </div>
          </div>
        )}

        {activeSection === 'risk' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Risk Assessment Pie Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Risk Assessment Distribution
              </h3>
              <Plot
                data={[riskData]}
                layout={{
                  width: 400,
                  height: 300,
                  margin: { t: 0, b: 0, l: 0, r: 0 },
                  paper_bgcolor: 'transparent',
                  plot_bgcolor: 'transparent',
                  font: { color: '#6B7280' },
                  showlegend: true,
                  legend: { orientation: 'v', x: 1.05, y: 0.5 }
                }}
                config={{ displayModeBar: false }}
              />
            </div>

            {/* Risk Details */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Risk Breakdown
              </h3>
              <div className="space-y-4">
                {Object.entries(executiveSummary.riskAssessment || {}).map(([key, value]) => {
                  const riskColor = value === 'Low' ? 'text-green-600' : 
                                   value === 'Medium' ? 'text-yellow-600' : 'text-red-600';
                  const riskBg = value === 'Low' ? 'bg-green-100 dark:bg-green-900/30' : 
                                value === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-red-100 dark:bg-red-900/30';
                  
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-700 dark:text-primary-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskColor} ${riskBg}`}>
                        {value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'vendors' && (
          <div className="space-y-6">
            {/* Vendor Comparison Radar Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Vendor Performance Comparison
              </h3>
              <Plot
                data={radarData}
                layout={{
                  width: 600,
                  height: 400,
                  polar: {
                    radialaxis: {
                      visible: true,
                      range: [0, 100]
                    }
                  },
                  paper_bgcolor: 'transparent',
                  plot_bgcolor: 'transparent',
                  font: { color: '#6B7280' },
                  showlegend: true
                }}
                config={{ displayModeBar: false }}
              />
            </div>

            {/* Vendor Details Table */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Vendor Comparison Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary-200 dark:border-primary-700">
                      <th className="text-left py-2 font-medium text-primary-900 dark:text-white">Vendor</th>
                      <th className="text-left py-2 font-medium text-primary-900 dark:text-white">Overall Score</th>
                      <th className="text-left py-2 font-medium text-primary-900 dark:text-white">Monthly Cost</th>
                      <th className="text-left py-2 font-medium text-primary-900 dark:text-white">Ranking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor, index) => (
                      <tr key={index} className="border-b border-primary-100 dark:border-primary-800">
                        <td className="py-2 text-primary-900 dark:text-white">{vendor.vendorName}</td>
                        <td className="py-2 text-primary-600 dark:text-primary-300">{vendor.overallScore}/100</td>
                        <td className="py-2 text-primary-600 dark:text-primary-300">
                          ${vendor.costAnalysis?.monthlyCost?.toLocaleString() || 'TBD'}
                        </td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            vendor.ranking === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            vendor.ranking === 2 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            #{vendor.ranking}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'costs' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cost Breakdown Donut Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Cost vs Benefits Analysis
              </h3>
              <Plot
                data={[costData]}
                layout={{
                  width: 400,
                  height: 300,
                  margin: { t: 0, b: 0, l: 0, r: 0 },
                  paper_bgcolor: 'transparent',
                  plot_bgcolor: 'transparent',
                  font: { color: '#6B7280' },
                  showlegend: true,
                  annotations: [
                    {
                      text: 'Financial<br>Overview',
                      x: 0.5,
                      y: 0.5,
                      font: { size: 16, color: '#6B7280' },
                      showarrow: false
                    }
                  ]
                }}
                config={{ displayModeBar: false }}
              />
            </div>

            {/* Financial Metrics */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Financial Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 dark:text-primary-300">Payback Period:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    {costBenefitAnalysis.financialMetrics?.paybackPeriod || 0} months
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 dark:text-primary-300">IRR:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    {costBenefitAnalysis.financialMetrics?.irr || 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 dark:text-primary-300">NPV:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    ${costBenefitAnalysis.financialMetrics?.npv?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 dark:text-primary-300">ROI:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {costBenefitAnalysis.financialMetrics?.roi || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentOverview; 