import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department, Province, District} from '../model/locations';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private departments: Department[] = [
    { id: 1, name: 'Lima' },
    { id: 2, name: 'Arequipa' },
    { id: 3, name: 'Piura' },
    { id: 4, name: 'Cusco' },
    { id: 5, name: 'Puno' },
    { id: 6, name: 'Junín' },
    { id: 7, name: 'Ancash' },
    { id: 8, name: 'Loreto' }
  ];
  
  private provinces: Province[] = [
    { id: 1, name: 'Lima', departmentId: 1 },
    { id: 2, name: 'Callao', departmentId: 1 },
    { id: 3, name: 'Arequipa', departmentId: 2 },
    { id: 4, name: 'Cuzco', departmentId: 1 },
    { id: 5, name: 'Tacna', departmentId: 3 },
    { id: 6, name: 'Puno', departmentId: 5 },
    { id: 7, name: 'Huancayo', departmentId: 6 },
    { id: 8, name: 'Chiclayo', departmentId: 3 },
    { id: 9, name: 'Trujillo', departmentId: 2 },
    { id: 10, name: 'Huaraz', departmentId: 7 },
    { id: 11, name: 'Iquitos', departmentId: 8 },
    { id: 12, name: 'Tarapoto', departmentId: 8 }
  ];
  
  private districts: District[] = [
    { id: 1, name: 'Miraflores', provinceId: 1 },
    { id: 2, name: 'San Isidro', provinceId: 1 },
    { id: 3, name: 'Tacna City', provinceId: 3 },
    { id: 4, name: 'Cuzco City', provinceId: 4 },
    { id: 5, name: 'Arica', provinceId: 5 },
    { id: 6, name: 'Puno City', provinceId: 6 },
    { id: 7, name: 'Huancayo City', provinceId: 7 },
    { id: 8, name: 'Chiclayo City', provinceId: 8 },
    { id: 9, name: 'Trujillo City', provinceId: 9 },
    { id: 10, name: 'Huaraz City', provinceId: 10 },
    { id: 11, name: 'Iquitos City', provinceId: 11 },
    { id: 12, name: 'Tarapoto City', provinceId: 12 },
    { id: 13, name: 'Villa El Salvador', provinceId: 1 },
    { id: 14, name: 'La Molina', provinceId: 1 },
    { id: 15, name: 'San Juan de Lurigancho', provinceId: 1 },
    { id: 16, name: 'San Martín de Porres', provinceId: 1 },
    { id: 17, name: 'Chanchamayo', provinceId: 7 },
    { id: 18, name: 'Junín', provinceId: 6 },
    { id: 19, name: 'Satipo', provinceId: 7 },
    { id: 20, name: 'Baguazo', provinceId: 7 },
    { id: 21, name: 'Pacasmayo', provinceId: 8 },
    { id: 22, name: 'Olmos', provinceId: 8 },
    { id: 23, name: 'Bellavista', provinceId: 11 },
    { id: 24, name: 'Juanjui', provinceId: 12 },
    { id: 25, name: 'Moyobamba', provinceId: 12 },
    { id: 26, name: 'Callao city', provinceId: 2 }
  ];

  constructor() {}

  getDepartments(): Observable<string[]> {
    return of(this.departments.map(department => department.name));
  }

  getProvinces(department: string): Observable<string[]> {
    const departmentId = this.departments.find(d => d.name === department)?.id;
    if (departmentId) {
      const provinces = this.provinces.filter(p => p.departmentId === departmentId);
      return of(provinces.map(p => p.name));
    } else {
      return of([]);
    }
  }

  getDistricts(province: string): Observable<string[]> {
    const provinceId = this.provinces.find(p => p.name === province)?.id;
    if (provinceId) {
      const districts = this.districts.filter(d => d.provinceId === provinceId);
      return of(districts.map(d => d.name));
    } else {
      return of([]);
    }
  }
}
