
import React from 'react';

interface MoistureGaugeProps {
    value: number;
}

const MoistureGauge: React.FC<MoistureGaugeProps> = ({ value }) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    const getColor = () => {
        if (clampedValue < 30) return 'text-danger';
        if (clampedValue < 50) return 'text-warning';
        return 'text-success';
    };

    const getTrackColor = () => {
        if (clampedValue < 30) return 'stroke-danger';
        if (clampedValue < 50) return 'stroke-warning';
        return 'stroke-success';
    };


    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    className="stroke-current text-gray-700"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                />
                {/* Progress circle */}
                <circle
                    className={`stroke-current ${getTrackColor()} transition-all duration-500`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${getColor()}`}>
                {Math.round(clampedValue)}%
            </div>
        </div>
    );
};

export default MoistureGauge;
