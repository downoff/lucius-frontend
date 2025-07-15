import { Toaster } from "@/components/ui/sonner" // <-- NEW: Import the Toaster
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// ... all your other imports

function App() {
  return (
    <>
      <Header />
      <main className="container py-8">
        <Routes>
          {/* ... all your existing routes ... */}
        </Routes>
      </main>
      <Toaster /> {/* <-- NEW: Add the Toaster component here */}
    </>
  )
}

export default App;