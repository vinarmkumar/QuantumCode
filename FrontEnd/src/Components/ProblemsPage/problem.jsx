import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import signInLogo from '../../Imgs/signInLogo.png'
import logoutLogo from '../../Imgs/logoutlogo.png'

export default function Problem({ onToggleSidebar }){
    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    const handleLogout = async () => {
        // Show confirmation dialog before logging out
        const confirmLogout = window.confirm('Are you sure you want to logout?')
        if (confirmLogout) {
            try {
                await logout()
                navigate('/')
            } catch (err) {
                console.error('Logout failed:', err)
            }
        }
    }
    
    return(
      <>
      <nav className="shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center p-4 gap-4 md:gap-5 bg-black hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-shadow duration-300 relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-green-400 transition-colors duration-200 text-xl"
        >
          ☰
        </button>

        <img className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" src={signInLogo} alt="sign in logo" />

        {/* Desktop Navigation */}
        <div className="mx-20 hidden md:flex items-center gap-9 md:gap-9">
          <button onClick={() => navigate('/')} className='text-white hover:text-green-400 transition-colors duration-200 text-sm md:text-base'>Home</button>
          
          <button className='text-white hover:text-green-400 transition-colors duration-200 text-sm md:text-base'>Contest</button>
          <button className='text-white hover:text-green-400 transition-colors duration-200 text-sm md:text-base'>Discuss</button>
        </div>

        <button className='text-amber-300 hover:text-amber-200 transition-colors duration-200 text-sm md:text-base ml-auto'>Premium</button>

        {/* Logout Button - Using logout logo */}
        {user && (
          <button
            onClick={handleLogout}
            title="Logout"
            className='w-12 h-12 rounded-full bg-transparent hover:bg-red-500/20 transition-colors duration-200 flex items-center justify-center'
          >
            <img src={logoutLogo} alt="Logout" className="w-8 h-12" />
          </button>
        )}

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black md:hidden flex flex-col gap-2 p-2 border-t border-gray-700 z-40">
            <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-white hover:text-green-400 text-left py-2 px-3 rounded transition-colors duration-200 text-sm">Home</button>
            <button className="text-white hover:text-green-400 text-left py-2 px-3 rounded transition-colors duration-200 text-sm">Contest</button>
            <button className="text-white hover:text-green-400 text-left py-2 px-3 rounded transition-colors duration-200 text-sm">Discuss</button>
            <button className="text-amber-300 hover:text-amber-200 text-left py-2 px-3 rounded transition-colors duration-200 text-sm">Premium</button>
            {user && (
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="text-red-400 hover:text-red-300 text-left py-2 px-3 rounded transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <img src={logoutLogo} alt="Logout" className="w-5 h-5" />
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
      </>
    );
}