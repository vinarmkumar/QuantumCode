import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProblems } from '../../context/ProblemContext'

export default function ProblemBody() {
  const navigate = useNavigate()
  const { problems, loading, error } = useProblems()
  const [filteredProblems, setFilteredProblems] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  // Update filtered problems when problems change
  useEffect(() => {
    if (selectedDifficulty === 'All') {
      setFilteredProblems(problems)
    } else {
      setFilteredProblems(problems.filter(p => p.difficulty === selectedDifficulty))
    }
  }, [problems, selectedDifficulty])

  const featuredCards = [
    {
      id: 1,
      title: "XClash🎮",
      subtitle: "Turn coding practice into an epic adventure",
      button: "Begin Now",
      badge: "NEW🥷",
      bgGradient: "bg-gradient-to-br from-cyan-100 to-blue-50",
      borderColor: "border-cyan-200"
    },
    {
      id: 2,
      title: "Problems of the day",
      subtitle: "Get ready for ultimate Question",
      button: "Start Learning",
      badgeText: "DAY 32",
      bgGradient: "bg-gradient-to-br from-orange-400 to-orange-300",
      borderColor: "border-orange-400"
    },
    {
      id: 3,
      title: "Top Interview Questions",
      subtitle: "Ace your coding interviews",
      button: "Get Started",
      bgGradient: "bg-gradient-to-br from-blue-500 to-blue-400",
      borderColor: "border-blue-400"
    },
    {
      id: 4,
      title: "QuantumCode's Intro to Data Structures",
      subtitle: "Master the fundamentals",
      button: "Start Learning",
      bgGradient: "bg-gradient-to-br from-purple-500 to-purple-400",
      borderColor: "border-purple-400"
    }
  ]

  const topics = [
    { name: "All Topics", icon: "📋", active: true },
    { name: "Algorithms", icon: "🔄" },
    { name: "Database", icon: "🗄️" },
    { name: "Shell", icon: "💻" },
    { name: "Concurrency", icon: "⚙️" },
    { name: "JavaScript", icon: "✨" },
    { name: "pandas", icon: "📊" }
  ]

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return "text-green-600 bg-green-50"
      case "Medium": return "text-orange-600 bg-orange-50"
      case "Hard": return "text-red-600 bg-red-50"
      default: return "text-gray-600"
    }
  }

  const getDifficultyProgressColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return "bg-green-500"
      case "Medium": return "bg-orange-400"
      case "Hard": return "bg-red-500"
      default: return "bg-gray-400"
    }
  }

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {/* Featured Cards Section */}
      <div className="p-4 md:p-8 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {featuredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => card.id === 1 && navigate('/problems/xclash')}
              className={`${card.bgGradient} border-2 ${card.borderColor} rounded-2xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 ${card.id === 1 ? 'cursor-pointer hover:scale-105' : 'cursor-default'} flex flex-col h-full`}
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-xs md:text-sm">{card.title}</h3>
                  {card.badgeText && <span className="text-2xl md:text-3xl font-bold text-orange-500 ml-2">{card.badgeText}</span>}
                </div>
                {card.badge && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">{card.badge}</span>}
              </div>
              <p className="text-gray-700 text-xs mb-3 md:mb-4 flex-1">{card.subtitle}</p>
              <div className="flex justify-end">
                <button 
                  onClick={() => card.id === 1 && navigate('/problems/xclash')}
                  className="bg-gray-800 text-white text-xs font-semibold px-3 md:px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                  {card.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div className="px-4 md:px-8 py-4 md:py-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2 md:gap-3 flex-nowrap md:flex-wrap">
          {topics.map((topic) => (
            <button
              key={topic.name}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                topic.active
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {topic.icon} {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Problems Section */}
      <div className="px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3 md:gap-4">
          <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-2 md:gap-3">
            <input
              type="text"
              placeholder="Search questions"
              className="flex-1 w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 text-xs md:text-base"
            />
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">⚙️</button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">📊</button>
          </div>
          <div className="text-gray-600 text-xs md:text-sm font-medium">{filteredProblems.length}/{problems.length} Problems</div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-4 flex gap-2">
          {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                selectedDifficulty === difficulty
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500 text-sm">Loading problems...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-8">
            <div className="text-red-500 text-sm">Error loading problems: {error}</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProblems.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500 text-sm">
              {problems.length === 0 
                ? 'No problems created yet. Create your first problem in the admin dashboard!'
                : 'No problems found for the selected difficulty.'}
            </div>
          </div>
        )}

        {/* Problems List */}
        <div className="space-y-0">
          {filteredProblems.map((problem, idx) => (
            <div
              key={problem._id}
              className={`p-3 md:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 cursor-pointer`}
              onClick={() => navigate(`/problems/${problem._id}`)}
            >
              {/* Icon and Title */}
              <div className="flex items-start sm:items-center gap-2 md:gap-4 flex-1 min-w-0">
                <div className="text-lg w-6 text-center shrink-0">
                  <span className="text-gray-400 font-medium">{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-800 hover:text-blue-600 font-medium text-xs md:text-base break-words">{problem.title}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 md:gap-4 justify-between sm:justify-end ml-8 sm:ml-0">
                <div className="text-gray-600 text-xs md:text-sm font-medium">
                  {problem.submissions > 0 ? `${((problem.accepted / problem.submissions) * 100).toFixed(1)}%` : '0%'}
                </div>
                <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(problem.difficulty)} shrink-0`}>
                  {problem.difficulty}
                </div>
                <div className="w-16 md:w-20 hidden md:block">
                  <div className="bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full ${getDifficultyProgressColor(problem.difficulty)}`}
                      style={{ width: `${Math.min((problem.submissions / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}