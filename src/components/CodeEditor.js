import MonacoEditor from '@monaco-editor/react';

function CodeEditor() {
    return (
        <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// Welcome to codigo.pizza!"
            theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light'}
        />
    );
}

export default CodeEditor;