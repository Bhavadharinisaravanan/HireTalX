import React, { useEffect } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BarChart3
} from 'lucide-react';

export const Module6_MarketInsights: React.FC = () => {
  const {
    marketInsights,
    fetchMarketInsights,
    currentJD,
    isLoading,
    setCurrentStep
  } = useRecruitment();

  useEffect(() => {
    if (!marketInsights) {
      fetchMarketInsights();
    }
  }, []);

  const roleTitle = currentJD?.title || "Senior Full Stack & AI Solutions Engineer";
  const location = currentJD?.location || "Bangalore, India";

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Workflow 6: Public Market Intelligence & Benchmarks
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hiring Market Benchmarks & Comparable Roles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-world market compensation, demand indices, and comparable public job postings. Explicitly labeled for verified vs. estimated benchmark data.
          </p>
        </div>

        <button
          onClick={fetchMarketInsights}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs shadow-2xs transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <TrendingUp className="w-4 h-4 text-purple-600" />
          <span>{isLoading ? 'Refreshing Insights...' : 'Refresh Market Data'}</span>
        </button>
      </div>

      {/* Ethical Compliance Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 flex items-start gap-3.5 text-xs shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white text-sm">Ethical Compliance & Anti-Scraping Standard:</span>
          <p className="text-slate-300 leading-relaxed">
            {marketInsights?.complianceNotice ||
              "HireTalX strictly complies with portal Terms of Service. No automated web scraping or authenticated sessions with LinkedIn or Naukri are conducted. Postings are compiled from open company career feeds, public regulatory compensation filings, and standardized engineering salary benchmarks."}
          </p>
        </div>
      </div>

      {/* Market Compensation Distribution Card */}
      {marketInsights?.salaryDistribution && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Compensation Benchmarks: {roleTitle}
              </h2>
              <p className="text-xs text-slate-500">
                Target Market: {location} • Unit: INR Lakhs Per Annum (LPA) & USD Equivalent
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 self-start sm:self-auto">
              {marketInsights.salaryDistribution.marketTrend}
            </span>
          </div>

          {/* 4 Percentile Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">25th Percentile</span>
              <p className="text-xl font-black text-slate-800 mt-1">
                {marketInsights.salaryDistribution.percentile25.formatted}
              </p>
              <span className="text-[10px] text-slate-500">Junior-Senior Entry</span>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-center shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">50th Percentile (Median)</span>
              <p className="text-2xl font-black text-purple-900 mt-1">
                {marketInsights.salaryDistribution.median50.formatted}
              </p>
              <span className="text-[10px] text-purple-700 font-semibold">Market Standard Anchor</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">75th Percentile</span>
              <p className="text-xl font-black text-slate-800 mt-1">
                {marketInsights.salaryDistribution.percentile75.formatted}
              </p>
              <span className="text-[10px] text-slate-500">Tier-1 Product / Unicorn</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">90th Percentile</span>
              <p className="text-xl font-black text-slate-800 mt-1">
                {marketInsights.salaryDistribution.percentile90.formatted}
              </p>
              <span className="text-[10px] text-slate-500">Specialized AI Architect</span>
            </div>
          </div>

          {/* Range Visualizer Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>₹20 LPA</span>
              <span>₹35 LPA</span>
              <span>₹50+ LPA</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex shadow-inner">
              <div className="bg-slate-300 w-1/4" title="25th Percentile" />
              <div className="bg-purple-500 w-1/4" title="Median" />
              <div className="bg-indigo-600 w-1/4" title="75th Percentile" />
              <div className="bg-slate-900 w-1/4" title="90th Percentile" />
            </div>
          </div>
        </div>
      )}

      {/* Talent Supply & Demand Metrics */}
      {marketInsights?.talentMarketMetrics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Demand Index</span>
            <p className="text-lg font-black text-purple-700">{marketInsights.talentMarketMetrics.demandIndex}</p>
            <p className="text-xs text-slate-500">{marketInsights.talentMarketMetrics.supplyShortage}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Time-To-Hire Benchmark</span>
            <p className="text-lg font-black text-slate-800">{marketInsights.talentMarketMetrics.averageTimeToHireDays} Calendar Days</p>
            <p className="text-xs text-slate-500">Typical Notice: {marketInsights.talentMarketMetrics.typicalNoticePeriod}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Top Candidate Geos</span>
            <p className="text-xs font-semibold text-slate-700 pt-1">
              {marketInsights.talentMarketMetrics.preferredCandidateLocations.join(' • ')}
            </p>
          </div>
        </div>
      )}

      {/* Comparable Public Job Postings List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Comparable Public Job Postings ({marketInsights?.comparableJobPostings.length || 0})
            </h3>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Aggregated from open company careers portals
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {marketInsights?.comparableJobPostings.map((post) => (
            <div
              key={post.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${post.badgeClass}`}>
                    {post.logoLetter}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{post.jobRole}</h4>
                    <span className="text-xs font-semibold text-slate-600">{post.company}</span>
                  </div>

                  {/* Verification Status Badge */}
                  {post.isVerified ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {post.verificationLabel}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      {post.verificationLabel}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <DollarSign className="w-3.5 h-3.5 text-purple-600" />
                    {post.compensation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {post.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {post.location}
                  </span>
                  <span className="text-slate-400">• Posted {post.postedDate}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Source Link */}
              <div className="self-end sm:self-center shrink-0">
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>{post.source}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Navigation Footer */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => setCurrentStep(7)}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
        >
          <span>Proceed to Step 7: Search String Generator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
