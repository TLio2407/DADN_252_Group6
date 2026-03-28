import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Home, Server, Lock, Mail, User, Wifi, Cpu, ArrowLeft, ArrowRight } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate connection and registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <Cpu size={32} className="text-white" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Initialize System
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Set up a new AI Smart Home Gateway
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
               <div className="absolute inset-y-0 left-0 w-full flex items-center z-0">
                  <div className="h-0.5 w-full bg-slate-200"></div>
                  <div className={`absolute h-0.5 bg-indigo-600 transition-all duration-300 z-10`} style={{ width: step === 1 ? '50%' : '100%' }}></div>
               </div>
               <div className={`relative z-20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 1 ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-500'}`}>1</div>
               <div className={`relative z-20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= 2 ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-500'}`}>2</div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs font-medium text-slate-600">Account Details</span>
              <span className="text-xs font-medium text-slate-600">Gateway Setup</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={step === 2 ? handleRegister : (e) => { e.preventDefault(); setStep(2); }}>
            
            {step === 1 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="name" name="name" type="text" required placeholder="John Doe"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email" name="email" type="email" required placeholder="admin@smarthome.local"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">Master Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="password" name="password" type="password" required placeholder="••••••••"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    Next Step
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                {/* Gateway Warning */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <Wifi className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">Make sure your gateway is powered on.</p>
                    <p>Connect your web device to the same local network as the Yolo:Bit / Gateway to complete the pairing process.</p>
                  </div>
                </div>

                {/* Gateway Address / IP */}
                <div>
                  <label htmlFor="gateway-ip" className="block text-sm font-medium text-slate-700">Gateway Local IP / Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Server className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="gateway-ip" name="gateway-ip" type="text" required placeholder="e.g., 192.168.1.100"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">Find this on your router settings or gateway's display.</p>
                </div>

                {/* Home Name */}
                <div>
                  <label htmlFor="home-name" className="block text-sm font-medium text-slate-700">Home Designation</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="home-name" name="home-name" type="text" required placeholder="e.g., My Apartment"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 flex justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowLeft size={16} />
                      Back
                    </div>
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-[2] flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Pairing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Pair Gateway
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <p className="mt-8 text-center text-sm text-slate-600">
          Already have a paired gateway?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
