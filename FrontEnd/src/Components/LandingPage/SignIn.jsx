import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/authService';

export default function SignIn({ onToggleSignUp }) {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!emailId || !password) {
                setError('Please fill in all fields');
                setLoading(false);
                return;
            }

            const response = await loginUser(emailId, password);

            // Get profile to update context
            const { getProfile } = await import('../../services/authService');
            const profileData = await getProfile();
            const profile = profileData.user || profileData;
            
            // Check if trying to access admin but not admin
            if (isAdminLogin && profile.role !== 'admin') {
                setError('You do not have admin privileges');
                setLoading(false);
                return;
            }

            login(profile);
            setEmailId('');
            setPassword('');
            
            // Navigate based on role
            if (profile.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSignIn}>
                {/* Admin Login Toggle */}
                <div className="admin-toggle" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    <label style={{ color: '#999', fontSize: '0.9rem' }}>
                        <input
                            type="checkbox"
                            checked={isAdminLogin}
                            onChange={(e) => setIsAdminLogin(e.target.checked)}
                            style={{ marginRight: '0.5rem' }}
                        />
                        Sign in as Admin
                    </label>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{ 
                        color: '#ff4444', 
                        marginBottom: '1rem', 
                        padding: '0.75rem',
                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                {/* Email Input */}
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        className="input-field"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Password Input */}
                <div className="form-group password-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                        disabled={loading}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                    >
                        🕵️‍♀️
                    </button>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading}
                    style={{
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            {/* Toggle Sign Up */}
            <div className="auth-toggle">
                <span className="toggle-text">Don't have an account? </span>
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={onToggleSignUp}
                    disabled={loading}
                >
                    Sign Up
                </button>
            </div>

            {/* Social Sign In */}
            <div className="social-section">
                <p className="social-text">or you can sign in with</p>
                <div className="social-icons">
                    <a href="#google" className="social-icon google">G</a>
                    <a href="#github" className="social-icon github">🏴</a>
                    <a href="#facebook" className="social-icon facebook">f</a>
                </div>
            </div>
        </>
    );
}
