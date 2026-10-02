import { Respondent, Month, SexualOrientation, ResponseStatus, Gender } from '../types/survey';

export const INITIAL_SYNTHETIC_RESPONDENTS: Respondent[] = (() => {
  // Target distribution matching prompt exactly:
  // Total: 80
  // Lelaki: 46, Perempuan: 34
  // Lengkap: 73, Belum lengkap: 7
  // Heteroseksual: 52, Homoseksual: 12, Biseksual: 9, Lain-lain / Tidak pasti: 7
  // Age groups: 18-20 (12), 21-23 (18), 24-26 (21), 27-29 (17), 30+ (12)
  // Months: Jan (5), Feb (6), Mac (7), Apr (8), Mei (6), Jun (9), Jul (7), Ogos (8), Sep (10), Okt (9), Nov (8), Dis (7)

  // Explicit monthly sequence expanding to 80 items:
  const months: Month[] = [
    ...Array(5).fill('Jan'),
    ...Array(6).fill('Feb'),
    ...Array(7).fill('Mac'),
    ...Array(8).fill('Apr'),
    ...Array(6).fill('Mei'),
    ...Array(9).fill('Jun'),
    ...Array(7).fill('Jul'),
    ...Array(8).fill('Ogos'),
    ...Array(10).fill('Sep'),
    ...Array(9).fill('Okt'),
    ...Array(8).fill('Nov'),
    ...Array(7).fill('Dis'),
  ];

  // Explicit ages matching exact age groups (sum 80):
  // 18-20: 12
  const ages18_20 = [18, 19, 19, 20, 18, 20, 19, 18, 20, 19, 18, 20];
  // 21-23: 18
  const ages21_23 = [21, 22, 23, 21, 22, 22, 23, 21, 23, 22, 21, 22, 23, 21, 22, 23, 21, 22];
  // 24-26: 21
  const ages24_26 = [24, 25, 26, 24, 25, 25, 26, 24, 26, 25, 24, 25, 26, 24, 25, 26, 24, 25, 26, 25, 24];
  // 27-29: 17
  const ages27_29 = [27, 28, 29, 27, 28, 28, 29, 27, 29, 28, 27, 28, 29, 27, 28, 29, 28];
  // 30+: 12
  const ages30_plus = [30, 31, 32, 33, 30, 32, 34, 35, 31, 33, 30, 32];

  const allAges = [...ages18_20, ...ages21_23, ...ages24_26, ...ages27_29, ...ages30_plus];

  // Exact required counts:
  // Heteroseksual: 52
  // Homoseksual: 12
  // Biseksual: 9
  // Lain-lain / Tidak pasti: 7
  // Total = 80

  // Specific deterministic slot positions for non-heterosexual entries across 80 items:
  // 12 Homoseksual: indices [0, 6, 13, 19, 25, 32, 37, 42, 48, 53, 59, 65]
  // 9 Biseksual: indices [2, 8, 16, 23, 30, 39, 46, 54, 62]
  // 7 Lain-lain: indices [3, 11, 22, 34, 44, 56, 67]
  // All remaining 52 indices are Heteroseksual!
  const finalOrientations: SexualOrientation[] = Array(80).fill('Heteroseksual' as SexualOrientation);
  const homoIndices = [0, 6, 13, 19, 25, 32, 37, 42, 48, 53, 59, 65];
  const biIndices = [2, 8, 16, 23, 30, 39, 46, 54, 62];
  const otherIndices = [3, 11, 22, 34, 44, 56, 67];

  homoIndices.forEach(idx => { finalOrientations[idx] = 'Homoseksual'; });
  biIndices.forEach(idx => { finalOrientations[idx] = 'Biseksual'; });
  otherIndices.forEach(idx => { finalOrientations[idx] = 'Lain-lain / Tidak pasti'; });

  // Exact gender counts: 46 Lelaki, 34 Perempuan
  // Indices for Perempuan (34 indices total)
  // [1, 4, 7, 9, 12, 14, 17, 20, 22, 24, 27, 29, 31, 33, 36, 38, 41, 43, 45, 47, 50, 52, 55, 57, 60, 61, 64, 66, 68, 70, 72, 74, 76, 78]
  const femaleIndices = new Set([
    1, 4, 7, 9, 12, 14, 17, 20, 22, 24, 27, 29, 31, 33, 36, 38, 41, 43, 45, 47, 50, 52, 55, 57, 60, 61, 64, 66, 68, 70, 72, 74, 76, 78
  ]);

  // Exact incomplete indices: 7 items (R005, R014, R028, R041, R053, R067, R076)
  const incompleteIndices = new Set([4, 13, 27, 40, 52, 66, 75]);

  const records: Respondent[] = [];

  for (let i = 0; i < 80; i++) {
    const id = `R${String(i + 1).padStart(3, '0')}`;
    const gender: Gender = femaleIndices.has(i) ? 'Perempuan' : 'Lelaki';
    const status: ResponseStatus = incompleteIndices.has(i) ? 'Belum lengkap' : 'Lengkap';

    records.push({
      id,
      age: allAges[i],
      gender,
      orientation: finalOrientations[i],
      status,
      month: months[i],
      submittedAt: `2026-${String(Math.min(12, Math.floor(i / 7) + 1)).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    });
  }

  return records;
})();

const STORAGE_KEY = 'friendcircle_survey_responses_v2';

export function getStoredRespondents(): Respondent[] {
  if (typeof window === 'undefined') return INITIAL_SYNTHETIC_RESPONDENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SYNTHETIC_RESPONDENTS));
      return INITIAL_SYNTHETIC_RESPONDENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SYNTHETIC_RESPONDENTS;
  } catch (e) {
    console.error('Error reading localStorage survey responses:', e);
    return INITIAL_SYNTHETIC_RESPONDENTS;
  }
}

export function saveStoredRespondents(data: Respondent[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

export function resetStoredRespondents(): Respondent[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SYNTHETIC_RESPONDENTS));
  }
  return [...INITIAL_SYNTHETIC_RESPONDENTS];
}
