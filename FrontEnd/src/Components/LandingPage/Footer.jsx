import './Footer.css';

export default function Footer(){
    return(
        <footer className="footer-container">
            {/* Main Footer Content */}
            <div className="footer-content">
                {/* Mission Section */}
                <div className="footer-mission">
                    <img src="/src/Imgs/Footerlogo.png" alt="QuantumCode Logo" className="mission-logo" />
                    <h2 className="mission-title">Made with ❤️ in QTC</h2>
                    <p className="mission-text">
                        At QuantumCode, our mission is to help you improve yourself and land your dream job. 
                        We have a sizable repository of interview resources for many companies. In the past 
                        few years, our users have landed jobs at top companies around the world.
                    </p>
                </div>

                {/* Companies Section */}
                <div className="companies-section">
                    <div className="companies-grid">
                        <div className="company-logo">Facebook</div>
                        <div className="company-logo">LEAP Motion</div>
                        <div className="company-logo">Apple</div>
                        <div className="company-logo">Uber</div>
                        <div className="company-logo">Shopify</div>
                        <div className="company-logo">Jet</div>
                        <div className="company-logo">Intel</div>
                        <div className="company-logo">Amazon</div>
                    </div>
                    <div className="companies-grid">
                        <div className="company-logo">Bank of America</div>
                        <div className="company-logo">Pinterest</div>
                        <div className="company-logo">Cisco</div>
                        <div className="company-logo">Stripe</div>
                    </div>
                </div>

                {/* Careers Section */}
                <div className="footer-careers">
                    <p className="careers-text">
                        If you are passionate about tackling some of the most interesting problems around, 
                        we would love to hear from you.
                    </p>
                    <button className="careers-btn">Join Our Team ❯</button>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-left">
                    <p className="copyright">Copyright © 2025 QuantumCode</p>
                </div>
                <div className="footer-right">
                    <a href="#help">Help Center</a>
                    <span className="divider">|</span>
                    <a href="#jobs">Jobs</a>
                    <span className="divider">|</span>
                    <a href="#bounty">Bug Bounty</a>
                    <span className="divider">|</span>
                    <a href="#students">Students</a>
                    <span className="divider">|</span>
                    <a href="#terms">Terms</a>
                    <span className="divider">|</span>
                    <a href="#privacy">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}