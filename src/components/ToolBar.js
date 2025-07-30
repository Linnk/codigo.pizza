import { Navbar, Input } from 'reactstrap';

function ToolBar({ theme, onThemeChange, language, onLanguageChange }) {
    const languages = [
        'javascript',
        'typescript',
        'python',
        'java',
        'cpp',
        'csharp',
        'go',
        'rust',
        'php',
        'ruby',
        'html',
        'css',
        'json',
        'markdown',
        'sql',
        'xml',
        'yaml'
    ];

    return (
        <Navbar className="border-bottom px-3 py-2" style={{ minHeight: '48px' }}>
            <div className="d-flex align-items-center gap-3">                
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">Language:</span>
                    <Input
                        type="select"
                        value={language}
                        onChange={(e) => onLanguageChange(e.target.value)}
                        bsSize="sm"
                        style={{ width: '120px' }}
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </Input>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">Theme:</span>
                    <Input
                        type="select"
                        value={theme}
                        onChange={(e) => onThemeChange(e.target.value)}
                        bsSize="sm"
                        style={{ width: '80px' }}
                    >
                        <option value="light">Light</option>
                        <option value="vs-dark">Dark</option>
                    </Input>
                </div>
            </div>
        </Navbar>
    );
}

export default ToolBar;