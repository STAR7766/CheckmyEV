
import React from 'react';
import { DiagnosticResult } from '../types';

interface Props {
  result: DiagnosticResult | null;
}

const ResultSection: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  const riskColors = {
    Low: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    High: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Engineering Report</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskColors[result.riskLevel]}`}>
            RISK: {result.riskLevel.toUpperCase()}
          </span>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Root Cause</h3>
            <p className="text-lg font-semibold text-slate-900">{result.rootCause}</p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Electrical Explanation</h3>
              <p className="text-slate-700 leading-relaxed text-sm">{result.electricalExplanation}</p>
            </section>
            <section className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Protection Logic</h3>
              <p className="text-slate-700 leading-relaxed text-sm">{result.protectionLogic}</p>
            </section>
          </div>

          <section className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Safety Assessment</h3>
            <p className="text-slate-700 leading-relaxed">{result.safetyAssessment}</p>
          </section>

          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-blue-800 font-bold mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Required Corrective Actions
            </h3>
            <p className="text-slate-800 font-medium whitespace-pre-line">{result.practicalFix}</p>
          </section>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-400">
        Note: This is an AI diagnostic based on provided electrical parameters. Always consult a certified electrician for physical installations.
      </div>
    </div>
  );
};

export default ResultSection;
