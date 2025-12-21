import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProblemById } from '../../services/problemApi'
import CodeEditor from './CodeEditor'
import './ProblemSolver.css'

export default function ProblemSolver() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [panelSize, setPanelSize] = useState(50)
  const [rightPanelOutputSize, setRightPanelOutputSize] = useState(40)
  const [hasRun, setHasRun] = useState(false)
  const [selectedTestCase, setSelectedTestCase] = useState(0)
  const [testResults, setTestResults] = useState(null)
  const isDraggingH = useRef(false)
  const isDraggingV = useRef(false)

  // Fetch problem from database
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProblemById(id)
        setProblem(data)
        // Set starter code
        if (data.startCode && data.startCode[language]) {
          setCode(data.startCode[language])
        }
      } catch (err) {
        console.error('Error fetching problem:', err)
        setError(err.message || 'Failed to fetch problem')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchProblem()
    }
  }, [id])

  // Update code when language changes
  useEffect(() => {
    if (problem && problem.startCode && problem.startCode[language]) {
      setCode(problem.startCode[language])
    } else {
      setCode('')
    }
  }, [language, problem])

  const handleRunCode = async () => {
    if (!code.trim()) {
      alert('Please write some code first')
      return
    }

    setIsRunning(true)
    setOutput('Running code...\n')
    setHasRun(false)
    
    try {
      const response = await fetch('http://localhost:3000/api/problems/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          problemId: id,
          language: language,
          code: code
        })
      })

      const data = await response.json()
      
      if (response.ok && data.testResults) {
        const passedCount = data.testResults.filter(r => r.passed).length
        setTestResults({
          allPassed: data.allPassed,
          passedCount: passedCount,
          totalCases: data.testResults.length,
          testResults: data.testResults
        })
        setHasRun(true)
        
        if (data.allPassed) {
          setOutput('✅ All test cases passed!\n')
        } else {
          setOutput(`❌ ${data.testResults.length - passedCount} test case(s) failed\n`)
        }
      } else {
        setOutput(`Error: ${data.message || 'Failed to run code'}\n`)
        setTestResults(null)
        setHasRun(false)
      }
    } catch (error) {
      console.error('Error running code:', error)
      setOutput(`Error: ${error.message}\n`)
      setTestResults(null)
      setHasRun(false)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please write some code first')
      return
    }

    setIsRunning(true)
    setOutput('Submitting solution...\n')
    setHasRun(false)
    
    try {
      const response = await fetch('http://localhost:3000/api/problems/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          problemId: id,
          language: language,
          code: code
        })
      })

      const data = await response.json()
      
      if (response.ok && data.testResults) {
        const passedCount = data.testResults.filter(r => r.passed).length
        setTestResults({
          allPassed: data.allPassed,
          passedCount: passedCount,
          totalCases: data.testResults.length,
          testResults: data.testResults,
          submission: true
        })
        setHasRun(true)
        
        if (data.allPassed) {
          setOutput('✅ Solution Accepted!\n')
        } else {
          setOutput(`❌ Solution Failed: ${data.testResults.length - passedCount} test case(s) failed\n`)
        }
      } else {
        setOutput(`Error: ${data.message || 'Failed to submit'}\n`)
        setTestResults(null)
        setHasRun(false)
      }
    } catch (error) {
      console.error('Error submitting code:', error)
      setOutput(`Error: ${error.message}\n`)
      setTestResults(null)
      setHasRun(false)
    } finally {
      setIsRunning(false)
    }
  }

  const handleMouseMoveHorizontal = (e) => {
    if (!isDraggingH.current) return
    const container = document.querySelector('.solver-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      const newSize = ((e.clientX - rect.left) / rect.width) * 100
      if (newSize > 30 && newSize < 70) {
        setPanelSize(newSize)
      }
    }
  }

  const handleMouseMoveVertical = (e) => {
    if (!isDraggingV.current) return
    const rightPanel = document.querySelector('.right-panel')
    if (rightPanel) {
      const rect = rightPanel.getBoundingClientRect()
      const newSize = ((e.clientY - rect.top) / rect.height) * 100
      if (newSize > 20 && newSize < 80) {
        setRightPanelOutputSize(newSize)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveHorizontal)
    window.addEventListener('mousemove', handleMouseMoveVertical)
    window.addEventListener('mouseup', () => {
      isDraggingH.current = false
      isDraggingV.current = false
    })
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveHorizontal)
      window.removeEventListener('mousemove', handleMouseMoveVertical)
    }
  }, [])

  if (loading) {
    return (
      <div className="solver-loading">
        <div className="spinner"></div>
        <p>Loading problem...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="solver-error">
        <div className="error-content">
          <h2>Error Loading Problem</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/problems')} className="back-btn">
            ← Back to Problems
          </button>
        </div>
      </div>
    )
  }

  if (!problem) {
    return (
      <div className="solver-error">
        <div className="error-content">
          <h2>Problem Not Found</h2>
          <button onClick={() => navigate('/problems')} className="back-btn">
            ← Back to Problems
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="solver-wrapper">
      {/* Top Header */}
      <header className="solver-header">
        <div className="header-left">
          <button onClick={() => navigate('/problems')} className="logo-btn" title="Back to problems">
            ← Back
          </button>
          <h1 className="problem-title">{problem.title}</h1>
          <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>
        <div className="header-right">
          <button className="icon-btn" title="Like">❤️</button>
          <button className="icon-btn" title="Share">📤</button>
          <button className="icon-btn" title="Settings">⚙️</button>
        </div>
      </header>

      {/* Main Container */}
      <div className="solver-container">
        {/* Left Panel - Problem Description */}
        <div className="left-panel" style={{ width: `${panelSize}%` }}>
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              📋 Description
            </button>
            <button 
              className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('submissions')}
            >
              📊 Submissions
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h2>{problem.title}</h2>
                
                <div className="meta-info">
                  <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                  <span className="category">{problem.category}</span>
                </div>

                <div className="problem-section">
                  <h3>Description</h3>
                  <p>{problem.description}</p>
                </div>

                {problem.examples && problem.examples.length > 0 && (
                  <div className="problem-section">
                    <h3>Examples</h3>
                    {problem.examples.map((example, idx) => (
                      <div key={idx} className="example">
                        <div className="example-item">
                          <strong>Input:</strong> {example.input}
                        </div>
                        <div className="example-item">
                          <strong>Output:</strong> {example.output}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints && (
                  <div className="problem-section">
                    <h3>Constraints</h3>
                    <p>{problem.constraints}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="submissions-content">
                <h3>Your Submissions</h3>
                <p>No submissions yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div 
          className="divider divider-horizontal"
          onMouseDown={() => { isDraggingH.current = true }}
        ></div>

        {/* Right Panel - Code Editor and Output */}
        <div className="right-panel" style={{ width: `${100 - panelSize}%` }}>
          {/* Editor Section */}
          <div className="editor-wrapper" style={{ height: `${rightPanelOutputSize}%` }}>
            <div className="editor-header">
              <div className="language-selector">
                <label>Language:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>
              <div className="editor-actions">
                <button 
                  onClick={handleRunCode} 
                  className="btn btn-run"
                  disabled={isRunning}
                >
                  ▶️ Run
                </button>
                <button 
                  onClick={handleSubmit}
                  className="btn btn-submit"
                  disabled={isRunning}
                >
                  ✓ Submit
                </button>
              </div>
            </div>

            <div className="editor-section">
              <CodeEditor
                value={code}
                onChange={(e) => setCode(e.target.value)}
                language={language}
              />
            </div>
          </div>

          {/* Vertical Divider */}
          <div 
            className="divider divider-vertical"
            onMouseDown={() => { isDraggingV.current = true }}
          ></div>

          {/* Output and Test Cases Section */}
          <div className="output-wrapper" style={{ height: `${100 - rightPanelOutputSize}%` }}>
            {/* Output Tab */}
            <div className="output-section">
              {!hasRun || !testResults ? (
                <div className="output-box">
                  <pre>{output || 'Run your code to see output...'}</pre>
                </div>
              ) : (
                <div className="test-results-container">
                  <div className="test-results-header">
                    {testResults.allPassed ? (
                      <span className="test-status-badge accepted">✓ ACCEPTED</span>
                    ) : (
                      <span className="test-status-badge rejected">✗ FAILED</span>
                    )}
                    <span className="test-runtime">Passed: {testResults.passedCount}/{testResults.totalCases}</span>
                  </div>
                  <div className="test-cases-results">
                    {testResults.testResults && testResults.testResults.map((result, i) => (
                      <div key={i} className={`test-case-result-badge ${result.passed ? 'passed' : 'failed'}`}>
                        <span className={`test-badge-check ${result.passed ? 'check' : 'cross'}`}>
                          {result.passed ? '✓' : '✗'}
                        </span>
                        <span>Case {i + 1}</span>
                      </div>
                    ))}
                  </div>
                  {testResults.testResults && !testResults.allPassed && (
                    <div className="failed-test-details">
                      {testResults.testResults.map((result, i) => (
                        !result.passed && (
                          <div key={i} className="failed-case">
                            <strong>Test Case {i + 1} Failed:</strong>
                            <div><strong>Input:</strong> <code>{result.input}</code></div>
                            <div><strong>Expected:</strong> <code>{result.expected}</code></div>
                            <div><strong>Got:</strong> <code>{result.actual || 'No output'}</code></div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Test Cases Tab */}
            <div className="testcase-section">
              <div className="testcases-list">
                {problem.testCases && problem.testCases.map((tc, idx) => (
                  <button 
                    key={idx} 
                    className={`testcase-tab ${selectedTestCase === idx ? 'active' : ''}`}
                    onClick={() => setSelectedTestCase(idx)}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>
              
              {problem.testCases && problem.testCases.length > 0 && (
                <div className="testcase-details">
                  <div className="testcase-input-output">
                    <div className="testcase-input-group">
                      <strong>Input:</strong>
                      <code>{problem.testCases[selectedTestCase]?.input}</code>
                    </div>
                    <div className="testcase-output-group">
                      <strong>Expected Output:</strong>
                      <code>{problem.testCases[selectedTestCase]?.output}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
