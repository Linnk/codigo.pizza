import { Navbar, NavbarBrand, Input, InputGroup, Button } from 'reactstrap';
import { useState } from 'react';

function NavigationBar() {
    const [copied, setCopied] = useState(false);
    const currentUrl = window.location.href;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Navbar className="border-bottom">
            <NavbarBrand href="/" className="fw-bold">
                codigo.pizza
            </NavbarBrand>
            <div className="d-flex align-items-center gap-2">
                <InputGroup style={{ width: '300px' }}>
                    <Input
                        type="text"
                        value={currentUrl}
                        readOnly
                        className="form-control-sm"
                    />
                    <Button
                        color={copied ? 'success' : 'outline-secondary'}
                        size="sm"
                        onClick={copyToClipboard}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </InputGroup>
            </div>
        </Navbar>
    );
}

export default NavigationBar;