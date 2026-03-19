import './Body.css'

export default function Body(){
    return (
        <div className="dev-page">
            <div className="dev-header">
                <img src="/src/Imgs/developerlogo.png" alt="Developer" className="dev-logo" />
                <h2 className="dev-title">Developer</h2>
                <p className="dev-sub">We now support 14 popular coding languages. At our core, QuantumCode is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.</p>
            </div>

            <div className="editor-wrapper">
                <div className="editor-main">
                    <div className="editor-top">
                        <div className="tabs">
                            <button className="tab active">C++</button>
                            <button className="tab">Java</button>
                            <button className="tab">Python</button>
                        </div>

                        <div className="actions">
                            <button className="action copy">📋 Copy</button>
                            <button className="action run">▶ Run</button>
                            <button className="action playground">▣ Playground</button>
                        </div>
                    </div>

                    <textarea className="code-area" spellCheck="false" defaultValue={`/**\n * Write your code here...\n */\n`} />
                </div>

                <aside className="editor-sidebar">
                    <div className="sidebar-item">&lt;/&gt; Linked List</div>
                    <div className="sidebar-item">&lt;/&gt; Binary Tree</div>
                    <div className="sidebar-item">&lt;/&gt; Fibonacci</div>
                    <div className="sidebar-spacer" />
                    <button className="create-playground">Create Playground &gt;</button>
                </aside>
            </div>
        </div>
    )
}