<template>
	<div class="field" :class="{ 'not-allowed': currencyType === 'to' && apiError }">
		<input
			class="input input_no-fill"
			type="number"
			:value="modelValue"
			:placeholder="currencyType === 'to' && apiError ? '-' : 'Type amount'"
			:disabled="currencyType === 'to' && apiError"
			@input="inputHandler"
		/>

		<gb-select :items="currensies" :selected="selectedTicker" @select-ticker="selectTicker"/>
	</div>
</template>

<script>
import GbSelect from './ui/GbSelect.vue';

export default {
	name: "GbField",

	components: {
		GbSelect
	},

	props: {
		currensies: {
			type: Array,
			required: true
		},

		currencyType: {
			type: String,
			required: true
		},

		selectedTicker: {
			type: String,
			required: true
		},

		modelValue: {
			type: [String, Number],
			default: ''
		},

		apiError: {
			type: Boolean,
			default: false
		}
	},

	emits: ['select-ticker', 'input-change'],

	data() {
		return {};
	},

	methods: {
		selectTicker(ticker) {
			this.$emit('select-ticker', ticker, this.currencyType);
		},

		inputHandler(event) {
			this.$emit('input-change', event.target.value, this.currencyType);
		}
	}
};
</script>

<style lang="scss" scoped>
.field {
	position: relative;
	display: flex;
	background: var(--color-gray);
	border: 1px solid var(--color-border-gray);
	border-radius: 5px 5px 0 0;

	&.not-allowed {
		cursor: not-allowed;
		opacity: 0.55;
	}
}
</style>