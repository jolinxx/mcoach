<template>
	<div class="member_remarks_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<template v-for="item in remarkList">
			<div class="item_card_box">
				<van-row type="flex" class="item_card_header" style="padding: 0.5rem 0;color: #fff;background-color: #8271FF;">
					<van-col span="10" class="item_card_date">{{item.gmtModified}}</van-col>

				</van-row>
				<p class="detail">{{item.remarkDetail}}</p>
			</div>
		</template>
	</div>
</template>

<script>
	import { getMemberRemarkListService } from '@/api/service';

	import {
		Row,
		Col,
		NavBar,
		List,
		Toast
	} from 'vant';

	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[NavBar.name]: NavBar,
			[List.name]: List,
			[Toast.name]: Toast
		},
		data() {
			return {
				title: "",
				remarkList: []

			}
		},
		created() {
			this.getMemberRemarkList();
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
			async getMemberRemarkList() {
				this.title = this.$route.params.nickName;
				let userId = this.$route.params.userId;
				let classId = sessionStorage.getItem('classId');
				const data = {
					userId: userId,
					classId: classId
				}
				let res = await getMemberRemarkListService(data);
				if(res.success == true) {
					console.log(res.data);
					this.remarkList = res.data;
				}else{
					Toast('错误，请返回上一级！');
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.item_card_box {
		/*	height:4rem;*/
		background-color: aliceblue;
		margin-bottom: 0.5rem;
	}
	
	.detail {
		padding-bottom: 0.5rem;
		margin: 0.5rem;
		text-align: left;
	}
</style>