
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MoistureHistoryPoint, LeafHealthLogEntry } from '../types';

interface HistoryProps {
    moistureHistory: MoistureHistoryPoint[];
    leafHealthLog: LeafHealthLogEntry[];
}

const statusColorMap = {
    Healthy: 'text-success',
    Deficient: 'text-warning',
    Diseased: 'text-danger',
};

const History: React.FC<HistoryProps> = ({ moistureHistory, leafHealthLog }) => {
    return (
        <div className="bg-surface rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Data History</h3>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <div className="xl:col-span-3">
                    <h4 className="text-lg font-semibold text-text-secondary mb-2">Soil Moisture (%)</h4>
                    <div style={{ width: '100%', height: 300 }}>
                         <ResponsiveContainer>
                            <LineChart data={moistureHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                                <XAxis dataKey="time" stroke="#a0a0a0" />
                                <YAxis stroke="#a0a0a0" domain={[0, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #4a4a4a' }} />
                                <Legend />
                                <Line type="monotone" dataKey="moisture" stroke="#4f8a4f" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="xl:col-span-2">
                    <h4 className="text-lg font-semibold text-text-secondary mb-2">AI Health Log</h4>
                    <div className="h-[300px] overflow-y-auto bg-base rounded p-3 space-y-2">
                        {leafHealthLog.length > 0 ? (
                            leafHealthLog.map((log, index) => (
                                <div key={index} className="flex justify-between items-center text-sm p-2 bg-surface/50 rounded">
                                    <span className="text-text-secondary">{log.timestamp}</span>
                                    <span className={`font-semibold ${statusColorMap[log.status]}`}>{log.status}</span>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-text-secondary">No health events logged.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
