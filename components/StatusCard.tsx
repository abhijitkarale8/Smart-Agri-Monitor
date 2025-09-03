
import React from 'react';

interface StatusCardProps {
    title: string;
    value: string;
    icon: string;
    color: 'success' | 'warning' | 'danger' | 'info';
    description: string;
}

const colorClasses = {
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-danger/20 text-danger',
    info: 'bg-blue-500/20 text-blue-400',
};

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon, color, description }) => {
    return (
        <div className="bg-surface rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
            <div>
                <h3 className="text-lg font-semibold text-text-secondary">{title}</h3>
                <div className="flex items-center mt-2">
                    <span className="text-4xl">{icon}</span>
                    <p className={`text-4xl font-bold ml-4 ${colorClasses[color]}`}>{value}</p>
                </div>
            </div>
            <p className="text-sm text-text-secondary mt-4">{description}</p>
        </div>
    );
};

export default StatusCard;
