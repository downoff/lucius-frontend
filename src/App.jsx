// ... (all your existing imports)
import MicroToolPage from './pages/MicroToolPage'; // <-- NEW

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/tools/:nicheSlug" element={<MicroToolPage />} /> {/* <-- NEW DYNAMIC ROUTE */}
        {/* ... all your other public routes ... */}
        
        {/* Protected Routes */}
        {/* ... all your protected routes ... */}
      </Routes>
      <Toaster />
    </>
  )
}