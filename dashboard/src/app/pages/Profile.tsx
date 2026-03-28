import React, { useState } from 'react';
import { User, Mail, Phone, Home, Shield, Save, Camera } from 'lucide-react';

export function Profile() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Personal Information</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your personal profile and contact details.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 border-4 border-white shadow-lg overflow-hidden">
                  <User size={64} className="opacity-50" />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-900">Admin User</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mt-1 inline-block">System Administrator</span>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSave} className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Admin" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="User" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="email" 
                      defaultValue="admin@smarthome.local" 
                      className="w-full pl-10 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Email cannot be changed directly. Contact support.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="tel" 
                      defaultValue="+1 (555) 000-0000" 
                      className="w-full pl-10 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-4 flex items-center gap-2">
                  <Shield size={16} className="text-indigo-500" />
                  Account Security Level
                </h4>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security to your gateway.</p>
                  </div>
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-70"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
