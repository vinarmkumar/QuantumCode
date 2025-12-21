import { useNavigate } from 'react-router-dom'
import { tutorialData } from './tutorialData'
import './Tutorials.css'

export default function TutorialsHub() {
  const navigate = useNavigate()
  
  const allTutorials = [
    { key: 'python', ...tutorialData.python },
    { key: 'java', ...tutorialData.java },
    { key: 'dsa', ...tutorialData.dsa }
  ]

  const handleTutorialClick = (key) => {
    navigate(`/tutorials/${key}`)
  }

  return (
    <div className="tutorials-hub">
      {/* Header */}
      <div className="hub-header">
        <h1 className="hub-title">Learning Tutorials</h1>
        <p className="hub-subtitle">Master programming languages and DSA with comprehensive guides</p>
      </div>

      {/* Tutorial Cards Grid */}
      <div className="tutorials-grid">
        {allTutorials.map((tutorial) => (
          <div
            key={tutorial.key}
            data-lang={tutorial.key}
            className="tutorial-card"
            onClick={() => handleTutorialClick(tutorial.key)}
          >
            <div className="card-header">
              <div className="card-icon">{tutorial.icon}</div>
              <div className="card-title-group">
                <h2 className="card-title">{tutorial.title}</h2>
                <p className="card-subtitle">{tutorial.description}</p>
              </div>
            </div>

            <p className="card-description">
              Learn everything you need to know about {tutorial.title.toLowerCase()}, 
              from fundamentals to advanced concepts with detailed examples and best practices.
            </p>
            
            <div className="card-topics">
              <h4>Topics Covered</h4>
              <div className="topic-tags">
                {tutorial.sections.slice(0, 4).map((section) => (
                  <span key={section.id} className="topic-tag">
                    {section.title}
                  </span>
                ))}
                {tutorial.sections.length > 4 && (
                  <span className="topic-tag">+{tutorial.sections.length - 4} more</span>
                )}
              </div>
            </div>

            <button className="card-button">
              Start Learning →
            </button>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Our Tutorials?</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">📚</span>
            <h3>Comprehensive Content</h3>
            <p>In-depth explanations covering basics to advanced topics with real-world examples</p>
          </div>
          <div className="feature">
            <span className="feature-icon">💻</span>
            <h3>Code Examples</h3>
            <p>Every concept comes with working code examples you can learn from</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <h3>Interview Ready</h3>
            <p>Master concepts and patterns needed for technical interviews</p>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <h3>Beginner Friendly</h3>
            <p>Start from basics and gradually progress to advanced topics</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✅</span>
            <h3>Best Practices</h3>
            <p>Learn industry-standard practices and conventions</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <h3>Always Updated</h3>
            <p>Content regularly updated with latest language features</p>
          </div>
        </div>
      </div>
    </div>
  )
}
