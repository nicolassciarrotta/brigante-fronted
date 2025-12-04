
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

	if (values.lastname) {
		params.append('lastname', values.lastname);
	}

	if (values.firstname) {
		params.append('firstname', values.firstname);
	}

	if (values.email) {
		params.append('email', values.email);
	}

	if (values.dni) {
		params.append('dni', values.dni);
	}

  	if (values.order) {
		params.append('orderBy', values.order);
	}

	if (values.light) {
		params.append('light', values.light);
	}

	return `${url}&${params.toString()}`;
}

function fetchTypeUser(key) {
  const fetchs = {
    1: 'fetchAdmins',
    2: 'fetchSchools',
    3: 'fetchPilots',
	4: 'fetchWorkshoppers',
  }

  return fetchs[key];
}
const state = () => ({
	users: [],
	roles: [],
	admins: [],
	pilots: [],
	workshoppers: [],
	pilotsLight: [],
	schools: [],
});

const getters = {
	users: state => state.users,
	roles: state => state.roles,
	admins: state => state.admins,
	pilots: state => state.pilots,
	workshoppers: state => state.workshoppers,
	pilotsLight: state => state.pilotsLight,
	schools: state => state.schools,
	school: state => state.school
};
const mutations = {
	setUsers(state, users) {
		state.users = users || [];
	},
	setAdmins(state, admins) {
		state.admins = admins || [];
	},
	setPilots(state, pilots) {
		state.pilots = pilots || [];
	},
	setWorkshoppers(state, workshoppers) {
		state.workshoppers = workshoppers || [];
	},
	setPilotsLight(state, pilotsLight) {
		state.pilotsLight = pilotsLight || [];
	},
	setSchools(state, schools) {
		state.schools = schools || [];
	},
	setRoles(state, roles) {
		state.roles = roles;
	},
};
const actions = {
	async fetchRoles({ commit }) {
		const response = await Vue.axios.get('/roles');
		commit('setRoles', response.data)
	},
	async fetchAdmins({ commit }, values) {
		try {
			const url = buildUrl('/users/admins?', values)
			const response = await Vue.axios.get(url);
			const admins = response.data.data;
			commit('setAdmins', admins);
			return admins;
		} catch (err) {
			console.error('Failed to fetch users', err)
			throw err;
		}
	},
	async fetchPilots({ commit }, values) {
		try {
			const url = buildUrl('/users/pilots?', values)
			const response = await Vue.axios.get(url);
			const users = response.data.data;
			commit('setPilots', users);
			return response.data;
		} catch (err) {
			console.error('Failed to fetch pilots', err)
			throw err;
		}
	},
	async fetchWorkshoppers({ commit }, values) {
		try {
			const url = buildUrl('/users/workshoppers?', values)
			const response = await Vue.axios.get(url);
			const users = response.data.data;
			commit('setWorkshoppers', users);
			return response.data;
		} catch (err) {
			console.error('Failed to fetch pilots', err)
			throw err;
		}
	},
	async fetchPilotsLight({ commit }, values) {
		try {
			const url = buildUrl('/pilots?', values)
			const response = await Vue.axios.get(url);
			const users = response.data;
			commit('setPilotsLight', users);
			return response.data;
		} catch (err) {
			console.error('Failed to fetch pilots', err)
			throw err;
		}
	},
	async fetchPilotsBasic({ commit }) {
		try {
			const response = await Vue.axios.get('/pilots/basic');
			const users = response.data;
			commit('setPilots', users);
			return response.data;
		} catch (err) {
			console.error('Failed to fetch pilots', err)
			throw err;
		}
	},
	async fetchSchools({ commit }, values) {
		try {
			const url = buildUrl('/users/schools?', values)
			const response = await Vue.axios.get(url);
			const schools = response.data.data;
			commit('setSchools', schools);
			return response.data;
		} catch (err) {
			console.error('Failed to fetch schools', err)
			throw err;
		}
	},
	async createUser({ dispatch }, values) {
		try {
			const response = await Vue.axios.post(`/users`, values);
			const fetch = fetchTypeUser(values.role);
			await dispatch(fetch);
			return response;
		} catch (err) {
			return err
		}
	},
	async editUser({ dispatch }, values) {
		try {
			const response = await Vue.axios.put(`/users/${values.user}`, values.form);
      		const fetch = fetchTypeUser(values.form.role);
			await dispatch(fetch, values);
			return response.data.data;
		} catch (err) {
			return err
		}
	},
	async resetPasswordUser({ dispatch }, values) {
		try {
			const response = await Vue.axios.put(`/users/reset-password/${values.user}`, values.form);
			if (values.userView) await dispatch('fetchUsers');
			return response.data.data;
		} catch (err) {
			console.error('Failed to reset password', err);
			throw err;
		}
	},
	async deleteUser({ dispatch }, values) {
		try {
			const response = await Vue.axios.delete(`/users/${values.user.id}`);
			const fetch = fetchTypeUser(values.user.role.key);
			await dispatch(fetch);
			return response.data.data;
		} catch (err) {
			console.error('Failed to create users', err);
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