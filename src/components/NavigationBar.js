import { Navbar, NavbarBrand, Tooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useState } from 'react';

function NavigationBar({ 
    roomId, 
    connectedUsers = [], 
    connectionStatus = 'disconnected'
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
            case 'connected': return 'text-bg-success';
            case 'connecting': return 'text-bg-warning';
            case 'waiting': return 'text-bg-secondary';
            case 'disconnected': return 'text-bg-danger';
            default: return 'text-bg-secondary';
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


    return (
        <Navbar className="border-bottom px-3">
            <NavbarBrand href="/" className="fw-bold font-monospace">
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
                        <small className='text-secondary'>
                            <span 
                                className={`me-2 rounded-circle ${getConnectionStatusColor()}`}
                                style={{ width: '7px', height: '7px', display: 'inline-block' }}
                            />
                            {getConnectionStatusText()}
                        </small>

                        {connectedUsers.length > 0 && (
                            <UncontrolledDropdown>
                                <DropdownToggle 
                                    color="link" 
                                    className="text-decoration-none p-0 d-flex align-items-center gap-2"
                                >
                                    <small>
                                        {connectedUsers.length} user{connectedUsers.length !== 1 ? 's' : ''}
                                    </small>
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
                    </>
                )}

                <small
                    id="url-text"
                    className="text-secondary"
                    style={{ cursor: 'pointer', userSelect: 'none', fontSize: '0.9rem' }}
                    onClick={copyToClipboard}
                    title="Click to copy URL"
                >
                    {window.location.href}
                </small>
                
                <Tooltip placement="bottom" isOpen={tooltipOpen} target="url-text">
                    Copied!
                </Tooltip>
            </div>
        </Navbar>
    );
}

export default NavigationBar;