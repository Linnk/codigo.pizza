import { Navbar, NavbarBrand, Tooltip, Badge, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useState } from 'react';

function NavigationBar({ 
    roomId, 
    connectedUsers = [], 
    connectionStatus = 'disconnected',
    onUserNameChange,
    currentUserName
}) {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const copyToClipboard = async () => {
        try {
            const url = `${window.location.origin}/editor/${roomId}`;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(() => {
                    setTooltipOpen(true);
                    setTimeout(() => {
                        setTooltipOpen(false);
                    }, 2000);
                });
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const getConnectionStatusColor = () => {
        switch (connectionStatus) {
            case 'connected': return 'success';
            case 'connecting': return 'warning';
            case 'waiting': return 'info';
            case 'disconnected': return 'danger';
            default: return 'secondary';
        }
    };

    const getConnectionStatusText = () => {
        switch (connectionStatus) {
            case 'connected': return 'Connected';
            case 'connecting': return 'Connecting...';
            case 'waiting': return 'Waiting for guests';
            case 'disconnected': return 'Disconnected';
            default: return 'Unknown';
        }
    };

    const handleNameChange = () => {
        const newName = prompt('Enter your name:', currentUserName || '');
        if (newName && newName.trim() && onUserNameChange) {
            onUserNameChange(newName.trim());
        }
    };

    return (
        <Navbar className="border-bottom px-3">
            <NavbarBrand href="/" className="fw-bold">
                <img 
                                src="/img/transparent-pizza.png" 
                                alt="Pizza slice" 
                                className="me-3"
                                style={{width: '30px', height: 'auto'}}
                            />
                codigo.pizza
            </NavbarBrand>
            
            <div className="d-flex align-items-center gap-3">
                {roomId && (
                    <>
                        <Badge color={getConnectionStatusColor()} className="d-flex align-items-center gap-1">
                            <span 
                                className="rounded-circle bg-white" 
                                style={{ width: '6px', height: '6px' }}
                            />
                            {getConnectionStatusText()}
                        </Badge>

                        {connectedUsers.length > 0 && (
                            <UncontrolledDropdown>
                                <DropdownToggle 
                                    color="link" 
                                    className="text-decoration-none p-0 d-flex align-items-center gap-2"
                                >
                                    <Badge color="primary" pill>
                                        {connectedUsers.length} user{connectedUsers.length !== 1 ? 's' : ''}
                                    </Badge>
                                </DropdownToggle>
                                <DropdownMenu end>
                                    {connectedUsers.map((user) => (
                                        <DropdownItem key={user.id} className="d-flex align-items-center gap-2">
                                            <span 
                                                className="rounded-circle" 
                                                style={{ 
                                                    width: '12px', 
                                                    height: '12px',
                                                    backgroundColor: user.color || '#007bff'
                                                }}
                                            />
                                            {user.name || 'Anonymous'}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )}

                        <Button 
                            color="link" 
                            size="sm" 
                            onClick={handleNameChange}
                            className="text-decoration-none p-1"
                            title="Change your name"
                        >
                            {currentUserName || 'Anonymous'}
                        </Button>
                    </>
                )}

                <span
                    id="url-text"
                    className="text-secondary"
                    style={{ cursor: 'pointer', userSelect: 'none', fontSize: '0.9rem' }}
                    onClick={copyToClipboard}
                    title="Click to copy URL"
                >
                    {window.location.href}
                </span>
                
                <Tooltip placement="bottom" isOpen={tooltipOpen} target="url-text">
                    Copied!
                </Tooltip>
            </div>
        </Navbar>
    );
}

export default NavigationBar;