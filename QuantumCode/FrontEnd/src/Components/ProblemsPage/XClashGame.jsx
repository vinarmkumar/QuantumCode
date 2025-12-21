import { useState } from 'react'

export default function XClashGame() {
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [timeLeft, setTimeLeft] = useState(600)
  const [playerCode, setPlayerCode] = useState('')
  const [opponentCode, setOpponentCode] = useState('')

  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", description: "Find two numbers that add up to target" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", description: "Add two linked lists representing numbers" },
    { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", description: "Find median of two sorted arrays" },
    { id: 4, title: "Longest Substring", difficulty: "Medium", description: "Find longest substring without repeating" },
  ]

  const selectProblem = (problem) => {
    setSelectedProblem(problem)
    setPlayerCode('')
    setOpponentCode('')
  }

  return (
    <div className="flex-1 bg-black overflow-y-auto">
      {!selectedProblem ? (
        // Problem Selection Screen
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                ⚔️ XClash 1v1 Challenge
              </h1>
              <p className="text-gray-400 text-sm md:text-base">Select a problem and compete with another player</p>
            </div>

            {/* Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problems.map((problem) => (
                <div
                  key={problem.id}
                  onClick={() => selectProblem(problem)}
                  className="group bg-gray-900 border-2 border-gray-800 hover:border-blue-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{problem.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Gaming Screen
        <div className="min-h-screen p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedProblem(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                ← Back
              </button>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProblem.title}</h2>
              <div className="text-right">
                <div className="text-gray-400 text-sm">Time Left</div>
                <div className="text-2xl font-bold text-blue-400">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
              </div>
            </div>

            {/* VS Board */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Player 1 - Left Side */}
              <div className="bg-gray-900 border-2 border-blue-600 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-400">You</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">P1</div>
                  </div>
                </div>

                <div className="bg-black rounded-lg p-4 mb-4 border border-blue-600/30">
                  <div className="text-gray-400 text-sm mb-2">Code Editor</div>
                  <textarea
                    value={playerCode}
                    onChange={(e) => setPlayerCode(e.target.value)}
                    placeholder="// Write your solution here..."
                    className="w-full h-64 md:h-96 bg-gray-800 text-green-400 border border-gray-700 rounded p-4 focus:outline-none focus:border-green-400 font-mono text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
                    Submit
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors">
                    Reset
                  </button>
                </div>
              </div>

              {/* Player 2 - Right Side */}
              <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-400">Opponent</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">P2</div>
                  </div>
                </div>

                <div className="bg-black rounded-lg p-4 mb-4 border border-red-600/30">
                  <div className="text-gray-400 text-sm mb-2">Opponent Code (Read Only)</div>
                  <textarea
                    value={opponentCode}
                    readOnly
                    placeholder="Waiting for opponent to submit..."
                    className="w-full h-64 md:h-96 bg-gray-800 text-purple-400 border border-gray-700 rounded p-4 focus:outline-none font-mono text-sm opacity-60"
                  />
                </div>

                <div className="px-4 py-2 bg-gray-800 rounded-lg text-center text-gray-400">
                  Waiting for opponent...
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Problem Description</h3>
              <div className="text-gray-300 space-y-3">
                <p><strong>Difficulty:</strong> <span className={
                  selectedProblem.difficulty === 'Easy' ? 'text-green-400' :
                  selectedProblem.difficulty === 'Medium' ? 'text-yellow-400' :
                  'text-red-400'
                }>{selectedProblem.difficulty}</span></p>
                <p><strong>Description:</strong> {selectedProblem.description}</p>
                <p><strong>Time Limit:</strong> 10 minutes</p>
                <p className="text-sm text-gray-400 pt-2">First to submit a correct solution wins!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
