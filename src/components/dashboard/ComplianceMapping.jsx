import Plot from 'react-plotly.js';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const ComplianceMapping = ({ complianceData }) => {
  // Sample compliance data based on dashboard.json structure
  const sampleCompliance = {
    requiredFrameworks: ["GDPR", "SOC 2", "ISO 27001", "HIPAA", "PCI DSS"],
    frameworkAssessment: [
      {
        framework: "GDPR",
        status: "Compliant",
        score: 95,
        requirements: [
          { requirement: "Data Protection", status: "Met", coverage: 100 },
          { requirement: "Right to be Forgotten", status: "Met", coverage: 90 },
          { requirement: "Data Portability", status: "PartiallyMet", coverage: 75 }
        ]
      },
      {
        framework: "SOC 2",
        status: "Compliant", 
        score: 88,
        requirements: [
          { requirement: "Security", status: "Met", coverage: 95 },
          { requirement: "Availability", status: "Met", coverage: 85 },
          { requirement: "Processing Integrity", status: "PartiallyMet", coverage: 80 }
        ]
      },
      {
        framework: "ISO 27001",
        status: "PartiallyCompliant",
        score: 72,
        requirements: [
          { requirement: "Information Security", status: "Met", coverage: 85 },
          { requirement: "Risk Management", status: "PartiallyMet", coverage: 70 },
          { requirement: "Business Continuity", status: "NotMet", coverage: 45 }
        ]
      },
      {
        framework: "HIPAA",
        status: "RequiresReview",
        score: 45,
        requirements: [
          { requirement: "Physical Safeguards", status: "PartiallyMet", coverage: 60 },
          { requirement: "Administrative Safeguards", status: "NotMet", coverage: 30 },
          { requirement: "Technical Safeguards", status: "PartiallyMet", coverage: 55 }
        ]
      },
      {
        framework: "PCI DSS",
        status: "NonCompliant",
        score: 25,
        requirements: [
          { requirement: "Network Security", status: "NotMet", coverage: 30 },
          { requirement: "Data Protection", status: "NotMet", coverage: 20 },
          { requirement: "Access Control", status: "NotMet", coverage: 25 }
        ]
      }
    ]
  };

  const frameworks = complianceData?.frameworkAssessment || sampleCompliance.frameworkAssessment;

  // Compliance Status Pie Chart
  const statusCounts = frameworks.reduce((acc, fw) => {
    acc[fw.status] = (acc[fw.status] || 0) + 1;
    return acc;
  }, {});

  const compliancePieData = {
    values: Object.values(statusCounts),
    labels: Object.keys(statusCounts),
    type: 'pie',
    hole: 0.4,
    marker: {
      colors: {
        'Compliant': '#10B981',
        'PartiallyCompliant': '#F59E0B', 
        'NonCompliant': '#EF4444',
        'RequiresReview': '#8B5CF6'
      }
    }
  };

  // Compliance Scores Radar Chart
  const radarData = [{
    type: 'scatterpolar',
    r: frameworks.map(fw => fw.score),
    theta: frameworks.map(fw => fw.framework),
    fill: 'toself',
    name: 'Compliance Score',
    line: { color: '#3B82F6' },
    fillcolor: 'rgba(59, 130, 246, 0.3)'
  }];

  // Requirements Coverage Chart
  const coverageData = frameworks.map(fw => ({
    x: fw.requirements.map(req => req.requirement),
    y: fw.requirements.map(req => req.coverage),
    name: fw.framework,
    type: 'bar'
  }));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'PartiallyCompliant':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'NonCompliant':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'RequiresReview':
        return <Shield className="h-5 w-5 text-purple-600" />;
      default:
        return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'PartiallyCompliant':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'NonCompliant':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'RequiresReview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-6">
          Compliance Framework Assessment
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="text-center">
              <div className="text-2xl font-bold text-primary-900 dark:text-white">
                {count}
              </div>
              <div className={`text-sm px-2 py-1 rounded-full ${getStatusColor(status)}`}>
                {status.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Compliance Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
            Compliance Status Distribution
          </h3>
          <Plot
            data={[compliancePieData]}
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
                  text: 'Compliance<br>Overview',
                  x: 0.5,
                  y: 0.5,
                  font: { size: 14, color: '#6B7280' },
                  showarrow: false
                }
              ]
            }}
            config={{ displayModeBar: false }}
          />
        </div>

        {/* Compliance Scores Radar */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
            Framework Compliance Scores
          </h3>
          <Plot
            data={radarData}
            layout={{
              width: 400,
              height: 300,
              polar: {
                radialaxis: {
                  visible: true,
                  range: [0, 100]
                }
              },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: { color: '#6B7280' },
              showlegend: false
            }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>

      {/* Detailed Framework Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-6">
          Framework Assessment Details
        </h3>
        
        <div className="space-y-6">
          {frameworks.map((framework, index) => (
            <div key={index} className="border border-primary-200 dark:border-primary-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(framework.status)}
                  <h4 className="text-lg font-medium text-primary-900 dark:text-white">
                    {framework.framework}
                  </h4>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(framework.status)}`}>
                    {framework.status.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-lg font-bold text-primary-900 dark:text-white">
                    {framework.score}/100
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {framework.requirements.map((req, reqIndex) => (
                  <div key={reqIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                        {req.requirement}
                      </span>
                      <span className="text-sm text-primary-500 dark:text-primary-400">
                        {req.coverage}%
                      </span>
                    </div>
                    <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                          req.status === 'Met' ? 'bg-green-500' :
                          req.status === 'PartiallyMet' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${req.coverage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceMapping; 