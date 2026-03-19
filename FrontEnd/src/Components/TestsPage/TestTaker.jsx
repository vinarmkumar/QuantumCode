import { useState, useEffect, useContext, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Editor from '@monaco-editor/react'
import '../ProblemsPage/ContestBattle.css'
import './TestsHub.css'

export default function TestTaker() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [test, setTest] = useState(null)
    const [currentProblemIdx, setCurrentProblemIdx] = useState(0)
    const [answers, setAnswers] = useState({}) // { [problemId]: { code, language, testResults } }
    const [timeLeft, setTimeLeft] = useState(0)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [result, setResult] = useState(null)
    const timerRef = useRef(null)
    const [isRunning, setIsRunning] = useState(false)
    const [showTestModal, setShowTestModal] = useState(false)
    
    // Security & Anti-Cheat
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [warnings, setWarnings] = useState(0)
    const [copyPasteCount, setCopyPasteCount] = useState(0)
    const [windowSwitchCount, setWindowSwitchCount] = useState(0)
    const [warningMessage, setWarningMessage] = useState('')

    // Resizable dragging logic
    const [resultsHeight, setResultsHeight] = useState(200);
    const dragging = useRef(false);
    const startY = useRef(0);
    const startH = useRef(200);

    const handleMouseDown = (e) => {
        dragging.current = true;
        startY.current = e.clientY;
        startH.current = resultsHeight;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!dragging.current) return;
        const delta = startY.current - e.clientY;
        setResultsHeight(Math.max(100, Math.min(800, startH.current + delta)));
    };

    const handleMouseUp = () => {
        dragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        fetchTest()
    }, [id])

    const fetchTest = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests/${id}`, { credentials: 'include' })
            const data = await res.json()
            if (data.success) {
                const t = data.test
                if (t.computedStatus !== 'active') {
                    alert('This test is not currently active.')
                    navigate('/tests')
                    return
                }
                setTest(t)
                // Calculate remaining time
                const start = new Date(t.scheduledAt)
                const end = new Date(start.getTime() + t.duration * 60 * 1000)
                const remaining = Math.max(0, Math.floor((end - new Date()) / 1000))
                setTimeLeft(remaining)

                // Init answers
                const initAnswers = {}
                t.problems.forEach(p => {
                    initAnswers[p._id] = {
                        code: p.startCode?.javascript || '',
                        language: 'javascript'
                    }
                })
                setAnswers(initAnswers)
            }
        } catch (err) {
            console.error('Error fetching test:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (timeLeft <= 0) return
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current)
                    handleSubmit(true) // auto-submit on time up
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timerRef.current)
    }, [timeLeft > 0 && !result])

    const formatTime = (s) => {
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60)
        const sec = s % 60
        return `${h > 0 ? `${String(h).padStart(2,'0')}:` : ''}${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
    }

    const timerClass = timeLeft > 600 ? 'safe' : timeLeft > 180 ? 'warning' : 'critical'

    const handleRunTests = async () => {
        const problem = test.problems[currentProblemIdx]
        const currentAnswer = answers[problem?._id] || { code: '', language: 'javascript' }

        if (!currentAnswer.code.trim()) {
            alert('Please write some code first!')
            return
        }

        setIsRunning(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests/${id}/run-problem/${problem._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    code: currentAnswer.code,
                    language: currentAnswer.language
                })
            })
            const data = await res.json()
            if (data.success) {
                setAnswers(prev => ({
                    ...prev,
                    [problem._id]: { ...prev[problem._id], testResults: data.testResults || [] }
                }))
                setShowTestModal(true)
            } else {
                alert('Error running tests: ' + (data.message || 'Unknown error'))
            }
        } catch (err) {
            console.error('Run Test error:', err)
            alert('Failed to run tests')
        } finally {
            setIsRunning(false)
        }
    }

    const handleWarning = (type) => {
        if (submitting || result) return;
        
        let newWarnings = warnings + 1;
        setWarnings(newWarnings);
        
        if (type === 'copy_paste') {
            setCopyPasteCount(prev => prev + 1);
            setWarningMessage(`⚠️ Warning ${newWarnings}/4: Copy/Paste is strictly prohibited!`);
        } else if (type === 'tab_switch' || type === 'exit_fullscreen') {
            setWindowSwitchCount(prev => prev + 1);
            setWarningMessage(`⚠️ Warning ${newWarnings}/4: Switching tabs/windows or exiting full screen is strictly prohibited!`);
        }

        setTimeout(() => setWarningMessage(''), 5000);

        if (newWarnings >= 4) {
            alert('🚨 You have exceeded the maximum allowed warnings (4). Your test is being auto-submitted.');
            handleSubmit(true, { autoSubmitted: true });
        }
    }

    useEffect(() => {
        if (!isFullscreen || result || submitting) return;

        const handleVisibilityChange = () => {
            if (document.hidden) handleWarning('tab_switch');
        };

        const handleBlur = () => {
            handleWarning('tab_switch');
        };

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'C' || e.key === 'V')) {
                e.preventDefault();
                handleWarning('copy_paste');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isFullscreen, result, submitting, warnings]);

    const enterFullscreen = async () => {
        try {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } catch (err) {
            alert('Failed to enter full screen. Required to take the test.');
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && isFullscreen && !result) {
                handleWarning('exit_fullscreen'); 
                setIsFullscreen(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isFullscreen, result, warnings]);

    const handleSubmit = async (isAutoSubmit = false, forceMetrics = null) => {
        if (!isAutoSubmit && !window.confirm('Are you sure you want to submit the test? You cannot change your answers after submitting.')) {
            return
        }

        setSubmitting(true)
        const payloadAnswers = test.problems.map(p => {
            const defaultStartCode = p.startCode?.javascript || '';
            const ans = answers[p._id] || { code: defaultStartCode, language: 'javascript' };
            return {
                problemId: p._id,
                code: ans.code,
                language: ans.language
            };
        });

        const finalCopy = forceMetrics?.copyPasteCount || copyPasteCount;
        const finalSwitch = forceMetrics?.windowSwitchCount || windowSwitchCount;
        const autoSubmitted = forceMetrics?.autoSubmitted || false;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests/${id}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    answers: payloadAnswers,
                    metrics: { copyPasteCount: finalCopy, windowSwitchCount: finalSwitch, autoSubmitted } 
                })
            })
            const data = await res.json()
            if (data.success) {
                setResult(data.result)
            } else {
                alert('Submit failed: ' + data.message)
                setSubmitting(false)
            }
        } catch (err) {
            console.error('Submit error:', err)
            alert('An error occurred during submission.')
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="test-result-screen">
                <div style={{ color: '#aaa', fontSize: '1.2rem' }}>⏳ Loading test...</div>
            </div>
        )
    }

    if (!test) {
        return (
            <div className="test-result-screen">
                <div style={{ color: '#ef4444', fontSize: '1.2rem' }}>Test not found.</div>
            </div>
        )
    }

    if (!isFullscreen && !result) {
        return (
            <div className="test-result-screen" style={{ flexDirection: 'column', gap: '20px' }}>
                <h1 style={{ color: '#fff' }}>Secure Test Environment 🔒</h1>
                <p style={{ color: '#aaa', maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' }}>
                    This test must be taken in Full Screen mode. Changing tabs, minimizing the window, or using Copy/Paste is <strong>strictly prohibited</strong>.
                    You will be given up to 3 warnings. On your 4th warning, your test will automatically be submitted.
                </p>
                <button 
                    onClick={enterFullscreen}
                    style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '15px 30px', fontSize: '1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }}
                >
                    🚀 Enter Full Screen to Start
                </button>
            </div>
        );
    }

    // Result screen
    if (result) {
        const pct = Math.round((result.score / (result.totalScore || 1)) * 100)
        return (
            <div className="test-result-screen">
                <div className="result-card">
                    <h2>🎉 Test Submitted!</h2>
                    <p className="result-subtitle">{test.title}</p>

                    <div style={{color: '#aaa', margin: '-10px 0 20px 0', fontSize: '1rem'}}>
                        📅 {new Date(test.scheduledAt).toLocaleDateString()} at {new Date(test.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>                    <div className="score-ring" style={{ '--pct': `${pct}%` }}>
                        <div className="score-text" style={{ fontSize: '2.5rem' }}>{result.score}</div>
                    </div>
                    <div style={{color: '#ff3366', fontWeight: 'bold', marginBottom: '20px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px'}}>
                        Score: {result.score} / {result.totalScore}
                    </div>

                    <div className="result-answers-list">
                        {result.answers?.map((ans, idx) => {
                            const prob = test.problems[idx]
                            return (
                                <div key={idx} className="result-answer-row">
                                    <span className="prob-name">{prob?.title || `Problem ${idx + 1}`}</span>
                                    <span className={`prob-result ${ans.passed ? 'passed' : 'failed'}`}>
                                        {ans.passed ? `✅ ${ans.passedTestCases}/${ans.totalTestCases} Cases Passed` : `❌ ${ans.passedTestCases}/${ans.totalTestCases} Cases Passed`}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <button className="result-back-btn" onClick={() => navigate('/tests')}>
                        ← Back to Tests
                    </button>
                </div>
            </div>
        )
    }

    const problem = test.problems[currentProblemIdx]
    const currentAnswer = answers[problem?._id] || { code: problem?.startCode?.javascript || '', language: 'javascript', testResults: [] }
    const currentTestResults = currentAnswer.testResults || []

    return (
        <div className="test-taker-theme contest-battle">
            {/* Header */}
            <div className="battle-header">
                <div className="header-left">
                    <h1>📝 Scheduled Test: {test.title}</h1>
                    <div className="problem-title">
                        Problem {currentProblemIdx + 1} of {test.problems.length}
                    </div>
                </div>
                
                <div className="header-center">
                    <div className="timer-display">
                        <span className={`time ${timeLeft < 300 ? 'critical' : ''}`}>
                            ⏱️ {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>

                <div className="header-right">
                    <button className="exit-btn" onClick={() => {
                        if (window.confirm('Leave test? Progress is only saved when submitted.')) navigate('/tests')
                    }}>✕ Exit</button>
                </div>
            </div>

            {/* Main Area */}
            <div className="battle-container">
                {/* Left Panel */}
                <div className="left-panel">
                    <div className="panel-tabs">
                        <div className="tab active">📋 Description</div>
                        {/* Pagination inside tabs bar */}
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px', padding: '0.5rem' }}>
                            <button
                                style={{ background: '#1a1a1a', border: '1px solid #333', color: '#ccc', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: currentProblemIdx > 0 ? 'pointer' : 'not-allowed', opacity: currentProblemIdx > 0 ? 1 : 0.5 }}
                                disabled={currentProblemIdx === 0}
                                onClick={() => setCurrentProblemIdx(p => p - 1)}
                            >← Prev</button>
                            <button
                                style={{ background: '#1a1a1a', border: '1px solid #333', color: '#ccc', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: currentProblemIdx < test.problems.length - 1 ? 'pointer' : 'not-allowed', opacity: currentProblemIdx < test.problems.length - 1 ? 1 : 0.5 }}
                                disabled={currentProblemIdx === test.problems.length - 1}
                                onClick={() => setCurrentProblemIdx(p => p + 1)}
                            >Next →</button>
                        </div>
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

                                {problem.constraints && (
                                    <div className="constraints-section">
                                        <h4>📋 Constraints:</h4>
                                        <p>{problem.constraints}</p>
                                    </div>
                                )}

                                {problem.examples?.length > 0 && (
                                    <div className="examples-section">
                                        <h4>🔍 Examples:</h4>
                                        {problem.examples.map((example, idx) => (
                                            <div key={idx} className="example">
                                                <div className="example-title">Example {idx + 1}:</div>
                                                <code>{example.input}</code>
                                                <code className="output">{example.output}</code>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    <div className="editor-section my-editor">
                        <div className="editor-header">
                            <h3>🔵 Code Editor</h3>
                        </div>

                        <div className="language-selector">
                            <select 
                                value={currentAnswer.language}
                                onChange={e => {
                                    const newLang = e.target.value;
                                    const starterCode = problem?.startCode?.[newLang] || '';
                                    setAnswers(prev => ({
                                        ...prev,
                                        [problem._id]: { ...prev[problem._id], language: newLang, code: starterCode }
                                    }))
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
                            language={currentAnswer.language}
                            value={currentAnswer.code}
                            onChange={val => setAnswers(prev => ({
                                ...prev,
                                [problem._id]: { ...prev[problem._id], code: val || '' }
                            }))}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                wordWrap: 'on',
                                automaticLayout: true
                            }}
                        />

                        {/* Drag-to-resize Execution Results */}
                        <div 
                            className="test-results-container" 
                            style={{ 
                                height: currentTestResults.length > 0 ? `${resultsHeight}px` : '0px', 
                                borderTop: currentTestResults.length > 0 ? '2px solid #ff3366' : 'none',
                                background: '#0a0a0a',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: dragging.current ? 'none' : 'height 0.2s ease',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Drag Handle */}
                            <div 
                                className="drag-handle"
                                onMouseDown={handleMouseDown}
                                style={{
                                    height: '10px',
                                    cursor: 'ns-resize',
                                    background: 'rgba(255, 51, 102, 0.1)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ width: '40px', height: '3px', background: '#ff3366', borderRadius: '3px' }}></div>
                            </div>
                            
                            <h4 className="test-header" style={{ margin: '10px 15px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>EXECUTION RESULTS</h4>
                            <div className="test-cases" style={{ overflowY: 'auto', flex: 1, padding: '0 15px 15px' }}>
                                {currentTestResults.map((tr) => (
                                    <div key={tr.caseId} className={`test-case ${tr.passed ? 'passed' : 'failed'}`} style={{ padding: '10px', marginBottom: '8px', background: tr.passed ? 'rgba(255, 51, 102, 0.05)' : 'rgba(255, 0, 0, 0.05)', borderLeft: `3px solid ${tr.passed ? '#ff3366' : '#ff0000'}`, borderRadius: '4px' }}>
                                        <div className="test-status" style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>
                                            Case {tr.caseId}: {tr.passed ? '✅ Passed' : '❌ Failed'}
                                        </div>
                                        <div style={{ marginTop: '5px', fontSize: '0.85rem', color: '#aaa' }}>
                                            <div><strong>Input:</strong> {tr.input}</div>
                                            <div><strong>Expected:</strong> {tr.expected}</div>
                                            <div style={{ color: tr.passed ? '#ff3366' : '#ff4444' }}><strong>Output:</strong> {tr.output || tr.error || 'N/A'}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="button-group" style={{ marginTop: '10px' }}>
                            <button 
                                className="run-btn"
                                onClick={handleRunTests}
                                disabled={isRunning}
                            >
                                {isRunning ? '⏳ Running...' : '▶️ Run Tests'}
                            </button>
                            <button 
                                className="submit-btn"
                                onClick={() => handleSubmit(false)}
                                disabled={submitting}
                            >
                                🚀 {submitting ? 'Submitting...' : 'Submit All & Finish'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
                                {currentTestResults.filter(t => t.passed).length}/{currentTestResults.length}
                            </div>
                            <div className="test-count-label">Test Cases Passed</div>
                        </div>

                        <div className="test-modal-cases">
                            {currentTestResults.map((result) => (
                                <div key={result.caseId} className={`test-modal-case ${result.passed ? 'passed' : 'failed'}`}>
                                    <div className="test-modal-status">
                                        Test Case {result.caseId}: {result.passed ? '✅ Passed' : '❌ Failed'}
                                    </div>
                                    
                                    <div className="test-modal-details">
                                        <div><strong>Input:</strong> <code>{result.input}</code></div>
                                        <div><strong>Expected:</strong> <code>{result.expected}</code></div>
                                        <div><strong>Output:</strong> <code>{result.output || result.error || 'No Output'}</code></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
