
import { useState, useEffect, useCallback } from 'react';
import type { SensorData, ControlMode, LeafHealth, MoistureHistoryPoint, LeafHealthLogEntry } from '../types';

const MAX_HISTORY = 30;

export const useAgroData = () => {
    const [data, setData] = useState<SensorData>({
        soilMoisture: 65,
        leafHealth: { status: 'Healthy', reason: 'No visible signs of distress.' },
        pumpStatus: false,
        controlMode: 'Auto',
        moistureThreshold: 35,
        lastUpdated: new Date(),
    });

    const [moistureHistory, setMoistureHistory] = useState<MoistureHistoryPoint[]>([]);
    const [leafHealthLog, setLeafHealthLog] = useState<LeafHealthLogEntry[]>([]);

    const togglePump = useCallback(() => {
        setData(prev => ({ ...prev, pumpStatus: !prev.pumpStatus }));
    }, []);

    const setControlMode = useCallback((mode: ControlMode) => {
        setData(prev => ({ ...prev, controlMode: mode }));
    }, []);

    const setMoistureThreshold = useCallback((threshold: number) => {
        setData(prev => ({ ...prev, moistureThreshold: threshold }));
    }, []);
    
    const setLeafHealth = useCallback((leafHealth: LeafHealth) => {
        setData(prev => ({ ...prev, leafHealth }));
        const newLogEntry: LeafHealthLogEntry = {
            timestamp: new Date().toLocaleTimeString(),
            status: leafHealth.status,
        };
        setLeafHealthLog(prev => [newLogEntry, ...prev].slice(0, MAX_HISTORY));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                let newMoisture = prevData.soilMoisture;
                let newPumpStatus = prevData.pumpStatus;

                // Simulate moisture decrease, faster if pump is off
                const decreaseRate = prevData.pumpStatus ? 0.2 : 1;
                newMoisture -= Math.random() * decreaseRate;

                // Simulate watering if pump is on
                if (prevData.pumpStatus) {
                    newMoisture += 2.5;
                }
                
                newMoisture = Math.max(0, Math.min(100, newMoisture));

                // Auto mode logic
                if (prevData.controlMode === 'Auto') {
                    if (newMoisture < prevData.moistureThreshold && !prevData.pumpStatus) {
                        newPumpStatus = true;
                    } else if (newMoisture > prevData.moistureThreshold + 10 && prevData.pumpStatus) {
                        newPumpStatus = false;
                    }
                }
                
                // Randomly change leaf health for simulation
                if (Math.random() < 0.02) { // 2% chance per tick
                    const statuses = ['Deficient', 'Diseased'];
                    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    if (prevData.leafHealth.status === 'Healthy') {
                        setLeafHealth({ status: newStatus as 'Deficient' | 'Diseased', reason: 'Simulated detection.' });
                    }
                } else if (Math.random() < 0.05 && prevData.leafHealth.status !== 'Healthy') {
                     setLeafHealth({ status: 'Healthy', reason: 'Simulated recovery.' });
                }


                return {
                    ...prevData,
                    soilMoisture: parseFloat(newMoisture.toFixed(1)),
                    pumpStatus: newPumpStatus,
                    lastUpdated: new Date(),
                };
            });

            setMoistureHistory(prevHistory => {
                const newPoint = {
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    moisture: data.soilMoisture,
                };
                return [...prevHistory, newPoint].slice(-MAX_HISTORY);
            });

        }, 3000);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.soilMoisture, setLeafHealth]);

    return {
        data,
        controls: {
            togglePump,
            setControlMode,
            setMoistureThreshold,
            setLeafHealth
        },
        history: {
            moistureHistory,
            leafHealthLog
        }
    };
};
