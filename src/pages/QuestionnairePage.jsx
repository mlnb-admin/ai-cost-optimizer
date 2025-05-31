import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useConsultation } from '../contexts/ConsultationContext';
import { questionnaireData } from '../data/questionnaireData';
import QuestionCard from '../components/questionnaire/QuestionCard';
import ProgressBar from '../components/questionnaire/ProgressBar';

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const { updateQuestionnaireData, setCurrentStep } = useConsultation();
  
  const sections = Object.values(questionnaireData);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  const currentSection = sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
  };

  const validateCurrentSection = () => {
    const newErrors = {};
    let isValid = true;

    currentSection.questions.forEach(question => {
      if (question.required && !answers[question.id]) {
        newErrors[question.id] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentSection()) {
      return;
    }

    if (isLastSection) {
      // Submit questionnaire
      updateQuestionnaireData(answers);
      setCurrentStep('consultation');
      navigate('/consultation');
    } else {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const getSectionProgress = () => {
    const totalQuestions = currentSection.questions.length;
    const answeredQuestions = currentSection.questions.filter(
      q => answers[q.id]
    ).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Consultation Questionnaire
        </h1>
        <p className="text-lg text-gray-600">
          Help us understand your needs to provide the best AI recommendations
        </p>
      </div>

      {/* Progress */}
      <ProgressBar 
        currentSection={currentSectionIndex + 1}
        totalSections={sections.length}
        sectionProgress={getSectionProgress()}
      />

      {/* Current Section */}
      <div className="card">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentSection.title}
          </h2>
          <p className="text-gray-600">
            {currentSection.description}
          </p>
        </div>

        <div className="space-y-8">
          {currentSection.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
              error={errors[question.id]}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={isFirstSection}
          className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isFirstSection
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <div className="text-sm text-gray-500">
          Section {currentSectionIndex + 1} of {sections.length}
        </div>

        <button
          onClick={handleNext}
          className="btn-primary inline-flex items-center space-x-2 px-6 py-3"
        >
          <span>{isLastSection ? 'Start Consultation' : 'Next'}</span>
          {isLastSection ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionnairePage; 