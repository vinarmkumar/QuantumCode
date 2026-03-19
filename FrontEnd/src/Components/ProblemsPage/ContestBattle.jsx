import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ContestContext } from '../../context/ContestContext';
import Editor from '@monaco-editor/react';
import './ContestBattle.css';

const ContestBattle = () => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const {
        socket,
        myCode,
        updateCode,
        submitCode,
        players,
        problem,
        setProblem,
        timeRemaining,
        setTimeRemaining,
        language,
        setLanguage,
        isSubmitted,
        setIsSubmitted,
        contestStarted,
        winner,
        setWinner,
        winnerUserId,
        setWinnerUserId,
        leaveRoom
    } = useContext(ContestContext);

    const [playerCode, setPlayerCode] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const timerInterval = useRef(null);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [testResults, setTestResults] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);

    // Fetch contest details
    useEffect(() => {
        const fetchContestDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/contest/${roomCode}`, {
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.success) {
                    const problemData = data.contest.problem;
                    setProblem(problemData);
                    
                    // Set starter code if available
                    if (problemData.startCode && problemData.startCode[selectedLanguage]) {
                        setPlayerCode(problemData.startCode[selectedLanguage]);
                    } else {
                        setPlayerCode(''); // Empty code if no starter code
                    }
                }
            } catch (error) {
                console.error('Error fetching contest:', error);
            }
        };

        if (roomCode) {
            fetchContestDetails();
        }
    }, [roomCode, setProblem, selectedLanguage]);

    // Timer countdown
    useEffect(() => {
        if (contestStarted && timeRemaining > 0) {
            timerInterval.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerInterval.current);
    }, [contestStarted, timeRemaining, setTimeRemaining]);

    // Handle time up
    const handleTimeUp = () => {
        if (!isSubmitted) {
            setShowResultModal(true);
            setWinner('draw');
        }
    };

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle code submission
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/contest/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomCode,
                    playerId: user._id,
                    code: playerCode,
                    language: selectedLanguage
                }),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                setIsSubmitted(true);
                submitCode(playerCode, selectedLanguage);
                clearInterval(timerInterval.current);
                
                // Fetch winner determination
                try {
                    const endResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/contest/${roomCode}/end`, {
                        method: 'PUT',
                        credentials: 'include'
                    });
                    const endData = await endResponse.json();
                    if (endData.success && endData.contest) {
                        setWinner(endData.contest.winner);
                        setWinnerUserId(String(endData.contest.winnerUserId));
                        
                        // Broadcast to both players via WebSocket
                        if (socket) {
                            socket.emit('contest-completed', {
                                roomCode,
                                winner: endData.contest.winner,
                                winnerUserId: String(endData.contest.winnerUserId),
                                contest: endData.contest
                            });
                        }
                        
                        setShowResultModal(true);
                    }
                } catch (endError) {
                    console.error('Error ending contest:', endError);
                    setShowResultModal(true);
                }
            }
        } catch (error) {
            console.error('Error submitting code:', error);
        }
    };

    // Handle run tests
    const handleRun = async () => {
        if (!playerCode.trim()) {
            alert('Please write some code first!');
            return;
        }

        setIsRunning(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/contest/run-tests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomCode,
                    code: playerCode,
                    language: selectedLanguage
                }),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.success) {
                setTestResults(data.testResults || []);
                setShowTestModal(true);
            } else {
                alert('Error running tests: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error running tests:', error);
            alert('Failed to run tests');
        } finally {
            setIsRunning(false);
        }
    };

    // Handle leave room
    const handleLeaveRoom = () => {
        leaveRoom();
        navigate('/problems');
    };

    // Send message
    const handleSendMessage = () => {
        if (messageInput.trim() && socket) {
            socket.emit('send-message', {
                roomCode,
                message: messageInput,
                username: user.firstname
            });
            setMessageInput('');
            setMessages(prev => [...prev, {
                username: user.firstname,
                message: messageInput,
                timestamp: new Date()
            }]);
        }
    };

    // Listen for socket messages
    useEffect(() => {
        if (socket) {
            socket.on('new-message', (data) => {
                setMessages(prev => [...prev, data]);
                if (!showChat) {
                    setUnreadMessages(prev => prev + 1);
                }
            });

            socket.on('player-submitted', (data) => {
                // Update player status
            });

            socket.on('contest-ended', (data) => {
                // Contest ended - show result to both players
                setWinner(data.winner);
                setWinnerUserId(String(data.winnerUserId));
                setShowResultModal(true);
                clearInterval(timerInterval.current);
            });

            return () => {
                socket.off('new-message');
                socket.off('player-submitted');
                socket.off('contest-ended');
            };
        }
    }, [socket, showChat]);

    if (!contestStarted) {
        return (
            <div className="contest-waiting">
                <div className="waiting-animation">
                    <div className="spinner"></div>
                    <h2>Waiting for opponent...</h2>
                    <p>Room Code: <span className="room-code-badge">{roomCode}</span></p>
                    <p className="waiting-players">
                        {players.length} / 2 players connected
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="contest-battle">
            {/* Header */}
            <div className="battle-header">
                <div className="header-left">
                    <h1>⚔️ 1v1 Battle Mode</h1>
                    <div className="problem-title">{problem?.title}</div>
                </div>
                
                <div className="header-center">
                    <div className="timer-display">
                        <span className={`time ${timeRemaining < 300 ? 'critical' : ''}`}>
                            ⏱️ {formatTime(timeRemaining)}
                        </span>
                    </div>
                </div>

                <div className="header-right">
                    <button className="exit-btn" onClick={handleLeaveRoom}>✕ Exit</button>
                </div>
            </div>

            {/* Main Battle Area */}
            <div className="battle-container">
                {/* Left Panel - Problem Description */}
                <div className="left-panel">
                    <div className="panel-tabs">
                        <div className="tab active">📋 Description</div>
                    </div>

                    <div className="problem-details">
                        {problem && (
                            <>
                                <h3>{problem.title}</h3>
                                
                                <div className="difficulty-badge" style={{
                                    color: problem.difficulty === 'Easy' ? '#00ff88' : 
                                           problem.difficulty === 'Medium' ? '#ffa500' : '#ff4444'
                                }}>
                                    {problem.difficulty}
                                </div>

                                <p className="description">{problem.description}</p>

                                <div className="constraints-section">
                                    <h4>📋 Constraints:</h4>
                                    <p>{problem.constraints}</p>
                                </div>

                                <div className="examples-section">
                                    <h4>🔍 Examples:</h4>
                                    {problem.examples?.map((example, idx) => (
                                        <div key={idx} className="example">
                                            <div className="example-title">Example {idx + 1}:</div>
                                            <code>{example.input}</code>
                                            <code className="output">{example.output}</code>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="right-panel">
                    <div className="editor-section my-editor">
                        <div className="editor-header">
                            <h3>🔵 You</h3>
                            <div className="status-badge">
                                {isSubmitted ? '✅ SUBMITTED' : '⏳ Solving'}
                            </div>
                        </div>

                        <div className="language-selector">
                            <select 
                                value={selectedLanguage}
                                onChange={(e) => {
                                    setSelectedLanguage(e.target.value);
                                    setLanguage(e.target.value);
                                }}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                            </select>
                        </div>

                        <Editor
                            height="100%"
                            language={selectedLanguage}
                            value={playerCode}
                            onChange={(val) => {
                                if (!isSubmitted) {
                                    setPlayerCode(val || '');
                                    updateCode(val || '');
                                }
                            }}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: 'on',
                                automaticLayout: true,
                                readOnly: isSubmitted
                            }}
                        />

                        <div className="button-group">
                            <button 
                                className="run-btn"
                                onClick={handleRun}
                                disabled={isSubmitted || isRunning}
                            >
                                {isRunning ? '⏳ Running...' : '▶️ Run Tests'}
                            </button>
                            <button 
                                className="submit-btn"
                                onClick={handleSubmit}
                                disabled={isSubmitted || testResults.length === 0}
                            >
                                🚀 {isSubmitted ? 'SUBMITTED' : 'Submit Solution'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Chat Button */}
            <button 
                className={`floating-chat-btn ${unreadMessages > 0 ? 'has-notification' : ''}`}
                onClick={() => {
                    setShowChat(!showChat);
                    setUnreadMessages(0);
                }}
            >
                💬
                {unreadMessages > 0 && <span className="notification-badge">{unreadMessages}</span>}
            </button>

            {/* Chat Popup */}
            {showChat && (
                <div className="chat-popup">
                    <div className="chat-header">
                        <h3>💬 Chat with Opponent</h3>
                        <button className="close-chat" onClick={() => setShowChat(false)}>✕</button>
                    </div>
                    <div className="messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className="message">
                                <span className="username">{msg.username}:</span>
                                <span className="text">{msg.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            placeholder="Send a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}

            {/* Result Modal */}
            {showResultModal && (
                <div className="result-modal-overlay" onClick={() => setShowResultModal(false)}>
                    <div className="result-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>🏆 Round Complete!</h2>
                        
                        <div className="result-content">
                            {testResults.length > 0 ? (
                                <>
                                    <div className="test-summary">
                                        <div className="passed-count">
                                            {testResults.filter(t => t.passed).length}/{testResults.length}
                                        </div>
                                        <div className="passed-label">Test Cases Passed</div>
                                    </div>
                                    
                                    {winner === 'draw' ? (
                                        <p className="draw-text">It's a DRAW! 🤝</p>
                                    ) : String(winnerUserId) === String(user._id) ? (
                                        <p className="result-text">You Won! 🎉</p>
                                    ) : (
                                        <p className="result-text">Opponent Won! Better luck next time! 💪</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    {winner === 'draw' ? (
                                        <p className="draw-text">It's a DRAW! 🤝</p>
                                    ) : String(winnerUserId) === String(user._id) ? (
                                        <p className="result-text">You Won! 🎉</p>
                                    ) : (
                                        <p className="result-text">Opponent Won! Better luck next time! 💪</p>
                                    )}
                                </>
                            )}
                        </div>

                        <button 
                            className="modal-btn"
                            onClick={handleLeaveRoom}
                        >
                            ← Back to Problems
                        </button>
                    </div>
                </div>
            )}

            {/* Test Results Modal */}
            {showTestModal && (
                <div className="test-modal-overlay" onClick={() => setShowTestModal(false)}>
                    <div className="test-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="test-modal-header">
                            <h2>📊 Test Results</h2>
                            <button 
                                className="close-test-modal"
                                onClick={() => setShowTestModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="test-modal-summary">
                            <div className="test-count-large">
                                {testResults.filter(t => t.passed).length}/{testResults.length}
                            </div>
                            <div className="test-count-label">Test Cases Passed</div>
                        </div>

                        <div className="test-modal-cases">
                            {testResults.map((result, idx) => (
                                <div key={idx} className={`test-modal-case ${result.passed ? 'passed' : 'failed'}`}>
                                    <div className="test-modal-status">
                                        {result.passed ? '✅' : '❌'} Test {idx + 1}
                                    </div>
                                    <div className="test-modal-details">
                                        <div><strong>Input:</strong> <code>{result.input}</code></div>
                                        <div><strong>Expected:</strong> <code>{result.expected}</code></div>
                                        <div><strong>Got:</strong> <code>{result.output || 'N/A'}</code></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestBattle;
