import Header from './components/Header'; // We'll create/update these components next
import SocialStudio from './pages/SocialStudio';

function App() {
  return (
    // We use a modern CSS Grid layout for the main structure
    <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
      <Header />
      
      <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-65px)] overflow-hidden">
        {/* This is our permanent sidebar for navigation */}
        <aside className="bg-slate-900/30 border-r border-slate-800 p-4">
          <p className="text-sm font-semibold text-slate-400">Your Tools</p>
          {/* We will add a real navigation menu here later */}
        </aside>

        {/* This is the main content area where our pages will appear */}
        <main className="p-4 md:p-6 overflow-y-auto">
           {/* For now, we will directly render the SocialStudio. Routing will come next. */}
           <SocialStudio />
        </main>
      </div>
    </div>
  )
}

export default App;