import { Component, OnInit } from '@angular/core';
import { mpData } from '../../mp-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-area-to-be-covered',
  templateUrl: './area-to-be-covered.component.html'
})
export class AreaToBeCoveredComponent implements OnInit {
  usedAreas: any[] = [];

  allDistricts = mpData?.districts || [];
  availableDistricts: any[] = [];

  availableTaluks: any[] = [];
  availableVillages: string[] = [];

  selectedDistrict = '';
  selectedTaluk = '';
  selectedVillage = '';
   uniqueDistricts: string[] = [];
  uniqueSubDistricts: string[] = [];
  uniqueVillages: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/customers/used-areas').subscribe(data => {
      this.usedAreas = data;
      this.setAreaCovered();
      this.filterDistricts();
    });
  }

  setAreaCovered() {
    const districtSet = new Set<string>();
    const subDistrictSet = new Set<string>();
    const villageSet = new Set<string>();

    this.usedAreas.forEach(area => {
      districtSet.add(area.district);
      subDistrictSet.add(area.taluk);
      villageSet.add(area.village);
    });

    this.uniqueDistricts = Array.from(districtSet);
    this.uniqueSubDistricts = Array.from(subDistrictSet);
    this.uniqueVillages = Array.from(villageSet);
  }

  // Filter only districts and subdistricts where unused villages are available
  filterDistricts() {
    this.availableDistricts = this.allDistricts
      .map((district: any) => {
        const filteredSubDistricts = district.subDistricts
          .map((subDistrict: any) => {
            const filteredVillages = subDistrict.villages.filter(
              (v: any) => !this.isUsed(district.district, subDistrict.subDistrict, v)
            );
            return filteredVillages.length > 0
              ? { ...subDistrict, villages: filteredVillages }
              : null;
          })
          .filter((sd: any) => sd !== null);

        return filteredSubDistricts.length > 0
          ? { ...district, subDistricts: filteredSubDistricts }
          : null;
      })
      .filter((d: any) => d !== null);
  }

  onDistrictChange() {
    const district = this.availableDistricts.find((d: any) => d.district === this.selectedDistrict);
    if (!district) return;

    this.availableTaluks = district.subDistricts;
    this.selectedTaluk = '';
    this.availableVillages = [];
    this.selectedVillage = '';
  }

  onTalukChange() {
    const taluk = this.availableTaluks.find(t => t.subDistrict === this.selectedTaluk);
    if (!taluk) return;

    this.availableVillages = taluk.villages;
    this.selectedVillage = '';
  }

  isUsed(district: string, taluk: string, village: string): boolean {
    return this.usedAreas.some(area =>
      area.district === district &&
      area.taluk === taluk &&
      area.village === village
    );
  }
}
