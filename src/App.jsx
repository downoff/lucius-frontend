// ... other imports
import ConversationPage from './pages/ConversationPage'; // <-- NEW

function App() {
  return (
    <>
      <Routes>
        {/* ... Public Routes ... */}
        
        {/* Main Application (Protected Routes) */}
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<SocialStudio />} />
          <Route path="image-generator" element={<ImageGenerator />} />
          <Route path="scheduler" element={<SchedulerPage />} />
          <Route path="c/:conversationId" element={<ConversationPage />} /> {/* <-- NEW DYNAMIC ROUTE */}
        </Route>

        {/* ... other routes ... */}
      </Routes>
      <Toaster />
    </>
  )
}
export default App;