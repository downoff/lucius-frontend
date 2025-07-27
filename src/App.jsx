import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PricingPage from './pages/PricingPage'; // <-- Import PricingPage
import AppLayout from './layouts/AppLayout';
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<PricingPage />} /> {/* <-- Add PricingPage Route */}
        
        {/* Main Application (Protected Routes) */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<SocialStudio />} />
          <Route path="image-generator" element={<ImageGenerator />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App;