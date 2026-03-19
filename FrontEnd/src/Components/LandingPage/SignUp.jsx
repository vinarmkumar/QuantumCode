import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { registerUser } from '../../services/authService';

export default function SignUp({ onToggleSignIn }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            // Validation
            if (!firstname || !lastname || !emailId || !password || !confirmPassword) {
                setError('Please fill in all fields');
                setLoading(false);
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setLoading(false);
                return;
            }

            if (password.length < 6) {
                setError('Password must be at least 6 characters long');
                setLoading(false);
                return;
            }

            // Register user
            await registerUser({
                firstname,
                lastname,
                emailId,
                password
            });

            setSuccess(true);
            
            // Clear form
            setFirstname('');
            setLastname('');
            setEmailId('');
            setPassword('');
            setConfirmPassword('');

            // Auto-navigate to signin after 2 seconds
            setTimeout(() => {
                onToggleSignIn();
            }, 2000);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSignUp}>
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

                {/* Success Message */}
                {success && (
                    <div style={{ 
                        color: '#44ff44', 
                        marginBottom: '1rem', 
                        padding: '0.75rem',
                        backgroundColor: 'rgba(68, 255, 68, 0.1)',
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                    }}>
                        ✓ Registration successful! Redirecting to sign in...
                    </div>
                )}

                {/* First Name Input */}
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="input-field"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Last Name Input */}
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="input-field"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Email Input */}
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="E-mail address"
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

                {/* Confirm Password */}
                <div className="form-group password-group">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field"
                        required
                        disabled={loading}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                    >
                        🕵️‍♀️
                    </button>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading || success}
                    style={{
                        opacity: (loading || success) ? 0.6 : 1,
                        cursor: (loading || success) ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            {/* Toggle Sign In */}
            <div className="auth-toggle">
                <span className="toggle-text">Have an account? </span>
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={onToggleSignIn}
                    disabled={loading}
                >
                    Sign In
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
