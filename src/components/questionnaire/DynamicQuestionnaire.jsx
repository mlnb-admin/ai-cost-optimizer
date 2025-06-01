import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { questionnaireData } from '../../data/questionnaireData';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

const DynamicQuestionnaire = ({ onComplete }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [sectionFlow, setSectionFlow] = useState([]);

  const questionnaire = questionnaireData.questionnaire;

  // Build the dynamic section flow based on user answers
  const buildSectionFlow = () => {
    const flow = [];
    
    console.log('Building section flow with answers:', answers);
    
    // 1. Entry Point Selection (single question section)
    flow.push({
      type: 'entry_point',
      title: 'Getting Started',
      description: 'Tell us about your AI initiative',
      questions: [questionnaire.entryPointSelection]
    });

    // 2. Static Question Sections
    Object.entries(questionnaire.staticQuestions).forEach(([key, section]) => {
      console.log(`Adding static section: ${key}`, section.questions.length, 'questions');
      flow.push({
        type: 'static',
        sectionKey: key,
        title: section.section,
        description: section.description,
        questions: section.questions
      });
    });

    console.log('After static sections, flow length:', flow.length);

    // 3. Entry Point Specific Questions Section
    const entryPoint = answers.entry_point;
    if (entryPoint && questionnaire.entryPointSpecificQuestions[entryPoint]) {
      console.log(`Adding entry-specific section for: ${entryPoint}`);
      const entryPointSection = questionnaire.entryPointSpecificQuestions[entryPoint];
      flow.push({
        type: 'entry_specific',
        title: entryPointSection.section,
        description: entryPointSection.description,
        entryPoint,
        questions: entryPointSection.questions
      });
    }

    // 4. AI Category Selection (single question section)
    flow.push({
      type: 'ai_category',
      title: 'AI Application Type',
      description: 'Select the AI category that best fits your use case',
      questions: [questionnaire.dynamicQuestions.aiApplicationCategory]
    });

    // 5. Category Specific Questions Section
    const aiCategory = answers.ai_category;
    if (aiCategory && questionnaire.dynamicQuestions.categorySpecificQuestions[aiCategory]) {
      console.log(`Adding category-specific section for: ${aiCategory}`);
      const categorySection = questionnaire.dynamicQuestions.categorySpecificQuestions[aiCategory];
      flow.push({
        type: 'category_specific',
        title: categorySection.section,
        description: 'Configure your specific AI application requirements',
        category: aiCategory,
        questions: categorySection.questions
      });
    }

    // 6. Common Data Characteristics Section
    if (answers.ai_category) {
      console.log('Adding common data characteristics section');
      flow.push({
        type: 'data_characteristics',
        title: questionnaire.dynamicQuestions.commonDataCharacteristics.section,
        description: questionnaire.dynamicQuestions.commonDataCharacteristics.description,
        questions: questionnaire.dynamicQuestions.commonDataCharacteristics.questions
      });
    }

    // 7. Performance & Integration Requirements Section
    if (answers.ai_category) {
      console.log('Adding performance integration section');
      flow.push({
        type: 'performance_integration',
        title: questionnaire.dynamicQuestions.performanceIntegration.section,
        description: questionnaire.dynamicQuestions.performanceIntegration.description,
        questions: questionnaire.dynamicQuestions.performanceIntegration.questions
      });
    }

    // 8. Additional Considerations Section
    if (answers.ai_category) {
      console.log('Adding additional considerations section');
      flow.push({
        type: 'additional',
        title: questionnaire.additionalConsiderations.section,
        description: questionnaire.additionalConsiderations.description,
        questions: questionnaire.additionalConsiderations.questions
      });
    }

    console.log('Final section flow length:', flow.length);
    return flow;
  };

  // Update section flow when answers change
  useEffect(() => {
    try {
      const newFlow = buildSectionFlow();
      setSectionFlow(newFlow);
      
      // If we're past the current flow length, stay at the last valid position
      if (currentSectionIndex >= newFlow.length && newFlow.length > 0) {
        setCurrentSectionIndex(newFlow.length - 1);
      }
    } catch (error) {
      console.error('Error building section flow:', error);
      // Set a basic flow if there's an error to prevent blank screen
      const fallbackFlow = [{
        type: 'entry_point',
        title: 'Getting Started',
        description: 'Tell us about your AI initiative',
        questions: [questionnaire.entryPointSelection]
      }];
      setSectionFlow(fallbackFlow);
      if (currentSectionIndex >= fallbackFlow.length) {
        setCurrentSectionIndex(0);
      }
    }
  }, [answers.entry_point, answers.ai_category]);

  // Separate effect to handle section flow initialization
  useEffect(() => {
    if (sectionFlow.length === 0) {
      try {
        const initialFlow = buildSectionFlow();
        setSectionFlow(initialFlow);
        setCurrentSectionIndex(0);
      } catch (error) {
        console.error('Error initializing section flow:', error);
        // Set a minimal fallback flow
        const fallbackFlow = [{
          type: 'entry_point',
          title: 'Getting Started',
          description: 'Tell us about your AI initiative',
          questions: [questionnaire.entryPointSelection]
        }];
        setSectionFlow(fallbackFlow);
        setCurrentSectionIndex(0);
      }
    }
  }, []);

  const currentSection = sectionFlow[currentSectionIndex];
  const isLastSection = currentSectionIndex === sectionFlow.length - 1;
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
    if (!currentSection || !currentSection.questions) return true;
    
    let hasErrors = false;
    const newErrors = { ...errors };
    
    currentSection.questions.forEach(question => {
      const questionId = question.id;
      const answer = answers[questionId];
      
      if (question.required) {
        // Handle different question types for validation
        if (question.type === 'multi_select') {
          // For multi-select, check if array exists and has at least one item
          if (!answer || !Array.isArray(answer) || answer.length === 0) {
            newErrors[questionId] = 'Please select at least one option';
            hasErrors = true;
          }
        } else if (question.type === 'text') {
          // For text input, check if string exists and is not empty
          if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
            newErrors[questionId] = 'This field is required';
            hasErrors = true;
          }
        } else {
          // For single select, check if value exists
          if (!answer) {
            newErrors[questionId] = 'This field is required';
            hasErrors = true;
          }
        }
      }
    });
    
    if (hasErrors) {
      setErrors(newErrors);
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    console.log('handleNext called', {
      currentSectionIndex,
      totalSections: sectionFlow.length,
      currentSectionType: currentSection?.type,
      isLastSection
    });

    if (!validateCurrentSection()) {
      console.log('Validation failed for section:', currentSection?.title);
      return;
    }

    if (isLastSection) {
      console.log('Completing questionnaire...');
      // Submit questionnaire - format answers for chatbot context
      const formattedAnswers = formatAnswersForChatbot();
      
      // Print answers as JSON before completing questionnaire
      console.log('Questionnaire Answers (Raw):', JSON.stringify(answers, null, 2));
      console.log('Questionnaire Answers (Formatted):', JSON.stringify(formattedAnswers, null, 2));
      
      onComplete(formattedAnswers);
    } else {
      console.log('Moving to next section:', currentSectionIndex + 1);
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const formatAnswersForChatbot = () => {
    const formatted = {
      metadata: {
        timestamp: new Date().toISOString(),
        questionnaireVersion: questionnaire.metadata.version
      },
      entryPoint: answers.entry_point,
      organizationProfile: {},
      complianceAndSecurity: {},
      technicalInfrastructure: {},
      businessContext: {},
      aiApplicationDetails: {},
      performanceRequirements: {},
      deploymentPreferences: {},
      rawAnswers: answers
    };

    // Categorize answers by section for better context structure
    sectionFlow.forEach(section => {
      if (section.questions) {
        section.questions.forEach(question => {
          const answer = answers[question.id];
          
          if (answer !== undefined) {
            switch (section.type) {
              case 'static':
                if (section.sectionKey === 'organizationProfile') {
                  formatted.organizationProfile[question.id] = answer;
                } else if (section.sectionKey === 'complianceSecurity') {
                  formatted.complianceAndSecurity[question.id] = answer;
                } else if (section.sectionKey === 'technicalInfrastructure') {
                  formatted.technicalInfrastructure[question.id] = answer;
                } else if (section.sectionKey === 'businessContext') {
                  formatted.businessContext[question.id] = answer;
                }
                break;
              case 'category_specific':
              case 'data_characteristics':
                formatted.aiApplicationDetails[question.id] = answer;
                break;
              case 'performance_integration':
                formatted.performanceRequirements[question.id] = answer;
                break;
              case 'additional':
                formatted.deploymentPreferences[question.id] = answer;
                break;
            }
          }
        });
      }
    });

    return formatted;
  };

  const getProgressPercentage = () => {
    if (sectionFlow.length === 0) return 0;
    return ((currentSectionIndex + 1) / sectionFlow.length) * 100;
  };

  if (!currentSection || sectionFlow.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-lg text-primary-600 dark:text-primary-300">
          Loading questionnaire...
        </p>
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Flow length: {sectionFlow.length}</p>
            <p>Current index: {currentSectionIndex}</p>
            <p>Current section: {currentSection ? 'exists' : 'missing'}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white">
          {questionnaire.metadata.title}
        </h1>
        <p className="text-lg text-primary-600 dark:text-primary-300">
          {questionnaire.metadata.description}
        </p>
      </div>

      {/* Progress */}
      <ProgressBar 
        currentSection={currentSectionIndex + 1}
        totalSections={sectionFlow.length}
        sectionProgress={getProgressPercentage()}
      />

      {/* Current Section */}
      <div className="card">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-2">
            {currentSection.title}
          </h2>
          <p className="text-primary-600 dark:text-primary-300 mb-4">
            {currentSection.description}
          </p>
          <p className="text-sm text-primary-500 dark:text-primary-400">
            Section {currentSectionIndex + 1} of {sectionFlow.length}
          </p>
        </div>

        <div className="space-y-8">
          {currentSection.questions && currentSection.questions.map((question, index) => (
            <div key={question.id} className="space-y-6">
              <QuestionCard
                question={question}
                value={answers[question.id]}
                onChange={(value) => handleAnswerChange(question.id, value)}
                error={errors[question.id]}
              />
              
              {/* Cost Impact Information */}
              {question.costImpact && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                    💡 Cost Impact
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {question.costImpact}
                  </p>
                </div>
              )}
              
              {/* Add separator between questions except for the last one */}
              {index < currentSection.questions.length - 1 && (
                <hr className="border-primary-200 dark:border-primary-700" />
              )}
            </div>
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
              ? 'bg-primary-100 dark:bg-primary-700 text-primary-400 dark:text-primary-500 cursor-not-allowed'
              : 'bg-primary-200 dark:bg-primary-600 text-primary-700 dark:text-primary-200 hover:bg-primary-300 dark:hover:bg-primary-500'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <div className="text-sm text-primary-500 dark:text-primary-400">
          {Math.round(getProgressPercentage())}% Complete
        </div>

        <button
          onClick={handleNext}
          className="btn-primary inline-flex items-center space-x-2 px-6 py-3"
        >
          <span>{isLastSection ? 'Complete Assessment' : 'Next Section'}</span>
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

export default DynamicQuestionnaire; 