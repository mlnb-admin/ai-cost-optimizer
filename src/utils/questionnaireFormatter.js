import { questionnaireData } from '../data/questionnaireData';

export const formatQuestionnaireForChatbot = (formattedAnswers) => {
  const questionnaire = questionnaireData.questionnaire;
  
  // Helper function to get option label by id
  const getOptionLabel = (options, selectedId) => {
    if (!options || !selectedId) return selectedId;
    const option = options.find(opt => opt.id === selectedId);
    return option ? option.label : selectedId;
  };

  // Helper function to get multiple option labels
  const getMultipleOptionLabels = (options, selectedIds) => {
    if (!options || !selectedIds || !Array.isArray(selectedIds)) return selectedIds;
    return selectedIds.map(id => getOptionLabel(options, id));
  };

  // Create the formatted context for chatbot
  const chatbotContext = {
    assessmentSummary: {
      completedAt: formattedAnswers.metadata.timestamp,
      entryPoint: getOptionLabel(
        questionnaire.entryPointSelection.options,
        formattedAnswers.entryPoint
      )
    },
    
    organizationProfile: {
      industry: getOptionLabel(
        questionnaire.staticQuestions.organizationProfile.questions.find(q => q.id === 'industry_vertical')?.options,
        formattedAnswers.organizationProfile.industry_vertical
      ),
      size: getOptionLabel(
        questionnaire.staticQuestions.organizationProfile.questions.find(q => q.id === 'organization_size')?.options,
        formattedAnswers.organizationProfile.organization_size
      ),
      revenue: getOptionLabel(
        questionnaire.staticQuestions.organizationProfile.questions.find(q => q.id === 'revenue_range')?.options,
        formattedAnswers.organizationProfile.revenue_range
      ),
      geography: getOptionLabel(
        questionnaire.staticQuestions.organizationProfile.questions.find(q => q.id === 'geographic_presence')?.options,
        formattedAnswers.organizationProfile.geographic_presence
      ),
      technologyMaturity: getOptionLabel(
        questionnaire.staticQuestions.organizationProfile.questions.find(q => q.id === 'technology_maturity')?.options,
        formattedAnswers.organizationProfile.technology_maturity
      )
    },

    complianceAndSecurity: {
      regulatoryFrameworks: getMultipleOptionLabels(
        questionnaire.staticQuestions.complianceSecurity.questions.find(q => q.id === 'regulatory_framework')?.options,
        formattedAnswers.complianceAndSecurity.regulatory_framework
      ),
      dataResidency: getOptionLabel(
        questionnaire.staticQuestions.complianceSecurity.questions.find(q => q.id === 'data_residency')?.options,
        formattedAnswers.complianceAndSecurity.data_residency
      ),
      securityClearance: getOptionLabel(
        questionnaire.staticQuestions.complianceSecurity.questions.find(q => q.id === 'security_clearance')?.options,
        formattedAnswers.complianceAndSecurity.security_clearance
      ),
      auditRequirements: getOptionLabel(
        questionnaire.staticQuestions.complianceSecurity.questions.find(q => q.id === 'audit_requirements')?.options,
        formattedAnswers.complianceAndSecurity.audit_requirements
      ),
      encryptionStandards: getOptionLabel(
        questionnaire.staticQuestions.complianceSecurity.questions.find(q => q.id === 'encryption_standards')?.options,
        formattedAnswers.complianceAndSecurity.encryption_standards
      )
    },

    technicalInfrastructure: {
      cloudProvider: getOptionLabel(
        questionnaire.staticQuestions.technicalInfrastructure.questions.find(q => q.id === 'cloud_provider')?.options,
        formattedAnswers.technicalInfrastructure.cloud_provider
      ),
      dataInfrastructure: getOptionLabel(
        questionnaire.staticQuestions.technicalInfrastructure.questions.find(q => q.id === 'data_infrastructure')?.options,
        formattedAnswers.technicalInfrastructure.data_infrastructure
      ),
      aiMlMaturity: getOptionLabel(
        questionnaire.staticQuestions.technicalInfrastructure.questions.find(q => q.id === 'ai_ml_maturity')?.options,
        formattedAnswers.technicalInfrastructure.ai_ml_maturity
      ),
      integrationComplexity: getOptionLabel(
        questionnaire.staticQuestions.technicalInfrastructure.questions.find(q => q.id === 'integration_complexity')?.options,
        formattedAnswers.technicalInfrastructure.integration_complexity
      ),
      devopsMaturity: getOptionLabel(
        questionnaire.staticQuestions.technicalInfrastructure.questions.find(q => q.id === 'devops_maturity')?.options,
        formattedAnswers.technicalInfrastructure.devops_maturity
      )
    },

    businessContext: {
      budget: getOptionLabel(
        questionnaire.staticQuestions.businessContext.questions.find(q => q.id === 'budget_range')?.options,
        formattedAnswers.businessContext.budget_range
      ),
      timeline: getOptionLabel(
        questionnaire.staticQuestions.businessContext.questions.find(q => q.id === 'timeline')?.options,
        formattedAnswers.businessContext.timeline
      ),
      riskTolerance: getOptionLabel(
        questionnaire.staticQuestions.businessContext.questions.find(q => q.id === 'risk_tolerance')?.options,
        formattedAnswers.businessContext.risk_tolerance
      ),
      businessCriticality: getOptionLabel(
        questionnaire.staticQuestions.businessContext.questions.find(q => q.id === 'business_criticality')?.options,
        formattedAnswers.businessContext.business_criticality
      )
    },

    aiApplicationDetails: {},
    performanceRequirements: {},
    deploymentPreferences: {},

    // Keep raw answers for reference
    rawAnswers: formattedAnswers.rawAnswers
  };

  // Add AI category specific details
  const aiCategory = formattedAnswers.rawAnswers.ai_category;
  if (aiCategory) {
    chatbotContext.aiApplicationDetails.category = getOptionLabel(
      questionnaire.dynamicQuestions.aiApplicationCategory.options,
      aiCategory
    );

    // Add category-specific details based on the selected category
    const categoryQuestions = questionnaire.dynamicQuestions.categorySpecificQuestions[aiCategory];
    if (categoryQuestions) {
      categoryQuestions.questions.forEach(question => {
        const answer = formattedAnswers.rawAnswers[question.id];
        if (answer !== undefined) {
          if (question.type === 'multi_select') {
            chatbotContext.aiApplicationDetails[question.id] = getMultipleOptionLabels(question.options, answer);
          } else {
            chatbotContext.aiApplicationDetails[question.id] = getOptionLabel(question.options, answer);
          }
        }
      });
    }
  }

  // Add performance and deployment details
  Object.entries(formattedAnswers.performanceRequirements).forEach(([key, value]) => {
    const question = questionnaire.dynamicQuestions.performanceIntegration.questions.find(q => q.id === key);
    if (question) {
      if (question.type === 'multi_select') {
        chatbotContext.performanceRequirements[key] = getMultipleOptionLabels(question.options, value);
      } else {
        chatbotContext.performanceRequirements[key] = getOptionLabel(question.options, value);
      }
    }
  });

  Object.entries(formattedAnswers.deploymentPreferences).forEach(([key, value]) => {
    const question = questionnaire.additionalConsiderations.questions.find(q => q.id === key);
    if (question) {
      chatbotContext.deploymentPreferences[key] = getOptionLabel(question.options, value);
    }
  });

  return chatbotContext;
};

export const generateChatbotPrompt = (chatbotContext) => {
  return `
# AI Cost Optimization Assessment Context

## Organization Profile
- **Industry:** ${chatbotContext.organizationProfile.industry}
- **Size:** ${chatbotContext.organizationProfile.size}
- **Revenue:** ${chatbotContext.organizationProfile.revenue}
- **Geography:** ${chatbotContext.organizationProfile.geography}
- **Technology Maturity:** ${chatbotContext.organizationProfile.technologyMaturity}

## Compliance & Security
- **Regulatory Frameworks:** ${Array.isArray(chatbotContext.complianceAndSecurity.regulatoryFrameworks) ? 
    chatbotContext.complianceAndSecurity.regulatoryFrameworks.join(', ') : 
    chatbotContext.complianceAndSecurity.regulatoryFrameworks}
- **Data Residency:** ${chatbotContext.complianceAndSecurity.dataResidency}
- **Security Clearance:** ${chatbotContext.complianceAndSecurity.securityClearance}
- **Audit Requirements:** ${chatbotContext.complianceAndSecurity.auditRequirements}
- **Encryption Standards:** ${chatbotContext.complianceAndSecurity.encryptionStandards}

## Technical Infrastructure
- **Cloud Provider:** ${chatbotContext.technicalInfrastructure.cloudProvider}
- **Data Infrastructure:** ${chatbotContext.technicalInfrastructure.dataInfrastructure}
- **AI/ML Maturity:** ${chatbotContext.technicalInfrastructure.aiMlMaturity}
- **Integration Complexity:** ${chatbotContext.technicalInfrastructure.integrationComplexity}
- **DevOps Maturity:** ${chatbotContext.technicalInfrastructure.devopsMaturity}

## Business Context
- **Budget Range:** ${chatbotContext.businessContext.budget}
- **Timeline:** ${chatbotContext.businessContext.timeline}
- **Risk Tolerance:** ${chatbotContext.businessContext.riskTolerance}
- **Business Criticality:** ${chatbotContext.businessContext.businessCriticality}

## AI Application Details
- **Category:** ${chatbotContext.aiApplicationDetails.category}
${Object.entries(chatbotContext.aiApplicationDetails)
  .filter(([key]) => key !== 'category')
  .map(([key, value]) => `- **${key}:** ${Array.isArray(value) ? value.join(', ') : value}`)
  .join('\n')}

## Performance Requirements
${Object.entries(chatbotContext.performanceRequirements)
  .map(([key, value]) => `- **${key}:** ${Array.isArray(value) ? value.join(', ') : value}`)
  .join('\n')}

## Deployment Preferences
${Object.entries(chatbotContext.deploymentPreferences)
  .map(([key, value]) => `- **${key}:** ${value}`)
  .join('\n')}

---

Based on this comprehensive assessment, please provide personalized AI cost optimization recommendations, architecture suggestions, and implementation strategies that align with the organization's specific requirements, constraints, and objectives.
`;
}; 