import { useState } from 'react';
import { Download, RefreshCw, Star, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { useConsultation } from '../contexts/ConsultationContext';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import MetricsChart from '../components/dashboard/MetricsChart';
import ROIProjection from '../components/dashboard/ROIProjection';

const DashboardPage = () => {
  const { state, resetConsultation } = useConsultation();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock recommendations based on questionnaire data
  const recommendations = [
    {
      id: 1,
      title: 'Automated Customer Service Chatbot',
      description: 'Implement an AI-powered chatbot to handle 80% of customer inquiries automatically.',
      priority: 'high',
      estimatedROI: '300%',
      implementationTime: '2-3 months',
      cost: '$15,000 - $25,000',
      benefits: [
        '24/7 customer support availability',
        'Reduced response time from hours to seconds',
        'Cost savings of $50,000 annually',
        'Improved customer satisfaction scores'
      ],
      reasoning: `Based on your ${state.questionnaireData.businessType || 'business type'} and focus on ${state.questionnaireData.primaryObjective || 'customer experience'}, this solution addresses your main pain points while fitting within your budget and timeline.`
    },
    {
      id: 2,
      title: 'Predictive Analytics Dashboard',
      description: 'Deploy machine learning models to predict trends and optimize business decisions.',
      priority: 'medium',
      estimatedROI: '250%',
      implementationTime: '3-4 months',
      cost: '$20,000 - $35,000',
      benefits: [
        'Data-driven decision making',
        'Early trend identification',
        'Inventory optimization',
        'Revenue forecasting accuracy'
      ],
      reasoning: 'Your data volume and quality make this an excellent next step for scaling your operations.'
    },
    {
      id: 3,
      title: 'Process Automation Suite',
      description: 'Automate repetitive tasks and workflows to increase operational efficiency.',
      priority: 'medium',
      estimatedROI: '200%',
      implementationTime: '1-2 months',
      cost: '$10,000 - $20,000',
      benefits: [
        'Reduced manual work by 60%',
        'Fewer human errors',
        'Faster processing times',
        'Employee satisfaction improvement'
      ],
      reasoning: 'Perfect for addressing your manual process pain points with quick implementation.'
    }
  ];

  const metrics = {
    totalROI: '275%',
    costSavings: '$125,000',
    timeToValue: '2-3 months',
    riskLevel: 'Low'
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'metrics', label: 'Metrics & ROI' },
    { id: 'implementation', label: 'Implementation Plan' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Consultation Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">
            Your personalized AI recommendations and implementation roadmap
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary inline-flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button 
            onClick={resetConsultation}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>New Consultation</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{metrics.totalROI}</h3>
          <p className="text-sm text-gray-600">Expected ROI</p>
        </div>
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{metrics.costSavings}</h3>
          <p className="text-sm text-gray-600">Annual Savings</p>
        </div>
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{metrics.timeToValue}</h3>
          <p className="text-sm text-gray-600">Time to Value</p>
        </div>
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{metrics.riskLevel}</h3>
          <p className="text-sm text-gray-600">Risk Level</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Type:</span>
                    <span className="font-medium">{state.questionnaireData.businessType || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Primary Objective:</span>
                    <span className="font-medium">{state.questionnaireData.primaryObjective || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Size:</span>
                    <span className="font-medium">{state.questionnaireData.teamSize || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget Range:</span>
                    <span className="font-medium">{state.questionnaireData.budget || 'Not specified'}</span>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recommendation</h3>
                <RecommendationCard recommendation={recommendations[0]} isHighlighted />
              </div>
            </div>
            
            <div className="space-y-6">
              <ROIProjection />
              <MetricsChart />
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {recommendations.map((recommendation) => (
              <RecommendationCard 
                key={recommendation.id} 
                recommendation={recommendation} 
              />
            ))}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <MetricsChart />
            <ROIProjection />
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Implementation Roadmap</h3>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={rec.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Timeline: {rec.implementationTime}</span>
                      <span>Cost: {rec.cost}</span>
                      <span>ROI: {rec.estimatedROI}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 