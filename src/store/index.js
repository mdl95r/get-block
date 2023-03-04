import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
	state: {
		currensies: [],
		selectedTicker: {
			from: '',
			fromName: '',
			to: '',
			toName: '',
		},
		minAmount: null,
		fromValue: null,
		toValue: '',
		isLoading: false,
		apiError: false
	},

	getters: {
		isValid(state) {
			return state.selectedTicker.from && state.selectedTicker.to;
		},

		pair(state) {
			return `${state.selectedTicker.from}_${state.selectedTicker.to}`;
		},

		apiKey() {
			return import.meta.env.VITE_API_KEY;
		},

	},

	mutations: {
		setСurrensies(state, currensies) {
			state.currensies = currensies;
		},

		setLoading(state, bool) {
			state.isLoading = bool;
		},

		setError(state, bool) {
			state.apiError = bool;
		},

		setFromValue(state, val) {
			state.fromValue = val;
		},

		setToValue(state, val) {
			state.toValue = val;
		},

		setMinAmount(state, val) {
			state.minAmount = val;
		},

		fromValue(state, val) {
			state.fromValue = val;
		},

		toValue(state, val) {
			state.toValue = val;
		},
	},

	actions: {
		async fetchAllCurrencies({ _, commit }) {
			commit('setLoading', true);

			try {
				const { data } = await axios.get('https://api.changenow.io/v1/currencies?active=true&fixedRate=true');
				const newArray = data.slice(0, 50);

				commit('setСurrensies', newArray);
			} catch (error) {
				commit('setError', true);
				console.log(error);
			} finally {
				commit('setLoading', false);
			}
		},

		async getMinAmount({ _, commit, getters }) {
			try {
				const { data } = await axios.get(`https://api.changenow.io/v1/min-amount/${getters.pair}?api_key=${getters.apiKey}`);

				if (!data.minAmount) {
					commit('setError', true);
					return;
				}

				commit('setFromValue', data.minAmount);
				commit('setMinAmount', data.minAmount);

			} catch (error) {
				commit('setError', true);
			}
		},

		async esimatedValue({ state, commit, getters }) {

			try {
				const { data } = await axios.get(`https://api.changenow.io/v1/exchange-amount/${state.fromValue}/${getters.pair}?api_key=${getters.apiKey}`);

				if (!data.estimatedAmount) {
					commit('setError', true);
					return;
				}
				commit('setToValue', data.estimatedAmount);
			} catch (error) {
				commit('setError', true);
			}
		},
	}
});