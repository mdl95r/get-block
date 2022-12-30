<template>
  <input
    :type="typeInput"
    class="gb-input"
    :class="className"
    :placeholder="placeholder"
    :disabled="disabled"
    :id="id || null"
    :value="modelValue"
    @input="updateInput"
    :readonly="readonly"
  />
</template>

<script>
export default {
  name: "gb-input",

  props: {
    typeInput: {
      type: String,
      default: "text",
    },
    className: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [Number, String, Object],
      default: null,
    },

    readonly: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-input {
  background: #f6f7f8;
  border: 1px solid #e3ebef;
  height: 50px;
  padding: 14px 16px;
  font-size: 16px;
  line-height: 23px;
  color: #282828;
  width: 100%;

  &_no-fill {
    background: transparent;
    border: none;
  }

  &[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    -moz-appearance: textfield;
  }

  &[readonly] {
    cursor: auto;
  }
}
</style>
