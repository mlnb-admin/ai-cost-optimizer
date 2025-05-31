# AI Consultant Frontend

A modern React-based frontend for the AI Consultant System that guides users through a structured consultation process to receive personalized AI recommendations.

## 🚀 Features

- **Interactive Questionnaire**: Dynamic MCQ-based forms to gather user requirements
- **AI Chatbot Consultation**: Conversational interface to refine recommendations
- **Visual Dashboard**: Comprehensive analytics and ROI projections
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI/UX**: Clean, professional interface with smooth animations

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Shared components (Layout, etc.)
│   ├── questionnaire/    # Questionnaire-specific components
│   ├── chatbot/          # Chatbot interface components
│   ├── dashboard/        # Dashboard and visualization components
│   └── reasoning/        # Reasoning and explanation components
├── pages/                # Main page components
├── contexts/             # React Context for state management
├── hooks/                # Custom React hooks
├── services/             # API services and external integrations
├── utils/                # Utility functions
├── data/                 # Static data and configurations
├── types/                # TypeScript type definitions
└── assets/               # Images, icons, and other static assets
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context + useReducer
- **Charts**: Custom CSS-based visualizations
- **HTTP Client**: Axios (for future API integration)

## 🏗️ System Architecture

The application follows a modular architecture with four main modules:

### 1. Questionnaire Module
- Dynamic form generation from JSON configuration
- Multi-step wizard with progress tracking
- Validation and error handling
- Support for multiple question types (MCQ, multi-select, text input)

### 2. Chatbot Consultation Module
- Real-time chat interface
- Context-aware responses based on questionnaire data
- Typing indicators and smooth animations
- Message history management

### 3. Reasoning & Explanation Layer
- Clear justification for AI recommendations
- Mapping of user inputs to solution suggestions
- Benefits and ROI explanations

### 4. Dashboard & Visualization Module
- Interactive tabs for different views
- ROI projections and metrics visualization
- Recommendation cards with detailed information
- Implementation roadmap

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-consultant-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 User Flow

1. **Home Page**: Introduction and call-to-action
2. **Questionnaire**: Multi-step form to gather requirements
3. **Consultation**: Interactive chat to refine needs
4. **Dashboard**: Visual recommendations and implementation plan

## 🔧 Configuration

### Questionnaire Data
The questionnaire structure is defined in `src/data/questionnaireData.js`. You can modify:
- Question categories and sections
- Individual questions and options
- Validation rules
- Question types and formats

### Styling
Tailwind CSS configuration is in `tailwind.config.js`. Custom styles are in `src/index.css`.

## 🌐 API Integration

The frontend is designed to integrate with a backend API. Key integration points:

- **Questionnaire Submission**: POST `/api/questionnaire`
- **Chatbot Messages**: POST `/api/chat`
- **Recommendations**: GET `/api/recommendations`
- **Analytics**: GET `/api/analytics`

Update the `src/services/` directory to implement actual API calls.

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Adaptive navigation (desktop header + mobile bottom nav)
- Flexible grid layouts
- Touch-friendly interactions

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#64748B)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font Family**: Inter
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)

## 🔮 Future Enhancements

- [ ] Real-time AI integration
- [ ] PDF report generation
- [ ] Advanced data visualizations with D3.js/Plotly
- [ ] User authentication and profiles
- [ ] Admin dashboard for consultation management
- [ ] Voice interaction capabilities
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
