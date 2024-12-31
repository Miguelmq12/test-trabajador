import { httpClient } from "../core/httpclient";
import { Holiday } from "../models/holiday";

class HolidaysService {
  public get(pageNumber: number, pageSize: number, searchTerm: string, holidayYear: number) {
    return httpClient.get<Holiday[]>("/Holidays", {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchTerm: searchTerm,
        HolidayYear: holidayYear,
    });
  }

  public createHoliday(hDate: string, hName: string, hHours: number) {
    const body = {
      HDate: hDate,
      HName: hName,
      HHours: hHours,
    };
    return httpClient.post("/Holidays", body);
  }

  public updateHoliday(id: number, hDate: string, hName: string, hHours: number) {
    const body = {
      HDate: hDate,
      HName: hName,
      HHours: hHours,
    };
    return httpClient.put(`/Holidays/${id}`, body);
  }

  public deleteHoliday(id: number) {
    return httpClient.delete(`/Holidays/${id}`);
  }
}

export const holidaysService = new HolidaysService();
