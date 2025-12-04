import Vue from 'vue';
import router from '../../router';
import moment from 'moment';

const state = () => ({
  user: {
    expiresIn: 0,
    token: null,
    isAuth: false,
    first_login: null,
  },
  userData: null,
  userRole: null,
  _ROLES: {
    SUPERADMIN: 'SUPERADMIN'
  }
});

const getters = {
  user: state => state.user,
  isUserAuth: state => state.user.isAuth,
  userToken: state => state.user.token || localStorage.getItem('user-key'),
  expiresIn: state => state.user.expiresIn || localStorage.getItem('token-expiresIn'),
  first_login: state => state.user.first_login,
  userData: state => state.userData,
  userRole: state => state.userRole || localStorage.getItem('user-auth'),
  _ROLES: state => state._ROLES,
};

const mutations = {
  setUserAuth(state, value) {
    state.user.isAuth = !!value;
    if (value) state.user.isAuth = false;
  },
  setUserToken(state, token) {
    persistToken(token);
    state.user.token = token;
    setAuthorizationHeader(token);
  },
  setExpiresIn(state, expiresIn) {
    const exp = moment().add(expiresIn - 300, 'minutes').valueOf();
    persistExpiresIn(exp);
    state.user.expiresIn = exp;
  },
  setUserRole(state, role) {
    persistRole(role);
    state.userRole = role;
  },
  setUser(state, user) {
    state.userData = user;
  },
  setFirstLogin(state, firstLogin) {
    state.user.first_login = firstLogin
  }
};

const actions = {
  async checkUserToken({ getters, commit, dispatch }) {
    const token = getters.userToken;
    const isUserAuth = getters.isUserAuth;
    if (token && !isUserAuth) {
      try {
        commit('setUserToken', token);
        commit('setUserAuth', true);
        const response = await Vue.axios.post('/auth/me');
        commit('setFirstLogin', response.data.first_login);
        commit('setUser', response.data);
        commit('setUserRole', response.data.role)
        return true;
      } catch (err) {
        await dispatch('logOut');
        return false;
      }
    }
  },
  async login({ dispatch, commit }, { email, password }) {
    const response = await Vue.axios.post('/auth/login', { email, password });
    const token = response.data.access_token;
    const expiresIn = response.data.expires_in;
    const firstLogin = response.data.first_login;
    commit('setUserToken', token);
    commit('setExpiresIn', expiresIn);
    commit('setFirstLogin', firstLogin);
    await dispatch('checkUserToken');
  },
  async register(_, { email, password, firstName }) {
    const response = await Vue.axios.post('/auth/register', { email, password, firstName });
    return response.data;
  },
  logOut({ commit }) {
    commit('setUserToken', '');
    commit('setUserAuth', false);
    commit('setUser', null);
    router.push({ name: 'login' });
  },
};

const setAuthorizationHeader = payload => {
  Vue.axios.defaults.headers.common.Authorization = payload ? `Bearer ${payload}` : '';
};

const persistToken = function (token) {
  localStorage.setItem('user-key', token);
}

const persistExpiresIn = function (expiresIn) {
  localStorage.setItem('token-expiresIn', expiresIn);
}

const persistRole = function (role) {
  localStorage.setItem('user-auth', role);
}

const refreshToken = function () {

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}