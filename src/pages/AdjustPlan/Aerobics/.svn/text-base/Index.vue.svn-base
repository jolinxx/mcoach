<template>
	<div class="member_plan_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<template v-for="item in caoList">
			<div class="plan_item_box" @click="checkActionType(item.id,item.courseName)">
				<img :src="item.poster" alt="" />
				<div class="plan_item_info">
					<div>{{item.courseName}}</div>
					<span>ID：{{item.id}}</span> / <span>难度：{{item.difficultyLevel}}</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { getAerobicsesListService, updataAerobicsesService ,addAerobicsesService,deleteAerobicsesService} from '@/api/service';
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
				title: "有氧操",
				value: 0,
				caoList: []
			}
		},
		created() {
			this.getAerobicsesList();
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
			async getAerobicsesList() {
				const data = {
					params: {
						xh: 'undefined',
						curPage: 1,
						pageSize: 100
					}
				}
				let res = await getAerobicsesListService(data);
				if(res.success == true) {
					this.caoList = res.data;
				}
			},
			checkActionType(AerobicsId, courseName){
				if(sessionStorage.getItem('actionType')=='update'){
					this.confirmUpdataAerobicses(AerobicsId, courseName);
				}else{
					this.confirmAddAerobicses(AerobicsId, courseName);
				}
			},
			confirmUpdataAerobicses(AerobicsId, courseName) {
				Dialog.confirm({
					title: '提示',
					message: '确认将当日有氧操修改为『' + courseName + '』吗？'
				}).then(() => {
					// on confirm
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
					this.updataAerobicses(AerobicsId);
				}).catch(() => {
					console.log('否');
				});

			},
			async updataAerobicses(AerobicsId) {
				const data = {
					id: this.$route.params.id,
					dayId: sessionStorage.getItem('dayId'),
					newAerobicsId: AerobicsId,
					searchUserId: sessionStorage.getItem('userId')
				}
				let res = await updataAerobicsesService(data);
				if(res.success == true) {
					Toast.success("修改成功");
					this.$router.go(-1);
				} else {
					Toast.fail("修改失败");
				}
			},
			confirmAddAerobicses(AerobicsId, courseName) {
				Dialog.confirm({
					title: '提示',
					message: '确认添加有氧操『' + courseName + '』吗？'
				}).then(() => {
					// on confirm
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
					this.addAerobicses(AerobicsId);
				}).catch(() => {
					console.log('否');
				});
			},
			async addAerobicses(AerobicsId) {
				const data = {
					dayId: sessionStorage.getItem('dayId'),
					newAerobicsId: AerobicsId,
					searchUserId: sessionStorage.getItem('userId')
				}
				let res = await addAerobicsesService(data);
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

<style>
	.plan_item_box {
		/*padding: 0 1rem;*/
		position: relative;
		width: 48.5%;
		float: left;
		margin-left: 1%;
	}
	
	.plan_item_box img {
		width: 100%;
	}
	
	.plan_item_info {
		text-align: left;
		position: absolute;
		bottom: 3px;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		color: #fff;
	}
	
	.plan_item_info * {
		margin: 0.5rem 0.3rem;
	}
</style>