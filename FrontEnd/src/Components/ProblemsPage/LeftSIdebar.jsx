import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LeftSidebar({ onClose }) {
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()

    const handleClose = () => {
        setIsOpen(false)
        if (onClose) onClose()
    }

    const handleXClashClick = () => {
        navigate('/problems/xclash')
        // Only close on mobile
        if (window.innerWidth < 768) {
            handleClose()
        }
    }

    const handleLibraryClick = () => {
        navigate('/problems')
        // Only close on mobile
        if (window.innerWidth < 768) {
            handleClose()
        }
    }

    const SidebarItem = ({ icon, label, badge, onClick }) => (
        <div 
            onClick={onClick}
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-orange-900 cursor-pointer transition-all duration-300 mb-2 group hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
                <span className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">{label}</span>
            </div>
            {badge && (
                <span className="bg-linear-to-r from-orange-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/50 animate-pulse">
                    {badge}
                </span>
            )}
        </div>
    )

    return (
        <div className={`${isOpen ? 'w-72' : 'w-20'} bg-black h-screen border-r border-gray-800 transition-all duration-300 overflow-hidden flex flex-col shadow-2xl`}>
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-800 bg-linear-to-b from-gray-900 to-black">
                {isOpen && (
                    <h2 className="text-xl font-bold bg-linear-to-r from-green-400 to-orange-600 bg-clip-text text-transparent">
                        QuantumCode
                    </h2>
                )}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-gray-900 rounded-lg transition-all duration-300 text-gray-400 hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                    >
                        {isOpen ? '◀' : '▶'}
                    </button>
                    {/* Mobile Close Button */}
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-900 rounded-lg transition-all duration-300 text-gray-400 hover:text-white md:hidden"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-black">
                {isOpen && (
                    <>
                        {/* Library Section */}
                        <div className="mb-6">
                            <SidebarItem icon="📚" label="Library" onClick={handleLibraryClick} />
                        </div>

                        {/* Quest Section */}
                        <div className="mb-6">
                            <SidebarItem icon="🥷" label="XClash🎮" badge="New" onClick={handleXClashClick} />
                        </div>

                        {/* Study Plan Section */}
                        <div className="mb-6">
                            <SidebarItem icon="🎓" label="Study Plan" />
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-800 my-4"></div>

                        {/* My Lists Section */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between px-4 py-2 mb-3">
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">My Lists</span>
                                <div className="flex gap-2">
                                    <button className="text-gray-500 hover:text-orange-400 text-lg transition-colors duration-300 hover:scale-125">+</button>
                                    <button className="text-gray-500 hover:text-orange-400 transition-colors duration-300 hover:scale-125">▼</button>
                                </div>
                            </div>

                            {/* Favorite Item */}
                            <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-orange-900 cursor-pointer transition-all duration-300 group hover:shadow-lg hover:shadow-amber-500/20">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">💫</span>
                                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Favorite</span>
                                </div>
                                <span className="text-gray-600 group-hover:text-gray-400 transition-colors duration-300">🔒</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Collapsed Icons */}
                {!isOpen && (
                    <div className="flex flex-col items-center gap-4 mt-4">
                        <div 
                            onClick={handleLibraryClick}
                            className="text-2xl cursor-pointer hover:opacity-100 opacity-70 transition-all duration-300 hover:scale-125 hover:text-blue-400">📚</div>
                        <div 
                            onClick={handleXClashClick}
                            className="text-2xl cursor-pointer hover:opacity-100 opacity-70 transition-all duration-300 hover:scale-125 hover:text-blue-400">🥷</div>
                        <div className="text-2xl cursor-pointer hover:opacity-100 opacity-70 transition-all duration-300 hover:scale-125 hover:text-blue-400">🎓</div>
                        <div className="border-t border-gray-800 w-8 my-2"></div>
                        <div className="text-2xl cursor-pointer hover:opacity-100 opacity-70 transition-all duration-300 hover:scale-125 hover:text-amber-400">💫</div>
                    </div>
                )}
            </div>
        </div>
    )
}

