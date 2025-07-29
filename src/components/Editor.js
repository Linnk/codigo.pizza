import { Container } from 'reactstrap';
import { useEffect } from 'react';
import CodeEditor from './CodeEditor';

function Editor() {
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    }, []);

    return (
        <Container fluid className="vh-100 p-0">
            <CodeEditor />
        </Container>
    );
}

export default CodeEditor;