export const questionnaireData = {
  businessGoals: {
    id: 'businessGoals',
    title: 'Business Goals & Objectives',
    description: 'Help us understand your primary business objectives',
    questions: [
      {
        id: 'businessType',
        question: 'What type of business do you operate?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'e-commerce', label: 'E-commerce/Retail' },
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'finance', label: 'Financial Services' },
          { value: 'technology', label: 'Technology/Software' },
          { value: 'education', label: 'Education' },
          { value: 'consulting', label: 'Consulting/Services' },
          { value: 'other', label: 'Other', hasTextInput: true }
        ]
      },
      {
        id: 'primaryObjective',
        question: 'What is your primary objective for implementing AI?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'cost_reduction', label: 'Cost Reduction' },
          { value: 'automation', label: 'Process Automation' },
          { value: 'accuracy_improvement', label: 'Improved Accuracy' },
          { value: 'customer_experience', label: 'Enhanced Customer Experience' },
          { value: 'new_products', label: 'New Product Development' },
          { value: 'competitive_advantage', label: 'Competitive Advantage' },
          { value: 'other', label: 'Other', hasTextInput: true }
        ]
      },
      {
        id: 'successMetrics',
        question: 'How will you measure success?',
        type: 'multiple-select',
        required: true,
        options: [
          { value: 'roi', label: 'Return on Investment (ROI)' },
          { value: 'efficiency', label: 'Operational Efficiency' },
          { value: 'accuracy', label: 'Accuracy Metrics' },
          { value: 'customer_satisfaction', label: 'Customer Satisfaction' },
          { value: 'revenue_growth', label: 'Revenue Growth' },
          { value: 'cost_savings', label: 'Cost Savings' },
          { value: 'time_savings', label: 'Time Savings' }
        ]
      }
    ]
  },
  
  currentProcesses: {
    id: 'currentProcesses',
    title: 'Current Processes & Pain Points',
    description: 'Tell us about your existing workflows and challenges',
    questions: [
      {
        id: 'painPoints',
        question: 'What are your main operational pain points?',
        type: 'multiple-select',
        required: true,
        options: [
          { value: 'manual_processes', label: 'Too many manual processes' },
          { value: 'data_quality', label: 'Poor data quality' },
          { value: 'slow_decisions', label: 'Slow decision making' },
          { value: 'customer_service', label: 'Customer service bottlenecks' },
          { value: 'inventory_management', label: 'Inventory management issues' },
          { value: 'quality_control', label: 'Quality control problems' },
          { value: 'scalability', label: 'Scalability challenges' },
          { value: 'other', label: 'Other', hasTextInput: true }
        ]
      },
      {
        id: 'existingSolutions',
        question: 'Do you currently use any AI or automation tools?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'none', label: 'No existing solutions' },
          { value: 'basic_automation', label: 'Basic automation tools' },
          { value: 'analytics_tools', label: 'Analytics/BI tools' },
          { value: 'crm_automation', label: 'CRM automation' },
          { value: 'chatbots', label: 'Chatbots/Virtual assistants' },
          { value: 'ml_models', label: 'Machine learning models' },
          { value: 'other', label: 'Other', hasTextInput: true }
        ]
      }
    ]
  },

  dataAssessment: {
    id: 'dataAssessment',
    title: 'Data Assessment',
    description: 'Help us understand your data landscape',
    questions: [
      {
        id: 'dataTypes',
        question: 'What types of data do you work with?',
        type: 'multiple-select',
        required: true,
        options: [
          { value: 'customer_data', label: 'Customer data' },
          { value: 'transaction_data', label: 'Transaction data' },
          { value: 'product_data', label: 'Product/inventory data' },
          { value: 'text_documents', label: 'Text documents' },
          { value: 'images', label: 'Images/photos' },
          { value: 'sensor_data', label: 'Sensor/IoT data' },
          { value: 'financial_data', label: 'Financial data' },
          { value: 'other', label: 'Other', hasTextInput: true }
        ]
      },
      {
        id: 'dataVolume',
        question: 'How much data do you typically work with?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'small', label: 'Small (< 1GB)' },
          { value: 'medium', label: 'Medium (1GB - 100GB)' },
          { value: 'large', label: 'Large (100GB - 1TB)' },
          { value: 'very_large', label: 'Very Large (> 1TB)' },
          { value: 'unsure', label: 'Not sure' }
        ]
      },
      {
        id: 'dataQuality',
        question: 'How would you rate your data quality?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'excellent', label: 'Excellent - Clean and well-organized' },
          { value: 'good', label: 'Good - Mostly clean with minor issues' },
          { value: 'fair', label: 'Fair - Some quality issues' },
          { value: 'poor', label: 'Poor - Significant quality problems' },
          { value: 'unsure', label: 'Not sure' }
        ]
      }
    ]
  },

  requirements: {
    id: 'requirements',
    title: 'Requirements & Constraints',
    description: 'Define your technical and business requirements',
    questions: [
      {
        id: 'teamSize',
        question: 'What is your team size?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'solo', label: '1 person (solo)' },
          { value: 'small', label: '2-10 people' },
          { value: 'medium', label: '11-50 people' },
          { value: 'large', label: '51-200 people' },
          { value: 'enterprise', label: '200+ people' }
        ]
      },
      {
        id: 'budget',
        question: 'What is your estimated budget range?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'low', label: 'Low (< $10k)' },
          { value: 'medium', label: 'Medium ($10k - $50k)' },
          { value: 'high', label: 'High ($50k - $200k)' },
          { value: 'enterprise', label: 'Enterprise (> $200k)' },
          { value: 'flexible', label: 'Flexible based on ROI' }
        ]
      },
      {
        id: 'timeline',
        question: 'What is your desired implementation timeline?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'immediate', label: 'Immediate (< 1 month)' },
          { value: 'short', label: 'Short term (1-3 months)' },
          { value: 'medium', label: 'Medium term (3-6 months)' },
          { value: 'long', label: 'Long term (6+ months)' },
          { value: 'flexible', label: 'Flexible' }
        ]
      },
      {
        id: 'techExpertise',
        question: 'What is your team\'s technical expertise level?',
        type: 'multiple-choice',
        required: true,
        options: [
          { value: 'beginner', label: 'Beginner - Limited technical knowledge' },
          { value: 'intermediate', label: 'Intermediate - Some technical experience' },
          { value: 'advanced', label: 'Advanced - Strong technical team' },
          { value: 'expert', label: 'Expert - AI/ML specialists on team' }
        ]
      }
    ]
  }
}; 