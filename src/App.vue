<template>
  <div class="container">
    <header class="app-header">
      <h1 class="app-title">Crypto Exchange</h1>
      <p class="app-subtitle">Exchange fast and easy</p>
    </header>

    <div class="changer-pairs">
      <SelectBox
        :options="options"
        :currencyType="'from'"
        :currencyValue="fromValue"
      />

      <gb-button className="swapper gb-button_no-fill">Exc</gb-button>

      <SelectBox
        :options="options"
        :currencyType="'to'"
        :readOnly="true"
        :currencyValue="toCurrencyValue"
      />
    </div>

    <div class="exchange">
      <label for="exchange" class="label"
        >Your {{ toCurrency.name || "wallet" }} address</label
      >
      <gb-input
        placeholder="Выберите значение"
        id="exchange"
        className="exchange-input"
      />
      <gb-button className="gb-button_primary exchange-button"
        >Exchange</gb-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SelectBox from "./components/select-box/SelectBox.vue";

export default {
  name: "App",
  components: {
    SelectBox,
  },

  data() {
    return {
      fromCurrencyValue: null,
      fromCurrency: {},
      toCurrencyValue: null,
      toCurrency: {},
      minimalExchange: 0,
      estimatedValue: 0,
    };
  },

  mounted() {
    this.$store.dispatch("getAllCurrencies");
  },

  computed: {
    ...mapState(["options"]),
  },

  methods: {},

  watch: {},
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";

.app-header {
  margin-bottom: 60px;
}

.changer-pairs {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  gap: 0 15px;
}

.exchange {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px 32px;
  margin-top: 32px;
}

.exchange-input {
  grid-row: 2 /3;
}

.exchange-button {
  grid-row: 2 /3;
}

.label {
  font-size: 16px;
  line-height: 23px;
  color: #282828;
}

.gb-select {
  display: none;
  width: 100%;
  background: #f6f7f8;
  z-index: 100;

  &_open {
    display: block;
    border: 1px solid #c1d9e6;
    border-radius: 5px;
  }
}

.gb-currency-code {
  margin-left: 12px;
}

.gb-currency {
  margin-left: 12px;
  color: #80a2b6;
}
</style>
