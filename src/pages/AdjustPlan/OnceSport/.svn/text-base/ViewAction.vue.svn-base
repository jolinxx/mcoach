<template>
	<div class="member_plan_box kk">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<van-row class="action_title">
			<van-col span="3" style="line-height: 3rem;">顺序</van-col>
			<van-col span="9" style="line-height: 3rem;">动作名称</van-col>
			<van-col span="3" style="line-height: 3rem;">个数</van-col>
			<van-col span="5" style="line-height: 3rem;">时长（秒）</van-col>
			<van-col span="4">休息时长（秒）</van-col>
		</van-row>
		<ul class="view_action">
			<template v-for="item in list">
				<li class="kk">
					<van-row>
						<van-col span="3">{{item.unitSort}}</van-col>
						<van-col span="9" class="words">{{item.motionName}}</van-col>
						<van-col span="3">{{item.motionNum}}</van-col>
						<van-col span="5">{{item.motionDuration}}</van-col>
						<van-col span="4">{{item.restDuration}}</van-col>
					</van-row>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import { getDayMotionListService } from '@/api/service';
	
	import {
		Row,
		Col,
		NavBar,
		Tag,
		Button,
		Tab,
		Tabs
	} from 'vant';

	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[NavBar.name]: NavBar,
			[Tag.name]: Tag,
			[Button.name]: Button,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs
		},
		data() {
			return {
				title: "查看动作",
				value: 0,
				list: []
			}
		},
		created() {
			this.getDayMotionList();
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
			async getDayMotionList() {

				const data = {
					id: this.$route.params.id,
					params: {
						xh: 'undefined',
						curPage: 1,
						pageSize: 100
					}
				}
				let res = await getDayMotionListService(data);
				if(res.success == true) {
					this.list = res.data;
				}
			}
		}
	}
</script>

<style >
	.kk .van-row {
		border-top: 1px solid #777;
	}
	
	.kk .van-col{
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
	
	.view_action li:last-child {
		border-bottom: 1px solid #777;
	}
	
	.view_action li:nth-of-type(odd) {
		background-color: aliceblue;
	}
	
	.words {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>