// src/app/mp-data.ts

import allData from '../assets/mpData.json';

export interface VillageData {
  state: string;
  districts: {
    district: string;
    subDistricts: {
      subDistrict: string;
      villages: string[];
    }[];
  }[];
}

// Filter out only Madhya Pradesh state from the array
export const mpData: VillageData | undefined = (allData as VillageData[]).find(
  (s: VillageData) => s.state === 'Madhya Pradesh'
);
