import { CheckCircle, AlertTriangle, Clock, DollarSign } from 'lucide-react';

const RecommendationCard = ({ recommendation, isHighlighted = false }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Clock className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className={`card ${isHighlighted ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {recommendation.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {recommendation.description}
          </p>
        </div>
        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
          {getPriorityIcon(recommendation.priority)}
          <span className="capitalize">{recommendation.priority} Priority</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{recommendation.estimatedROI}</div>
          <div className="text-xs text-gray-500">Expected ROI</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{recommendation.implementationTime}</div>
          <div className="text-xs text-gray-500">Timeline</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{recommendation.cost}</div>
          <div className="text-xs text-gray-500">Investment</div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
        <ul className="space-y-1">
          {recommendation.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reasoning */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium text-gray-900 mb-2">Why This Recommendation:</h4>
        <p className="text-sm text-gray-600">{recommendation.reasoning}</p>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="btn-primary w-full">
          Learn More About Implementation
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard; 