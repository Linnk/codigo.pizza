import { Navbar, NavbarBrand, Tooltip } from 'reactstrap';
import { useState } from 'react';

function NavigationBar() {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const currentUrl = window.location.href;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setTooltipOpen(true);
            setTimeout(() => {
                setTooltipOpen(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Navbar className="border-bottom">
            <NavbarBrand href="/" className="fw-bold">
                codigo.pizza
            </NavbarBrand>
            <div className="d-flex align-items-center gap-2">
                <span
                    id="url-text"
                    className="text-secondary"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={copyToClipboard}
                >
                    {currentUrl}
                </span>
                <Tooltip
                    placement="bottom"
                    isOpen={tooltipOpen}
                    target="url-text"
                >
                    Copied!
                </Tooltip>
            </div>
        </Navbar>
    );
}

export default NavigationBar;