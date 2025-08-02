import { Navbar, Input, Button } from 'reactstrap';

function ToolBar({ theme, onThemeChange, language, onLanguageChange, currentUserName, onUserNameChange }) {
    const languages = [
        'cpp',
        'csharp',
        'css',
        'go',
        'html',
        'java',
        'javascript',
        'json',
        'markdown',
        'php',
        'python',
        'ruby',
        'rust',
        'sql',
        'swift',
        'typescript',
        'yaml'
    ];

    const handleNameChange = () => {
        const newName = prompt('Enter your name:', currentUserName || '');
        if (newName && newName.trim() && onUserNameChange) {
            onUserNameChange(newName.trim());
        }
    };

    return (
        <Navbar className="border-bottom px-3 py-2" style={{ minHeight: '48px' }}>
            <div className="d-flex align-items-center flex-column flex-md-row w-100">
                <div className="d-flex align-items-center gap-3 w-100 w-md-auto justify-content-md-start">                
                    <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small d-sm-inline d-none">Language:</span>
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
                        <span className="text-muted small d-sm-inline d-none">Theme:</span>
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

                <div className="d-flex align-items-center w-100 w-md-auto justify-content-md-end">
                    <span>Name: </span>
                    <Button 
                        color="link" 
                            onClick={handleNameChange}
                        className="text-decoration-none ms-1 p-1"
                        title="Change your name"
                    >
                        {currentUserName || 'Anonymous'}
                    </Button>
                </div>
            </div>
        </Navbar>
    );
}

export default ToolBar;