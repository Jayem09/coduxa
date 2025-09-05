import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Copy,
  Download,
  Upload,
  FileText,
  Code2
} from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
  showLineNumbers?: boolean;
  showMinimap?: boolean;
  fontSize?: number;
  tabSize?: number;
  wordWrap?: boolean;
  autoComplete?: boolean;
  onRun?: (code: string) => void;
  onFormat?: (code: string) => string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  height = '400px',
  readOnly = false,
  showLineNumbers = true,
  fontSize = 14,
  tabSize = 2,
  autoComplete = true,
  onRun,
  onFormat
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [selectedText, setSelectedText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript', extension: '.js' },
    { value: 'typescript', label: 'TypeScript', extension: '.ts' },
    { value: 'python', label: 'Python', extension: '.py' },
    { value: 'java', label: 'Java', extension: '.java' },
    { value: 'cpp', label: 'C++', extension: '.cpp' },
    { value: 'c', label: 'C', extension: '.c' },
    { value: 'csharp', label: 'C#', extension: '.cs' },
    { value: 'go', label: 'Go', extension: '.go' },
    { value: 'rust', label: 'Rust', extension: '.rs' },
    { value: 'php', label: 'PHP', extension: '.php' },
    { value: 'ruby', label: 'Ruby', extension: '.rb' },
    { value: 'swift', label: 'Swift', extension: '.swift' },
    { value: 'kotlin', label: 'Kotlin', extension: '.kt' },
    { value: 'sql', label: 'SQL', extension: '.sql' },
    { value: 'html', label: 'HTML', extension: '.html' },
    { value: 'css', label: 'CSS', extension: '.css' },
    { value: 'json', label: 'JSON', extension: '.json' },
    { value: 'xml', label: 'XML', extension: '.xml' },
    { value: 'yaml', label: 'YAML', extension: '.yml' },
    { value: 'markdown', label: 'Markdown', extension: '.md' }
  ];

  const currentLanguage = languages.find(lang => lang.value === language) || languages[0];

  useEffect(() => {
    updateCursorPosition();
  }, [value]);

  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const textBeforeCursor = value.substring(0, textarea.selectionStart);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    setCursorPosition({ line, column });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    updateCursorPosition();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + ' '.repeat(tabSize) + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + tabSize;
      }, 0);
    }

    // Auto-complete brackets
    if (autoComplete) {
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      if (e.key === '(') {
        e.preventDefault();
        const newValue = value.substring(0, start) + '()' + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      } else if (e.key === '[') {
        e.preventDefault();
        const newValue = value.substring(0, start) + '[]' + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      } else if (e.key === '{') {
        e.preventDefault();
        const newValue = value.substring(0, start) + '{}' + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      } else if (e.key === '"') {
        e.preventDefault();
        const newValue = value.substring(0, start) + '""' + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      } else if (e.key === "'") {
        e.preventDefault();
        const newValue = value.substring(0, start) + "''" + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      }
    }
  };

  const handleSelectionChange = () => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    setSelectedText(selected);
  };

  const handleRun = async () => {
    if (!onRun) return;
    
    setIsRunning(true);
    setOutput('');
    setError('');
    
    try {
      const result = await onRun(value);
      setOutput(String(result));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  const handleFormat = () => {
    if (!onFormat) return;
    
    try {
      const formatted = onFormat(value);
      onChange(formatted);
    } catch (err) {
      setError('Formatting failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code${currentLanguage.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.js,.ts,.py,.java,.cpp,.c,.cs,.go,.rs,.php,.rb,.swift,.kt,.sql,.html,.css,.json,.xml,.yml,.md';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onChange(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    onChange('');
    setOutput('');
    setError('');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getLineNumbers = () => {
    const lines = value.split('\n');
    return lines.map((_, index) => index + 1);
  };

  const editorStyle = {
    height: isFullscreen ? '100vh' : height,
    fontSize: `${fontSize}px`,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    lineHeight: '1.5',
    tabSize: tabSize
  };

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50 bg-white' 
    : 'relative';

  return (
    <div className={containerClass}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Code Editor
              </CardTitle>
              <Badge variant="outline">{currentLanguage.label}</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={(value) => onChange(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleUpload}>
                <Upload className="h-4 w-4" />
              </Button>
              
              {onFormat && (
                <Button variant="outline" size="sm" onClick={handleFormat}>
                  <FileText className="h-4 w-4" />
                </Button>
              )}
              
              {onRun && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  {isRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              )}
              
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex h-full">
            {/* Line Numbers */}
            {showLineNumbers && (
              <div 
                className="bg-gray-100 text-gray-500 text-right pr-3 py-3 select-none border-r"
                style={{ 
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.5'
                }}
              >
                {getLineNumbers().map((lineNum) => (
                  <div key={lineNum} className="leading-6">
                    {lineNum}
                  </div>
                ))}
              </div>
            )}
            
            {/* Code Editor */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                onSelect={handleSelectionChange}
                onMouseUp={handleSelectionChange}
                readOnly={readOnly}
                className={`w-full h-full resize-none border-0 outline-none p-3 ${
                  readOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                }`}
                style={editorStyle}
                placeholder={`Enter your ${currentLanguage.label} code here...`}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>Line {cursorPosition.line}, Column {cursorPosition.column}</span>
              {selectedText && (
                <span>{selectedText.length} characters selected</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span>{value.length} characters</span>
              <span>•</span>
              <span>{value.split('\n').length} lines</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Output Panel */}
      {(output || error) && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Output</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                <pre className="text-red-800 text-sm whitespace-pre-wrap">{error}</pre>
              </div>
            )}
            {output && (
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <pre className="text-green-800 text-sm whitespace-pre-wrap">{output}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;
