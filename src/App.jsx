import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConsultationProvider } from './contexts/ConsultationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import ChatbotPage from './pages/ChatbotPage';
import DashboardPage from './pages/DashboardPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <ConsultationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
              <Route path="/consultation" element={<ChatbotPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </Layout>
        </Router>
      </ConsultationProvider>
    </ThemeProvider>
  );
}

export default App;
