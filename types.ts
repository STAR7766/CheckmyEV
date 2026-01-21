
export enum ChargerType {
  AC_L1 = 'AC Level 1 (120V/Plug-in)',
  AC_L2 = 'AC Level 2 (Wallbox)',
  DC_FAST = 'DC Fast Charger'
}

export enum PhaseType {
  SINGLE = 'Single-Phase',
  THREE = 'Three-Phase'
}

export enum EarthingCondition {
  KNOWN_GOOD = 'Known Good',
  UNKNOWN = 'Unknown',
  POOR = 'Poor/High Impedance'
}

export interface DiagnosticInput {
  evModel: string;
  chargerType: ChargerType;
  supplyVoltage: string;
  phase: PhaseType;
  cableLength: string;
  cableSize: string;
  earthing: EarthingCondition;
  breakerDetails: string;
  observedProblems: string;
}

export interface DiagnosticResult {
  rootCause: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  electricalExplanation: string;
  safetyAssessment: string;
  protectionLogic: string;
  practicalFix: string;
}
