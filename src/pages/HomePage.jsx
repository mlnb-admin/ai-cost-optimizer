import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Users, Target, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Get intelligent recommendations based on your specific business needs and requirements.',
    },
    {
      icon: Users,
      title: 'Expert Consultation',
      description: 'Interactive chatbot consultation to clarify your goals and refine recommendations.',
    },
    {
      icon: Target,
      title: 'Tailored Solutions',
      description: 'Receive customized AI solutions that align with your business objectives and constraints.',
    },
    {
      icon: TrendingUp,
      title: 'Visual Insights',
      description: 'Comprehensive dashboard with visualizations showing expected impact and ROI.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          AI Consultant
          <span className="block text-primary-600">for Your Business</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get personalized AI recommendations through our intelligent consultation system. 
          From questionnaire to dashboard, we guide you through finding the perfect AI solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/questionnaire"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
          >
            <span>Start Consultation</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/dashboard"
            className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-3"
          >
            <span>View Demo Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, title, description }, index) => (
          <div key={index} className="card text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
              <Icon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>

      {/* Process Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
              1
            </div>
            <h3 className="font-semibold">Questionnaire</h3>
            <p className="text-sm text-gray-600">Answer questions about your business needs</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
              2
            </div>
            <h3 className="font-semibold">Consultation</h3>
            <p className="text-sm text-gray-600">Chat with our AI to refine requirements</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
              3
            </div>
            <h3 className="font-semibold">Analysis</h3>
            <p className="text-sm text-gray-600">Get intelligent recommendations</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
              4
            </div>
            <h3 className="font-semibold">Dashboard</h3>
            <p className="text-sm text-gray-600">View visual insights and next steps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 