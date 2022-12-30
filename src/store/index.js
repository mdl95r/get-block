import { createStore } from "vuex";

const API_KEY =
  "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd";
const BASE_URL = "https://api.changenow.io/v1";

export default createStore({
  state: {
    options: [],
    isError: false,
  },

  mutations: {
    setOptions(state, options) {
      state.options = options;
    },

    isError(state, bool) {
      state.isError = bool;
    },
  },

  actions: {
    getAllCurrencies({ commit }) {
      const url = `${BASE_URL}/currencies?active=true&fixedRate=true?`;

      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          return response.json();
        })
        .then((result) => commit("setOptions", result))
        .catch((err) => {
          console.log("Fetch Error :-S", err);
          commit("isError", true);
        });
    },

    async getMinExchangeAmount({ commit }, params = {}) {
      const url = `${BASE_URL}/min-amount/${params.fromTo}?api_key=${API_KEY}`;

      const res = await fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          return response.json();
        })
        .then((result) => result.minAmount)
        .catch((err) => {
          console.log("Fetch Error :-S", err);
          commit("updateProperty", { name: "apiError", value: true });
        });

      return res;
    },
  },
});
