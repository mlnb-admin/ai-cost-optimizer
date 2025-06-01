# Dynamic AI Cost Optimization Questionnaire

## Overview

This dynamic questionnaire system is designed to gather comprehensive information about an organization's AI requirements and provide personalized cost optimization recommendations. The system uses a sophisticated flow control mechanism to present relevant questions based on user responses.

## System Architecture

### Core Components

1. **`src/data/questionnaireData.js`** - Comprehensive questionnaire data structure
2. **`src/components/questionnaire/DynamicQuestionnaire.jsx`** - Main questionnaire component with dynamic flow
3. **`src/components/questionnaire/QuestionCard.jsx`** - Individual question rendering component
4. **`src/utils/questionnaireFormatter.js`** - Data formatting utilities for chatbot context
5. **`src/pages/ChatbotPage.jsx`** - AI consultation interface using formatted data

### Questionnaire Structure

#### 1. Entry Point Selection
Three distinct paths based on organization's AI journey:
- **Existing Automation Enhancement**: Organizations with current automation wanting to add AI
- **New AI Initiative**: Organizations with specific AI use cases
- **AI Exploration**: Organizations exploring AI opportunities

#### 2. Static Questions (Always Asked)
- **Organization Profile**: Industry, size, revenue, geography, technology maturity
- **Compliance & Security**: Regulatory frameworks, data residency, security requirements
- **Technical Infrastructure**: Cloud provider, data infrastructure, AI/ML maturity
- **Business Context**: Budget, timeline, risk tolerance, business criticality

#### 3. Entry Point Specific Questions
Dynamic questions based on the selected entry point:
- Current automation platforms and integration complexity
- Process definition and success criteria
- Stakeholder alignment and competitive positioning
- Process maturity and digital transformation stage

#### 4. AI Application Category Selection
Six main AI application categories:
- Conversational AI (Chatbots, Virtual Assistants)
- Content Generation (Marketing, Documentation)
- Data Analysis & Insights (Analytics, Predictions)
- Process Automation (Document processing, Workflows)
- Decision Support (Recommendations, Risk assessment)
- Monitoring & Detection (Fraud, Anomaly detection)

#### 5. Category-Specific Questions
Tailored questions based on selected AI category:
- **Conversational AI**: User volume, complexity, response times, knowledge base size
- **Content Generation**: Content types, volume, quality standards, brand consistency
- **Data Analysis**: Data volume, types, analysis frequency, query response times
- **Process Automation**: Document types, processing volume, accuracy requirements
- **Decision Support**: Decision frequency, complexity, risk tolerance
- **Monitoring & Detection**: Monitoring scope, detection speed, false positive tolerance

#### 6. Common Requirements
- Data characteristics and sensitivity levels
- Performance and integration requirements
- Deployment preferences and support levels

## Dynamic Flow Control

The questionnaire uses intelligent flow control to minimize irrelevant questions:

```javascript
// Flow determination logic
const buildQuestionFlow = () => {
  const flow = [];
  
  // 1. Always start with entry point
  flow.push(entryPointQuestion);
  
  // 2. Add static questions
  flow.push(...staticQuestions);
  
  // 3. Add entry-specific questions based on selection
  if (answers.entry_point) {
    flow.push(...entrySpecificQuestions[answers.entry_point]);
  }
  
  // 4. Add AI category selection
  flow.push(aiCategoryQuestion);
  
  // 5. Add category-specific questions based on AI category
  if (answers.ai_category) {
    flow.push(...categorySpecificQuestions[answers.ai_category]);
  }
  
  // 6. Add common requirements
  flow.push(...commonRequirements);
  
  return flow;
};
```

## Data Formatting for Chatbot Context

The system formats questionnaire responses into a structured context for the AI chatbot:

### Formatted Output Structure
```javascript
{
  metadata: {
    timestamp: "2024-01-01T00:00:00.000Z",
    questionnaireVersion: "1.0"
  },
  entryPoint: "new_initiative",
  organizationProfile: {
    industry: "Technology",
    size: "Enterprise (1,000-10,000 employees)",
    revenue: "$100M - $1B",
    geography: "Multi-country presence",
    technologyMaturity: "Cloud-native operations"
  },
  complianceAndSecurity: {
    regulatoryFrameworks: ["GDPR", "SOC2"],
    dataResidency: "Must remain within specific region",
    securityClearance: "Confidential",
    auditRequirements: "External audit required",
    encryptionStandards: "Advanced encryption with customer-managed keys"
  },
  technicalInfrastructure: {
    cloudProvider: "Amazon Web Services (AWS)",
    dataInfrastructure: "Modern data stack",
    aiMlMaturity: "Some ML models in production",
    integrationComplexity: "Brownfield integration",
    devopsMaturity: "GitOps and automation"
  },
  businessContext: {
    budget: "$1M - $10M",
    timeline: "Production Deployment (6-12 months)",
    riskTolerance: "Moderate approach",
    businessCriticality: "Business-critical function"
  },
  aiApplicationDetails: {
    category: "Conversational AI",
    expectedUsers: "1,000 - 10,000",
    conversationComplexity: "Multi-turn conversations",
    responseTime: "Real-time (<2 seconds)",
    availability: "24/7 standard availability",
    knowledgeBaseSize: "1,000 - 10,000 documents",
    languageSupport: "Single language"
  },
  performanceRequirements: {
    integrationNeeds: ["API integration", "Database integration"],
    personalizationLevel: "User-aware responses",
    scalabilityRequirements: "Moderate scaling (2-5x growth)"
  },
  deploymentPreferences: {
    deploymentModel: "Managed cloud deployment",
    supportLevel: "Premium enterprise support",
    vendorRestrictions: "No restrictions",
    scalingApproach: "Plan for moderate growth"
  },
  rawAnswers: { /* All original responses */ }
}
```

## AI-Powered Consultation Features

The chatbot uses the formatted questionnaire data to provide:

### 1. Contextual Welcome Message
Personalized greeting based on organization profile and AI requirements

### 2. Intelligent Response Generation
Context-aware responses for different inquiry types:
- **Cost Optimization**: Budget-specific recommendations
- **Architecture**: Infrastructure-tailored suggestions
- **Integration**: System-specific integration patterns
- **Timeline**: Phase-based implementation plans

### 3. Cost Impact Information
Each question displays relevant cost impact information to help users understand the implications of their choices.

## Question Types Supported

1. **Single Select**: Radio button selection
2. **Multi Select**: Checkbox selection for multiple options
3. **Text Input**: Free-form text responses

## Usage Example

```jsx
import DynamicQuestionnaire from './components/questionnaire/DynamicQuestionnaire';

const QuestionnaireFlow = () => {
  const handleComplete = (formattedAnswers) => {
    // Process the comprehensive assessment data
    console.log(formattedAnswers);
    
    // Navigate to consultation with context
    navigateToConsultation(formattedAnswers);
  };

  return (
    <DynamicQuestionnaire onComplete={handleComplete} />
  );
};
```

## Benefits

1. **Comprehensive Assessment**: Captures all relevant factors for AI cost optimization
2. **Dynamic Flow**: Only shows relevant questions, reducing user fatigue
3. **Context-Aware**: AI chatbot has rich context for personalized recommendations
4. **Scalable**: Easy to add new question categories or modify existing flows
5. **Cost-Focused**: Every question includes cost impact information
6. **Professional**: Enterprise-grade questionnaire suitable for complex organizations

## Configuration

The questionnaire can be easily modified by updating the `questionnaireData.js` file. The system automatically adapts to structural changes in the data.

## Integration Points

- **Consultation Context**: Seamlessly integrates with the consultation workflow
- **AI Chatbot**: Provides rich context for intelligent responses
- **Dashboard**: Can be used to generate detailed reports and recommendations
- **Analytics**: Question responses can be analyzed for insights and improvements 