import React, { useState } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  UserCheck,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  Sparkles,
  Users
} from 'lucide-react';

export const Module1_Auth: React.FC = () => {
  const { currentUser, personas, loginAs, isLoading, setCurrentStep } = useRecruitment();
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("recruiter-01");
  const [email, setEmail] = useState<string>("sarah.jenkins@hiretalx.com");
  const [password, setPassword] = useState<string>("••••••••••••");

  const handleSelectPersona = (id: string) => {
    setSelectedPersonaId(id);
    const p = personas.find(item => item.id === id);
    if (p) {
      setEmail(p.email);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginAs(selectedPersonaId);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200">
          <Sparkles className="w-3.5 h-3.5" />
          Workflow 1: Recruiter Workspace Authentication
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Enterprise Talent Partner Portal
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Welcome to HireTalX. Authenticate with your enterprise credentials to access assigned requisitions and candidate ranking workflows.
        </p>
      </div>

      {currentUser ? (
        /* Logged In State */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-300 shadow-sm"
              />
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Active Session
                  </span>
                </div>
                <p className="text-xs text-purple-700 font-semibold">{currentUser.role}</p>
                <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <Building className="w-3 h-3 text-slate-400" />
                  {currentUser.team} • {currentUser.company}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Continue to Step 2: Job Description</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 font-medium uppercase">Active Requisitions</span>
              <p className="text-2xl font-black text-slate-800 mt-1">{currentUser.activeRequisitions} Open Roles</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 font-medium uppercase">Monthly Target</span>
              <p className="text-2xl font-black text-purple-700 mt-1">{currentUser.monthlyQuota}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 font-medium uppercase">Security Status</span>
              <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                SSO 2FA Verified
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Login Form with Recruiter Profile Cards */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Recruiter Profile Cards (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Select Recruiter Profile</span>
            </div>

            <div className="space-y-3">
              {personas.map((persona) => {
                const isSelected = selectedPersonaId === persona.id;
                return (
                  <div
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona.id)}
                    className={`
                      p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5
                      ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50/60 shadow-sm ring-1 ring-purple-400'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }
                    `}
                  >
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{persona.name}</h4>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                      </div>
                      <p className="text-[11px] font-medium text-purple-700 truncate">{persona.role}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{persona.company}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-[11px] text-purple-900 leading-relaxed">
              <strong>Enterprise Directory Access:</strong> Select an authorized talent acquisition specialist profile to load live requisition queues and role rubrics.
            </div>
          </div>

          {/* Login Form (3 cols) */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{isLoading ? 'Verifying Session...' : 'Sign In as Recruiter'}</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 pt-2">
                Protected by Enterprise RBAC & SOC-2 Type II Certified Security Standards
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
