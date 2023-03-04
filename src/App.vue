<template>
  <div class="container">
    <header class="app-header">
      <h1 class="app-title">Crypto Exchange</h1>
      <p class="app-subtitle">Exchange fast and easy</p>
    </header>

		<template v-if="!isLoading">
			<div class="changer-pairs">
				<gb-field
					v-model="fromValue"
					:currensies="currensies"
					:currency-type="'from'"
					:selected-ticker="selectedTicker.from"
					@select-ticker="selectTicker"
					@input-change="inputHandler"
				/>

				<button class="swapper button button_no-fill" @click="swapCoins">
					<swap-icon width="24" height="24"/>
				</button>

				<gb-field
					v-model="toValue"
					:currensies="currensies"
					:currency-type="'to'"
					:selected-ticker="selectedTicker.to"
					:api-error="apiError"
					@select-ticker="selectTicker"
					@input-change="inputHandler"
				/>
			</div>

			<div class="exchange">
				<label for="exchange" class="label">Your {{ selectedTicker.fromName || 'wallet' }} address</label>
				<input
					id="exchange"
					v-model="address"
					class="input exchange-input"
					type="text"
				/>
				<button type="button" class="button_primary exchange-button" :disabled="!allowedToExchange" :class="{ 'pair-disabled': apiError }">Exchange</button>
			</div>
		</template>

		<template v-else>
			<div class="loader-wrap">
				<div class="loader"></div>
			</div>
		</template>
  </div>
</template>

<script>
import GbField from '@/components/GbField.vue';
import SwapIcon from '@/assets/icons/swap.svg?component';
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
	name: "App",
	components: {
		GbField,
		SwapIcon,
	},

	data() {
		return {
			address: '',
		};
	},

	computed: {
		...mapState([
			'currensies',
			'isLoading',
			'selectedTicker',
			'fromValue',
			'toValue',
			'minAmount',
			'apiError'
		]),

		...mapGetters([
			'isValid'
		]),

		allowedToExchange() {
			return this.address.length > 0;
		},
	},

	watch: {
		selectedTicker: {
			deep: true,
			handler(val) {
				if (val.from && val.to) {
					this.getMinAmount();
				}
			},
		},

		fromValue(newVal) {
			this.setError(false);

			if (newVal < this.minAmount) {
				this.setError(true);
				this.setToValue('');
				return;
			}

			if (!this.isValid) {
				return;
			}

			this.esimatedValue();
		}
	},

	mounted() {
		this.fetchAllCurrencies();
	},

	methods: {
		...mapActions([
			'fetchAllCurrencies',
			'getMinAmount',
			'esimatedValue',
		]),

		...mapMutations([
			'setError',
			'setToValue',
		]),

		selectTicker({ ticker, name }, currencyType) {
			this.selectedTicker[currencyType] = ticker;
			this.selectedTicker[`${currencyType}Name`] = name;
		},

		swapCoins() {
			const { from, fromName, to, toName } = this.selectedTicker;

			this.selectedTicker.from = to;
			this.selectedTicker.to = from;

			this.selectedTicker.fromName = toName;
			this.selectedTicker.toName = fromName;
		},

		inputHandler(amount, currencyType) {
			this.$store.commit(`${currencyType}Value`, amount);
		}
	},
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";

.app-header {
	margin-bottom: 50px;
}

.app-title {
	font-size: 40px;
	line-height: 1.2;
	margin-bottom: 15px;

	@media (min-width: $media-md) {
		font-size: 50px;
	}
}

.app-subtitle {
	font-size: 20px;
	line-height: 1;
}

.changer-pairs {
	display: grid;
	gap: 0 15px;

	@media (min-width: $media-md) {
		grid-template-columns: 1fr 40px 1fr;
	}
}

.exchange {
	display: grid;
	gap: 16px 32px;
	margin-top: 39px;

	.label {
		@media (min-width: $media-md) {
			gap: 5px 27px;
			grid-row: 1 / 2;
			grid-column: 1 / 12;
		}
	}

	@media (min-width: $media-md) {
		grid-template-columns: repeat(12, 1fr);
	}
}

.exchange-input {

	@media (min-width: $media-md) {
		grid-row: 2 /3;
		grid-column: 1 / 12;
	}
}

.exchange-button {

	@media (min-width: $media-md) {
		grid-row: 2 /3;
	}
}

.currency-code {
	margin-left: 12px;
}

.currency {
	margin-left: 12px;
	color: var(--color-light-blue);
}

.swapper {
	align-self: center;

	@media (max-width: $media-md-1) {
		margin-left: auto;
	}
}

.button {
	&_no-fill {
		width: 40px;
		height: 40px;
	}

	&_primary {
		position: relative;
		padding: 15px 59px;
		background: var(--color-blue);
		border-radius: 5px;
		font-weight: 700;
		font-size: 16px;
		line-height: 19px;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: var(--color-white);

		&:hover {
			background: var(--color-blue-darky);
			transition: 0.3s;
		}

		&[disabled] {
			opacity: .6;
		}
	}
}

.pair-disabled {
	background: var(--color-blue-disabled);
	cursor: not-allowed;

	&[disabled] {
		opacity: 1;
	}

	&:before {
		position: absolute;
		top: calc(100% + 8px);
		content: "This pair is disabled now";
		color: var(--color-error);
		text-align: center;
		font-size: 16px;
		line-height: 23px;
		width: 100%;
		left: 0;
	}
}

.input {
	background: var(--color-gray);
	border: 1px solid var(--color-border-gray);
	height: 50px;
	padding: 14px 16px;
	font-size: 16px;
	line-height: 23px;
	width: 100%;

	&_no-fill {
		background: transparent;
		border: none;
	}

	&[disabled] {
		cursor: not-allowed;
	}

	&[type="number"] {
		-moz-appearance: textfield;

		&::-webkit-inner-spin-button,
		&::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	&[readonly] {
		cursor: not-allowed;
	}
}

.loader-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
}
</style>
