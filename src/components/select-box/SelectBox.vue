<template>
  <div class="gb-select-box" v-click-outside="onClose">
    <gb-input
      placeholder="Type amount"
      className="gb-input_no-fill"
      type="number"
      :readonly="readOnly"
      v-model="fieldValues"
    />
    <div class="gb-selected" @click="toggleSearchBar">
      <img :src="this.currency.image || null" class="gb-icon" />
      <div class="gb-currency-code">
        {{ this.currency.ticker?.toUpperCase() || "Select" }}
      </div>
    </div>
    <div class="gb-select" :class="{ 'gb-select_open': isOpen }">
      <gb-input
        placeholder="Select item"
        className="gb-input_no-fill"
        v-model="searchValue"
      />
      <gb-select
        :options="filteredOptions"
        @close="onClose()"
        @change="onChange($event)"
      />
      <button class="gb-clear-value">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "select-box",
  props: {
    options: {
      type: Array,
      default: () => [],
    },

    currencyType: {
      type: [String],
      default: null,
    },

    readOnly: {
      type: Boolean,
      default: false,
    },

    currencyValue: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      isOpen: false,
      currency: {},
      searchValue: "",
      fieldValue: "",
    };
  },

  methods: {
    toggleSearchBar() {
      this.isOpen = !this.isOpen;
    },

    onClose() {
      this.isOpen = false;
    },

    onChange(e) {
      this.currency = e;
    },

    searchHandler(value) {
      this.searchValue = value.toLowerCase();
    },
  },

  computed: {
    filteredOptions() {
      return this.options.filter((el) =>
        el.name.toLowerCase().includes(this.searchValue)
      );
    },

    // fieldValues() {
    //   return this.currencyValue;
    // },
  },

  watch: {},
};
</script>

<style lang="scss" scoped>
.gb-select-box {
  position: relative;
  display: flex;
  background: #f6f7f8;
  border: 1px solid #e3ebef;
  border-radius: 5px 5px 0 0;

  .gb-select {
    position: absolute;
  }
}

.gb-clear-value {
  position: absolute;
  top: 7px;
  right: 0;
  width: 40px;
  height: 40px;
  font-size: 20px;
  color: #80a2b6;
}

.gb-selected {
  display: flex;
  align-items: center;
  position: relative;
  max-width: 150px;
  width: 100%;
  cursor: pointer;
  padding-left: 10px;

  &:before {
    position: absolute;
    top: 10px;
    content: "";
    left: 0;
    height: calc(100% - 20px);
    width: 1px;
    background: #e3ebef;
  }

  &:after {
    position: absolute;
    top: calc(50% - 5px);
    right: 11px;
    transform: rotate(45deg);
    content: "";
    width: 8px;
    height: 8px;
    border-style: solid;
    border-color: #80a2b6;
    border-width: 0 2px 2px 0;
  }
}
</style>
