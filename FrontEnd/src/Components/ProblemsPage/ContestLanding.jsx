import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ContestContext } from '../../context/ContestContext';
import '../ProblemsPage/ProblemSolver.css';
import './Contest.css';

const ContestLanding = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { initializeSocket, joinRoom } = useContext(ContestContext);
    const [roomCode, setRoomCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('home'); // home, create, join

    useEffect(() => {
        initializeSocket();
    }, [initializeSocket]);

    const handleCreateRoom = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/contest/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                const code = data.roomCode;
                joinRoom(code, user._id, user.firstname);
                navigate(`/contest/${code}`);
            }
        } catch (error) {
            console.error('Error creating room:', error);
            alert('Failed to create room');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinRoom = async () => {
        if (!roomCode.trim()) {
            alert('Please enter a room code');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/contest/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomCode: roomCode.toUpperCase() }),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                joinRoom(roomCode.toUpperCase(), user._id, user.firstname);
                navigate(`/contest/${roomCode.toUpperCase()}`);
            } else {
                alert(data.message || 'Failed to join room');
            }
        } catch (error) {
            console.error('Error joining room:', error);
            alert('Failed to join room');
        } finally {
            setLoading(false);
        }
    };

    if (mode === 'home') {
        return (
            <div className="contest-landing">
                <div className="contest-hero">
                    <div className="contests-glow"></div>
                    <h1 className="contests-title">⚔️ 1v1 Coding Challenge</h1>
                    <p className="contests-subtitle">Battle your friends in real-time coding competitions</p>
                </div>

                <div className="contest-options">
                    <div className="option-card create-card" onClick={() => setMode('create')}>
                        <div className="icon">➕</div>
                        <h3>Create Room</h3>
                        <p>Start a new challenge and invite your friend</p>
                        <button className="option-btn">Create</button>
                    </div>

                    <div className="option-separator">OR</div>

                    <div className="option-card join-card" onClick={() => setMode('join')}>
                        <div className="icon">🔗</div>
                        <h3>Join Room</h3>
                        <p>Join an existing challenge using room code</p>
                        <button className="option-btn">Join</button>
                    </div>
                </div>

                <div className="contest-info">
                    <div className="info-item">
                        <span className="info-icon">⏱️</span>
                        <div>
                            <h4>30 Minutes</h4>
                            <p>Time limit for each challenge</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">🎯</span>
                        <div>
                            <h4>Random Problem</h4>
                            <p>Each room gets a unique problem</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">🏆</span>
                        <div>
                            <h4>Live Scoring</h4>
                            <p>Points awarded to the winner instantly</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'create') {
        return (
            <div className="contest-form-container">
                <button className="back-btn" onClick={() => setMode('home')}>← Back</button>
                
                <div className="contest-form">
                    <h2>Create New Challenge Room</h2>
                    <p>A room code will be generated for you. Share it with your friend.</p>

                    <button 
                        className="submit-btn create-btn"
                        onClick={handleCreateRoom}
                        disabled={loading}
                    >
                        {loading ? 'Creating Room...' : '✨ Create Room'}
                    </button>

                    <div className="form-tips">
                        <h4>💡 How it works:</h4>
                        <ul>
                            <li>Click "Create Room" to generate a unique code</li>
                            <li>Share the code with your opponent</li>
                            <li>A random problem will load when both join</li>
                            <li>30 minutes to solve the problem</li>
                            <li>First to submit correct solution wins!</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'join') {
        return (
            <div className="contest-form-container">
                <button className="back-btn" onClick={() => setMode('home')}>← Back</button>
                
                <div className="contest-form">
                    <h2>Join Challenge Room</h2>
                    <p>Enter the room code your friend shared with you</p>

                    <input
                        type="text"
                        placeholder="Enter Room Code (e.g., ABC123)"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                        className="room-code-input"
                    />

                    <button 
                        className="submit-btn join-btn"
                        onClick={handleJoinRoom}
                        disabled={loading}
                    >
                        {loading ? 'Joining Room...' : '🚀 Join Room'}
                    </button>

                    <div className="form-tips">
                        <h4>💡 Tips:</h4>
                        <ul>
                            <li>Make sure you have the correct room code</li>
                            <li>The room must still be waiting for players</li>
                            <li>Once full, the challenge starts immediately</li>
                            <li>You can see your opponent's code in real-time</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

export default ContestLanding;
