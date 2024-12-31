export interface EmployeeADP {
    id: number;
    employeeId: number;
    adpId: number;
    fullName: string;
    stamp: string;
}

export interface PaginatedAdpResult {
    data: EmployeeADP[];
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
}