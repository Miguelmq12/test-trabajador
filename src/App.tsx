import { Container } from "react-bootstrap";
import "./App.css";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./layout/SideBar";
import LoginForm from "./components/users/LoginForm";
import { useStores } from "./stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loading from "./layout/Loading";

function App() {
  const location = useLocation();
  const { userStore, commonStore } = useStores();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if(commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <Loading />

  if (!userStore.isLoggedIn && !isLoginPage) {
    console.log(userStore);
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
        <LoginForm />
    </div>
  );
}
     
export default observer(App);
