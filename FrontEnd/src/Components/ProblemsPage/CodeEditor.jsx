import { useRef, useCallback, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

export default function CodeEditor({ value, onChange, language = 'javascript' }) {
  const editorRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  const handleEditorChange = useCallback((newValue) => {
    if (onChange && newValue !== undefined) {
      onChange({ target: { value: newValue } })
    }
  }, [onChange])

  const handleEditorMount = (editor, monacoInstance) => {
    editorRef.current = editor
    
    // Define custom dark theme
    monacoInstance.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'operator', foreground: 'D4D4D4' },
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editor.lineNumbersBackground': '#252526',
        'editor.lineNumber': '#858585',
        'editor.lineHighlightBackground': '#2D2D30',
        'editor.cursorForeground': '#AEAFAD',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3A3A',
        'editor.findMatchBackground': '#EA5c0055',
        'editor.findMatchHighlightBackground': '#EA5c0055',
      },
    })

    monacoInstance.editor.setTheme('custom-dark')
    
    editor.updateOptions({
      fontSize: 14,
      fontFamily: '"Fira Code", "Consolas", "Courier New", monospace',
      fontLigatures: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      wordWrapColumn: 100,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      formatOnPaste: true,
      formatOnType: true,
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      autoIndent: 'full',
      bracketPairColorization: {
        enabled: true,
      },
      folding: true,
      showUnused: true,
      lineNumbers: 'on',
      rulers: [80, 120],
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
        useShadows: true,
        verticalSliderSize: 12,
        horizontalSliderSize: 12,
      },
      renderWhitespace: 'selection',
      smoothScrolling: true,
      mouseWheelZoom: true,
      links: true,
      padding: { top: 16, bottom: 16 },
      automaticLayout: true,
    })

    setIsReady(true)
  }

  // Map language names to Monaco editor language IDs
  const languageMap = {
    javascript: 'javascript',
    python: 'python',
    cpp: 'cpp',
    java: 'java',
    typescript: 'typescript',
    csharp: 'csharp',
    ruby: 'ruby',
    go: 'go',
    rust: 'rust',
    php: 'php',
    html: 'html',
    css: 'css',
    sql: 'sql',
    bash: 'bash',
  }

  const monacoLanguage = languageMap[language] || 'javascript'

  return (
    <div className="monaco-editor-wrapper" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Editor
        height="100%"
        width="100%"
        language={monacoLanguage}
        value={value || ''}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        theme="custom-dark"
        loading={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: '#1E1E1E',
            color: '#D4D4D4',
            fontSize: '14px',
          }}>
            Loading Editor...
          </div>
        }
        defaultValue="// Start typing..."
        options={{
          fontSize: 14,
          fontFamily: '"Fira Code", "Consolas", "Courier New", monospace',
          fontLigatures: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          wordWrapColumn: 100,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          formatOnPaste: true,
          formatOnType: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoIndent: 'full',
          bracketPairColorization: {
            enabled: true,
          },
          'bracketPairColorization.independentColorPoolPerBracketType': true,
          folding: true,
          showUnused: true,
          lineNumbers: 'on',
          rulers: [80, 120],
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            useShadows: true,
            verticalSliderSize: 12,
            horizontalSliderSize: 12,
          },
          renderWhitespace: 'selection',
          smoothScrolling: true,
          mouseWheelZoom: true,
          links: true,
          padding: { top: 16, bottom: 16 },
          automaticLayout: true,
          unicodeHighlight: {
            ambiguousCharacters: false,
          },
          'editor.acceptSuggestionOnEnter': 'smart',
          'editor.suggestSelection': 'recentlyUsedByPrefix',
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
        }}
      />
    </div>
  )
}
