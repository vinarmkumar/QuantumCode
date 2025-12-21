import { useState } from 'react';
import './Account.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Account() {
    const [isSignUp, setIsSignUp] = useState(false);

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