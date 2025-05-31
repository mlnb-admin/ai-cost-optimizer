import { createContext, useContext, useReducer } from 'react';

const ConsultationContext = createContext();

const initialState = {
  currentStep: 'questionnaire', // questionnaire, consultation, dashboard
  questionnaireData: {},
  chatHistory: [],
  recommendations: null,
  reasoning: null,
  isLoading: false,
  error: null,
};

function consultationReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_QUESTIONNAIRE_DATA':
      return { 
        ...state, 
        questionnaireData: { ...state.questionnaireData, ...action.payload } 
      };
    case 'ADD_CHAT_MESSAGE':
      return { 
        ...state, 
        chatHistory: [...state.chatHistory, action.payload] 
      };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'SET_REASONING':
      return { ...state, reasoning: action.payload };
    case 'RESET_CONSULTATION':
      return initialState;
    default:
      return state;
  }
}

export function ConsultationProvider({ children }) {
  const [state, dispatch] = useReducer(consultationReducer, initialState);

  const value = {
    state,
    dispatch,
    // Helper functions
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setCurrentStep: (step) => dispatch({ type: 'SET_CURRENT_STEP', payload: step }),
    updateQuestionnaireData: (data) => dispatch({ type: 'UPDATE_QUESTIONNAIRE_DATA', payload: data }),
    addChatMessage: (message) => dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message }),
    setRecommendations: (recommendations) => dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations }),
    setReasoning: (reasoning) => dispatch({ type: 'SET_REASONING', payload: reasoning }),
    resetConsultation: () => dispatch({ type: 'RESET_CONSULTATION' }),
  };

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
} 