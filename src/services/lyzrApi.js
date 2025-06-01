// API Configuration
const API_CONFIG = {
  endpoint: 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/',
  apiKey: 'sk-default-dummyapikey',
  agentId: 'dummyagentid',
  userId: 'dummyuser@mail.com' // You might want to get this from user context
};

// Generate unique session ID
export const generateSessionId = () => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Send message to Lyzr AI API
export const sendToLyzrAPI = async (message, sessionId) => {
  const response = await fetch(API_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_CONFIG.apiKey,
    },
    body: JSON.stringify({
      user_id: API_CONFIG.userId,
      agent_id: API_CONFIG.agentId,
      session_id: sessionId,
      message: message
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.response || data.message || 'I apologize, but I didn\'t receive a proper response. Please try again.';
};

// Initialize conversation with questionnaire data
export const initializeConversation = async (formattedContext) => {
  const sessionId = generateSessionId();
  
  // Create initial JSON message with questionnaire data
  const initialMessage = JSON.stringify({
    questionnaire_data: formattedContext,
    intent: "ai_consultation_initialization",
    request: "Please analyze this AI assessment data and provide personalized recommendations for cost optimization, architecture, and implementation strategy."
  });

  const response = await sendToLyzrAPI(initialMessage, sessionId);
  
  return {
    sessionId,
    response
  };
};

export default {
  generateSessionId,
  sendToLyzrAPI,
  initializeConversation
}; 