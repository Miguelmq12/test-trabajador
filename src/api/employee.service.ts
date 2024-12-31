import { httpClient } from "../core/httpclient";
import { Employee } from "../models/employee";

class EmployeesService {
  public get(pageNumber: number, pageSize: number, searchTerm: string) {
    return httpClient.get<Employee[]>("/Adp", {
      PageNumber: pageNumber,
      PageSize: pageSize,
      SearchTerm: searchTerm
    });
  }
  public registerAdp(employeeId: number, adpId: number, name: string) {
    const body = {
      employeeId,
      adpId,
      name,
    };
    return httpClient.post("/Adp", body);
  }

   public updateAdp(id: number, employeeId: number, adpId: number, name: string) {
        const body = {
          employeeId,
          adpId,
          name,
        };
        return httpClient.put(`/Adp/${id}`, body);
  }

  public deleteAdp(id: number) {
    return httpClient.delete(`/Adp/${id}`); 
  }
}

export const employeesService = new EmployeesService();