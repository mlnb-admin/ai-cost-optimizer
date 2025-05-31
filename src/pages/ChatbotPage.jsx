import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User, ArrowRight } from 'lucide-react';
import { useConsultation } from '../contexts/ConsultationContext';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const { state, addChatMessage, setCurrentStep } = useConsultation();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  useEffect(() => {
    // Initialize conversation if no messages
    if (state.chatHistory.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        content: `Hello! I've reviewed your questionnaire responses. Based on your ${state.questionnaireData.businessType || 'business'} and your goal of ${state.questionnaireData.primaryObjective || 'AI implementation'}, I have some great recommendations for you. 

Let me ask a few clarifying questions to refine my suggestions. What specific challenges are you hoping AI will help solve first?`,
        timestamp: new Date().toISOString()
      };
      addChatMessage(welcomeMessage);
    }
  }, []);

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

    // Simulate AI response (in real app, this would call your AI service)
    setTimeout(() => {
      const botResponse = generateBotResponse(message, state.questionnaireData);
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

  const generateBotResponse = (userMessage, questionnaireData) => {
    // Simple response generation based on questionnaire data
    const responses = [
      `That's a great point about ${userMessage.toLowerCase()}. Given your ${questionnaireData.teamSize || 'team size'} and ${questionnaireData.budget || 'budget'}, I'd recommend starting with a pilot project.`,
      
      `Based on your ${questionnaireData.businessType || 'business type'}, I see similar companies having success with AI-powered automation. Would you like me to explain how this could work for your specific use case?`,
      
      `Considering your ${questionnaireData.techExpertise || 'technical expertise'} level, I'd suggest a solution that balances power with ease of implementation. Let me outline a few options for you.`,
      
      `That aligns perfectly with your goal of ${questionnaireData.primaryObjective || 'AI implementation'}. I have some specific recommendations that could deliver results within your ${questionnaireData.timeline || 'timeline'}.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFinishConsultation = () => {
    setCurrentStep('dashboard');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white">AI Consultation</h1>
        <p className="text-lg text-primary-600 dark:text-primary-300">
          Let's discuss your AI needs and refine the recommendations
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === 'user'
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : 'bg-primary-200 dark:bg-primary-700 text-primary-600 dark:text-primary-300'
                  }`}
                >
                  {msg.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : 'bg-primary-100 dark:bg-primary-700 text-primary-900 dark:text-primary-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-200 dark:bg-primary-700 text-primary-600 dark:text-primary-300 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-primary-100 dark:bg-primary-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 input-field"
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
          {state.chatHistory.length > 1 ? 'Continue the conversation or' : 'Start chatting or'}
        </div>
        
        <button
          onClick={handleFinishConsultation}
          className="btn-primary inline-flex items-center space-x-2 px-6 py-3"
        >
          <span>View Recommendations</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage; 