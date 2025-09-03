
export type LeafHealthStatus = 'Healthy' | 'Deficient' | 'Diseased';

export interface LeafHealth {
    status: LeafHealthStatus;
    reason: string;
}

export type ControlMode = 'Auto' | 'Manual';

export interface SensorData {
    soilMoisture: number;
    leafHealth: LeafHealth;
    pumpStatus: boolean;
    controlMode: ControlMode;
    moistureThreshold: number;
    lastUpdated: Date;
}

export interface MoistureHistoryPoint {
    time: string;
    moisture: number;
}

export interface LeafHealthLogEntry {
    timestamp: string;
    status: LeafHealthStatus;
}

export interface Notification {
    id: number;
    type: 'info' | 'warning' | 'danger';
    message: string;
}
