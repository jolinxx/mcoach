<template>
	<van-list v-model="loading" :finished="finished" :offset="kk" @load="onLoad">
		<van-cell v-for="item in list" :key="item" :title="item" />
	</van-list>
</template>
<script>
	import { List,Cell } from 'vant';

	export default {
		components: {
			[List.name]: List,
			[Cell.name]: Cell
			
		},
		data() {
			return {
				kk:10,
				list: [],
				loading: false,
				finished: false
			};
		},

		methods: {
			onLoad() {
				console.log('激活');
				// 异步更新数据
				setTimeout(() => {
					for(let i = 0; i < 10; i++) {
						this.list.push(this.list.length + 1);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if(this.list.length >= 40) {
						this.finished = true;
					}
				}, 500);
			}
		}
	}
</script>

<style>
	
</style>