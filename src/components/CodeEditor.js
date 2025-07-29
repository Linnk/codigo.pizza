import { Container } from 'reactstrap';
import MonacoEditor from '@monaco-editor/react';

function CodeEditor() {
    return (
        <Container fluid className="vh-100 p-0">
            <MonacoEditor
                height="100vh"
                defaultLanguage="javascript"
                defaultValue="// Welcome to codigo.pizza!"
                theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light'}
            />
        </Container>
    );
}

export default CodeEditor;