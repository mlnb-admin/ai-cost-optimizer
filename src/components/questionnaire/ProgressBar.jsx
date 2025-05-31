const ProgressBar = ({ currentSection, totalSections, sectionProgress }) => {
  const overallProgress = ((currentSection - 1) / totalSections) * 100 + (sectionProgress / totalSections);

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
      
      {/* Section Progress Bar */}
      <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
        <div
          className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${sectionProgress}%` }}
        />
      </div>

      {/* Overall Progress */}
      <div className="flex justify-between items-center text-xs text-primary-500 dark:text-primary-400">
        <span>Overall Progress</span>
        <span>{Math.round(overallProgress)}%</span>
      </div>
      
      {/* Overall Progress Bar */}
      <div className="w-full bg-primary-100 dark:bg-primary-700 rounded-full h-1">
        <div
          className="bg-primary-400 dark:bg-primary-500 h-1 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Section Indicators */}
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
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-500'
                  : 'bg-primary-200 dark:bg-primary-700 text-primary-500 dark:text-primary-400'
              }`}
            >
              {sectionNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar; 