import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { useConsultation } from '../contexts/ConsultationContext';
import { formatQuestionnaireForChatbot, generateChatbotPrompt } from '../utils/questionnaireFormatter';
import { sendToLyzrAPI, initializeConversation } from '../services/lyzrApi';
import { preprocessContent } from '../utils/contentParser';

// Custom Mermaid component
export const MermaidGraph = ({ value }) => {
  const mermaidRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (mermaidRef.current && value) {
      mermaid.initialize({ 
        startOnLoad: true, 
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          htmlLabels: true,
          curve: 'basis'
        }
      });
      
      const graphId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      mermaid.parse(value).then((valid) => {
        if (valid) {
          setIsValid(true);
          mermaid.render(graphId, value).then((result) => {
            if (mermaidRef.current) {
              mermaidRef.current.innerHTML = result.svg;
            }
          }).catch(console.error);
        }
      }).catch(() => setIsValid(false));
    }
  }, [value]);

  if (!isValid) {
    return (
      <div className="bg-gray-100 dark:bg-primary-800 p-4 rounded-lg">
        <code className="text-sm">{value}</code>
      </div>
    );
  }

  return (
    <div className="my-4 p-4 bg-white dark:bg-primary-800 rounded-lg border shadow-sm overflow-x-auto">
      <div ref={mermaidRef} className="mermaid-graph flex justify-center"></div>
    </div>
  );
};

// Custom Table component
export const CustomTable = ({ children }) => (
  <div className="my-4 overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 bg-white dark:bg-primary-800 rounded-lg shadow-sm">
      {children}
    </table>
  </div>
);

export const CustomTableHeader = ({ children }) => (
  <thead className="bg-primary-50 dark:bg-primary-900">
    {children}
  </thead>
);

export const CustomTableRow = ({ children }) => (
  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
    {children}
  </tr>
);

export const CustomTableCell = ({ children, isHeader }) => (
  isHeader ? (
    <th className="px-4 py-3 text-left text-sm font-semibold text-primary-900 dark:text-primary-100 border border-gray-300 dark:border-primary-600">
      {children}
    </th>
  ) : (
    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
      {children}
    </td>
  )
);

// Custom Code component to detect mermaid graphs
export const CustomCode = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1];
  
  if (!inline && language === 'mermaid') {
    return <MermaidGraph value={String(children).replace(/\n$/, '')} />;
  }
  
  if (!inline && (className?.includes('graph') || String(children).includes('graph TD') || String(children).includes('graph LR'))) {
    return <MermaidGraph value={String(children).replace(/\n$/, '')} />;
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const ChatbotPage = () => {
  const navigate = useNavigate();
  const { state, addChatMessage, setCurrentStep } = useConsultation();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatbotContext, setChatbotContext] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  useEffect(() => {
    // Initialize conversation if no messages and questionnaire data exists
    if (state.chatHistory.length === 0 && state.questionnaireData.rawAnswers && !isInitialized) {
      initializeChat();
    }
  }, [state.questionnaireData, state.chatHistory.length, isInitialized]);

  const initializeChat = async () => {
    setIsInitialized(true);
    setIsTyping(true);
    
    try {
      // Format questionnaire data for chatbot context
      const formattedContext = formatQuestionnaireForChatbot(state.questionnaireData);
      setChatbotContext(formattedContext);
      
      // Initialize conversation with API
      const { sessionId: newSessionId, response } = await initializeConversation(formattedContext);
      setSessionId(newSessionId);
      
      const botMessage = {
        id: Date.now(),
        type: 'bot',
        content: response,
        timestamp: new Date().toISOString()
      };
      addChatMessage(botMessage);
    } catch (error) {
      console.error('Error initializing conversation:', error);
      const errorMessage = {
        id: Date.now(),
        type: 'bot',
        content: 'I apologize, but I\'m having trouble connecting to the AI service. Please try again later.',
        timestamp: new Date().toISOString()
      };
      addChatMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !sessionId) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    addChatMessage(userMessage);
    
    const currentMessage = message;
    setMessage('');
    setIsTyping(true);

    try {
      const response = await sendToLyzrAPI(currentMessage, sessionId);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date().toISOString()
      };
      addChatMessage(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I apologize, but I encountered an error processing your message. Please try again.',
        timestamp: new Date().toISOString()
      };
      addChatMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
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
    <div className="min-h-screen flex flex-col w-full">
      {/* Header */}
      <div className="text-center space-y-4 py-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white">AI Consultation</h1>
        <p className="text-lg text-primary-600 dark:text-primary-300">
          Personalized recommendations based on your comprehensive assessment
        </p>
        {!sessionId && isInitialized && (
          <div className="text-sm text-orange-600 dark:text-orange-400">
            Connecting to AI consultant...
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div className="card flex-1 flex flex-col w-full">
        {/* Messages */}
        <div className="space-y-4 mb-4">
          {state.chatHistory.map((msg) => (
            <div
              key={msg.id}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3 max-w-full">
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    msg.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-secondary-600 text-white'
                  }`}
                >
                  {msg.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      {msg.type === 'user' ? 'You' : 'AI Consultant'}
                    </span>
                    <span className="text-xs text-primary-500 dark:text-primary-400">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary-50 text-black'
                        : 'bg-primary-100 dark:bg-primary-700 text-primary-900 dark:text-primary-100'
                    }`}
                  >
                    <div className="text-sm">
                      {msg.type === 'user' ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <div className="prose prose-sm max-w-none prose-primary dark:prose-invert">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="mb-3 last:mb-0 pl-4">{children}</ul>,
                              li: ({ children }) => <li className="mb-2">{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              h1: ({ children }) => <h1 className="text-lg font-bold mb-4 mt-6 leading-relaxed">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-base font-bold mb-3 mt-5 leading-relaxed">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-sm font-bold mb-2 mt-4 leading-relaxed">{children}</h3>,
                              hr: () => <hr className="my-6 border-primary-300 dark:border-primary-600" />,
                              code: CustomCode,
                              pre: ({ children }) => <pre className="bg-gray-100 dark:bg-primary-800 p-3 rounded-lg overflow-x-auto my-4">{children}</pre>,
                              table: CustomTable,
                              thead: CustomTableHeader,
                              tbody: ({ children }) => <tbody>{children}</tbody>,
                              tr: CustomTableRow,
                              th: ({ children }) => <CustomTableCell isHeader={true}>{children}</CustomTableCell>,
                              td: ({ children }) => <CustomTableCell isHeader={false}>{children}</CustomTableCell>,
                            }}
                          >
                            {preprocessContent(msg.content)}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-full">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary-600 text-white flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      AI Consultant
                    </span>
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
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex space-x-4 mt-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={sessionId ? "Ask about costs, architecture, implementation..." : "Initializing AI consultant..."}
            className="flex-1 px-4 py-2 border border-primary-300 dark:border-primary-600 rounded-lg 
                     bg-white dark:bg-primary-800 text-primary-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     placeholder-primary-400 dark:placeholder-primary-500"
            disabled={isTyping || !sessionId}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping || !sessionId}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center py-4 flex-shrink-0">
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