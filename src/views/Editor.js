import { Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import ToolBar from './ToolBar';
import CodeEditor from './CodeEditor';

function Editor() {
    const [theme, setTheme] = useState(() => 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light'
    );
    const [language, setLanguage] = useState('javascript');

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    }, []);

    return (
        <Container fluid className="vh-100 p-0">
            <NavigationBar />
            <ToolBar 
                theme={theme}
                onThemeChange={setTheme}
                language={language}
                onLanguageChange={setLanguage}
            />
            <div style={{ height: 'calc(100vh - 104px)' }}>
                <CodeEditor theme={theme} language={language} />
            </div>
        </Container>
    );
}

export default Editor;