
import React, { useState, useEffect, useCallback } from 'react';
import { useAgroData } from './hooks/useAgroData';
import type { LeafHealthStatus, Notification } from './types';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ControlPanel from './components/ControlPanel';
import LeafAnalyzer from './components/LeafAnalyzer';
import History from './components/History';
import Settings from './components/Settings';
import NotificationCenter from './components/NotificationCenter';

const App: React.FC = () => {
  const {
    data,
    controls,
    history,
  } = useAgroData();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((type: 'info' | 'warning' | 'danger', message: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      type,
      message,
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  }, []);
  
  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  useEffect(() => {
    if (data.soilMoisture < data.moistureThreshold) {
       if (!notifications.some(n => n.message.includes('Soil moisture is critically low'))) {
         addNotification('danger', `Soil moisture is critically low at ${data.soilMoisture}%!`);
       }
    }
  }, [data.soilMoisture, data.moistureThreshold, addNotification, notifications]);

  useEffect(() => {
      if (data.leafHealth.status !== 'Healthy') {
        if (!notifications.some(n => n.message.includes('Unhealthy leaf detected'))) {
         addNotification('warning', `Unhealthy leaf detected: ${data.leafHealth.status}.`);
        }
      }
  }, [data.leafHealth.status, addNotification, notifications]);
  
  const handleLeafAnalysis = (status: LeafHealthStatus, reason: string) => {
    controls.setLeafHealth({ status, reason });
    addNotification('info', `Leaf analysis complete: ${status}.`);
  };

  return (
    <div className="min-h-screen bg-base font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header lastUpdated={data.lastUpdated} />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <Dashboard 
              soilMoisture={data.soilMoisture} 
              leafHealth={data.leafHealth} 
              pumpStatus={data.pumpStatus}
            />
            <History moistureHistory={history.moistureHistory} leafHealthLog={history.leafHealthLog} />
          </div>
          <div className="space-y-6">
            <ControlPanel
              pumpStatus={data.pumpStatus}
              controlMode={data.controlMode}
              onTogglePump={controls.togglePump}
              onSetControlMode={controls.setControlMode}
            />
            <Settings 
              moistureThreshold={data.moistureThreshold}
              onSetMoistureThreshold={controls.setMoistureThreshold}
            />
            <LeafAnalyzer onAnalysisComplete={handleLeafAnalysis} />
          </div>
        </main>
      </div>
      <NotificationCenter notifications={notifications} onDismiss={removeNotification} />
    </div>
  );
};

export default App;
