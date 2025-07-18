import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AppLayout from './layouts/AppLayout';
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';
import SchedulerPage from './pages/SchedulerPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthSuccessPage from './pages/AuthSuccessPage';

function App() {
  return (
    <Routes>
      {/* Public-facing pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth-success.html" element={<AuthSuccessPage />} />
      
      {/* Main application, protected and inside the AppLayout */}
      <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<SocialStudio />} />
        <Route path="image-generator" element={<ImageGenerator />} />
        <Route path="scheduler" element={<SchedulerPage />} />
      </Route>

      {/* Standalone protected pages */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

    </Routes>
  )
}

export default App;