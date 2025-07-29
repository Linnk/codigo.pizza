import { Container } from 'reactstrap';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import CodeEditor from '../components/CodeEditor';
import CollaborationService from '../services/collaboration';
import NavigationBar from '../components/NavigationBar';
import UserManager from '../services/userManager';
import ToolBar from '../components/ToolBar';

function Editor() {
    const { id: roomId } = useParams();
    
    const [theme, setTheme] = useState(() => 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light'
    );
    const [language, setLanguage] = useState('javascript');
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    
    const collaborationRef = useRef(null);
    const userManagerRef = useRef(null);

    useEffect(() => {
        if (!userManagerRef.current) {
            userManagerRef.current = new UserManager();
        }
        
        const updateConnectionStatus = () => {
            if (!collaborationRef.current) {
                setConnectionStatus('disconnected');
                return;
            }

            const connectionInfo = collaborationRef.current.getConnectionStatus();
            if (!connectionInfo.connected) {
                setConnectionStatus('disconnected');
            } else if (connectionInfo.peers === 0) {
                setConnectionStatus('waiting');
            } else {
                setConnectionStatus('connected');
            }
        };
        
        const initializeRoom = async () => {

            // Clean up existing collaboration service
            if (collaborationRef.current) {
                console.log('[Editor] Cleaning up existing collaboration service');
                collaborationRef.current.destroy();
                collaborationRef.current = null;
            }

            console.log(`[Editor] Initialization of Room ID ${roomId}`);

            // Create fresh collaboration service
            collaborationRef.current = new CollaborationService();

            const userId = userManagerRef.current.getUserId();
            const userName = userManagerRef.current.getUserName();
            
            collaborationRef.current.initializeConnection(roomId, userId, userName);
            
            collaborationRef.current.onCollaboratorsChange((usersConnected) => {
                setConnectedUsers(usersConnected);
                updateConnectionStatus();
            });

            collaborationRef.current.onConnectionStatusChange(() => {
                updateConnectionStatus();
            });

            collaborationRef.current.onError((error) => {
                console.error('Collaboration error:', error);
                updateConnectionStatus();
            });
            
            updateConnectionStatus();
        };

        initializeRoom();
    }, [roomId]);

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (collaborationRef.current) {
                console.log('[Editor] Component unmounting: destroying collaboration service');
                collaborationRef.current.destroy();
                collaborationRef.current = null;
            }
        };
    }, []);

    const handleUserNameChange = (newName) => {
        if (userManagerRef.current && collaborationRef.current) {
            userManagerRef.current.setUserName(newName);
            collaborationRef.current.setUserName(newName);
        }
    };

    return (
        <Container fluid className="vh-100 p-0">
            <NavigationBar 
                roomId={roomId}
                connectedUsers={connectedUsers}
                connectionStatus={connectionStatus}
                onUserNameChange={handleUserNameChange}
                currentUserName={userManagerRef.current?.getUserName()}
            />
            <ToolBar 
                theme={theme}
                onThemeChange={setTheme}
                language={language}
                onLanguageChange={setLanguage}
            />
            <div style={{ height: 'calc(100vh - 104px)' }}>
                <CodeEditor 
                    theme={theme} 
                    language={language}
                />
            </div>
        </Container>
    );
}

export default Editor;