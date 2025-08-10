import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import InitialRouteHandler from './components/InitialRouteHandler';
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
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import OnboardingPage from './pages/OnboardingPage';
import CanvasPage from './pages/CanvasPage';
import GTAMissionGenerator from './pages/GTAMissionGenerator';
import ViralDNAPage from './pages/ViralDNAPage';
import LiveWinsPage from './pages/LiveWinsPage';
import FreeToolsPage from './pages/FreeToolsPage'; // <-- THIS IS THE MISSING LINE

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/free-tools" element={<FreeToolsPage />} />
        <Route path="/live" element={<LiveWinsPage />} />
        <Route path="/viral-dna" element={<ViralDNAPage />} />
        <Route path="/gta" element={<GTAMissionGenerator />} />
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
        <Route path="/purchase-success" element={<PurchaseSuccessPage />} />
        
        {/* Onboarding Route */}
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

        {/* Main Application */}
        <Route path="/app/*" element={<ProtectedRoute><InitialRouteHandler /></ProtectedRoute>} />

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