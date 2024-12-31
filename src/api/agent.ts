import axios, {AxiosError, AxiosResponse} from "axios";
import { EmployeeADP, PaginatedAdpResult } from "../models/adp";
import { LoginFormValues, User } from "../models/user";
import { Employee } from "../models/employee";
import { store } from "../stores/store";
import { MinimumWage } from "../models/minimumWage";
import { MileageRate } from "../models/mileageRate";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("error");
    console.log(error);
    const errorResponse = error.response as AxiosResponse;
    console.log(errorResponse);
    const { status } = error.response as AxiosResponse;
    const { userStore } = store;
    switch(status) {
      case 401:
        userStore.logout();
        break;
    }

    return Promise.reject(error.response?.data);
  }
)

const getResponseData = <T>(response: AxiosResponse<T>) => response.data;

const Adp = {
  listPaginated: (pageNumber: number, pageSize: number, searchTerm = "") => axios.get<PaginatedAdpResult>(`/adp?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`).then(getResponseData),
  add: (adpId: number, employeeId: number) => axios.post<EmployeeADP>('/adp', {adpId, employeeId}).then(getResponseData)
};

const Account = {
  login: (creds: LoginFormValues) => axios.post<User>('/auth', creds).then(getResponseData)
}

const Employees = {
  search: (searchTerm: string) => axios.get<Employee[]>(`/employees/search?searchTerm=${searchTerm}`).then(getResponseData)
}

const MinimumWages = {
  list: () => axios.get<MinimumWage[]>('/minimumWage').then(getResponseData),
  update: (id: number, rate: number) => axios.put('/minimumWage', {id, rate})
}

// interface MileageRateUpdateValues {
//   newMileageRate: number;
// }

const MileageRateServices = {
  get: () => axios.get<MileageRate>('/payrollinfo/1').then(getResponseData),
  put: (newMileageRate: number) => axios.put('/payrollinfo/1', {newMileageRate})
}

export const agent = {
  Adp: Adp,
  Account: Account,
  Employees: Employees,
  MinimumWages: MinimumWages,
  MileageRateServices: MileageRateServices
};
