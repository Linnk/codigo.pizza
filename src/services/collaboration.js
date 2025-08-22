import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

class CollaborationService {
    constructor() {
        this.doc = null;
        this.provider = null;
        this.isDestroyed = false;
        this.userColors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ];
        this.colorIndex = 0;
    }

    initializeConnection(roomId, userId, userName = 'Anonymous') {
        if (this.isDestroyed) {
            console.warn('Cannot initialize destroyed collaboration service');
            return null;
        }

        try {
            // Create Y.js document with shared text for collaborative editing
            this.doc = new Y.Doc();
            this.ytext = this.doc.getText('monaco-content');
            this.sharedState = this.doc.getMap('shared-ui-state');

            // Add debugging for Y.Text changes
            this.ytext.observe((event) => {
                console.log('[CollaborationService] Y.Text changed:', this.ytext.toString());
            });

            // Listen for shared state changes (coding language and others)
            this.sharedState.observe((event) => {
                this.onSharedStateChange?.(Object.fromEntries(this.sharedState.entries()));
            });
            
            const providerConfig = {
                signaling: [process.env.REACT_APP_PIZZA_SIGNALING_SERVER || 'ws://localhost:4444'],
                maxConns: 20 + Math.floor(Math.random() * 15),
                filterBcConns: true,
                peerOpts: {}
            };

            const handleConnectionStatusChange = () => {
                if (!this.isDestroyed) {
                    this.onConnectionStatusChange?.();
                }
            }
            
            this.provider = new WebrtcProvider(roomId, this.doc, providerConfig);

            this.provider.on('status', handleConnectionStatusChange);
            this.provider.on('peers', handleConnectionStatusChange);

            // Listen for signaling server connectivity
            this.provider.signalingConns.forEach(conn => {
                conn.on('connect', handleConnectionStatusChange);
                conn.on('disconnect', handleConnectionStatusChange);
            });

            if (this.provider.awareness && !this.isDestroyed) {
                // Set user info at the root level for y-monaco compatibility
                this.provider.awareness.setLocalState({
                    user: {
                        id: userId,
                        name: userName,
                        color: this.getUserColor(userId)
                    }
                });
            } else {
                console.warn('[CollaborationService] Could not set user state - awareness not available or service destroyed');
            }

            // Listen for users connecting and disconnecting
            this.provider.awareness.on('change', () => {
                if (!this.isDestroyed) {
                    this.onCollaboratorsChange?.(this.getConnectedUsers());
                }
            });

            return this.provider;
        } catch (error) {
            console.error('[CollaborationService] Failed to initialize collaboration connection:', error);
            this.onError?.(error);
            throw error;
        }
    }

    getUserColor(userId) {
        // Use a simple hash function to assign consistent colors based on user ID
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            hash = ((hash << 5) - hash + userId.charCodeAt(i)) & 0xffffffff;
        }
        const colorIndex = Math.abs(hash) % this.userColors.length;
        return this.userColors[colorIndex];
    }

    getConnectedUsers() {
        const users = [];
        this.provider?.awareness?.getStates()?.forEach((state) => {
            if (state.user) {
                users.push(state.user);
            }
        });
        return users;
    }

    updateLocalUser(updates) {
        if (!this.provider?.awareness) return;
        
        try {
            const currentState = this.provider.awareness.getLocalState();
            const user = currentState?.user || {};
            
            this.provider.awareness.setLocalState({
                ...currentState,
                user: {
                    ...user,
                    ...updates
                }
            });
        } catch (error) {
            console.warn('Error updating local user:', error);
        }
    }

    setUserName(name) {
        this.updateLocalUser({ name });
    }

    broadcastMessage(message) {
        if (!this.provider?.awareness) return;
        
        try {
            this.provider.awareness.setLocalStateField('message', {
                ...message,
                timestamp: Date.now()
            });
            
            setTimeout(() => {
                if (this.provider?.awareness) {
                    this.provider.awareness.setLocalStateField('message', null);
                }
            }, 100);
        } catch (error) {
            console.warn('Error broadcasting message:', error);
        }
    }

    onCollaboratorsChange(callback) {
        this.onCollaboratorsChange = callback;
    }

    onConnectionStatusChange(callback) {
        this.onConnectionStatusChange = callback;
    }

    onError(callback) {
        this.onError = callback;
    }

    onSharedStateChange(callback) {
        this.onSharedStateChange = callback;
    }

    updateSharedState(key, value) {
        if (!this.sharedState || this.isDestroyed) return;
        
        try {
            this.sharedState.set(key, value);
            console.log(`[CollaborationService] Updated shared state: ${key} = ${value}`);
        } catch (error) {
            console.warn('Error updating shared state:', error);
        }
    }

    getYText() {
        return this.ytext;
    }

    reset() {
        this.isDestroyed = false;

        if (this.doc) {
            try {
                this.doc?.destroy();
            } catch (error) {
                console.warn('[CollaborationService] Error destroying document:', error, this.doc);
            }
            this.doc = null;
        }

        if (this.provider) {
            try {
                this.provider?.destroy();
            } catch (error) {
                console.warn('[CollaborationService] Error destroying provider:', error);
            }
            this.provider = null;
        }
        
        this.ytext = null;        
    }

    destroy() {
        this.isDestroyed = true;
        this.reset();
    }

    isConnected() {
        return this.provider.signalingConns.some(conn => conn.connected);
    }

    getConnectionStatus() {
        const status = {
            connected: this.isConnected(),
            peers: this.provider?.room?.webrtcConns?.size || 0,
            users: this.getConnectedUsers().length
        };
        
        return status;
    }
}

export default CollaborationService;