import React, { useState } from 'react';
import { Bell, Shield, Lock, Globe, Database, Smartphone, Laptop, Check } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Account Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Configure your system preferences, security, and notifications.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Bell size={18} />
            Notifications
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Shield size={18} />
            Security & Privacy
          </button>
          <button 
            onClick={() => setActiveTab('gateway')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'gateway' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Database size={18} />
            Gateway Config
          </button>
          <button 
            onClick={() => setActiveTab('sessions')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sessions' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Globe size={18} />
            Active Sessions
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 min-h-[400px]">
          
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2"><Bell className="text-indigo-500" size={20}/> Alert Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                      <p className="text-xs text-slate-500 mt-1">Receive daily summaries and critical alerts via email.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Push Notifications</p>
                      <p className="text-xs text-slate-500 mt-1">Get real-time alerts on your mobile device for AI detections.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Weekly Analytics Report</p>
                      <p className="text-xs text-slate-500 mt-1">Detailed statistics on power usage and sensor data.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2"><Lock className="text-indigo-500" size={20}/> Password Management</h3>
                <form className="space-y-4 max-w-sm">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <button type="button" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'gateway' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2"><Database className="text-indigo-500" size={20}/> Gateway Configuration</h3>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-amber-800 font-medium">Changing gateway IDs will disconnect your current devices.</p>
                </div>
                <div className="space-y-4 max-w-sm">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary Gateway ID</label>
                    <input type="text" defaultValue="GTW-8932-XXXX" disabled className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Yolo:Bit Connection String</label>
                    <input type="text" defaultValue="mqtt://broker.emqx.io:1883" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sync Interval (seconds)</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white">
                      <option>1s (Real-time)</option>
                      <option selected>3s (Balanced)</option>
                      <option>10s (Power Saving)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2"><Globe className="text-indigo-500" size={20}/> Active Sessions</h3>
                <p className="text-sm text-slate-500 mb-4">Devices that are currently logged into your gateway account.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full"><Laptop size={20} /></div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">MacBook Pro <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Current</span></p>
                        <p className="text-xs text-slate-500 mt-0.5">San Francisco, US • Chrome 120.0</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-full"><Smartphone size={20} /></div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">iPhone 14 Pro</p>
                        <p className="text-xs text-slate-500 mt-0.5">San Francisco, US • App v2.1.0 • Last active: 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-md transition-colors">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'notifications' || activeTab === 'gateway') && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all"
              >
                {isSaved ? <Check size={18} className="animate-in zoom-in" /> : null}
                {isSaved ? 'Saved!' : 'Save Preferences'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
