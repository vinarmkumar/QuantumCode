import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './AdminDashboard.css'
import adminBackground from '../../Imgs/adminbackground.jpg'
import signInLogo from '../../Imgs/signInLogo.png'
import logoutLogo from '../../Imgs/logoutlogo.png'

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-container">
        <div className="admin-card">
          <h2>Access Denied</h2>
          <p>You do not have admin privileges</p>
          <button onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    )
  }

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

  return (
    <div className="admin-dashboard" style={{ 
      backgroundImage: `url(${adminBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Admin Header - Redesigned navbar */}
      <header className="admin-header">
        <div className="admin-header-content">
          {/* Logo and Home Button */}
          <div className="admin-logo-home">
            <div className="admin-logo" onClick={() => navigate('/')}>
              <img src={signInLogo} alt="QuantumCode" className="admin-logo-img" />
              <span className="admin-logo-text">QuantumCode</span>
            </div>
            <button onClick={() => navigate('/')} className="admin-home-btn">
              Home
            </button>
          </div>
          
          <div className="admin-user-info">
            <span className="admin-name">{user.firstname} {user.lastname}</span>
            <span className="admin-role">ADMIN</span>
            <button className="logout-btn" onClick={handleLogout}>
              <img src={logoutLogo} alt="Logout" className="logout-icon" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="admin-content">
        {/* Stats Grid */}
        <section className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <p className="stat-label">Total Users</p>
              <p className="stat-value">1,234</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <p className="stat-label">Total Problems</p>
              <p className="stat-value">456</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚔️</div>
            <div className="stat-info">
              <p className="stat-label">Active Contests</p>
              <p className="stat-value">12</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <p className="stat-label">Solutions Submitted</p>
              <p className="stat-value">5,678</p>
            </div>
          </div>
        </section>

        {/* Admin Features */}
        <section className="admin-features">
          <h2>Admin Features</h2>
          <div className="features-grid">
            {/* User Management */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>👥 User Management</h3>
              </div>
              <ul className="feature-list">
                <li>View all users</li>
                <li>Ban/Unban users</li>
                <li>Reset passwords</li>
                <li>View user activity</li>
                <li>Manage user roles</li>
              </ul>
              <button className="feature-btn">Manage Users</button>
            </div>

            {/* Problem Management */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>📝 Problem Management</h3>
              </div>
              <ul className="feature-list">
                <li>Create problems</li>
                <li>Edit problems</li>
                <li>Delete problems</li>
                <li>View submissions</li>
                <li>Manage difficulty</li>
              </ul>
              <button className="feature-btn" onClick={() => navigate('/problem/create')}>Manage Problems</button>
            </div>

            {/* Tests Management */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>📝 Tests Management</h3>
              </div>
              <ul className="feature-list">
                <li>Create scheduled tests</li>
                <li>Set time limits</li>
                <li>Pick test problems</li>
                <li>View test submissions</li>
                <li>Delete past tests</li>
              </ul>
              <button className="feature-btn" onClick={() => navigate('/admin/tests')}>Manage Tests</button>
            </div>

            {/* Analytics */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>📊 Analytics & Reports</h3>
              </div>
              <ul className="feature-list">
                <li>View user stats</li>
                <li>Problem statistics</li>
                <li>Contest reports</li>
                <li>System logs</li>
                <li>Performance metrics</li>
              </ul>
              <button className="feature-btn">View Analytics</button>
            </div>

            {/* System Settings */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>⚙️ System Settings</h3>
              </div>
              <ul className="feature-list">
                <li>Configure settings</li>
                <li>Manage categories</li>
                <li>Set time limits</li>
                <li>Configure judges</li>
                <li>Backup system</li>
              </ul>
              <button className="feature-btn">Settings</button>
            </div>

            {/* Support & Help */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>💬 Support & Help</h3>
              </div>
              <ul className="feature-list">
                <li>View user tickets</li>
                <li>Manage reports</li>
                <li>Send notifications</li>
                <li>View feedback</li>
                <li>Documentation</li>
              </ul>
              <button className="feature-btn">Support Center</button>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="admin-activity">
          <h2>Recent Activity</h2>
          <div className="activity-log">
            <div className="activity-item">
              <span className="activity-time">2 hours ago</span>
              <span className="activity-text">New user registered: john_doe</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">5 hours ago</span>
              <span className="activity-text">Problem "Two Sum" was added</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">1 day ago</span>
              <span className="activity-text">Contest "Weekly Challenge" started</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">2 days ago</span>
              <span className="activity-text">User admin_user logged in</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">3 days ago</span>
              <span className="activity-text">System backup completed successfully</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}