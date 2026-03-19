import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './TestsHub.css'

function useCountdown(scheduledAt) {
    const [timeLeft, setTimeLeft] = useState('')
    useEffect(() => {
        const tick = () => {
            const diff = new Date(scheduledAt) - new Date()
            if (diff <= 0) { setTimeLeft(''); return }
            const h = Math.floor(diff / 3600000)
            const m = Math.floor((diff % 3600000) / 60000)
            const s = Math.floor((diff % 60000) / 1000)
            setTimeLeft(`${h > 0 ? `${h}h ` : ''}${m}m ${s}s`)
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [scheduledAt])
    return timeLeft
}

function TestCard({ test, onTake, user }) {
    const countdown = useCountdown(test.scheduledAt)
    const status = test.computedStatus
    const hasSubmitted = test.submissions?.some(s => String(s.userId) === String(user?._id))

    return (
        <div className={`test-card ${status}`}>
            <div className="test-card-header">
                <h3>{test.title}</h3>
                <span className={`test-status-badge ${status}`}>
                    {status === 'upcoming' ? '⏰ Upcoming' : status === 'active' ? '🟢 Live' : '✅ Ended'}
                </span>
            </div>

            {test.description && <p className="test-card-desc">{test.description}</p>}

            <div className="test-card-meta">
                <span className="meta-item">📋 {test.problems?.length || 0} Problems</span>
                <span className="meta-item">⏱ {test.duration} mins</span>
                <span className="meta-item">📅 {new Date(test.scheduledAt).toLocaleString()}</span>
                {test.createdBy && (
                    <span className="meta-item">👤 {test.createdBy.firstname}</span>
                )}
            </div>

            {test.problems?.length > 0 && (
                <div className="test-problems-preview">
                    {test.problems.map(p => (
                        <span key={p._id} className={`problem-chip ${p.difficulty}`}>{p.title}</span>
                    ))}
                </div>
            )}

            {status === 'upcoming' && countdown && (
                <div className="test-countdown">⏳ Starts in: {countdown}</div>
            )}

            {hasSubmitted ? (
                <button className="take-test-btn btn-completed" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    ✅ Already Submitted
                </button>
            ) : status === 'active' ? (
                <button className="take-test-btn btn-active" onClick={() => onTake(test._id)}>
                    🚀 Take Test
                </button>
            ) : status === 'upcoming' ? (
                <button className="take-test-btn btn-disabled" disabled>
                    🔒 Not Started Yet
                </button>
            ) : (
                <button className="take-test-btn btn-completed">
                    ✅ Test Ended
                </button>
            )}
        </div>
    )
}

export default function TestsHub() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [tests, setTests] = useState([])
    const [myResults, setMyResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all')

    useEffect(() => {
        fetchTests()
        fetchMyResults()
    }, [])

    const fetchMyResults = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests/my-results`, { credentials: 'include' })
            const data = await res.json()
            if (data.success) setMyResults(data.results)
        } catch (err) {
            console.error('Error fetching results:', err)
        }
    }

    const fetchTests = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests`, { credentials: 'include' })
            const data = await res.json()
            if (data.success) setTests(data.tests)
        } catch (err) {
            console.error('Error fetching tests:', err)
        } finally {
            setLoading(false)
        }
    }

    const filtered = tests.filter(t => {
        if (activeTab === 'all') return true
        return t.computedStatus === activeTab
    })

    return (
        <div className="tests-hub">
            <div className="tests-hero">
                <h1>📝 Scheduled Tests</h1>
                <p>Participate in admin-scheduled tests and track your progress</p>
            </div>

            <div className="tests-tabs">
                {['all', 'upcoming', 'active', 'completed', 'results'].map(tab => (
                    <button
                        key={tab}
                        className={`tests-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'all' ? '🗂 All' :
                         tab === 'upcoming' ? '⏰ Upcoming' :
                         tab === 'active' ? '🟢 Live Now' : 
                         tab === 'completed' ? '✅ Past' : '🏆 Results'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="tests-empty">
                    <span>⏳</span>
                    <p>Loading...</p>
                </div>
            ) : activeTab === 'results' ? (
                <div className="tests-grid">
                    {myResults.length === 0 ? (
                        <div className="tests-empty" style={{ gridColumn: '1 / -1' }}>
                            <span>🏆</span>
                            <p>No test results available yet.</p>
                        </div>
                    ) : (
                        myResults.map(res => (
                            <div key={res.testId} className="test-card completed">
                                <div className="test-card-header">
                                    <h3>{res.testTitle}</h3>
                                    <span className="test-status-badge completed">✅ Released</span>
                                </div>
                                <div className="test-card-meta">
                                    <span className="meta-item">📅 {new Date(res.scheduledAt).toLocaleDateString()}</span>
                                    <span className="meta-item">🕒 Submitted: {new Date(res.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <div style={{ background: '#111', padding: '15px', borderRadius: '10px', marginTop: '15px', border: '1px solid #222' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Score</span>
                                        <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>{res.score} / {res.totalScore}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <span style={{ color: '#aaa', fontSize: '0.9rem' }}>My Rank</span>
                                        <strong style={{ color: '#3b82f6', fontSize: '1.1rem' }}>#{res.rank}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Total Participants</span>
                                        <strong style={{ color: '#fff', fontSize: '1rem' }}>{res.totalParticipants}</strong>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : filtered.length === 0 ? (
                <div className="tests-empty">
                    <span>📭</span>
                    <p>No {activeTab !== 'all' ? activeTab : ''} tests found</p>
                </div>
            ) : (
                <div className="tests-grid">
                    {filtered.map(test => (
                        <TestCard
                            key={test._id}
                            test={test}
                            user={user}
                            onTake={(id) => navigate(`/tests/${id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
