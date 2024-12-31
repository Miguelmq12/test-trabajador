import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { agent } from "../api/agent";
import { LoginFormValues, User } from "../models/user";
import { router } from "../router/routes";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  login = async (creds: LoginFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/");
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/login");
  };

  // getUser = async () => {
  //   try {
  //     const user = await agent.Account.current();
  //     runInAction(() => (this.user = user));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  getUser = async () => {
    this.user = { token: store.commonStore.token!}
  };

}
