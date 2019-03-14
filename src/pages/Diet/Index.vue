<template>
	<div class="member_diet_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<div class="diet_title">{{nowMethod.methodName}}</div>
		<div class="change">
			<van-button round size="normal" @click="changeDiet">更换减肥方法</van-button>
		</div>
		<template v-for="item in hisMethods">
			<div class="item_card_box">
				<van-row type="flex" class="item_card_header" style="color: #777;">
					<van-col span="6" class="item_card_date">{{item.time}}</van-col>
					<van-col span="16" class="item_card_date">{{item.methodName}}</van-col>
				</van-row>
				<van-row type="flex" class="item_card_header" style="color: #777;">
					<van-col span="4" class="item_card_date" v-if="item.sourceFrom=='SYS'" style="background-color: #51a351;
    color: #fff;">系统</van-col>
					<van-col span="4" class="item_card_date" v-else style="background-color:#ee5f5b;color: #fff;">私教</van-col>
					<van-col span="20" class="item_card_date">{{item.cause}}</van-col>
				</van-row>
			</div>
		</template>
		<van-popup class="vanpopup" position="right" v-model="show1">
			<van-nav-bar title="更换减肥方法" left-text="关闭" left-arrow @click-left="show1=false" />
			<van-row class="method_title">
				<van-col span="4">方法ID</van-col>
				<van-col span="3">排序</van-col>
				<van-col span="12">名称</van-col>
				<!--<van-col span="1">时</van-col>
				<van-col span="1">动</van-col>-->
			</van-row>
			<ul class="indoorUl">
				<template v-for="item in methodList">
					<li @click="confirmChooseDiet(item.methodId,item.methodName)">
						<van-row>
							<van-col span="4">{{item.methodId}}</van-col>
							<van-col span="3" class="words">{{item.orderNum}}</van-col>
							<van-col span="12">{{item.methodName}}</van-col>
							<!--<van-col span="1">{{1}}</van-col>
							<van-col span="1">{{12}}</van-col>-->
						</van-row>
					</li>
				</template>
			</ul>
		</van-popup>
		<van-popup class="vanpop" v-model="show">
			<h3>提示</h3>
			<div class="van-dialog__message van-dialog__message--has-title">确认更换饮食方法为：『{{methodName}}』吗？</div>
			<textarea v-model="text" style="width:90%;height:4rem;margin:auto;" placeholder="请填写更换原因，最多70字"></textarea>
			<van-button round size="small" style="margin: 1rem;" @click="show=false">取消</van-button>
			<van-button round size="small" style="margin: 1rem;" type="primary" @click="updateMethod">确认</van-button>
		</van-popup>
	</div>
</template>

<script>
	import { getMemberMethodService, getMethodService, updataMethodService } from '@/api/service';

	import {
		Row,
		Col,
		NavBar,
		List,
		Toast,
		Button,
		Popup,
		Dialog
	} from 'vant';

	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[NavBar.name]: NavBar,
			[List.name]: List,
			[Toast.name]: Toast,
			[Button.name]: Button,
			[Popup.name]: Popup,
			[Dialog.name]: Dialog

		},
		data() {
			return {
				title: "",
				nowMethod: '',
				hisMethods: [],
				methodList: [],
				show1: false,
				show: false,
				methodName: '',
				methodId: '',
				text: ''
			}
		},
		created() {
			this.getMemberMethod();
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
			async getMemberMethod() {
				this.title = this.$route.params.nickName;
				let userId = this.$route.params.userId;
				let classId = sessionStorage.getItem('classId');
				const data = {
					userId: userId,
					classId: classId
				}
				let res = await getMemberMethodService(data);
				if(res.success == true) {
					console.log(res.data);
					this.nowMethod = res.data.nowMethod;
					this.hisMethods = res.data.hisMethods;
				} else {
					Toast('错误，请返回上一级！');
				}
			},
			async changeDiet() {
				/*Toast.loading({
					mask: true,
					message: '加载中...'
				});*/
				const data = {
					params: {
						pageSize: 40,
						curPage: 1
					}
				}
				let res = await getMethodService(data);
				if(res.success == true) {
					console.log(res.data);
					this.methodList = res.data;
					this.show1 = true;
				} else {
					Toast('错误，请返回上一级！');
				}
			},
			confirmChooseDiet(methodId, methodName) {
				this.show = true;
				this.methodName = methodName;
				this.methodId = methodId;
			},
			async updateMethod() {
				if(this.text == '') {
					Toast.fail('提交失败');
				} else {
					Toast.loading({
						mask: true,
						message: '提交中...',
						duration:0
					});
					let cause = this.text + '「由' + this.nowMethod.methodName + '变更为' + this.methodName + '」';
					const data = {
						userId: sessionStorage.getItem('userId'),
						classId: sessionStorage.getItem('classId'),
						cause: cause,
						methodId: this.methodId
					}
					let res = await updataMethodService(data);
					if(res.success == true) {
						Toast.success('提交成功');
						this.show = false;
						this.nowMethod.methodName = this.methodName;
					} else {
						Toast.fail('提交失败');
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.change {
		padding: 1rem 0;
	}
	
	.change .van-button {
		background-color: #8271FF;
		color: #fff;
		width: 98%;
		margin-top: 0.5rem;
	}
	
	.diet_title {
		color: #f90;
		font-size: 1.5rem;
		font-weight: 700;
		padding: 1rem 0;
	}
	
	.item_card_box {
		height: auto;
		background-color: aliceblue;
		margin-bottom: 0.5rem;
		border-bottom: 1px #d4d4d4 dotted;
	}
	
	.detail {
		padding-bottom: 0.5rem;
		margin: 0.5rem;
		color: #777;
		/*text-align: left;*/
	}
	
	.member_diet_box .vanpopup {
		width: 100%;
		height: 100%;
	}
	
	.method_title {
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
	
	.vanpop {
		border-radius: 5px;
		width: 80%;
		height: auto;
	}
</style>