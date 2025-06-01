import { useNavigate } from 'react-router-dom';
import { useConsultation } from '../contexts/ConsultationContext';
import DynamicQuestionnaire from '../components/questionnaire/DynamicQuestionnaire';

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const { updateQuestionnaireData, setCurrentStep } = useConsultation();

  const handleQuestionnaireComplete = (formattedAnswers) => {
    // Update consultation context with formatted answers
    updateQuestionnaireData(formattedAnswers);
    setCurrentStep('consultation');
    navigate('/consultation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900 py-8">
      <div className="container mx-auto px-4">
        <DynamicQuestionnaire onComplete={handleQuestionnaireComplete} />
      </div>
    </div>
  );
};

export default QuestionnairePage; 