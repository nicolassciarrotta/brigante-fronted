import Vue from 'vue';

const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
  async sendMessage({ commit }, values) {
    try {
      const url = '/send-message';
      const response = await Vue.axios.post(url, values);
      return response.data;
    } catch (err) {
      console.error('Failed to send message', err)
      throw err;
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}