import { useState } from 'react'
import Problem from './problem'
import LeftSidebar from './LeftSIdebar'
import XClashGame from './XClashGame'

export default function XClashPageLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <>
      <Problem onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex h-screen">
        <div className={sidebarOpen ? 'block' : 'hidden'} style={{ width: 'auto' }}>
          <LeftSidebar onClose={() => setSidebarOpen(false)} />
        </div>
        <XClashGame />
      </div>
    </>
  )
}
