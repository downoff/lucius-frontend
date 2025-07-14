import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import SocialStudio from './components/SocialStudio';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages.jsx';
import DashboardPage from './pages/DashboardPage';
import ImageGeneratorPage from './pages/ImageGeneratorPage';
import PricingPage from './pages/PricingPage';
import SchedulerPage from './pages/SchedulerPage'; // <-- Import the new page

function App() {
  return (
    <>
      <Header />
      <main className="container py-8">
        <Routes>
          {/* ... your other routes ... */}
          <Route path="/pricing" element={<PricingPage />} />

          {/* NEW: A protected route for the scheduler */}
          <Route 
            path="/scheduler" 
            element={
              <ProtectedRoute>
                <SchedulerPage />
              </ProtectedRoute>
            } 
          />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/image-generator" element={<ProtectedRoute><ImageGeneratorPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  )
}

export default App;