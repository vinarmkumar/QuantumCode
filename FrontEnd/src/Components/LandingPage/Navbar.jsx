import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Header.css'
import signInLogo from '../../Imgs/signInLogo.png'



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await logout()
      setProfileOpen(false)
      navigate('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const handleNavigate = (path) => {
    navigate(path)
    setMenuOpen(false)
  }



  return (
    <nav className="sticky top-0 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-between p-3 sm:p-4 my-2 sm:my-5 bg-black rounded-0 sm:mx-10 sm:rounded-4xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-shadow duration-300">
      {/* Logo */}
      <div className="mx-2 sm:mx-9 flex items-center gap-1 sm:gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <img className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" src={signInLogo} alt="QuantumCode" />
        <p className="text-sm sm:text-xl md:text-3xl text-teal-50 font-semibold hidden sm:block">QuantumCode</p>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="md:hidden hamburger-btn"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6 sm:gap-9 items-center">
        <button onClick={() => navigate('/')} className="nav-link">Home</button>
        

        
        <button onClick={() => handleNavigate('/tests')} className="nav-link">📝 Tests</button>
        
        <button onClick={() => handleNavigate('/problems')} className="nav-link">Problems</button>

        <button onClick={() => handleNavigate('/contest')} className="nav-link">🎮 Contest</button>

        {/* User Profile or Sign In */}
        {user ? (
          <div className="nav-item">
            <button className="nav-link profile-btn">👤 {user.firstname}</button>
            <div className="dropdown profile-dropdown" role="menu">
              <div className="dropdown-user-info">
                <p className="user-name">{user.firstname} {user.lastname}</p>
                <p className="user-email">{user.emailId}</p>
                <p className="user-role">{user.role === 'admin' ? '⚙️ ADMIN' : '👤 User'}</p>
              </div>
              <hr className="dropdown-divider" />
              {user.role === 'admin' && (
                <button onClick={() => handleNavigate('/admin/dashboard')} className="dropdown-link">
                  ⚙️ Admin Dashboard
                </button>
              )}
              <button onClick={() => handleNavigate('/profile')} className="dropdown-link">
                📊 My Profile
              </button>
              <button onClick={() => handleNavigate('/submissions')} className="dropdown-link">
                📝 My Submissions
              </button>
              <button onClick={() => handleNavigate('/achievements')} className="dropdown-link">
                🏆 Achievements
              </button>
              <hr className="dropdown-divider" />
              <button onClick={handleLogout} className="dropdown-link logout-link">
                🚪 Logout
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => handleNavigate('/auth')} className="nav-link">Signin</button>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black md:hidden flex flex-col gap-2 p-2 sm:gap-3 sm:p-4 border-t border-gray-700 mobile-menu">
          <button onClick={() => handleNavigate('/')} className="mobile-nav-btn">Home</button>
          

          
          <button onClick={() => handleNavigate('/tests')} className="mobile-nav-btn">📝 Tests</button>
          
          <button onClick={() => handleNavigate('/problems')} className="mobile-nav-btn">Problems</button>

          <button onClick={() => handleNavigate('/contest')} className="mobile-nav-btn">🎮 Contest</button>

          {/* Mobile User Menu */}
          {user ? (
            <>
              <div className="mobile-user-section">
                <p className="mobile-user-name">👤 {user.firstname} {user.lastname}</p>
                <p className="mobile-user-email">{user.emailId}</p>
              </div>
              {user.role === 'admin' && (
                <button onClick={() => handleNavigate('/admin/dashboard')} className="mobile-nav-btn">
                  ⚙️ Admin Dashboard
                </button>
              )}
              <button onClick={() => handleNavigate('/profile')} className="mobile-nav-btn">
                📊 My Profile
              </button>
              <button onClick={() => handleNavigate('/submissions')} className="mobile-nav-btn">
                📝 My Submissions
              </button>
              <button onClick={handleLogout} className="mobile-nav-btn logout-mobile">
                🚪 Logout
              </button>
            </>
          ) : (
            <button onClick={() => handleNavigate('/auth')} className="mobile-nav-btn">Signin</button>
          )}
        </div>
      )}
    </nav>
  )
}


