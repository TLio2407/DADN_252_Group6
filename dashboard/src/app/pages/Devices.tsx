import React, { useState } from 'react';
import { 
  Power, 
  DoorOpen, 
  Droplet, 
  Fan, 
  Monitor, 
  Video, 
  Activity,
  CheckCircle2,
  XCircle,
  Settings,
  MoreVertical,
  Clock,
  AlertTriangle
} from 'lucide-react';

const INITIAL_DEVICES = [
  { id: 1, name: 'Automated Entry Door', type: 'servo', icon: DoorOpen, status: false, room: 'Main Entrance', lastActive: '5 mins ago', health: 100, ip: '192.168.1.101' },
  { id: 2, name: 'Smart Climate Fan', type: 'fan', icon: Fan, status: true, room: 'Living Room', lastActive: 'Now', health: 92, ip: '192.168.1.102' },
  { id: 3, name: 'Irrigation Pump', type: 'pump', icon: Droplet, status: false, room: 'Balcony Garden', lastActive: '2 hrs ago', health: 100, ip: '192.168.1.103' },
  { id: 4, name: 'System Status LCD', type: 'display', icon: Monitor, status: true, room: 'Hallway', lastActive: 'Now', health: 98, ip: '192.168.1.104' },
  { id: 5, name: 'AI Gesture Camera', type: 'camera', icon: Video, status: true, room: 'Main Entrance', lastActive: 'Now', health: 85, ip: '192.168.1.105' },
];

export function Devices() {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [globalPower, setGlobalPower] = useState(true);

  const toggleDevice = (id) => {
    setDevices(devices.map(dev => 
      dev.id === id ? { ...dev, status: !dev.status, lastActive: 'Just now' } : dev
    ));
  };

  const activeCount = devices.filter(d => d.status).length;
  const inactiveCount = devices.length - activeCount;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section for Web App */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Device Fleet Management</h2>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Monitor and control all connected Yolo:Bit modules across your infrastructure. System requires global power to be active for individual module control.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm self-start">
           <div className="flex items-center gap-6 px-4 py-2">
             <div className="flex flex-col">
               <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active</span>
               <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-lg font-bold text-slate-700 leading-none">{activeCount}</span>
               </div>
             </div>
             <div className="w-px h-8 bg-slate-200"></div>
             <div className="flex flex-col">
               <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Inactive</span>
               <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span className="text-lg font-bold text-slate-700 leading-none">{inactiveCount}</span>
               </div>
             </div>
           </div>
           <div className="w-px h-10 bg-slate-200 mx-2"></div>
           <button 
             onClick={() => setGlobalPower(!globalPower)}
             className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-all shadow-sm ${
               globalPower 
                 ? 'bg-rose-500 text-white hover:bg-rose-600' 
                 : 'bg-emerald-500 text-white hover:bg-emerald-600'
             }`}
           >
             <Power size={18} />
             {globalPower ? 'Master Stop' : 'Master Start'}
           </button>
        </div>
      </div>

      {/* Web App Table/Grid View */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4">Device & Location</div>
          <div className="col-span-2">Network IP</div>
          <div className="col-span-2">Health</div>
          <div className="col-span-2">Last Sync</div>
          <div className="col-span-2 text-right">Power Control</div>
        </div>

        {/* Device Rows */}
        <div className="divide-y divide-slate-100">
          {devices.map((device) => {
            const Icon = device.icon;
            const isOn = device.status && globalPower;
            const isWarning = device.health < 90;
            
            return (
              <div 
                key={device.id} 
                className="group flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
              >
                {/* Device Info */}
                <div className="col-span-4 flex items-start md:items-center gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-xl transition-colors duration-300 ${
                    isOn ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Icon size={24} className={isOn && device.type === 'fan' ? 'animate-spin [animation-duration:3s]' : ''} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{device.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                        {device.room}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Network IP (Hidden on mobile) */}
                <div className="hidden md:flex col-span-2 items-center text-sm font-mono text-slate-500">
                  {device.ip}
                </div>

                {/* Health Status */}
                <div className="hidden md:flex col-span-2 items-center gap-2">
                  <div className="flex-1 max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isWarning ? 'bg-amber-400' : 'bg-emerald-400'}`} 
                      style={{ width: `${device.health}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${isWarning ? 'text-amber-600' : 'text-slate-600'}`}>
                    {device.health}%
                  </span>
                  {isWarning && <AlertTriangle size={14} className="text-amber-500" />}
                </div>

                {/* Last Active */}
                <div className="hidden md:flex col-span-2 items-center gap-1.5 text-sm text-slate-500">
                  <Clock size={14} />
                  {device.lastActive}
                </div>

                {/* Controls */}
                <div className="col-span-2 flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0 pt-4 md:pt-0 border-t border-slate-100 md:border-0">
                  <div className="md:hidden flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">Status:</span>
                    <span className={`text-sm font-semibold ${isOn ? 'text-indigo-600' : 'text-slate-500'}`}>
                      {isOn ? 'Active' : 'Offline'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Toggle Switch */}
                    <button 
                      onClick={() => toggleDevice(device.id)}
                      disabled={!globalPower}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isOn ? 'bg-indigo-500' : 'bg-slate-300'
                      }`}
                    >
                      <span className="sr-only">Toggle {device.name}</span>
                      <span 
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          isOn ? 'translate-x-6' : 'translate-x-1'
                        } shadow-sm`} 
                      />
                    </button>

                    {/* Actions Menu */}
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200 transition-colors">
                      <Settings size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
