<template>
  <button class="gb-button" :class="className" :type="typeButton">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "gb-button",
  props: {
    typeButton: {
      type: String,
      default: "button",
    },
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-button {
  &_no-fill {
    width: 40px;
    height: 40px;
  }

  &_primary {
    position: relative;
    padding: 15px 59px;
    background: #11b3fe;
    border-radius: 5px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #fff;

    &:hover {
      background: #0095e0;
      transition: 0.3s;
    }

    &[disabled] {
      background: #11b3fe;
      cursor: not-allowed;

      &:before {
        position: absolute;
        top: calc(100% + 8px);
        content: "This pair is disabled now";
        color: #e03f3f;
        text-align: center;
        font-size: 16px;
        line-height: 23px;
        width: 100%;
        left: 0;
      }
    }
  }
}
</style>
