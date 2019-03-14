<template>
	<div class="member_remark_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<div class="item_card_box">
			<div class="item_card_head">
				<van-tag size="large" mark type="danger">早餐打卡</van-tag>
				<span>2018-06-01</span>
				<span>09：15</span>
			</div>
			<div class="item_card_pic">
				<img src="../../assets/daka.jpg" alt="" />
			</div>
			<div class="item_card_score go_evaluate">
				<van-button round size="normal">去评卡</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		NavBar,
		Tag,
		Button
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Tag.name]: Tag,
			[Button.name]: Button
		},
		data() {
			return {
				title: "爆米花小玉 "
			}
		},
		methods: {
			onClickLeft() {
				Toast('返回');
			},
			onClickRight() {
				Toast('按钮');
			}
		}
	}
</script>

<style scoped="scoped">
	.item_card_box {
		width: 99%;
		height: 15rem;
		color: #777;
	}
	.item_card_head{
		margin-left: 0.5rem;
		text-align: left;
		background-color: #8271FF;
		color: #fff;
	}
	.item_card_pic{
		height: 25rem;
		/*border: 1px #ddd solid;*/
	}
	.item_card_pic img{
		height: 100%;
		
	}
	.item_card_score{
		margin-left: 0.5rem;
		text-align: left;
	}
	.go_evaluate{
		margin-top: 1rem;
	}
	.go_evaluate .van-button{
		background-color: #8271FF;
		color: #fff;
		width: 100%;
	}
	
	
</style>