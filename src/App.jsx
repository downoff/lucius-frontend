// ... (all your existing imports)
import ToneAnalyzerPage from './pages/ToneAnalyzerPage'; // <-- NEW

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/free-tools/tweet-hook-generator" element={<TweetHookGeneratorPage />} />
        <Route path="/free-tools/tone-analyzer" element={<ToneAnalyzerPage />} /> {/* <-- NEW ROUTE */}
        {/* ... all your other public routes ... */}
        
        {/* Protected Routes */}
        {/* ... all your protected routes ... */}
      </Routes>
      <Toaster />
    </>
  )
}