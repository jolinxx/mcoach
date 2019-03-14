<template>
	<div class="member_plan_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<van-row class="plan_title">
			<van-col span="3">ID</van-col>
			<van-col span="9">名称</van-col>
			<van-col span="3">难度</van-col>
			<van-col span="5">时长（分）</van-col>
			<van-col span="4">动作个数</van-col>
		</van-row>
		<ul class="indoorUl">
			<template v-for="item in list">
				<li @click="confirmChooseAction(item.planName,item.planId)">
					<van-row>
						<van-col span="3">{{item.planId}}</van-col>
						<van-col span="9" class="words">{{item.planName}}</van-col>
						<van-col span="3">{{item.difficulty}}</van-col>
						<van-col span="5">{{item.duration}}</van-col>
						<van-col span="4">{{item.motionNum}}</van-col>
					</van-row>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import { getSinglePlanListService, addIndoorService } from '@/api/service';

	import {
		Row,
		Col,
		NavBar,
		Tag,
		Button,
		Tab,
		Tabs,
		Dialog,
		Toast
	} from 'vant';

	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[NavBar.name]: NavBar,
			[Tag.name]: Tag,
			[Button.name]: Button,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Dialog.name]: Dialog,
			[Toast.name]: Toast
			

		},
		data() {
			return {
				title: "单次计划",
				value: 0,
				list: []
			}
		},
		created() {
			this.getSinglePlanList();
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
			async getSinglePlanList() {

				const data = {
					params: {
						xh: 'undefined',
						curPage: 1,
						pageSize: 100
					}
				}
				let res = await getSinglePlanListService(data);
				if(res.success == true) {
					this.list = res.data;
				}
			},
			confirmChooseAction(planName, planId) {
				Dialog.confirm({
					title: '提示',
					message: '确认添加单次计划『' + planName + '』吗？'
				}).then(() => {
					// on confirm
					console.log('1');
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
					this.chooseAction(planId);
				}).catch(() => {
					console.log('否');
				});

			},
			async chooseAction(planId) {
				const data = {
					searchUserId: sessionStorage.getItem('userId'),
					planId: planId,
					dayId: sessionStorage.getItem('dayId')
				}
				let res = await addIndoorService(data);
				if(res.success == true) {
					Toast.success("修改成功");
					this.$router.go(-1);
				} else {
					Toast.fail("修改失败");
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.van-row {
		border-top: 1px solid #777;
	}
	
	.van-col {
		border-left: 1px solid #777;
	}
	
	.plan_title {
		height: 3rem;
		line-height: 3rem;
		background-color: #8271FF;
		color: white;
	}
	
	li .van-col {
		height: 3rem;
		line-height: 3rem;
	}
	
	.indoorUl li:last-child {
		border-bottom: 1px solid #777;
	}
	
	.indoorUl li:nth-of-type(odd) {
		background-color: aliceblue;
	}
	
	.words {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>