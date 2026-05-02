import './App.css'
// REMOVED: BrowserRouter as Router import
import { getApps } from './utils/helper'

function App() {
  const CurrentApp = getApps();

  return (
    // Applies theme-aware global styles
    <div className="min-h-screen bg-app-bg text-app-text transition-colors duration-500">
      <CurrentApp />
    </div>
  )
}

export default App