function clickOutSideFn(event, el, binding) {
  if (!(el === event.target || el.contains(event.target))) {
    binding.value();
  }
}

export default {
  name: 'click-outside',
  mounted(el, binding) {
    document.addEventListener('click', (event) => {
      clickOutSideFn(event, el, binding);
    });
  },

  unmounted() {
    document.removeEventListener('click', clickOutSideFn);
  },
};
