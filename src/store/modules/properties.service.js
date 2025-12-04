import Vue from 'vue';

function buildUrl(url, values = {}) {
  const params = new URLSearchParams();

  if (values.limit !== undefined) {
    params.append('limit', values.limit);
  } else {
    params.append('limit', 10);
  }

  if (values.page) {
    params.append('page', values.page);
  } else {
    params.append('page', 1);
  }

  if (values.title) {
    params.append('title', values.title);
  }

  if (values.address) {
    params.append('address', values.address);
  }

  if (values.city) {
    params.append('city', values.city);
  }

  if (values.type) {
    params.append('type', values.type);
  }

  if (values.operation) {
    params.append('operation', values.operation);
  }

  if (values.status) {
    params.append('status', values.status);
  }

  if (values.min_price) {
    params.append('min_price', values.min_price);
  }

  if (values.max_price) {
    params.append('max_price', values.max_price);
  }

  if (values.bedrooms) {
    params.append('bedrooms', values.bedrooms);
  }

  if (values.bathrooms) {
    params.append('bathrooms', values.bathrooms);
  }

  if (values.min_area) {
    params.append('min_area', values.min_area);
  }

  if (values.max_area) {
    params.append('max_area', values.max_area);
  }

  if (values.sort_by) {
    params.append('sort_by', values.sort_by);
  }

  if (values.order) {
    params.append('orderBy', values.order);
  }

  if (values.light) {
    params.append('light', values.light);
  }

  return `${url}${params.toString()}`;
}

const state = () => ({
  property: {},
  properties: [],
  propertyImages: [],
  propertyTypes: [],
  propertyStatuses: [],
  filterOptions: {
    cities: [],
    property_types: [],
    operations: [],
    max_bedrooms: 0,
    max_bathrooms: 0,
    price_range: { min: 0, max: 0 },
    area_range: { min: 0, max: 0 }
  }
});

const getters = {
  property: state => state.property,
  properties: state => state.properties,
  propertyImages: state => state.propertyImages,
  propertyTypes: state => state.propertyTypes,
  propertyStatuses: state => state.propertyStatuses,
  filterOptions: state => state.filterOptions,
};

const mutations = {
  setProperties(state, properties) {
    state.properties = properties || [];
  },
  setProperty(state, property) {
    state.property = property || {};
  },
  setPropertyImages(state, propertyImages) {
    state.propertyImages = propertyImages || [];
  },
  setPropertyTypes(state, propertyTypes) {
    state.propertyTypes = propertyTypes || [];
  },
  setPropertyStatuses(state, propertyStatuses) {
    state.propertyStatuses = propertyStatuses || [];
  },
  setFilterOptions(state, filterOptions) {
    state.filterOptions = filterOptions || {};
  }
};

const actions = {
  async fetchProperties({ commit }, values = {}) {
    try {
      const url = buildUrl('/properties?', values)
      const response = await Vue.axios.get(url);
      const properties = response.data.data;
      commit('setProperties', properties);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch properties', err)
      throw err;
    }
  },
  async fetchProperty({ commit }, values) {
    try {
      const url = `/properties/${values.id}`;
      const response = await Vue.axios.get(url);
      const property = response.data;
      commit('setProperty', property);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch property', err)
      throw err;
    }
  },
  async createProperty({ dispatch }, values) {
    try {
      const response = await Vue.axios.post(`/properties`, values);
      await dispatch('fetchProperties');
      return response;
    } catch (err) {
      console.error('Failed to create property', err)
      throw err;
    }
  },
  async updateProperty({ dispatch }, values) {
    try {
      const response = await Vue.axios.put(`/properties/${values.id}`, values);
      await dispatch('fetchProperty', { id: values.id });
      return response;
    } catch (err) {
      console.error('Failed to update property', err)
      throw err;
    }
  },
  async deleteProperty({ dispatch }, values) {
    try {
      const response = await Vue.axios.delete(`/properties/${values.id}`);
      if (values.admin) {
        await dispatch('fetchProperties');
      }
      return response;
    } catch (err) {
      console.error('Failed to delete property', err)
      throw err;
    }
  },
  async fetchPropertyImages({ commit }, values) {
    try {
      const url = `/properties/${values.id}/images`;
      const response = await Vue.axios.get(url);
      const images = response.data;
      commit('setPropertyImages', images);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch property images', err)
      throw err;
    }
  },
  async uploadPropertyImage({ dispatch }, values) {
    try {
      console.log(values)
      const formData = new FormData();
      formData.append('image', values.image);
      formData.append('is_main', values.is_main ? 1 : 0);

      const response = await Vue.axios.post(
        `/properties/${values.property_id}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (values.property_id) {
        await dispatch('fetchPropertyImages', { id: values.property_id });
      }
      return response;
    } catch (err) {
      console.error('Failed to upload property image', err)
      throw err;
    }
  },
  async createPropertyWithImages({ dispatch }, formData) {
    try {
      const response = await Vue.axios.post(`/properties/with-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch (err) {
      console.error('Failed to create property with images', err)
      throw err;
    }
  },
  async deletePropertyImage({ dispatch }, values) {
    try {
      const response = await Vue.axios.delete(
        `/properties/${values.property_id}/images/${values.image_id}`
      );

      if (values.property_id) {
        await dispatch('fetchPropertyImages', { id: values.property_id });
      }
      return response;
    } catch (err) {
      console.error('Failed to delete property image', err)
      throw err;
    }
  },
  async fetchPropertyTypes({ commit }) {
    try {
      const url = `/properties/types`;
      const response = await Vue.axios.get(url);
      const types = response.data;
      commit('setPropertyTypes', types);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch property types', err)
      throw err;
    }
  },
  async fetchPropertyStatuses({ commit }) {
    try {
      const url = `/properties/statuses`;
      const response = await Vue.axios.get(url);
      const statuses = response.data;
      commit('setPropertyStatuses', statuses);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch property statuses', err)
      throw err;
    }
  },
  async fetchFilterOptions({ commit }) {
    try {
      const url = `/properties/filters`;
      const response = await Vue.axios.get(url);
      commit('setFilterOptions', response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch filter options', err)
      throw err;
    }
  },
  async fetchStats({ commit }) {
    try {
      const response = await Vue.axios.get('/properties/stats');
      return response.data;
    } catch (err) {
      console.error('Failed to fetch stats', err);
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
