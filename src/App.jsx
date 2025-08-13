// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import InitialRouteHandler from './components/InitialRouteHandler';
import ActivityLoop from './components/ActivityLoop';

// Public & Marketing Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import SharePage from './pages/SharePage';
import LiveWinsPage from './pages/LiveWinsPage';
import ViralDNAPage from './pages/ViralDNAPage';
import GTAMissionGenerator from './pages/GTAMissionGenerator';
import FreeToolsPage from './pages/FreeToolsPage';
import TweetHookGeneratorPage from './pages/TweetHookGeneratorPage';
import ToneAnalyzerPage from './pages/ToneAnalyzerPage';
import InstagramCarouselGenerator from './pages/InstagramCarouselGenerator';
import MicroToolPage from './pages/MicroToolPage';

// Core App Pages
import DashboardPage from './pages/DashboardPage';
import BrandVoicePage from './pages/BrandVoicePage';
import ReferralPage from './pages/ReferralPage';
import AuthSuccessPage from './pages/AuthSuccessPage';
import OnboardingPage from './pages/OnboardingPage';
import AppLayout from './layouts/AppLayout';
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';
import SchedulerPage from './pages/SchedulerPage';
import CarouselCreatorPage from './pages/CarouselCreatorPage';
import HashtagGeneratorPage from './pages/HashtagGeneratorPage';
import WeeklyPlannerPage from './pages/WeeklyPlannerPage';
import CampaignGeneratorPage from './pages/CampaignGeneratorPage';
import ContentHubPage from './pages/ContentHubPage';
import ConversationPage from './pages/ConversationPage';
import CanvasPage from './pages/CanvasPage';

// NEW Shopify niche lead magnet
import ShopifyToolPage from './pages/ShopifyToolPage';

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        {/* Main Marketing Entry */}
        <Route path="/" element={<LandingPage />} />

        {/* Shopify Tool as public niche entry point */}
        <Route path="/shopify" element={<ShopifyToolPage />} />

        {/* Public Tools / Content */}
        <Route path="/s/:shareId" element={<SharePage />} />
        <Route path="/live" element={<LiveWinsPage />} />
        <Route path="/viral-dna" element={<ViralDNAPage />} />
        <Route path="/gta" element={<GTAMissionGenerator />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/free-tools" element={<FreeToolsPage />} />
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

        {/* Protected Routes */}
        <Route
          path="/onboarding"
          element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>}
        />
        <Route
          path="/app/*"
          element={<ProtectedRoute><InitialRouteHandler /></ProtectedRoute>}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/brand-voice"
          element={<ProtectedRoute><BrandVoicePage /></ProtectedRoute>}
        />
        <Route
          path="/referrals"
          element={<ProtectedRoute><ReferralPage /></ProtectedRoute>}
        />
      </Routes>

      <Toaster />
      <ActivityLoop />
    </>
  );
}

export default App;
