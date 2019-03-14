<template>
	<div class="member_plan_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<div class="outdoor_sport_box">

			<div class="control-group">
				<label class="control-label">热身时长:</label>
				<div class="controls">
					<input class="span2" type="number" id="relax_time2" name="relax_time2" v-model="warmTime" placeholder="时长(min)">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">途中时长:</label>
				<div class="controls">
					<input class="span2" type="number" id="relax_time2" name="relax_time2" v-model="raceTime" placeholder="时长(min)">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">放松时长:</label>
				<div class="controls">
					<input class="span2" type="number" id="relax_time2" name="relax_time2" v-model="relaxTime" placeholder="时长(min)">
				</div>
			</div>
		</div>
		<div class="item_card_score go_evaluate">
			<van-button round size="normal" @click="addOutdoorPlan();">确定</van-button>
		</div>
	</div>
</template>

<script>
	import { updateOutdoorService } from '@/api/service';

	import {
		NavBar,
		Tag,
		Button,
		Tab,
		Tabs,
		Toast
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Tag.name]: Tag,
			[Button.name]: Button,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Toast.name]: Toast
		},
		data() {
			return {
				title: "室外运动计划",
				id: '',
				warmTime: '',
				raceTime: '',
				relaxTime: ''
			}
		},
		created() {　　　　　　　　　　　　
			this.getTime();
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			onClickRight() {
				this.$router.push({
					name: 'class_list' //跳转减肥班列表
				});
			},
			getTime() {
				this.warmTime = this.$route.params.warmTime / 60,
					this.raceTime = this.$route.params.raceTime / 60,
					this.relaxTime = this.$route.params.relaxTime / 60
				console.log(this.$route.params.calorie);
			},
			async addOutdoorPlan() {
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				if(this.warmTime == 0 || this.raceTime == 0 || this.relaxTime == 0) {
					Toast.fail("缺少数据");

				} else {
					let t1 = (this.warmTime - (-this.raceTime) - (-this.relaxTime))
					let t2 = (this.$route.params.warmTime - (-this.$route.params.raceTime) - (-this.$route.params.relaxTime));
					let cal = (t1 * 60 / t2 * this.$route.params.calorie).toFixed(2);
					const data = {
						id: this.$route.params.id,
						warmTime: this.warmTime * 60,
						raceTime: this.raceTime * 60,
						relaxTime: this.relaxTime * 60,
						duration: t1 * 60,
						calorie: cal
					}
					console.log(data);
					let res = await updateOutdoorService(data);
					if(res.success == true) {
						Toast.success("添加成功");
						this.$router.go(-1);
					} else {
						Toast.fail("添加失败");
					}
				}
			}

		}
	}
</script>

<style>
	.outdoor_sport_box {
		width: 50%;
		margin-left: 15%;
		margin-top: 25%;
		background-color: #F0F8FF;
		padding: 10%;
		border: 1px solid #777;
	}
	
	.control-group {
		height: 3rem;
		line-height: 3rem;
	}
	
	.control-label {
		float: left;
	}
	
	.controls select,
	.controls input {
		width: 40%;
		height: 1.5rem;
		line-height: 1.5rem;
	}
	
	.item_card_score {
		margin-left: 0.5rem;
		text-align: left;
	}
	
	.go_evaluate {
		margin-top: 3rem;
	}
	
	.go_evaluate .van-button {
		background-color: #8271FF;
		color: #fff;
		width: 98%;
	}
</style>