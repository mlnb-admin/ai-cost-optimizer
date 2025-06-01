const ProgressBar = ({ currentSection, totalSections, sectionProgress }) => {
  return (
    <div className="space-y-4">
      {/* Section Progress */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-primary-700 dark:text-primary-300">
          Section {currentSection} of {totalSections}
        </span>
        <span className="text-primary-500 dark:text-primary-400">
          {Math.round(sectionProgress)}% complete
        </span>
      </div>
      
      {/* Overall Progress Bar */}
      <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-500 dark:to-secondary-500 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${sectionProgress}%` }}
        />
      </div>

      {/* Section Indicators */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 flex-1">
          {Array.from({ length: totalSections }, (_, index) => {
            const sectionNumber = index + 1;
            const isCompleted = sectionNumber < currentSection;
            const isCurrent = sectionNumber === currentSection;
            
            return (
              <div
                key={sectionNumber}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-primary-600 dark:bg-primary-500'
                    : isCurrent
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-500 dark:to-secondary-500'
                    : 'bg-primary-200 dark:bg-primary-700'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Section Numbers */}
      <div className="flex justify-between">
        {Array.from({ length: totalSections }, (_, index) => {
          const sectionNumber = index + 1;
          const isCompleted = sectionNumber < currentSection;
          const isCurrent = sectionNumber === currentSection;
          
          return (
            <div
              key={sectionNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                isCompleted
                  ? 'bg-primary-600 dark:bg-primary-500 text-white'
                  : isCurrent
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-500 dark:to-secondary-500 text-white border-2 border-white shadow-lg'
                  : 'bg-primary-200 dark:bg-primary-700 text-primary-500 dark:text-primary-400'
              }`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                sectionNumber
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar; 