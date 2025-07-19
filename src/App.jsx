import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppLayout from './layouts/AppLayout';
import SocialStudio from './pages/SocialStudio';
import ImageGenerator from './pages/ImageGenerator';
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* All your main tools live inside the AppLayout */}
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