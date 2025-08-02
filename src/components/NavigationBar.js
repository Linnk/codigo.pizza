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
            
            <div className="d-flex align-items-center gap-1">
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
                            <UncontrolledDropdown className='d-inline-block d-sm-block ms-3 me-3' >
                                <DropdownToggle 
                                    color="link" 
                                    className="text-decoration-none p-0 gap-2"
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

                        <small
                            id="url-text"
                            className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-decoration-underline"
                            style={{ cursor: 'pointer', userSelect: 'none', fontSize: '0.9rem' }}
                            onClick={copyToClipboard}
                            title="Click to copy URL"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link me-2 d-inline-block d-sm-none" viewBox="0 0 16 16">
                            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"></path>
                            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z"></path>
                            </svg>
                            <span className='d-sm-inline d-none'>{window.location.href}</span>
                        </small>
                        
                        <Tooltip placement="bottom" isOpen={tooltipOpen} target="url-text">
                            Copied!
                        </Tooltip>
                    </>
                )}

            </div>
        </Navbar>
    );
}

export default NavigationBar;