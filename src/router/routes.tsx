import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import AdpIdTable from "../components/adp/AdpIdTable";
import App from "../App";
import LoginForm from "../components/users/LoginForm";
import AddAdpIdForm from "../components/adp/AddAdpIdForm";
import MinimumWageDashboard from "../components/minimumWage/MinimumWageDashboard";
import MileageRateView from "../components/mileageRate/MileageRateView";
import EmployeeList from "../components/employee/EmployeList";
import HolidayList from "../components/holiday/HolidayList";
import CreateOrder from "../components/orderNew/orderNew";
import InformationList from "../components/information/InformationList";
import PersonalInformation from "../components/personalinformation/personalinformation";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                loader: async () => redirect("/adp")
            },
            {
                path: "adp",
                element: <AdpIdTable />
            },
            {
                path: "adp/add",
                element: <AddAdpIdForm />
            },
            {
                path: "login",
                element: <LoginForm />
            },
            {
                path: "minimum-wages",
                element: <MinimumWageDashboard />
            },
            {
                path: "mileage-rate",
                element: <MileageRateView />
            },
            {
                path: "employee",
                element: <EmployeeList />
            },
            {
                path: "holiday",
                element: <HolidayList />
            },
            {
                path: "order-new",
                element: <CreateOrder />
            },
            {
                path: "information",
                element: <InformationList />
            },
            {
                path: "personal-information",
                element: <PersonalInformation />
            },
        ]
    }
];

export const router = createBrowserRouter(routes);