import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Import all of your page components
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import AuthSuccessPage from './pages/AuthSuccessPage';
import AppLayout from './layouts/AppLayout';
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';
import SchedulerPage from './pages/SchedulerPage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import ConversationPage from './pages/ConversationPage';
import CarouselCreatorPage from './pages/CarouselCreatorPage';
import HashtagGeneratorPage from './pages/HashtagGeneratorPage';
import WeeklyPlannerPage from './pages/WeeklyPlannerPage';
import BrandVoicePage from './pages/BrandVoicePage';
import CampaignGeneratorPage from './pages/CampaignGeneratorPage';
import ContentHubPage from './pages/ContentHubPage'; // <-- NEW

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        {/* ... other public routes ... */}
        
        {/* Main Application (Protected Routes) */}
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<ContentHubPage />} /> {/* <-- NEW DEFAULT PAGE */}
          <Route path="social-studio" element={<SocialStudio />} /> {/* <-- Changed path */}
          <Route path="campaign-generator" element={<CampaignGeneratorPage />} />
          <Route path="carousel-creator" element={<CarouselCreatorPage />} />
          <Route path="hashtag-generator" element={<HashtagGeneratorPage />} />
          <Route path="weekly-planner" element={<WeeklyPlannerPage />} />
          <Route path="image-generator" element={<ImageGenerator />} />
          <Route path="scheduler" element={<SchedulerPage />} />
          <Route path="c/:conversationId" element={<ConversationPage />} />
        </Route>

        {/* Standalone Protected Pages */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/brand-voice" element={<ProtectedRoute><BrandVoicePage /></ProtectedRoute>} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App;
