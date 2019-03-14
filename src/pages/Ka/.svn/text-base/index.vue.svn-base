<template>
	<div class="member_remarks_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<template v-for="(item,key) in MemberKaList">
			<div class="item_card_box" @click="kaDetail(key)">
				<div class="pic">
					<img :src="item.fileUrl" />
					<van-tag class="type" style="background-color: rgba(30, 144, 255,0.7);">{{item.forumType}}</van-tag>
					<van-tag v-if="!item.coachActions[0]" class="score no_score" style="background-color: rgba(255, 106, 106,0.7);">
						<i class="icon_pencel"></i>
					</van-tag>
					<van-tag v-else class="score" style="background-color: rgba(255, 106, 106,0.7);">
						评分：{{item.coachActions[0].actContent}}分
					</van-tag>
				</div>
				<div class="time">
					<span>{{item.createTime}}</span>
				</div>
				<div class="evaluation_box" v-if="!item.coachActions[0]">
					待评分
				</div>
				<div class="evaluation_box" v-if="!item.coachActions[1]">
					<span class="evaluation">无</span>
				</div>
				<div class="evaluation_box" v-if="item.coachActions[1]">
					<span class="evaluation">{{item.coachActions[1].actContent}}</span>
				</div>
			</div>
		</template>
		<van-popup class="ka_detail" position="right" v-model="show">
			<div class="popup_card_box">
				<div class="popup_card_head">
					<van-tag size="large" mark type="danger">{{detail.forumType}}打卡</van-tag>
					<span>{{detail.createTime}}</span>
					
				</div>
				<div class="popup_card_pic">
					<img :src="detail.fileUrl" alt="" />
				</div>
				<div class="popup_card_score go_evaluate">
					<div v-if="score!=''">
						<van-tag size="large" type="danger">{{detail.coachActions[0].actContent}}分</van-tag>
						<div class="words">{{detail.coachActions[1].actContent}}</div>
					</div>
					<div v-else>
						<van-button round size="normal" @click="goEvaluate()">去评卡</van-button>
					</div>
					
					<van-button round size="normal" @click="closeDetail()">关闭</van-button>
				</div>
			</div>

		</van-popup>
	</div>
</template>

<script>
	import { getMemberKaListService } from '@/api/service';
	import {
		Row,
		Col,
		NavBar,
		List,
		Toast,
		Tag,
		Popup,
		Button
	} from 'vant';

	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[NavBar.name]: NavBar,
			[List.name]: List,
			[Toast.name]: Toast,
			[Tag.name]: Tag,
			[Popup.name]: Popup,
			[Button.name]: Button
		},
		data() {
			return {
				title: "",
				MemberKaList: [],
				show: false,
				detail:'',
				score:'',
				content:''
			}
		},
		created() {
			this.getMemberKaList();
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
			async getMemberKaList() {
				this.title = this.$route.params.nickName;
				let userId = this.$route.params.userId;
				let classId = sessionStorage.getItem('classId');
				const data = {
					userId: userId,
					classId: classId,
					params: {
						pageStart: 0,
						pageSize: 100
					}
				};
				let res = await getMemberKaListService(data);
				if(res.success == true) {
					//					this.MemberKaList = res.data;
					var kaList = res.data;
					for(var item in kaList) {
						switch(kaList[item].forumType) {
							case 0:
								kaList[item].forumType = '运动';
								break;
							case 1:
								kaList[item].forumType = '早餐';
								break;
							case 2:
								kaList[item].forumType = '中餐';
								break;
							case 3:
								kaList[item].forumType = '晚餐';
								break;
							default:
								kaList[item].forumType = '加餐';
						}
					}
					this.MemberKaList = kaList;
				} else {
					Toast("错误，请返回上一级！");
				}
			},
			kaDetail(key) {
				console.log(key);
				this.detail = this.MemberKaList[key];
				this.detail.fileUrl = this.detail.fileUrl.replace(/\/s\//g, "/o/");
				if(this.detail.coachActions.length!=0){
					this.score = this.detail.coachActions[0].actContent;
					this.content = this.detail.coachActions[1].actContent;
				}else{
					this.score = '';
					this.content='';
				}
				this.show = true;
			},
			closeDetail(){
				this.show = false;
			},
			goEvaluate(){
				this.$router.push({
					name: 'class_evaluate' //跳转减肥班列表
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.item_card_box {
		float: left;
		margin: .7%;
		width: 48%;
		height: 16rem;
		/*background-color: aliceblue;*/
		margin-bottom: 0.5rem;
		border: 1px #ddd solid;
		color: #777;
	}
	
	.pic {
		position: relative;
	}
	
	.pic img {
		height: 10rem;
	}
	
	.pic .type {
		position: absolute;
		top: 0;
		left: 0;
		width: 1rem;
	}
	
	.pic .score {
		position: absolute;
		top: 0;
		right: 0;
		background: rgba(255, 106, 106, 0.7);
	}
	
	.pic .no_score {
		position: absolute;
		top: 0;
		right: 0;
		background: rgba(135, 207, 77, 0.75);
		width: 1em;
		height: 1rem;
	}
	
	.icon_pencel {
		position: absolute;
		top: .2rem;
		right: .2rem;
		width: 1rem;
		height: 1rem;
		background-image: url(../../assets/glyphicons-halflings-white.png);
		background-position: 0px -72px;
	}
	
	.evaluation_box {
		text-align: left;
	}
	
	.evaluation {
		color: #2C3E50;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
	
	.ka_detail {
		width: 100%;
		height: 100%;
	}
	.popup_card_box {
		
		width: 100%;
		height: 15rem;
		color: #777;
	}
	.popup_card_head{
		text-align: left;
		background-color: #8271FF;
		color: #fff;
	}
	.popup_card_pic{
		height: 25rem;
		/*border: 1px #ddd solid;*/
	}
	.popup_card_pic img{
		width: 100%;
		
	}
	.popup_card_score{
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
		margin-top: 0.5rem;
	}
	.words{
		width: 80%;
		height: 5rem;
		float: right;
		padding: .4rem .5rem;
		background-color: #FFF;
	}
</style>