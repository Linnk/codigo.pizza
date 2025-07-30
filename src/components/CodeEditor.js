import MonacoEditor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { MonacoBinding } from 'y-monaco';
import { DEFAULT_CONTENT } from '../constants/defaultContent';

function CodeEditor({ theme, language, ytext, provider, isConnectionReady }) {
    const editorRef = useRef(null);
    const bindingRef = useRef(null);
    const [editorReady, setEditorReady] = useState(false);

    useEffect(() => {
        console.log('[CodeEditor] useEffect triggered', { 
            hasEditor: !!editorRef.current, 
            hasYtext: !!ytext, 
            hasProvider: !!provider,
            hasAwareness: !!provider?.awareness,
            isConnectionReady 
        });

        if (editorReady && editorRef.current && ytext && provider?.awareness && isConnectionReady) {
            console.log('[CodeEditor] Creating new Monaco binding!');

            // Create new Monaco binding for collaborative editing
            bindingRef.current = new MonacoBinding(
                ytext,
                editorRef.current.getModel(),
                new Set([editorRef.current]),
                provider.awareness
            );

            setTimeout(() => {
                if (ytext.toString().length === 0) {
                    ytext.insert(0, DEFAULT_CONTENT);
                }
            }, 1000);
        }

        return () => {
            if (bindingRef.current) {
                bindingRef.current.destroy();
                bindingRef.current = null;
            }
        };
    }, [ytext, provider, editorReady, isConnectionReady]);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true
        });

        setEditorReady(true);
    };

    return (
        <MonacoEditor
            height="100%"
            language={language}
            defaultValue="Connecting..."
            theme={theme}
            options={{
                minimap: { enabled: false },
                glyphMargin: false,
                lineDecorationsWidth: 0,
                fontSize: 14,
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                automaticLayout: true
            }}
            onMount={handleEditorDidMount}
        />
    );
}

export default CodeEditor;