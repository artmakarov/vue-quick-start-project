import Cookie from 'vue-cookie';
import Api from './api/Api';
import { ResponseObject, ResponseRequestError } from './api/ResponseObjects';

const COOKIE_AUTH_NAME = 'account';
const COOKIE_AUTH_EXPIRES = 72000;


function setLocation(url) {
  history.replaceState(null, null, `/#${url}`);
  document.location.reload(true);
}


export default {
  user: {
    authenticated: false,
  },

  async login(creds, redirect) {
    const { isSuccess, data, error } = await Api.sendData('/login', creds);

    if (isSuccess) {
      Cookie.set(
        COOKIE_AUTH_NAME,
        `${data.token}|${data.username}`,
        { expires: COOKIE_AUTH_EXPIRES },
      );

      this.user.authenticated = true;

      if (redirect) {
        setLocation(redirect);
      }

      return new ResponseObject({ data });
    }

    return new ResponseRequestError(error);
  },

  logout(redirect) {
    Cookie.delete(COOKIE_AUTH_NAME);
    setLocation(redirect || '/login');
  },

  getUserInfo() {
    const cookie = Cookie.get(COOKIE_AUTH_NAME);
    const account = cookie ? cookie.split('|') : [];
    const token = account[0] || null;
    const login = account[1] || null;

    if ((!token || !login) && this.user.authenticated) {
      this.logout();
    }

    return { token, login };
  },

  getUserName() {
    return this.getUserInfo().login;
  },

  checkAuth() {
    const authorized = !!this.getUserInfo().token;

    this.user.authenticated = authorized;

    return authorized;
  },

  checkRole(role) {
    return this.getUserName() === role;
  },

  checkAdmin() {
    return this.checkRole('admin');
  },
};
