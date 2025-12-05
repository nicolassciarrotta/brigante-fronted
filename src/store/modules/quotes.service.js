import Vue from 'vue';

const state = () => ({
  quotes: [],
  filterOptions: {
    secureTypes: [],
    brands: [],
    years: [],
  },
  totalQuotes: 0,
  todayQuotes: 0,
  weekQuotes: 0,
});

const getters = {
  quotes: state => state.quotes,
  filterOptions: state => state.filterOptions,
  totalQuotes: state => state.totalQuotes,
  todayQuotes: state => state.todayQuotes,
  weekQuotes: state => state.weekQuotes,
};

const mutations = {
  setQuotes(state, quotes) {
    state.quotes = quotes || [];
  },
  
  // ✅ Nuevo: Mutation para establecer totales
  setQuotesData(state, data) {
    state.quotes = data.data || [];
    state.totalQuotes = data.total || 0;
    state.todayQuotes = data.todayCount || 0;
    state.weekQuotes = data.weekCount || 0;
  },
  
  // ✅ Nuevo: Mutation para opciones de filtro
  setFilterOptions(state, options) {
    state.filterOptions = options || {
      secureTypes: [],
      brands: [],
      years: [],
    };
  },  
  removeQuote(state, quoteId) {
    state.quotes = state.quotes.filter(quote => quote.id !== quoteId);
    state.totalQuotes = Math.max(0, state.totalQuotes - 1);
  },
  
  addQuote(state, quote) {
    state.quotes.unshift(quote); // Agregar al principio
    state.totalQuotes += 1;
    state.todayQuotes += 1;
  }
};

const actions = {
  async fetchQuotes({ commit }, params = {}) {
    try {
      const url = '/quotes';
      const response = await Vue.axios.get(url, { params });
      commit('setQuotesData', response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch quotes', err);
      throw err;
    }
  },
  async storeQuotes({ commit }, values) {
    try {
      const url = '/quotes';
      const response = await Vue.axios.post(url, values);

      if (response.data.quote) {
        commit('addQuote', response.data.quote);
      }
      
      return response.data;
    } catch (err) {
      console.error('Failed to store quotes', err);
      throw err;
    }
  },
  
  // ✅ Nuevo: Fetch opciones de filtro
  async fetchFilterOptions({ commit }) {
    try {
      const url = '/quotes/filter-options';
      const response = await Vue.axios.get(url);
      commit('setFilterOptions', response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch filter options', err);
      // Si falla, usar valores por defecto
      const defaultOptions = {
        secureTypes: ['Automotores', 'Motovehículos', 'Hogar', 'Comercio', 'Vida y Retiro'],
        brands: [],
        years: []
      };
      commit('setFilterOptions', defaultOptions);
      return defaultOptions;
    }
  },
  
  // ✅ Nuevo: Eliminar quote
  async deleteQuote({ commit }, quoteId) {
    try {
      const url = `/quotes/${quoteId}`;
      await Vue.axios.delete(url);
      commit('removeQuote', quoteId);
      return true;
    } catch (err) {
      console.error('Failed to delete quote', err);
      throw err;
    }
  },
  
  // ✅ Nuevo: Actualizar quote (por si necesitas edición)
  async updateQuote({ commit }, { id, data }) {
    try {
      const url = `/quotes/${id}`;
      const response = await Vue.axios.put(url, data);
      
      // Recargar quotes para reflejar cambios
      await commit.dispatch('fetchQuotes');
      
      return response.data;
    } catch (err) {
      console.error('Failed to update quote', err);
      throw err;
    }
  },
  
  // ✅ Nuevo: Obtener estadísticas
  async fetchQuoteStats({ commit }) {
    try {
      const url = '/quotes/stats';
      const response = await Vue.axios.get(url);
      
      // Actualizar solo las estadísticas
      commit('setQuotesData', {
        data: [], // No cambiar quotes actuales
        total: response.data.total,
        todayCount: response.data.todayCount,
        weekCount: response.data.weekCount,
      });
      
      return response.data;
    } catch (err) {
      console.error('Failed to fetch quote stats', err);
      throw err;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}