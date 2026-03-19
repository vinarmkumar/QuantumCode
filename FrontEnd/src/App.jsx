import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProblemProvider } from './context/ProblemContext'
import { ContestProvider } from './context/ContestContext'
import Navbar from './Components/LandingPage/Navbar'
import LandingPageLayout from './Components/LandingPage/LandingPageLayout'
import Auth from './Components/LandingPage/Auth'
import ProblemsPageLayout from './Components/ProblemsPage/ProblemsPageLayout'
import ProblemSolver from './Components/ProblemsPage/ProblemSolver'
import XClashPageLayout from './Components/ProblemsPage/XClashPageLayout'
import ContestBattle from './Components/ProblemsPage/ContestBattle'
import AdminDashboard from './Components/AdminPage/AdminDashboard'
import CreateProblemPage from './Components/AdminPage/CreateProblemPage'
import AdminTestManager from './Components/AdminPage/AdminTestManager'
import TestsHub from './Components/TestsPage/TestsHub'
import TestTaker from './Components/TestsPage/TestTaker'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <ProblemProvider>
        <ContestProvider>
          <Router>
            <NavbarController />
            <Routes>
              <Route path="/" element={<LandingPageLayout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/problems" element={<ProblemsPageLayout />} />
              <Route path="/problems/:id" element={<ProblemSolver />} />
              <Route path="/problems/xclash" element={<XClashPageLayout />} />
              <Route path="/contest" element={<Navigate to="/problems/xclash" replace />} />
              <Route path="/contest/:roomCode" element={<ContestBattle />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/problem/create" element={<CreateProblemPage />} />
              <Route path="/admin/tests" element={<AdminTestManager />} />
              <Route path="/tests" element={<TestsHub />} />
              <Route path="/tests/:id" element={<TestTaker />} />
            </Routes>
          </Router>
        </ContestProvider>
      </ProblemProvider>
    </AuthProvider>
  )
}

function NavbarController() {
  const location = useLocation()
  const showNavbar = !location.pathname.startsWith('/problems') && !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/problem/create') && !location.pathname.startsWith('/contest/') && !location.pathname.startsWith('/tests/')
  return showNavbar ? <Navbar /> : null
}
