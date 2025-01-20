export interface Department {
    id: number;
    name: string;
}
  
export interface Province {
    id: number;
    name: string;
    departmentId: number;
}
  
export interface District {
    id: number;
    name: string;
    provinceId: number;
}
  