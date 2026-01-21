
import React, { useState } from 'react';
import { DiagnosticInput, DiagnosticResult, ChargerType, PhaseType, EarthingCondition } from './types';
import { runDiagnostic } from './services/geminiService';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';

const App: React.FC = () => {
  const [input, setInput] = useState<DiagnosticInput>({
    evModel: '',
    chargerType: ChargerType.AC_L2,
    supplyVoltage: '230',
    phase: PhaseType.SINGLE,
    cableLength: '',
    cableSize: '',
    earthing: EarthingCondition.UNKNOWN,
    breakerDetails: 'e.g. 32A Type B MCB',
    observedProblems: ''
  });

  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const diagnosis = await runDiagnostic(input);
      setResult(diagnosis);
    } catch (err) {
      console.error(err);
      setError('An error occurred while running the diagnostic. Please ensure your inputs are clear and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white py-12 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="bg-blue-600 p-3 rounded-2xl mb-4 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">CheckmyEV Diagnostic</h1>
          <p className="text-slate-400 max-w-xl text-lg">
            AI-powered Electrical Engineering analysis for EV charging infrastructure. 
            Identify physics-based root causes, not just symptoms.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 -mt-10">
        <InputSection 
          data={input} 
          onChange={setInput} 
          onSubmit={handleSubmit} 
          loading={loading}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <ResultSection result={result} />
      </main>

      {/* Engineering Footer Background Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 opacity-50"></div>
    </div>
  );
};

export default App;
