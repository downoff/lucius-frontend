import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import ActivityLoop from './components/ActivityLoop';

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
import ContentHubPage from './pages/ContentHubPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import TweetHookGeneratorPage from './pages/TweetHookGeneratorPage';
import ToneAnalyzerPage from './pages/ToneAnalyzerPage';
import MicroToolPage from './pages/MicroToolPage';
import InstagramCarouselGenerator from './pages/InstagramCarouselGenerator';
import ReferralPage from './pages/ReferralPage';
import ContactPage from './pages/ContactPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage'; // <-- NEW

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/purchase-success" element={<PurchaseSuccessPage />} /> {/* <-- NEW ROUTE */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/free-tools/tweet-hook-generator" element={<TweetHookGeneratorPage />} />
        <Route path="/free-tools/tone-analyzer" element={<ToneAnalyzerPage />} />
        <Route path="/free-tools/instagram-carousel-generator" element={<InstagramCarouselGenerator />} />
        <Route path="/tools/:nicheSlug" element={<MicroToolPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/auth-success.html" element={<AuthSuccessPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        
        {/* Main Application (Protected Routes) */}
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<ContentHubPage />} />
          <Route path="social-studio" element={<SocialStudio />} />
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
        <Route path="/referrals" element={<ProtectedRoute><ReferralPage /></ProtectedRoute>} />

      </Routes>
      <Toaster />
      <ActivityLoop />
    </>
  )
}

export default App;
