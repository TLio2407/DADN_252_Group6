import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router';
import { 
  LayoutDashboard, 
  Sliders, 
  Menu, 
  User, 
  Bell, 
  Home,
  X,
  Settings,
  LogOut,
  AlertCircle,
  Video
} from 'lucide-react';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navLinks = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/devices", icon: <Sliders size={20} />, label: "Device Controls" },
  ];

  // Dummy notifications
  const notifications = [
    { id: 1, type: 'alert', title: 'High Temperature Detected', time: '2 mins ago', icon: <AlertCircle size={16} className="text-rose-500" /> },
    { id: 2, type: 'info', title: 'AI Camera: Motion at Front Door', time: '10 mins ago', icon: <Video size={16} className="text-indigo-500" /> },
    { id: 3, type: 'system', title: 'System Updated to v2.1.0', time: '2 hours ago', icon: <Settings size={16} className="text-slate-500" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-none flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
            <Home size={24} />
            <span>AI Smart Home</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        {/* System Status in Sidebar Bottom */}
        <div className="flex-none p-4 border-t border-slate-100 bg-white">
           <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             System Online
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 mr-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold hidden sm:block">Integrated System</h1>
          </div>

          <div className="flex items-center gap-4 relative z-50">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 relative focus:outline-none focus:ring-2 focus:ring-slate-200"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">{notif.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{notif.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                      <button className="text-sm text-slate-600 hover:text-slate-900 font-medium">View All Alerts</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button 
                className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 border border-indigo-200 shadow-sm cursor-pointer hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
              >
                <User size={18} />
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <p className="text-sm font-semibold text-slate-900">Admin User</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">admin@smarthome.local</p>
                    </div>
                    <div className="p-2">
                      <Link 
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <User size={16} className="text-slate-400" />
                        Personal Information
                      </Link>
                      <Link 
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Settings size={16} className="text-slate-400" />
                        Account Settings
                      </Link>
                    </div>
                    <div className="p-2 border-t border-slate-100">
                      <Link 
                        to="/login"
                        className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2 font-medium"
                      >
                        <LogOut size={16} className="text-rose-500" />
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
