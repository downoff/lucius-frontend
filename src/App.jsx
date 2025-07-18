import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
<<<<<<< HEAD
import AppLayout from './layouts/AppLayout';
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';
import SchedulerPage from './pages/SchedulerPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthSuccessPage from './pages/AuthSuccessPage';
=======
import AppLayout from './layouts/AppLayout'; // The main layout for your tools
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';
>>>>>>> 3dcb9258652ba9b43a55a760f44c51d3cf10d0bc

function App() {
  return (
    <Routes>
<<<<<<< HEAD
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

=======
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* All your tools will now live under the "/app" path */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<SocialStudio />} />
        <Route path="image-generator" element={<ImageGenerator />} />
        {/* We can add routes for dashboard, scheduler, etc. here later */}
      </Route>
>>>>>>> 3dcb9258652ba9b43a55a760f44c51d3cf10d0bc
    </Routes>
  )
}

export default App;