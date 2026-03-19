import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProblem } from '../../services/problemApi'
import { useProblems } from '../../context/ProblemContext'
import './CreateProblemPage.css'

export default function CreateProblemPage() {
  const navigate = useNavigate()
  const { addProblem } = useProblems()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    category: '',
    constraints: '',
    examples: [{ input: '', output: '' }],
    testCases: [{ input: '', output: '', hidden: false }],
    startCode: {
      javascript: '',
      python: '',
      cpp: '',
      java: ''
    },
    referenceSolution: {
      javascript: '',
      python: '',
      cpp: '',
      java: ''
    }
  })

  const [activeTab, setActiveTab] = useState('basic')
  const [errors, setErrors] = useState({})
  const [validatingReference, setValidatingReference] = useState(null)
  const [validationStatus, setValidationStatus] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleExampleChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.map((ex, i) => 
        i === index ? { ...ex, [field]: value } : ex
      )
    }))
  }

  const handleTestCaseChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) => 
        i === index ? { ...tc, [field]: value } : tc
      )
    }))
  }

  const handleStartCodeChange = (language, value) => {
    setFormData(prev => ({
      ...prev,
      startCode: {
        ...prev.startCode,
        [language]: value
      }
    }))
  }

  const handleReferenceSolutionChange = (language, value) => {
    setFormData(prev => ({
      ...prev,
      referenceSolution: {
        ...prev.referenceSolution,
        [language]: value
      }
    }))
  }

  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev.examples, { input: '', output: '' }]
    }))
  }

  const removeExample = (index) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }))
  }

  const addTestCase = () => {
    setFormData(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: '', output: '', hidden: false }]
    }))
  }

  const removeTestCase = (index) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.category.trim()) newErrors.category = 'Category is required'
    if (!formData.constraints.trim()) newErrors.constraints = 'Constraints are required'
    if (formData.examples.some(ex => !ex.input.trim() || !ex.output.trim())) {
      newErrors.examples = 'All examples must have input and output'
    }
    if (formData.testCases.some(tc => !tc.input.trim() || !tc.output.trim())) {
      newErrors.testCases = 'All test cases must have input and output'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateReferenceSolution = async (language) => {
    const code = formData.referenceSolution[language]
    if (!code || !code.trim()) {
      setValidationStatus(prev => ({
        ...prev,
        [language]: { error: 'Code cannot be empty' }
      }))
      return
    }

    setValidatingReference(language)
    setValidationStatus(prev => ({
      ...prev,
      [language]: { validating: true, message: 'Validating against test cases...' }
    }))

    try {
      // First, create the problem without reference solutions
      const problemData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        difficulty: formData.difficulty.trim(),
        category: formData.category.trim(),
        constraints: formData.constraints.trim(),
        examples: formData.examples.map(ex => ({
          input: String(ex.input).trim(),
          output: String(ex.output).trim()
        })),
        testCases: formData.testCases.map(tc => ({
          input: String(tc.input).trim(),
          output: String(tc.output).trim(),
          hidden: tc.hidden || false
        })),
        startCode: {
          javascript: formData.startCode.javascript || '',
          python: formData.startCode.python || '',
          cpp: formData.startCode.cpp || '',
          java: formData.startCode.java || ''
        }
      }

      // Create problem first if it doesn't exist
      const createdProblem = await createProblem(problemData)
      const problemId = createdProblem._id

      // Now validate the reference solution
      const response = await fetch('/api/problems/reference/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          problemId: problemId,
          language: language,
          code: code
        })
      })

      if (!response.ok) {
        throw new Error('Validation request failed')
      }

      const validationData = await response.json()
      
      // Poll for status
      setTimeout(async () => {
        try {
          const statusResponse = await fetch('/api/problems/reference/check-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              problemId: problemId,
              language: language,
              token: validationData.token,
              code: code
            })
          })

          const statusData = await statusResponse.json()

          if (statusData.allPassed) {
            setValidationStatus(prev => ({
              ...prev,
              [language]: { success: true, message: 'All test cases passed! ✓' }
            }))
            setValidatingReference(null)
          } else {
            setValidationStatus(prev => ({
              ...prev,
              [language]: { error: 'Some test cases failed', details: statusData.failedTests }
            }))
            setValidatingReference(null)
          }
        } catch (err) {
          setValidationStatus(prev => ({
            ...prev,
            [language]: { error: 'Failed to check validation status: ' + err.message }
          }))
          setValidatingReference(null)
        }
      }, 2000)
    } catch (err) {
      setValidationStatus(prev => ({
        ...prev,
        [language]: { error: err.message }
      }))
      setValidatingReference(null)
    }
  }

  const handleCreateProblem = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      alert('Please fill in all required fields correctly')
      return
    }

    try {
      // Prepare data for backend - ensure all fields are properly formatted
      const problemData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        difficulty: formData.difficulty.trim(),
        category: formData.category.trim(),
        constraints: formData.constraints.trim(),
        examples: formData.examples.map(ex => ({
          input: String(ex.input).trim(),
          output: String(ex.output).trim()
        })),
        testCases: formData.testCases.map(tc => ({
          input: String(tc.input).trim(),
          output: String(tc.output).trim(),
          hidden: tc.hidden || false
        })),
        startCode: {
          javascript: formData.startCode.javascript || '',
          python: formData.startCode.python || '',
          cpp: formData.startCode.cpp || '',
          java: formData.startCode.java || ''
        }
      }

      console.log('Sending problem data:', problemData)

      // Send to backend
      const createdProblem = await createProblem(problemData)

      console.log('Problem created successfully:', createdProblem)
      
      // Add problem to context so it reflects immediately in Problems page
      addProblem(createdProblem)
      
      alert('Problem created successfully! ID: ' + createdProblem._id)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        difficulty: 'Easy',
        category: '',
        constraints: '',
        examples: [{ input: '', output: '' }],
        testCases: [{ input: '', output: '', hidden: false }],
        startCode: {
          javascript: '',
          python: '',
          cpp: '',
          java: ''
        },
        referenceSolution: {
          javascript: '',
          python: '',
          cpp: '',
          java: ''
        }
      })
      
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error creating problem:', error)
      console.error('Error details:', error.message)
      alert('Error creating problem: ' + error.message)
    }
  }

  return (
    <div className="create-problem-container">
      {/* Header */}
      <header className="create-problem-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          ← Back
        </button>
        <h1>Create New Problem</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="create-problem-main">
        <div className="create-problem-wrapper">
          {/* Tabs Navigation */}
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              📋 Basic Info
            </button>
            <button 
              className={`tab-btn ${activeTab === 'examples' ? 'active' : ''}`}
              onClick={() => setActiveTab('examples')}
            >
              📝 Examples
            </button>
            <button 
              className={`tab-btn ${activeTab === 'testcases' ? 'active' : ''}`}
              onClick={() => setActiveTab('testcases')}
            >
              🧪 Test Cases
            </button>
            <button 
              className={`tab-btn ${activeTab === 'starter' ? 'active' : ''}`}
              onClick={() => setActiveTab('starter')}
            >
              💻 Starter Code
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reference' ? 'active' : ''}`}
              onClick={() => setActiveTab('reference')}
            >
              ✔️ Reference Solution
            </button>
          </div>

          <form onSubmit={handleCreateProblem} className="create-problem-form">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="tab-content">
                <div className="form-group">
                  <label htmlFor="title">Problem Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Two Sum"
                    className={errors.title ? 'error' : ''}
                  />
                  {errors.title && <span className="error-msg">{errors.title}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="difficulty">Difficulty Level *</label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Arrays, Strings"
                      className={errors.category ? 'error' : ''}
                    />
                    {errors.category && <span className="error-msg">{errors.category}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Problem Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write your problem here..."
                    rows="8"
                    className={errors.description ? 'error' : ''}
                  />
                  {errors.description && <span className="error-msg">{errors.description}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="constraints">Constraints *</label>
                  <textarea
                    id="constraints"
                    name="constraints"
                    value={formData.constraints}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 ≤ nums.length ≤ 10^4"
                    rows="4"
                    className={errors.constraints ? 'error' : ''}
                  />
                  {errors.constraints && <span className="error-msg">{errors.constraints}</span>}
                </div>
              </div>
            )}

            {/* Examples Tab */}
            {activeTab === 'examples' && (
              <div className="tab-content">
                <div className="examples-section">
                  <h3>Problem Examples</h3>
                  {formData.examples.map((example, index) => (
                    <div key={index} className="example-item">
                      <div className="example-header">
                        <h4>Example {index + 1}</h4>
                        {formData.examples.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExample(index)}
                            className="remove-btn"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Input</label>
                          <textarea
                            value={example.input}
                            onChange={(e) => handleExampleChange(index, 'input', e.target.value)}
                            placeholder="Input example"
                            rows="4"
                          />
                        </div>
                        <div className="form-group">
                          <label>Output</label>
                          <textarea
                            value={example.output}
                            onChange={(e) => handleExampleChange(index, 'output', e.target.value)}
                            placeholder="Expected output"
                            rows="4"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {errors.examples && <span className="error-msg">{errors.examples}</span>}
                  <button
                    type="button"
                    onClick={addExample}
                    className="add-btn"
                  >
                    + Add Another Example
                  </button>
                </div>
              </div>
            )}

            {/* Test Cases Tab */}
            {activeTab === 'testcases' && (
              <div className="tab-content">
                <div className="testcases-section">
                  <h3>Hidden Test Cases</h3>
                  {formData.testCases.map((testCase, index) => (
                    <div key={index} className="testcase-item">
                      <div className="testcase-header">
                        <h4>Test Case {index + 1}</h4>
                        {formData.testCases.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTestCase(index)}
                            className="remove-btn"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Input</label>
                          <textarea
                            value={testCase.input}
                            onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                            placeholder="Test input"
                            rows="4"
                          />
                        </div>
                        <div className="form-group">
                          <label>Output</label>
                          <textarea
                            value={testCase.output}
                            onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                            placeholder="Expected output"
                            rows="4"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {errors.testCases && <span className="error-msg">{errors.testCases}</span>}
                  <button
                    type="button"
                    onClick={addTestCase}
                    className="add-btn"
                  >
                    + Add Another Test Case
                  </button>
                </div>
              </div>
            )}

            {/* Starter Code Tab */}
            {activeTab === 'starter' && (
              <div className="tab-content">
                <div className="starter-code-section">
                  <h3>Starter Code by Language</h3>
                  
                  {['javascript', 'python', 'cpp', 'java'].map((lang) => (
                    <div key={lang} className="language-code">
                      <h4>{lang.charAt(0).toUpperCase() + lang.slice(1)}</h4>
                      <textarea
                        value={formData.startCode[lang]}
                        onChange={(e) => handleStartCodeChange(lang, e.target.value)}
                        placeholder={`Enter starter code for ${lang}...`}
                        rows="8"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reference Solution Tab */}
            {activeTab === 'reference' && (
              <div className="tab-content">
                <div className="reference-solution-section">
                  <h3>Reference Solution by Language</h3>
                  <p style={{ color: '#666', marginBottom: '20px' }}>
                    ℹ️ Enter the correct solution code. Click "Validate" to verify it passes all test cases.
                    The code will only be saved if it passes all tests.
                  </p>
                  
                  {['javascript', 'python', 'cpp', 'java'].map((lang) => (
                    <div key={lang} className="language-reference">
                      <div className="reference-header">
                        <h4>{lang.charAt(0).toUpperCase() + lang.slice(1)}</h4>
                        <button
                          type="button"
                          onClick={() => validateReferenceSolution(lang)}
                          className="validate-btn"
                          disabled={validatingReference === lang}
                        >
                          {validatingReference === lang ? '⏳ Validating...' : '✓ Validate'}
                        </button>
                      </div>
                      <textarea
                        value={formData.referenceSolution[lang]}
                        onChange={(e) => handleReferenceSolutionChange(lang, e.target.value)}
                        placeholder={`Enter reference solution for ${lang}...`}
                        rows="10"
                      />
                      {validationStatus[lang] && (
                        <div className={`validation-result ${validationStatus[lang].success ? 'success' : 'error'}`}>
                          {validationStatus[lang].success && <span>✓ {validationStatus[lang].message}</span>}
                          {validationStatus[lang].error && <span>✗ {validationStatus[lang].message}</span>}
                          {validationStatus[lang].validating && <span>⏳ {validationStatus[lang].message}</span>}
                          {validationStatus[lang].details && (
                            <div className="failed-tests">
                              <p>Failed Test Cases:</p>
                              <ul>
                                {validationStatus[lang].details.map((test, idx) => (
                                  <li key={idx}>Test Case {test.testCaseIndex + 1}: {test.status}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
              >
                Create Problem
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
