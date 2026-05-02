import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './contextApi/ContextApi.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contextApi/ThemeContext.jsx' 
import { BrowserRouter as Router } from 'react-router-dom' // <-- Imported Router

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        {/* CORRECT ORDER: Router wraps the theme context, 
            so components using useLocation/useNavigate work. */}
        <Router> 
          <ThemeProvider> 
            <App />
          </ThemeProvider>
        </Router>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);