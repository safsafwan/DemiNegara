export type Gender = 'Lelaki' | 'Perempuan' | 'Tidak dinyatakan';

export type SexualOrientation =
  | 'Heteroseksual'
  | 'Homoseksual'
  | 'Biseksual'
  | 'Lain-lain / Tidak pasti'
  | 'Tidak mahu menjawab';

export type ResponseStatus = 'Lengkap' | 'Belum lengkap';

export type Month =
  | 'Jan'
  | 'Feb'
  | 'Mac'
  | 'Apr'
  | 'Mei'
  | 'Jun'
  | 'Jul'
  | 'Ogos'
  | 'Sep'
  | 'Okt'
  | 'Nov'
  | 'Dis';

export interface Respondent {
  id: string; // e.g. R001
  age: number;
  gender: Gender;
  orientation: SexualOrientation;
  status: ResponseStatus;
  month: Month;
  submittedAt: string;
  notes?: string;
}

export interface FilterCriteria {
  search: string;
  gender: 'all' | Gender;
  ageRange: 'all' | '18-20' | '21-23' | '24-26' | '27-29' | '30+';
  orientation: 'all' | SexualOrientation;
  status: 'all' | ResponseStatus;
  month: 'all' | Month;
}
