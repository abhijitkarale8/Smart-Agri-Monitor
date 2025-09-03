
import React from 'react';

interface SettingsProps {
    moistureThreshold: number;
    onSetMoistureThreshold: (value: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ moistureThreshold, onSetMoistureThreshold }) => {
    return (
        <div className="bg-surface rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Settings</h3>
            <div className="space-y-2">
                <label htmlFor="threshold" className="block text-sm font-medium text-text-secondary">
                    Auto-Pump Moisture Threshold (%)
                </label>
                <div className="flex items-center space-x-4">
                    <input
                        type="range"
                        id="threshold"
                        min="10"
                        max="60"
                        value={moistureThreshold}
                        onChange={(e) => onSetMoistureThreshold(Number(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="font-semibold text-secondary text-lg w-12 text-center">{moistureThreshold}%</span>
                </div>
                <p className="text-xs text-text-secondary pt-1">
                    Pump will turn ON automatically if moisture drops below this value.
                </p>
            </div>
        </div>
    );
};

export default Settings;
