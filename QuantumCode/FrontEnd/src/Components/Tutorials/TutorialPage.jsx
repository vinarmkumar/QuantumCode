import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tutorialData } from './tutorialData'
import './Tutorials.css'

export default function TutorialPage() {
  const { language } = useParams()
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Get tutorial data based on language parameter
  const getTutorialData = () => {
    const langKey = language?.replace('-', '').toLowerCase()
    
    if (langKey === 'python') return tutorialData.python
    if (langKey === 'java') return tutorialData.java
    if (langKey === 'dsa') return tutorialData.dsa
    
    return null
  }

  const tutorial = getTutorialData()

  useEffect(() => {
    if (tutorial && tutorial.sections.length > 0) {
      setSelectedSection(tutorial.sections[0])
      if (tutorial.sections[0].topics.length > 0) {
        setSelectedTopic(tutorial.sections[0].topics[0])
      }
    }
  }, [tutorial])

  if (!tutorial) {
    return (
      <div className="tutorial-page">
        <div className="error-container">
          <h2>Tutorial Not Found</h2>
          <p>The tutorial you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  // Beautiful content renderer with markdown-like syntax
  const renderContent = (content) => {
    const lines = content.split('\n')
    const elements = []
    let i = 0
    let codeBlockContent = ''
    let inCodeBlock = false
    let codeLang = 'code'

    while (i < lines.length) {
      const line = lines[i]

      // Handle code blocks
      if (line.includes('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLang = line.replace(/```/g, '').trim() || 'code'
          codeBlockContent = ''
        } else {
          inCodeBlock = false
          elements.push(
            <pre key={`code-${i}`} className="code-block" data-language={codeLang}>
              <code>{codeBlockContent}</code>
            </pre>
          )
          codeBlockContent = ''
        }
        i++
        continue
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n'
        i++
        continue
      }

      // Headings - Level 2
      if (line.match(/^##\s/)) {
        elements.push(
          <h2 key={`h2-${i}`} className="section-heading">
            {line.replace(/^##\s/, '')}
          </h2>
        )
        i++
        continue
      }

      // Headings - Level 3
      if (line.match(/^###\s/)) {
        elements.push(
          <h3 key={`h3-${i}`} className="subsection-heading">
            {line.replace(/^###\s/, '')}
          </h3>
        )
        i++
        continue
      }

      // Key Points Section
      if (line.includes('Key Points:') || line.includes('Key Features:') || line.includes('Key Characteristics:')) {
        const keyPoints = []
        let j = i + 1
        while (j < lines.length && lines[j].match(/^•\s/)) {
          keyPoints.push(lines[j].replace(/^•\s/, ''))
          j++
        }
        elements.push(
          <div key={`keypoints-${i}`} className="key-points">
            <h4 className="key-points-title">{line}</h4>
            {keyPoints.map((point, idx) => (
              <div key={idx} className="key-point-item">
                <span className="key-point-marker">→</span>
                {point}
              </div>
            ))}
          </div>
        )
        i = j
        continue
      }

      // Bullet points
      if (line.match(/^•\s/)) {
        const bulletContent = line.replace(/^•\s/, '')
        elements.push(
          <div key={`bullet-${i}`} className="bullet-item">
            <span className="bullet-marker">•</span>
            <span className="bullet-text">{bulletContent}</span>
          </div>
        )
        i++
        continue
      }

      // Numbered list
      if (line.match(/^\d+\.\s/)) {
        elements.push(
          <div key={`num-${i}`} className="numbered-item">
            {line}
          </div>
        )
        i++
        continue
      }

      // Regular paragraphs
      if (line.trim()) {
        elements.push(
          <p key={`p-${i}`} className="content-paragraph">
            {line}
          </p>
        )
      }

      i++
    }

    return elements
  }

  function getPreviousTopic(currentTopic) {
    if (!selectedSection) return null
    const topicIndex = selectedSection.topics.findIndex(t => t.title === currentTopic.title)
    if (topicIndex > 0) {
      return selectedSection.topics[topicIndex - 1]
    }
    return null
  }

  function getNextTopic(currentTopic) {
    if (!selectedSection) return null
    const topicIndex = selectedSection.topics.findIndex(t => t.title === currentTopic.title)
    if (topicIndex < selectedSection.topics.length - 1) {
      return selectedSection.topics[topicIndex + 1]
    }
    return null
  }

  return (
    <div className="tutorial-page">
      {/* Header */}
      <div className="tutorial-header">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <div className="header-content">
          <span className="tutorial-icon">{tutorial.icon}</span>
          <h1>{tutorial.title}</h1>
        </div>
        <button 
          className="close-btn"
          onClick={() => navigate('/')}
        >
          ✕
        </button>
      </div>

      <div className="tutorial-container">
        {/* Sidebar */}
        <aside className={`tutorial-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Topics</h3>
          </div>
          <nav className="section-list">
            {tutorial.sections.map((section) => (
              <div key={section.id} className="section-group">
                <button
                  className={`section-button ${selectedSection?.id === section.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSection(section)
                    setSelectedTopic(section.topics[0])
                    setSidebarOpen(false)
                  }}
                >
                  <span className="section-title">{section.title}</span>
                </button>
                
                {selectedSection?.id === section.id && (
                  <div className="topic-list">
                    {section.topics.map((topic) => (
                      <button
                        key={topic.title}
                        className={`topic-button ${selectedTopic?.title === topic.title ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedTopic(topic)
                          setSidebarOpen(false)
                        }}
                      >
                        {topic.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="tutorial-content">
          {selectedTopic ? (
            <article className="topic-article">
              <div className="article-header">
                <h2>{selectedTopic.title}</h2>
                <div className="breadcrumb">
                  {tutorial.title} → {selectedSection?.title} → {selectedTopic.title}
                </div>
              </div>

              <div className="article-body">
                <div className="formatted-content">
                  {renderContent(selectedTopic.content)}
                </div>
              </div>

              <div className="article-footer">
                <div className="navigation-buttons">
                  {getPreviousTopic(selectedTopic) && (
                    <button 
                      onClick={() => setSelectedTopic(getPreviousTopic(selectedTopic))}
                      className="nav-btn prev-btn"
                    >
                      ← Previous
                    </button>
                  )}
                  {getNextTopic(selectedTopic) && (
                    <button 
                      onClick={() => setSelectedTopic(getNextTopic(selectedTopic))}
                      className="nav-btn next-btn"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </article>
          ) : (
            <div className="no-topic">
              <p>Select a topic to begin learning</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
