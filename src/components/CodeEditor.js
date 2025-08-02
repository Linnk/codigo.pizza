import MonacoEditor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MonacoBinding } from 'y-monaco';
import { DEFAULT_CONTENT } from '../constants/defaultContent';
import './CodeEditor.css';

function CodeEditor({ theme, language, ytext, provider, isConnectionReady }) {
    const location = useLocation();
    const isRoomCreator = location.state?.isRoomCreator || false;
    const editorRef = useRef(null);
    const bindingRef = useRef(null);
    const [editorReady, setEditorReady] = useState(false);

    // Setup awareness listeners for cursor tracking
    useEffect(() => {
        if (!provider?.awareness) return;

        const handleAwarenessChange = () => {
            console.log('[CodeEditor] Awareness changed, states:', Array.from(provider.awareness.getStates().entries()));
            
            const users = [];
            provider.awareness.getStates().forEach((state, clientId) => {
                if (state.user && clientId !== provider.awareness.clientID) {
                    console.log('[CodeEditor] Remote user:', { clientId, state });
                    users.push({
                        clientId,
                        ...state.user,
                        cursor: state.cursor
                    });
                }
            });
            updateUserStyles(users);
        };

        provider.awareness.on('change', handleAwarenessChange);
        handleAwarenessChange(); // Initial call

        return () => {
            provider.awareness.off('change', handleAwarenessChange);
        };
    }, [provider]);

    const updateUserStyles = (users) => {
        if (!editorRef.current) return;

        // Remove existing user styles
        const existingStyles = document.querySelectorAll('[data-monaco-user-styles]');
        existingStyles.forEach(style => style.remove());

        // Create CSS for each user's cursor and selection colors
        const styleSheet = document.createElement('style');
        styleSheet.setAttribute('data-monaco-user-styles', 'true');
        
        let css = '';

        users.forEach(user => {
            const color = user.color || '#FF6B6B';
            css += `
                .yRemoteSelection.yRemoteSelection-${user.clientId} {
                    background-color: ${color}33 !important;
                }
                .yRemoteSelectionHead.yRemoteSelectionHead-${user.clientId}::after {
                    background-color: ${color} !important;
                }
                .yRemoteSelectionHead.yRemoteSelectionHead-${user.clientId}::before {
                    content: "${user.name || 'Anonymous'}";
                    background-color: ${color};
                }
            `;
        });

        styleSheet.textContent = css;
        document.head.appendChild(styleSheet);
    };


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

            if (isRoomCreator) {
                setTimeout(() => {
                    if (ytext.toString().length === 0) {
                        ytext.insert(0, DEFAULT_CONTENT);
                    }
                }, 1000);
            }
        }

        return () => {
            if (bindingRef.current) {
                bindingRef.current.destroy();
                bindingRef.current = null;
            }

            // Clean up dynamic styles
            const userStyles = document.querySelectorAll('[data-monaco-user-styles]');
            userStyles.forEach(style => style.remove());
        };
    }, [ytext, provider, editorReady, isConnectionReady]);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Set End of Line sequence to LF
        editor.getModel().setEOL(monaco.editor.EndOfLineSequence.LF);

        // Disable all validation and error detection
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
            noSuggestionDiagnostics: true
        });

        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
            noSuggestionDiagnostics: true
        });

        // Disable all built-in validation for other languages
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: false,
            allowComments: true
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
                padding: {
                    top: 20,
                    bottom: 40
                },
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                quickSuggestions: false,
                parameterHints: { enabled: false },
                suggestOnTriggerCharacters: false,
                acceptSuggestionOnEnter: 'off',
                tabCompletion: 'off',
                wordBasedSuggestions: 'off',
                renderValidationDecorations: 'off',
                hover: { enabled: false },
                suggest: { showKeywords: false, showSnippets: false, showFunctions: false, showVariables: false }
            }}
            onMount={handleEditorDidMount}
        />
    );
}

export default CodeEditor;