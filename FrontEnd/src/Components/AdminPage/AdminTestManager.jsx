import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import '../TestsPage/TestsHub.css'

export default function AdminTestManager() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [tests, setTests] = useState([])
    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState({ type: '', text: '' })
    const [activeTestResults, setActiveTestResults] = useState(null)

    const [form, setForm] = useState({
        title: '',
        description: '',
        selectedProblems: [],
        scheduledAt: '',
        duration: 60
    })

    useEffect(() => {
        fetchTests()
        fetchProblems()
    }, [])

    const fetchTests = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests`, { credentials: 'include' })
            const data = await res.json()
            if (data.success) setTests(data.tests)
        } catch (err) { console.error(err) }
    }

    const fetchProblems = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/problems`, { credentials: 'include' })
            const data = await res.json()
            if (data.problems) setProblems(data.problems)
        } catch (err) { console.error(err) }
    }

    const toggleProblem = (id) => {
        setForm(prev => ({
            ...prev,
            selectedProblems: prev.selectedProblems.includes(id)
                ? prev.selectedProblems.filter(p => p !== id)
                : [...prev.selectedProblems, id]
        }))
    }

    const handleCreate = async () => {
        if (!form.title.trim()) { setMsg({ type: 'error', text: 'Title is required' }); return }
        if (form.selectedProblems.length === 0) { setMsg({ type: 'error', text: 'Select at least one problem' }); return }
        if (!form.scheduledAt) { setMsg({ type: 'error', text: 'Scheduled date/time is required' }); return }

        setLoading(true)
        setMsg({ type: '', text: '' })
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    problems: form.selectedProblems,
                    scheduledAt: form.scheduledAt,
                    duration: Number(form.duration)
                })
            })
            const data = await res.json()
            if (data.success) {
                setMsg({ type: 'success', text: '✅ Test created successfully!' })
                setForm({ title: '', description: '', selectedProblems: [], scheduledAt: '', duration: 60 })
                fetchTests()
            } else {
                setMsg({ type: 'error', text: data.message || 'Failed to create test' })
            }
        } catch (err) {
            setMsg({ type: 'error', text: 'Error: ' + err.message })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (testId) => {
        if (!window.confirm('Delete this test?')) return
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests/${testId}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await res.json()
            if (data.success) fetchTests()
        } catch (err) { console.error(err) }
    }

    const handleReleaseToggle = async (testId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/tests/${testId}/release-results`, {
                method: 'PUT',
                credentials: 'include'
            })
            const data = await res.json()
            if (data.success) fetchTests()
            else alert(data.message)
        } catch (err) { console.error(err) }
    }

    return (
        <div className="admin-test-manager">
            <div className="atm-header">
                <h1>📝 Manage Tests</h1>
                <button className="atm-back-btn" onClick={() => navigate('/admin/dashboard')}>← Dashboard</button>
            </div>

            <div className="atm-layout">
                {/* Create form */}
                <div className="atm-form-card">
                    <h2>➕ Schedule New Test</h2>

                    <div className="atm-field">
                        <label>Test Title *</label>
                        <input
                            type="text"
                            placeholder="e.g. Weekly DSA Challenge"
                            value={form.title}
                            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                        />
                    </div>

                    <div className="atm-field">
                        <label>Description</label>
                        <textarea
                            placeholder="Brief description for students..."
                            value={form.description}
                            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        />
                    </div>

                    <div className="atm-field">
                        <label>Scheduled Date & Time *</label>
                        <input
                            type="datetime-local"
                            value={form.scheduledAt}
                            onChange={e => setForm(p => ({ ...p, scheduledAt: e.target.value }))}
                        />
                    </div>

                    <div className="atm-field">
                        <label>Duration (minutes) *</label>
                        <input
                            type="number"
                            min="10"
                            max="480"
                            value={form.duration}
                            onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                        />
                    </div>

                    <div className="atm-field">
                        <label>Select Problems * ({form.selectedProblems.length} selected)</label>
                        <div className="atm-problem-list">
                            {problems.length === 0 && (
                                <div style={{ color: '#555', padding: '0.5rem', fontSize: '0.85rem' }}>No problems found. Create problems first.</div>
                            )}
                            {problems.map(p => (
                                <label key={p._id} className="atm-problem-item">
                                    <input
                                        type="checkbox"
                                        checked={form.selectedProblems.includes(p._id)}
                                        onChange={() => toggleProblem(p._id)}
                                    />
                                    {p.title}
                                    <span className={`diff-tag ${p.difficulty}`}>{p.difficulty}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="atm-submit-btn" onClick={handleCreate} disabled={loading}>
                        {loading ? '⏳ Creating...' : '🚀 Create Test'}
                    </button>

                    {msg.text && (
                        <div className={msg.type === 'success' ? 'atm-success' : 'atm-error'}>{msg.text}</div>
                    )}
                </div>

                {/* Tests list */}
                <div className="atm-tests-card">
                    <h2>📋 Scheduled Tests ({tests.length})</h2>

                    {tests.length === 0 ? (
                        <div className="atm-empty">No tests scheduled yet.</div>
                    ) : (
                        tests.map(t => (
                            <div key={t._id} className="atm-test-row">
                                <div className="atm-test-row-info">
                                    <h4>{t.title}</h4>
                                    <p>{t.description || 'No description'}</p>
                                    <div className="atm-meta">
                                        📅 {new Date(t.scheduledAt).toLocaleString()} &nbsp;|&nbsp;
                                        ⏱ {t.duration} mins &nbsp;|&nbsp;
                                        📋 {t.problems?.length || 0} problems &nbsp;|&nbsp;
                                        <span style={{ color: t.computedStatus === 'active' ? '#10b981' : t.computedStatus === 'upcoming' ? '#f59e0b' : '#666' }}>
                                            {t.computedStatus}
                                        </span>
                                        {t.submissions?.length > 0 && <> &nbsp;|&nbsp; 👥 {t.submissions.length} submissions</>}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                                    <button
                                        style={{
                                            background: t.resultsReleased ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                                            color: t.resultsReleased ? '#ef4444' : '#10b981',
                                            border: `1px solid ${t.resultsReleased ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                                            padding: '0.4rem 0.9rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: '0.2s'
                                        }}
                                        onClick={() => handleReleaseToggle(t._id)}
                                    >
                                        {t.resultsReleased ? '🚫 Hide Results' : '📢 Release Results'}
                                    </button>
                                    
                                    {t.submissions?.length > 0 && (
                                        <button 
                                            style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                                            onClick={() => setActiveTestResults(t)}
                                        >
                                            📊 Results
                                        </button>
                                    )}
                                    <button className="atm-delete-btn" onClick={() => handleDelete(t._id)}>
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Results Modal */}
            {activeTestResults && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(8px)' }} onClick={() => setActiveTestResults(null)}>
                    <div style={{ background: '#0a0a0a', border: '2px solid rgba(59, 130, 246, 0.4)', padding: '2rem', borderRadius: '14px', maxWidth: '600px', width: '90%', boxShadow: '0 25px 50px rgba(0,0,0,0.8)' }} onClick={e => e.stopPropagation()}>
                        <div style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0, color: '#fff', fontSize: '1.4rem' }}>📊 Results: {activeTestResults.title}</h2>
                            <button 
                                style={{ background: 'rgba(255,68,68,0.1)', color: '#ff4444', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }} 
                                onClick={() => setActiveTestResults(null)}
                            >✕</button>
                        </div>
                        
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {activeTestResults.submissions?.length === 0 ? (
                                <p style={{ color: '#888', textAlign: 'center', padding: '2rem 0' }}>No submissions yet.</p>
                            ) : (
                                <table style={{ width: '100%', color: '#ccc', borderCollapse: 'collapse' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#0a0a0a', zIndex: 1 }}>
                                        <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                                            <th style={{ padding: '12px 10px', color: '#888' }}>Student</th>
                                            <th style={{ padding: '12px 10px', color: '#888' }}>Score</th>
                                            <th style={{ padding: '12px 10px', color: '#888' }}>Warnings (C/P | Tab)</th>
                                            <th style={{ padding: '12px 10px', color: '#888' }}>Auto-Submit</th>
                                            <th style={{ padding: '12px 10px', color: '#888' }}>Submitted At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeTestResults.submissions.map((sub, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #222' }}>
                                                <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#fff' }}>{sub.username || 'Student'}</td>
                                                <td style={{ padding: '12px 10px', color: '#3b82f6', fontWeight: '900', fontSize: '1.1rem' }}>{sub.score} / {sub.totalScore}</td>
                                                <td style={{ padding: '12px 10px', color: '#f59e0b', fontWeight: 'bold' }}>
                                                    {sub.copyPasteCount || 0} | {sub.windowSwitchCount || 0}
                                                </td>
                                                <td style={{ padding: '12px 10px', color: sub.autoSubmitted ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                                                    {sub.autoSubmitted ? '🚨 Forced' : '✅ Normal'}
                                                </td>
                                                <td style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#666' }}>
                                                    {new Date(sub.submittedAt).toLocaleDateString()} {new Date(sub.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
