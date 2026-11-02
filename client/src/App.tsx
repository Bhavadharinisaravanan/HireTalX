import React, { useState } from 'react';
import { RecruitmentProvider, useRecruitment } from './context/RecruitmentContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { StepProgress } from './components/StepProgress';
import { Toast } from './components/Toast';
import { Module1_Auth } from './modules/Module1_Auth';
import { Module2_JD } from './modules/Module2_JD';
import { Module3_Resumes } from './modules/Module3_Resumes';
import { Module4_Ranking } from './modules/Module4_Ranking';
import { Module5_Screening } from './modules/Module5_Screening';
import { Module6_MarketInsights } from './modules/Module6_MarketInsights';
import { Module7_SearchStrings } from './modules/Module7_SearchStrings';
import { AlertCircle, X, Menu, Loader2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentStep, error, clearError, toastMessage, isLoading } = useRecruitment();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <Navbar />

      {/* Mobile Sidebar Toggle Bar */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white"
        >
          <Menu className="w-4 h-4 text-purple-400" />
          <span>Workflow Menu (Step {currentStep} of 7)</span>
        </button>
        <span className="text-[11px] text-purple-300 font-mono">HireTalX Platform</span>
      </div>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navy Sidebar */}
        <Sidebar
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Guided 7-Step Navigation Bar */}
          <StepProgress />

          {/* Global Error Banner */}
          {error && (
            <div className="m-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start justify-between gap-3 animate-fade-in shadow-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-rose-500 hover:text-rose-800 p-0.5 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Active Module View */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {currentStep === 1 && <Module1_Auth />}
            {currentStep === 2 && <Module2_JD />}
            {currentStep === 3 && <Module3_Resumes />}
            {currentStep === 4 && <Module4_Ranking />}
            {currentStep === 5 && <Module5_Screening />}
            {currentStep === 6 && <Module6_MarketInsights />}
            {currentStep === 7 && <Module7_SearchStrings />}
          </div>
        </main>
      </div>

      {/* Global Toast */}
      <Toast message={toastMessage} />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-2xs flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
            <span className="text-xs font-bold text-slate-800">Processing requisition data...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <RecruitmentProvider>
      <MainLayout />
    </RecruitmentProvider>
  );
}
