
import React from 'react';

interface HeaderProps {
    lastUpdated: Date;
}

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM3.894 9.422a1 1 0 00-1.788 0l-1.33 2.662a1 1 0 00.894 1.415h2.661a1 1 0 00.895-1.415l-1.332-2.662zM10 2a1 1 0 00-1 1v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 8.586V3a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ lastUpdated }) => {
    return (
        <header className="flex justify-between items-center pb-4 border-b-2 border-surface">
            <div className="flex items-center space-x-3">
                <LeafIcon />
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">Smart Agro Monitor</h1>
            </div>
            <div className="text-right">
                <p className="text-sm text-text-secondary">Last Updated</p>
                <p className="text-md font-semibold text-secondary">{lastUpdated.toLocaleTimeString()}</p>
            </div>
        </header>
    );
};

export default Header;
