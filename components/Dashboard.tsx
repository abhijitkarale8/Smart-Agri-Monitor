
import React from 'react';
import StatusCard from './StatusCard';
import MoistureGauge from './MoistureGauge';
import type { LeafHealth } from '../types';

interface DashboardProps {
    soilMoisture: number;
    leafHealth: LeafHealth;
    pumpStatus: boolean;
}

const healthStatusMap = {
    Healthy: { color: 'success', icon: '✅', label: 'Healthy' },
    Deficient: { color: 'warning', icon: '⚠️', label: 'Deficient' },
    Diseased: { color: 'danger', icon: '☣️', label: 'Diseased' },
};

const Dashboard: React.FC<DashboardProps> = ({ soilMoisture, leafHealth, pumpStatus }) => {
    const { color: healthColor, icon: healthIcon, label: healthLabel } = healthStatusMap[leafHealth.status];

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-surface rounded-lg p-6 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-text-secondary mb-4">Soil Moisture</h3>
                <MoistureGauge value={soilMoisture} />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatusCard
                    title="Leaf Health"
                    value={healthLabel}
                    icon={healthIcon}
                    color={healthColor as 'success' | 'warning' | 'danger'}
                    description={leafHealth.reason}
                />
                <StatusCard
                    title="Irrigation Pump"
                    value={pumpStatus ? 'ON' : 'OFF'}
                    icon={pumpStatus ? '💧' : '🚫'}
                    color={pumpStatus ? 'success' : 'danger'}
                    description={`Pump is currently ${pumpStatus ? 'active' : 'inactive'}.`}
                />
            </div>
        </section>
    );
};

export default Dashboard;
