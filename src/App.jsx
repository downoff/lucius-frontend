// ... all other imports
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* ... all your other public routes ... */}
        
        {/* Main Application (Protected Routes) */}
        {/* ... all your protected routes ... */}
      </Routes>
      <Toaster />
    </>
  )
}

export default App;