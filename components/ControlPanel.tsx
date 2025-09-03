
import React from 'react';
import type { ControlMode } from '../types';

interface ControlPanelProps {
    pumpStatus: boolean;
    controlMode: ControlMode;
    onTogglePump: () => void;
    onSetControlMode: (mode: ControlMode) => void;
}

const ToggleSwitch: React.FC<{
    checked: boolean;
    onChange: () => void;
    label: string;
    disabled?: boolean;
}> = ({ checked, onChange, label, disabled }) => (
    <div className={`flex items-center justify-between ${disabled ? 'opacity-50' : ''}`}>
        <span className="text-text-primary">{label}</span>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" disabled={disabled} />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
    </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ pumpStatus, controlMode, onTogglePump, onSetControlMode }) => {
    const isManualDisabled = controlMode === 'Auto';

    return (
        <div className="bg-surface rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Control Panel</h3>
            <div className="space-y-4">
                <ToggleSwitch
                    label="Auto Mode"
                    checked={controlMode === 'Auto'}
                    onChange={() => onSetControlMode(controlMode === 'Auto' ? 'Manual' : 'Auto')}
                />
                <hr className="border-gray-600" />
                <ToggleSwitch
                    label="Manual Pump Control"
                    checked={pumpStatus}
                    onChange={onTogglePump}
                    disabled={isManualDisabled}
                />
                 {isManualDisabled && <p className="text-xs text-text-secondary pt-1">Disable Auto Mode for manual control.</p>}
            </div>
        </div>
    );
};

export default ControlPanel;
