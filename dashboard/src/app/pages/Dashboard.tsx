import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Sprout, TrendingUp, TrendingDown, RefreshCw, Ruler, ScanFace } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const INITIAL_DATA = [
  { time: '08:00', temp: 24, humidity: 60, soil: 40 },
  { time: '09:00', temp: 25, humidity: 58, soil: 38 },
  { time: '10:00', temp: 26, humidity: 55, soil: 36 },
  { time: '11:00', temp: 28, humidity: 52, soil: 35 },
  { time: '12:00', temp: 29, humidity: 50, soil: 33 },
  { time: '13:00', temp: 30, humidity: 48, soil: 31 },
  { time: '14:00', temp: 29.5, humidity: 49, soil: 30 },
];

export function Dashboard() {
  const [data, setData] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    temp: 29.5,
    humidity: 49,
    soil: 30,
    distance: 1.2,
    gesture: 'Open Hand'
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate real-time data incoming
  useEffect(() => {
    // Initialize data with 10-minute intervals ending at the nearest past 10-minute mark
    const generateInitialData = () => {
      const now = new Date();
      const coeff = 1000 * 60 * 10; // 10 minutes in milliseconds
      const roundedNow = new Date(Math.floor(now.getTime() / coeff) * coeff);
      
      return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(roundedNow.getTime() - (6 - i) * coeff);
        return {
          time: d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          temp: parseFloat((29.5 + (Math.random() - 0.5)).toFixed(1)),
          humidity: Math.floor(49 + (Math.random() - 0.5) * 2),
          soil: Math.floor(30 + (Math.random() - 0.5) * 2)
        };
      });
    };
    
    setData(generateInitialData());
    let lastChartUpdateTime = Math.floor(Date.now() / (1000 * 60 * 10)) * (1000 * 60 * 10);

    const interval = setInterval(() => {
      setIsUpdating(true);
      
      setTimeout(() => {
         const now = new Date();

         setCurrentMetrics(prev => {
           // Simulate slight fluctuations for the live cards
           const tempDiff = (Math.random() - 0.5) * 0.5;
           const humDiff = (Math.random() - 0.5) * 1;
           const soilDiff = (Math.random() - 0.5) * 0.5;
           const distDiff = (Math.random() - 0.5) * 0.2;
           
           const newTemp = parseFloat((prev.temp + tempDiff).toFixed(1));
           const newHumidity = Math.max(0, Math.min(100, Math.round(prev.humidity + humDiff)));
           const newSoil = Math.max(0, Math.min(100, Math.round(prev.soil + soilDiff)));
           
           // Check if we crossed a new 10-minute mark to update the chart
           const currentCoeff = 1000 * 60 * 10;
           const currentRounded = Math.floor(now.getTime() / currentCoeff) * currentCoeff;
           
           if (currentRounded > lastChartUpdateTime) {
             lastChartUpdateTime = currentRounded;
             const timeString = new Date(currentRounded).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
             
             setData(currentData => {
               const newData = [...currentData, { 
                 time: timeString, 
                 temp: newTemp, 
                 humidity: newHumidity, 
                 soil: newSoil 
               }];
               // Keep only the last 7 data points
               if (newData.length > 7) newData.shift();
               return newData;
             });
           }
           
           // Toggle gesture occasionally
           const gestures = ['Open Hand', 'Fist', 'None', 'Open Hand', 'None'];
           const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
           
           return {
             temp: newTemp,
             humidity: newHumidity,
             soil: newSoil,
             distance: Math.max(0.1, parseFloat((prev.distance + distDiff).toFixed(2))),
             gesture: Math.random() > 0.8 ? randomGesture : prev.gesture
           };
         });
         setIsUpdating(false);
      }, 500);

    }, 3000); // Live metrics update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ title, value, unit, icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between overflow-hidden relative">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${color}`}></div>
      
      <div className="flex items-center justify-between mb-4 relative z-1">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`p-2 rounded-lg ${color} text-white`}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-end gap-2 relative z-1">
        <div className="text-3xl font-bold text-slate-900 flex items-center gap-1">
          {value}
          {unit && <span className="text-base font-normal text-slate-500">{unit}</span>}
        </div>
        
        {trend !== undefined && (
           <div className={`flex items-center text-xs font-medium mb-1 ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
             {trend > 0 ? <TrendingUp size={14} className="mr-0.5" /> : <TrendingDown size={14} className="mr-0.5" />}
             {Math.abs(trend)}%
           </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight text-slate-900">System Dashboard</h2>
           <p className="text-slate-500 text-sm mt-1">Real-time sensor metrics & AI states</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm self-start">
          <RefreshCw size={14} className={isUpdating ? 'animate-spin text-indigo-500' : ''} />
          {isUpdating ? 'Polling...' : 'Live Data'}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <MetricCard 
          title="Temp (DHT20)" 
          value={currentMetrics.temp} 
          unit="°C" 
          icon={<Thermometer size={20} />} 
          color="bg-rose-500"
          trend={1.2}
        />
        <MetricCard 
          title="Humidity (DHT20)" 
          value={currentMetrics.humidity} 
          unit="%" 
          icon={<Droplets size={20} />} 
          color="bg-blue-500"
          trend={-0.5}
        />
        <MetricCard 
          title="Soil Moisture" 
          value={currentMetrics.soil} 
          unit="%" 
          icon={<Sprout size={20} />} 
          color="bg-emerald-500"
          trend={-2.1}
        />
        <MetricCard 
          title="Human Distance" 
          value={currentMetrics.distance} 
          unit="m" 
          icon={<Ruler size={20} />} 
          color="bg-amber-500"
        />
        <MetricCard 
          title="Last AI Gesture" 
          value={currentMetrics.gesture} 
          unit="" 
          icon={<ScanFace size={20} />} 
          color="bg-indigo-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Environment Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="mb-4 flex items-center justify-between">
             <h3 className="font-semibold text-slate-900">Climate Log</h3>
           </div>
           
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={['dataMin - 5', 'dataMax + 5']} />
                 <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 />
                 <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                 <Line yAxisId="right" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Soil Moisture Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="mb-4 flex items-center justify-between">
             <h3 className="font-semibold text-slate-900">Soil Hydration Log</h3>
           </div>
           
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorSoil" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Area type="monotone" dataKey="soil" name="Soil Moisture (%)" stroke="#10b981" fillOpacity={1} fill="url(#colorSoil)" strokeWidth={3} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>
    </div>
  );
}
