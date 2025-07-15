import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AppLayout from './layouts/AppLayout'; // The main layout for your tools
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* All your tools will now live under the "/app" path */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<SocialStudio />} />
        <Route path="image-generator" element={<ImageGenerator />} />
        {/* We can add routes for dashboard, scheduler, etc. here later */}
      </Route>
    </Routes>
  )
}

export default App;