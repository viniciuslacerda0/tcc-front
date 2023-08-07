export interface PacientDataState {
  name: string;
  age: string;
  sex: string;
  color: string;
  maritalStatus: string;
  weight: string;
  height: string;
  educationDegree: string;
  profession: string;
  address: string;
  cellphone: string;
  consultationData: string;
  consultatedBy: string;
  reasonForConsultation: string;
  followUp: string;
}

export interface ClinicalDataState {
  qp: string;
  hda: string;
  hpp: string;
  familyHistory: string;
  painType: string;
  medication: string;
  hasHas: boolean;
  isSmoker: boolean;
  hasAllergy: boolean;
  hasDiabetes: boolean;
  isObese: boolean;
  hasPneumonia: boolean;
  isCardiopath: boolean;
}

export interface ClinicalPhysicalExamState {
  pa: string;
  fc: string;
  fr: string;
  introspection: string;
  palpation: string;
  marchType: string;
  articulationAmplitude: string;
  goniometry: string;
  periometry: string;
  muscleStrength: string;
  complementaryExams: string;
}

export type BreathingPattern = 'diafragmático' | 'costal' | 'misto';

export interface AvaliationDataState {
  painHappens: boolean;
  painLocation: string;
  painIntensity: string;
  painCharacteristics: string;
  painDuration: string;
  otherObservations: string;
  limitation: string;
  spasm: boolean;
  spasmLocation: string;
  fracture: boolean;
  fractureLocation: string;
  breathingPattern: BreathingPattern;
  cognitiveDeficit: boolean;
  auditoryDeficit: boolean;
  visualDeficit: boolean;
  characteristics: string;
}

export interface TreatmentDataState {
  fisioterapeuticDiagnosis: string;
  fisioterapeuticTreatment: string;
  observations: string;
}

export type FormData = PacientDataState &
  ClinicalDataState &
  ClinicalPhysicalExamState &
  AvaliationDataState &
  TreatmentDataState;

export const PACIENT_DATA_INITIAL_STATE: PacientDataState = {
  name: '',
  age: '',
  sex: '',
  color: '',
  maritalStatus: '',
  weight: '',
  height: '',
  educationDegree: '',
  profession: '',
  address: '',
  cellphone: '',
  consultationData: '',
  consultatedBy: '',
  reasonForConsultation: '',
  followUp: '',
};

export const CLINICAL_DATA_INITIAL_STATE: ClinicalDataState = {
  qp: '',
  hda: '',
  hpp: '',
  familyHistory: '',
  hasAllergy: false,
  hasDiabetes: false,
  hasHas: false,
  hasPneumonia: false,
  isCardiopath: false,
  isObese: false,
  isSmoker: false,
  painType: '',
  medication: '',
};

export const CLINICAL_PHYSICAL_EXAM_INITIAL_STATE: ClinicalPhysicalExamState = {
  fc: '',
  fr: '',
  articulationAmplitude: '',
  goniometry: '',
  muscleStrength: '',
  introspection: '',
  marchType: '',
  pa: '',
  palpation: '',
  periometry: '',
  complementaryExams: '',
};

export const AVALIATION_DATA_INITIAL_STATE: AvaliationDataState = {
  breathingPattern: 'diafragmático',
  characteristics: '',
  cognitiveDeficit: false,
  fracture: false,
  fractureLocation: '',
  limitation: '',
  otherObservations: '',
  painCharacteristics: '',
  painDuration: '',
  painHappens: false,
  painIntensity: '',
  painLocation: '',
  spasm: false,
  spasmLocation: '',
  visualDeficit: false,
  auditoryDeficit: false,
};

export const TREATMENT_DATA_INITIAL_STATE: TreatmentDataState = {
  fisioterapeuticDiagnosis: '',
  fisioterapeuticTreatment: '',
  observations: '',
};

const INITIAL_STATE: FormData = {
  ...PACIENT_DATA_INITIAL_STATE,
  ...CLINICAL_DATA_INITIAL_STATE,
  ...CLINICAL_PHYSICAL_EXAM_INITIAL_STATE,
  ...AVALIATION_DATA_INITIAL_STATE,
  ...TREATMENT_DATA_INITIAL_STATE,
};

interface UseFormDataReturn {
  data: FormData;
  updateData: (formData: FormData) => void;
  wipeData: () => void;
}

const loadDataFromStorage = (): FormData => {
  const storageData = window.localStorage.getItem('formData');
  if (storageData) {
    const data = JSON.parse(storageData) as FormData;
    return data;
  }
  return INITIAL_STATE;
};
const updateData = (formData: FormData): void => {
  const data = window.localStorage.getItem('formData');
  if (data) {
    const updatedData = JSON.parse(data) as FormData;
    window.localStorage.setItem(
      'formData',
      JSON.stringify({ ...formData, ...updatedData }),
    );
  }
  window.localStorage.setItem('formData', JSON.stringify(formData));
};

const wipeData = (): void => {
  window.localStorage.removeItem('formData');
};

export const useFormData = (): UseFormDataReturn => {
  const data = loadDataFromStorage();

  return {
    data,
    updateData,
    wipeData,
  };
};
