<template>
  <ul class="gb-list">
    <li
      class="gb-list-item"
      v-for="option of options"
      :key="option.name"
      @click="onClick(option)"
      :class="{ 'gb-list-item_current': ticker === option.ticker }"
    >
      <img :src="option.image" class="gb-icon" :alt="option.ticker" />
      <div class="gb-currency-code">{{ option.ticker }}</div>
      <div class="gb-currency">{{ option.name }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "gb-select",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      ticker: "",
    };
  },

  methods: {
    onClick(e) {
      this.ticker = e.ticker;
      this.$emit("change", e);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-list {
  border-top: 1px solid #e3ebef;
  max-height: 144px;
  height: 100%;
  overflow-y: auto;
}

.gb-list-item {
  display: flex;
  padding: 13px 17px 12px 17px;
  cursor: pointer;

  &:hover,
  &_current {
    background: #eaf1f7;
    transition: 0.3s;
  }
}
</style>
