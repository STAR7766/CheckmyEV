
import React from 'react';
import { DiagnosticInput, ChargerType, PhaseType, EarthingCondition } from '../types';

interface Props {
  data: DiagnosticInput;
  onChange: (data: DiagnosticInput) => void;
  onSubmit: () => void;
  loading: boolean;
}

const InputSection: React.FC<Props> = ({ data, onChange, onSubmit, loading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">EV Model</label>
          <input 
            type="text" name="evModel" value={data.evModel} onChange={handleChange}
            placeholder="e.g. Tesla Model 3, Hyundai Ioniq 5"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Charger Type</label>
          <select name="chargerType" value={data.chargerType} onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
            {Object.values(ChargerType).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Voltage / Phase</label>
          <div className="flex gap-2">
            <input 
              type="text" name="supplyVoltage" value={data.supplyVoltage} onChange={handleChange}
              placeholder="230" className="w-1/2 p-2 border rounded-md"
            />
            <select name="phase" value={data.phase} onChange={handleChange}
              className="w-1/2 p-2 border rounded-md">
              {Object.values(PhaseType).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Earthing Condition</label>
          <select name="earthing" value={data.earthing} onChange={handleChange}
            className="w-full p-2 border rounded-md">
            {Object.values(EarthingCondition).map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Cable Length (meters)</label>
          <input 
            type="text" name="cableLength" value={data.cableLength} onChange={handleChange}
            placeholder="15" className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Cable Size (mm²)</label>
          <input 
            type="text" name="cableSize" value={data.cableSize} onChange={handleChange}
            placeholder="2.5, 4.0, 6.0" className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Observed Problems</label>
        <textarea 
          name="observedProblems" value={data.observedProblems} onChange={handleChange}
          rows={3}
          placeholder="e.g. Charging rate drops after 20 mins, cable feels hot, breaker trips occasionally..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Analyzing Electrical Data...' : 'Run Engineering Diagnostic'}
      </button>
    </div>
  );
};

export default InputSection;
