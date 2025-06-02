import { useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useConsultation } from '../contexts/ConsultationContext';
import AssessmentOverview from '../components/dashboard/AssessmentOverview';
import ImplementationTimeline from '../components/dashboard/ImplementationTimeline';
import ComplianceMapping from '../components/dashboard/ComplianceMapping';
import { sampleDashboardData } from '../data/sampleDashboardData';

const DashboardPage = () => {
  const { state, resetConsultation } = useConsultation();
  const [activeTab, setActiveTab] = useState('assessment');

  const tabs = [
    { id: 'assessment', label: 'Assessment Overview' },
    { id: 'implementation', label: 'Implementation Plan' },
    { id: 'compliance', label: 'Compliance Assessment' },
    { id: 'profile', label: 'Business Profile' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white">
            Enterprise AI Assessment Dashboard
          </h1>
          <p className="text-lg text-primary-600 dark:text-primary-300 mt-2">
            Comprehensive AI solution analysis and implementation roadmap
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
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-primary-200 dark:border-primary-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:border-primary-300 dark:hover:border-primary-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'assessment' && (
          <AssessmentOverview dashboardData={sampleDashboardData} />
        )}

        {activeTab === 'implementation' && (
          <ImplementationTimeline roadmapData={sampleDashboardData.implementationRoadmap} />
        )}

        {activeTab === 'compliance' && (
          <ComplianceMapping complianceData={sampleDashboardData.complianceMapping} />
        )}

        {activeTab === 'profile' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Business Profile */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Business Profile Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-300">Business Type:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    {state.questionnaireData.businessType || 'Enterprise Technology'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-300">Primary Objective:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    {state.questionnaireData.primaryObjective || 'Customer Experience Enhancement'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-300">Team Size:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    {state.questionnaireData.teamSize || '50-200 employees'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-300">Budget Range:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    {state.questionnaireData.budget || '$100k - $500k'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-300">Industry:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    Technology Services
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600 dark:text-primary-300">Risk Profile:</span>
                  <span className="font-medium text-primary-900 dark:text-white">
                    Moderate
                  </span>
                </div>
              </div>
            </div>
            
            {/* Cost Optimization Opportunities */}
            <div className="card">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Cost Optimization Opportunities
              </h3>
              <div className="space-y-4">
                {sampleDashboardData.executiveSummary.costImpact.costOptimizationOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-600 dark:text-green-400">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-primary-600 dark:text-primary-300">
                      {opportunity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Benefits */}
            <div className="card lg:col-span-2">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-4">
                Expected Qualitative Benefits
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {sampleDashboardData.costBenefitAnalysis.benefits.qualitative.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">✓</span>
                    </div>
                    <span className="text-sm font-medium text-primary-900 dark:text-white">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 