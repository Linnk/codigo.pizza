import MonacoEditor from '@monaco-editor/react';

function CodeEditor({ theme, language }) {
    return (
        <MonacoEditor
            height="100%"
            language={language}
            defaultValue="// Welcome to codigo.pizza!"
            theme={theme}
            options={{
                minimap: { enabled: false },
                glyphMargin: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                automaticLayout: true
            }}
            beforeMount={(monaco) => {
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: true,
                    noSyntaxValidation: true
                });
            }}
        />
    );
}

export default CodeEditor;