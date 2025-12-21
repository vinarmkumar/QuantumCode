import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './Account.css';

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'signup') {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }
    }, [searchParams]);

    return (
        <div className="account-container">
            <div className="account-card">
                {/* Logo */}
                <div className="logo-section">
                    <div className="logo">
                        <img src="/src/Imgs/signInLogo.png" alt="QuantumCode Logo" className="logo-img" />
                        <span className="logo-text">QuantumCode</span>
                    </div>
                </div>

                {/* Render SignIn or SignUp based on state */}
                {isSignUp ? (
                    <SignUp onToggleSignIn={() => setIsSignUp(false)} />
                ) : (
                    <SignIn onToggleSignUp={() => setIsSignUp(true)} />
                )}
            </div>
        </div>
    );
}
