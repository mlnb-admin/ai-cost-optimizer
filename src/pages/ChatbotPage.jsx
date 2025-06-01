import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User, ArrowRight } from 'lucide-react';
import { useConsultation } from '../contexts/ConsultationContext';
import { formatQuestionnaireForChatbot, generateChatbotPrompt } from '../utils/questionnaireFormatter';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const { state, addChatMessage, setCurrentStep } = useConsultation();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatbotContext, setChatbotContext] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  useEffect(() => {
    // Initialize conversation if no messages and questionnaire data exists
    if (state.chatHistory.length === 0 && state.questionnaireData.rawAnswers) {
      // Format questionnaire data for chatbot context
      const formattedContext = formatQuestionnaireForChatbot(state.questionnaireData);
      setChatbotContext(formattedContext);
      
      // Generate initial welcome message based on context
      const welcomeMessage = generateWelcomeMessage(formattedContext);
      
      const botMessage = {
        id: Date.now(),
        type: 'bot',
        content: welcomeMessage,
        timestamp: new Date().toISOString()
      };
      addChatMessage(botMessage);
    }
  }, [state.questionnaireData, state.chatHistory.length]);

  const generateWelcomeMessage = (context) => {
    const { organizationProfile, aiApplicationDetails, businessContext } = context;
    
    return `Hello! I've reviewed your comprehensive AI assessment. Here's what I understand about your needs:

**Your Organization:**
• ${organizationProfile.industry} industry, ${organizationProfile.size}
• Budget range: ${businessContext.budget}
• Timeline: ${businessContext.timeline}

**Your AI Initiative:**
• Focus: ${aiApplicationDetails.category}
• Entry point: ${context.assessmentSummary.entryPoint}

**Key Considerations:**
• Technology maturity: ${organizationProfile.technologyMaturity}
• Risk tolerance: ${businessContext.riskTolerance}
• Business criticality: ${businessContext.businessCriticality}

Based on this assessment, I can provide personalized recommendations for AI cost optimization, architecture decisions, and implementation strategies.

What specific aspect would you like to explore first? For example:
• Cost optimization strategies for your use case
• Recommended architecture and deployment approach
• Integration considerations with your existing systems
• Timeline and phased implementation planning`;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    addChatMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    // Generate AI response based on context and user message
    setTimeout(() => {
      const botResponse = generateContextualResponse(message, chatbotContext);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date().toISOString()
      };
      addChatMessage(botMessage);
      setIsTyping(false);
    }, 1500);
  };

  const generateContextualResponse = (userMessage, context) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Cost optimization responses
    if (lowerMessage.includes('cost') || lowerMessage.includes('budget') || lowerMessage.includes('price')) {
      return generateCostOptimizationResponse(context);
    }
    
    // Architecture responses
    if (lowerMessage.includes('architecture') || lowerMessage.includes('deployment') || lowerMessage.includes('infrastructure')) {
      return generateArchitectureResponse(context);
    }
    
    // Integration responses
    if (lowerMessage.includes('integration') || lowerMessage.includes('existing') || lowerMessage.includes('current')) {
      return generateIntegrationResponse(context);
    }
    
    // Timeline responses
    if (lowerMessage.includes('timeline') || lowerMessage.includes('implementation') || lowerMessage.includes('phased')) {
      return generateTimelineResponse(context);
    }
    
    // Default contextual response
    return generateDefaultResponse(userMessage, context);
  };

  const generateCostOptimizationResponse = (context) => {
    const { businessContext, organizationProfile, aiApplicationDetails } = context;
    
    return `Based on your ${businessContext.budget} budget and ${organizationProfile.size} organization, here are my cost optimization recommendations for ${aiApplicationDetails.category}:

**Immediate Cost Strategies:**
• Start with managed services to reduce operational overhead
• Implement usage-based pricing models for predictable scaling
• Consider ${organizationProfile.technologyMaturity === 'Traditional IT infrastructure' ? 'cloud-first' : 'hybrid'} deployment

**Budget Allocation Suggestions:**
• 40% - Core AI infrastructure and services
• 30% - Integration and data pipeline costs
• 20% - Security and compliance requirements
• 10% - Training and operational support

**Cost Monitoring:**
Set up cost alerts and implement resource tagging for ${aiApplicationDetails.category} workloads.

Would you like me to elaborate on any of these cost optimization strategies?`;
  };

  const generateArchitectureResponse = (context) => {
    const { technicalInfrastructure, complianceAndSecurity, aiApplicationDetails } = context;
    
    return `For your ${aiApplicationDetails.category} solution with ${technicalInfrastructure.cloudProvider} infrastructure:

**Recommended Architecture:**
• Cloud Provider: Leverage ${technicalInfrastructure.cloudProvider} native AI services
• Data Layer: ${technicalInfrastructure.dataInfrastructure} foundation
• Security: ${complianceAndSecurity.encryptionStandards} implementation

**Deployment Strategy:**
• Integration complexity: ${technicalInfrastructure.integrationComplexity}
• DevOps maturity: ${technicalInfrastructure.devopsMaturity}
• Compliance: ${complianceAndSecurity.regulatoryFrameworks.join(', ')}

**Scalability Considerations:**
Based on your ${technicalInfrastructure.aiMlMaturity} AI/ML maturity, I recommend starting with managed services and gradually moving to custom implementations.

What specific architectural components would you like to dive deeper into?`;
  };

  const generateIntegrationResponse = (context) => {
    const { technicalInfrastructure, performanceRequirements } = context;
    
    return `For integrating with your existing ${technicalInfrastructure.dataInfrastructure} environment:

**Integration Approach:**
• Complexity level: ${technicalInfrastructure.integrationComplexity}
• Current AI/ML maturity: ${technicalInfrastructure.aiMlMaturity}
• DevOps readiness: ${technicalInfrastructure.devopsMaturity}

**Integration Requirements:**
${Object.entries(performanceRequirements).map(([key, value]) => 
  `• ${key}: ${Array.isArray(value) ? value.join(', ') : value}`
).join('\n')}

**Recommended Integration Pattern:**
API-first approach with ${technicalInfrastructure.cloudProvider} native services for easier maintenance and scaling.

Would you like specific integration architectures for your ${context.aiApplicationDetails.category} use case?`;
  };

  const generateTimelineResponse = (context) => {
    const { businessContext, organizationProfile } = context;
    
    return `Based on your ${businessContext.timeline} timeline and ${businessContext.businessCriticality} criticality:

**Phased Implementation Plan:**

**Phase 1 (Months 1-2): Foundation**
• Infrastructure setup and security compliance
• Data pipeline establishment
• Team training for ${organizationProfile.technologyMaturity} level

**Phase 2 (Months 3-4): Core Implementation**
• ${context.aiApplicationDetails.category} solution deployment
• Integration with existing systems
• Initial testing and validation

**Phase 3 (Months 5-6): Optimization & Scale**
• Performance tuning and cost optimization
• Full production deployment
• Monitoring and governance setup

**Risk Mitigation:**
Given your ${businessContext.riskTolerance} risk tolerance, we'll implement proper rollback procedures and staged deployments.

Would you like me to detail any specific phase or discuss potential risks?`;
  };

  const generateDefaultResponse = (userMessage, context) => {
    return `I understand you're asking about "${userMessage}". Based on your ${context.organizationProfile.industry} background and ${context.aiApplicationDetails.category} focus, let me provide some relevant insights.

Given your ${context.businessContext.budget} budget and ${context.businessContext.timeline} timeline, I can help you with:

• **Cost Analysis**: Detailed breakdown of expected costs
• **Architecture Planning**: Technical recommendations for your infrastructure
• **Implementation Strategy**: Step-by-step deployment approach
• **Risk Assessment**: Potential challenges and mitigation strategies

What specific area would you like to explore in more detail?`;
  };

  const handleFinishConsultation = () => {
    setCurrentStep('dashboard');
    navigate('/dashboard');
  };

  if (!state.questionnaireData.rawAnswers) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-4">
          No Assessment Data Found
        </h2>
        <p className="text-primary-600 dark:text-primary-300 mb-6">
          Please complete the questionnaire first to start your AI consultation.
        </p>
        <button
          onClick={() => navigate('/questionnaire')}
          className="btn-primary"
        >
          Start Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white">AI Consultation</h1>
        <p className="text-lg text-primary-600 dark:text-primary-300">
          Personalized recommendations based on your comprehensive assessment
        </p>
      </div>

      {/* Chat Container */}
      <div className="card h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {state.chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                  msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    msg.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-secondary-600 text-white'
                  }`}
                >
                  {msg.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-100 dark:bg-primary-700 text-primary-900 dark:text-primary-100'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                  <div className={`text-xs mt-1 opacity-70`}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary-600 text-white flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about costs, architecture, implementation..."
            className="flex-1 px-4 py-2 border border-primary-300 dark:border-primary-600 rounded-lg 
                     bg-white dark:bg-primary-800 text-primary-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     placeholder-primary-400 dark:placeholder-primary-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-primary-500 dark:text-primary-400">
          {state.chatHistory.length > 1 ? 'Continue exploring or' : 'Ask questions or'}
        </div>
        
        <button
          onClick={handleFinishConsultation}
          className="btn-primary inline-flex items-center space-x-2 px-6 py-3"
        >
          <span>View Detailed Report</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage; 