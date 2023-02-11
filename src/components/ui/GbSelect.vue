<template>
	<div class="select-box" @click.stop="openSelect">
		<div class="selected">
			<img 
				v-if="selected.length > 0" 
				class="icon" 
				:src="computedImage"
			/>
			<div class="currency-code">{{ selected.toUpperCase() || 'Select' }}</div>
		</div>

		<div 
			v-click-outside="closeSelect" 
			class="select" 
			:class="{ 'select_open': isOpen }"
		>

			<input
				v-model="searchCurrency"
				placeholder="Select item"
				class="input input_no-fill"
			/>

			<ul class="list">
				<template v-if="searchListItems.length > 0">
					<li 
						v-for="item in searchListItems" 
						:key="item.ticker" 
						class="list-item"
						:class="{ 'list-item_current': item.ticker === selected }"
						@click.stop="clickItemHandler({ ticker: item.ticker, name: item.name })"
					>
						<img class="icon" :src="item.image"/>
						<div class="currency-code">{{ item.ticker.toUpperCase() }}</div>
						<div class="currency">{{ item.name }}</div>
					</li>
				</template>

				<template v-else>
					<li class="list-item">{{ searchCurrency }} not found in list</li>
				</template>
			
			</ul>
			<button class="clear" @click="clearSearch">×</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'GbSelect',

	props: {
		items: {
			type: Array,
			required: true
		},

		selected: {
			type: String,
			required: true
		},
	},

	emits: ['select-ticker'],

	data() {
		return {
			isOpen: false,
			searchCurrency: '',
		};
	},

	computed: {
		searchListItems() {
			return this.items.filter((el) => el.name.toLowerCase().includes(this.searchCurrency.toLowerCase()));
		},

		computedImage() {
			return this.items.find(el => el.ticker === this.selected)?.image;
		}
	},

	methods: {
		openSelect() {
			this.isOpen = true;
		},

		closeSelect() {
			this.isOpen = false;
			this.searchCurrency = '';
		},

		clickItemHandler(ticker) {
			this.closeSelect();

			this.$emit('select-ticker', ticker);
		},

		clearSearch() {
			this.searchCurrency = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.select {
	display: none;
	width: 100%;
	background: var(--color-gray);
	z-index: 100;

	&_open {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		border: 1px solid var(--color-border-blue);
		border-radius: 5px;
	}
}

.selected {
	display: flex;
	align-items: center;
	padding-left: 10px;
}

.select-box {
	display: flex;
	align-items: center;
	min-width: 150px;
	max-width: 200px;
	width: 100%;
	cursor: pointer;
	padding-left: 10px;
	padding-right: 25px;

	&:before {
		content: "";
		height: calc(100% - 20px);
		width: 1px;
		background: var(--color-border-gray);
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
		border-color: var(--color-light-blue);
		border-width: 0 2px 2px 0;
	}
}

.list {
	border-top: 1px solid var(--color-border-gray);
	max-height: 144px;
	height: 100%;
	overflow-y: auto;
}

.list-item {
	display: flex;
	align-items: flex-start;
	padding: 10px;
	cursor: pointer;

	@media (min-width: 768px) {
		padding: 13px 17px 12px 17px;

	}

	&:hover,
	&_current {
		background: var(--color-hover-list-item);
		transition: 0.3s;
	}
}

.clear {
	position: absolute;
	top: 7px;
	right: 0;
	width: 40px;
	height: 40px;
	font-size: 20px;
	color: var(--color-light-blue);
}
</style>