import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProblemProvider } from './context/ProblemContext'
import Navbar from './Components/LandingPage/Navbar'
import LandingPageLayout from './Components/LandingPage/LandingPageLayout'
import Auth from './Components/LandingPage/Auth'
import ProblemsPageLayout from './Components/ProblemsPage/ProblemsPageLayout'
import ProblemSolver from './Components/ProblemsPage/ProblemSolver'
import XClashPageLayout from './Components/ProblemsPage/XClashPageLayout'
import AdminDashboard from './Components/AdminPage/AdminDashboard'
import CreateProblemPage from './Components/AdminPage/CreateProblemPage'
import TutorialsHub from './Components/Tutorials/TutorialsHub'
import TutorialPage from './Components/Tutorials/TutorialPage'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <ProblemProvider>
        <Router>
          <NavbarController />
          <Routes>
            <Route path="/" element={<LandingPageLayout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tutorials" element={<TutorialsHub />} />
            <Route path="/tutorials/:language" element={<TutorialPage />} />
            <Route path="/problems" element={<ProblemsPageLayout />} />
            <Route path="/problems/:id" element={<ProblemSolver />} />
            <Route path="/problems/xclash" element={<XClashPageLayout />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/problem/create" element={<CreateProblemPage />} />
          </Routes>
        </Router>
      </ProblemProvider>
    </AuthProvider>
  )
}

function NavbarController() {
  const location = useLocation()
  const showNavbar = !location.pathname.startsWith('/problems') && !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/problem/create') && !location.pathname.startsWith('/tutorials/')
  return showNavbar ? <Navbar /> : null
}
