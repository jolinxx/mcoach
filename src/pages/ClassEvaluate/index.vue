<template>
	<div class="member_remark_box">
		<van-nav-bar :title="title" right-text="首页" @click-right="onClickRight" />
		<van-row class="remark_item_head">
			<van-col span="12">为<span class="red">【{{kaDetail.nickName}}】</span>打分</van-col>

			<van-col span="4" offset="4">还剩<span class="red">{{totalRows}}</span>张</van-col>

		</van-row>
		<div class="remark_item_tag">
			<van-tag size="large" mark type="danger">{{kaDetail.forumName}}</van-tag>
			<van-icon name="clear" style="float: right;margin-right: 1rem;" @click="confirmDeleteKa" />
		</div>

		<div class="remark_item_pic">
			<img :src="kaDetail.fileUrl" alt="" />
		</div>
		<div class="remark_item_rate">
			<div class="star_box">
				<van-rate v-model="value" :size="30" :count="6" color="#2ba" void-color="#ceefe8" @change="getStarScoreComms" />
				<div>
					<ul>
						<li>0</li>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
					</ul>
				</div>
			</div>
			<input class="score_input" type="number" name="score" id="score" v-model="score" placeholder="填写分数" />
			</div>
		<van-tag class="tag_type" style="background-color: #43C2E5" round size="large">性别：<span>{{kaDetail.sex}}</span></van-tag>
		<van-tag class="tag_type" style="background-color: #43C2E5" round size="large">年龄：<span>{{kaDetail.age}}</span></van-tag>
		<van-tag class="tag_type" style="background-color: #43C2E5" round size="large">初始BMI：<span>{{kaDetail.bmi}}</span></van-tag>
		<van-tag class="tag_type" style="background-color: #43C2E5" round size="large">当前BMI：<span>{{kaDetail.nowBmi}}</span></van-tag>
		<van-tag class="tag_type" style="background-color: #E57F31" round size="large">运动：<span>{{kaDetail.sport}}</span></van-tag>
		<van-tag class="tag_type" style="background-color: #71DB7C" round size="large">饮食：<span>{{kaDetail.shipu}}</span></van-tag>
		<div class="remark_item_rate">
			<van-tag size="large" mark type="danger">评语</van-tag>
			<textarea id="inputPinyu" rows="4" v-model="evaluateDetail" placeholder="请填写评语(一句话描述，避免空行、空格，不要超过250字)"></textarea>
		</div>
		<div class="remark_item_beizhu">
			<van-tag size="large" mark type="danger">备注</van-tag>
			<div class="beizhu_box">
				<ul class="beizhu">
					<template v-for="item in remarkList">
						<li>{{item.gmtModified}} {{item.remarkDetail}}</li>
					</template>
				</ul>
			</div>
		</div>
		
		<div class="updata">
			<van-button round size="normal" @click="forumaction">提交</van-button>
		</div>
		<van-button v-if="show" class="popupBtn" round size="small" @click="forumaction">提交</van-button>
		<van-popup position="right" v-model="show">
			<div class="popup">
				<h3>{{value-1}}星评价</h3>
				<ol>
					<template v-for="(item,index) in starCommsList">
						<li :class="index==ss?'hover':''" @click="useComms(index)">{{item.coachComment}}</li>
					</template>
				</ol>
			</div>
		</van-popup>

	</div>
</template>

<script>
	import {
		getClassKaListService,
		getClassKaDetailService,
		getClassMemberRemarkService,
		getStarScoreCommsService,
		forumactionService,
		deleteMemberKaService
	} from '@/api/service';

	import {
		Row,
		Col,
		NavBar,
		Tag,
		Button,
		Rate,
		Popup,
		Toast,
		Icon,
		Dialog
	} from 'vant';

	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[NavBar.name]: NavBar,
			[Tag.name]: Tag,
			[Button.name]: Button,
			[Rate.name]: Rate,
			[Popup.name]: Popup,
			[Toast.name]: Toast,
			[Icon.name]: Icon,
			[Dialog.name]: Dialog
		},
		data() {
			return {
				title: "",
				kaDetailList: [],
				remarkList: [], //备注列表
				kaDetail: '',
				totalRows: 0, //剩余打卡数
				forumType: 0, //当前打卡类型
				value: 0, //选中的星数
				score: '', //星数对应分数
				show: false, //星级评语列表框显示
				starCommsList: [], //星级评语列表
				evaluateDetail: '', //评语
				ss:500
			}
		},
		created() {
			this.getClassKaList();
		},
		methods: {
			onClickRight() {
				this.$router.push({
					name: 'class_list' //跳转减肥班列表
				});
			},
			async getStarScoreComms() {
				const data = {
					forumType: this.forumType,
					starNum: this.value - 1
				}
				let res = await getStarScoreCommsService(data);
				if(res.success == true) {
					console.log(res);
					if(res.data.comms.length != 0) {
						this.ss = 500;
						this.show = true;
						this.starCommsList = res.data.comms;
					}
					this.score = res.data.score;
					console.log(this.score);
				}
			},
			async getClassKaList() {
				let classId = sessionStorage.getItem('classId');
				this.title = sessionStorage.getItem('className');
				console.log(classId);
				const data = {
					classId: classId,
					params: {
						pageStart: 0,
						pageSize: 100,
						scoreStatus: 'waitting'
					}
				}
				let res = await getClassKaListService(data);
				if(res.success == true) {
					this.kaDetailList = res.data;
					this.totalRows = this.kaDetailList.length - 1;
					console.log(this.kaDetailList[0].fileUrl);
					this.getClassKaDetail(this.kaDetailList[0].userId, classId, this.kaDetailList[0].createTime, this.kaDetailList[0].fileUrl, this.kaDetailList[0].forumType, this.kaDetailList[0].nickName);
					this.forumType = this.kaDetailList[0].forumType;
					this.getClassMemberRemark(this.kaDetailList[0].userId, classId);
				} else {
					console.log("获取班级成员打卡列表失败：" + res);
				}

			},
			async getClassKaDetail(userId, classId, exeDate, fileUrl, forumType, nickName) {
				const data = {
					classId: classId,
					userId: userId,
					params: {
						exeDate: exeDate
					}
				}
				let res = await getClassKaDetailService(data);
				console.log(res);
				if(res.success == true) {
					let detail = {};
					detail.nickName = nickName;
					detail.sex = res.data.baseInfo.sex == 'FEMALE' ? '女' : '男';
					detail.bmi = res.data.baseInfo.bmi.toFixed(1);
					detail.nowBmi = res.data.baseInfo.nowBmi.toFixed(1);
					let date = new Date;
					detail.age = date.getFullYear() - res.data.baseInfo.sr_year;
					detail.shipu = res.data.shipu;
					detail.sport = res.data.sport;
					detail.fileUrl = fileUrl.replace(/\/s\//g, "/o/");
					switch(forumType) {
						case 0:
							detail.forumName = '运动打卡';
							break;
						case 1:
							detail.forumName = '早餐打卡';
							break;
						case 2:
							detail.forumName = '中餐打卡';
							break;
						case 3:
							detail.forumName = '晚餐打卡';
							break;
						default:
							detail.forumName = '加餐打卡';
					}
					this.kaDetail = detail;
					console.log(this.kaDetail);
				} else {
					console.log("获取班级成员打卡详情失败：" + res);
				}
			},
			async getClassMemberRemark(userId, classId) {
				const data = {
					classId: classId,
					userId: userId
				}
				let res = await getClassMemberRemarkService(data);
				if(res.success == true) {
					this.remarkList = res.data;
				} else {
					console.log("获取班级成员备注列表失败：" + res);
				}

			},
			useComms(e) {
				//console.log(e.target.innerText);
				console.log(e);
				this.ss = e;
				console.log(this.starCommsList[e].coachComment);
				this.evaluateDetail = this.starCommsList[e].coachComment;
				//this.show = false;
				
			},
			async forumaction() { //点击提交 
				if(this.evaluateDetail != '' && (this.score != ''||this.score == 0)) {
					Toast.loading({
						mask: true,
						message: '提交中...'
					});
					let classId = sessionStorage.getItem('classId');
					let coachData = JSON.parse(sessionStorage.getItem('coachData'));

					let actionExt = {
						"actDetail": {
							"comment": this.evaluateDetail,
							"headUrl": coachData.coachHeadUrl,
							"nickName": coachData.coachNickName,
							"userId": coachData.coachUserId
						},
						"actType": 3,
						"forumId": this.kaDetailList[0].forumId,
						"forumImg": this.kaDetail.fileUrl
					}

					const data = {
						forumId: this.kaDetailList[0].forumId,
						actDetail: this.evaluateDetail,
						actionExt: JSON.stringify(actionExt),
						classId: classId,
						forumId: this.kaDetailList[0].forumId,
						score: this.score,
						scoreFlag: 0,
						searchUserId: this.kaDetailList[0].userId

					}
					console.log(data);
					let res = await forumactionService(data);
					if(res.success == true) {
						console.log("教练评测成功");
						Toast.success('提交成功！');
						setTimeout(function() {
							window.scrollTo(0, -1); //回到顶部
							window.location.reload();
						}, 500);

					} else {
						console.log("教练评测失败");
					}
				} else {
					Toast.fail('信息不全！');
				}
			},
			confirmDeleteKa() {
				Dialog.confirm({
					title: '警告',
					message: '确认删除该打卡吗？删除后，用户和您将无法再次看到该打卡！'
				}).then(() => {
					Toast.loading({
						mask: true,
						message: '删除中...'
					});
					this.deleteKa();
				}).catch(() => {
					// on cancel
				});

			},
			async deleteKa() {
				const data = {
					forumId: this.kaDetailList[0].forumId,
				}
				let res = await deleteMemberKaService(data);
				if(res.success == true) {
					Toast.success("删除成功");
					setTimeout(function() {
						window.scrollTo(0, -1); //回到顶部
						window.location.reload();
					}, 500);
				} else {
					Toast.fail("删除失败");
				}
			}
		}
	}
</script>

<style>
	.remark_item_head .van-col {
		height: 3rem;
		line-height: 3rem;
	}
	
	.red {
		color: red;
	}
	
	.remark_item_tag {
		margin-left: 0.5rem;
		text-align: left;
	}
	
	/*.remark_item_pic {
		height: 25rem;
	}*/
	
	.remark_item_pic img {
		width: 100%;
		margin-bottom: 1rem;
	}
	
	.tag_type {
		margin-top: 0.4rem;
	}
	
	.remark_item_beizhu {
		margin: 0.5rem;
		text-align: left;
		margin-top: 3rem;
	}
	
	.beizhu_box {
		height: 8rem;
		overflow-y: scroll;
		border-top: 2px solid #8271FF;
		border-bottom: 2px solid #8271FF;
	}
	
	.beizhu_box li {
		line-height: 1.5rem;
	}
	
	.beizhu_box li:nth-of-type(odd) {
		background-color: #f0f8ff;
	}
	
	.remark_item_rate {
		margin: 0.5rem;
		text-align: left;
		height: 60px;
	}
	
	.remark_item_rate li {
		float: left;
		width: 30px;
		padding: 0 2px;
		text-align: center;
		color: #2ba;
	}
	
	ol {
		list-style-type: none;
		counter-reset: sectioncounter;
		width: 100%;
	}
	
	ol li {
		text-align: left;
		padding: 0 5px;
	}
	
	ol li:before {
		content: counter(sectioncounter) "、";
		counter-increment: sectioncounter;
	}
	
	.star_box {
		width: 70%;
		float: left;
	}
	
	.score_input {
		width: 5rem;
		margin-top: 5px;
		height: 30px;
		float: right;
		text-align: center;
	}
	
	#inputPinyu {
		width: -webkit-fill-available;
	}
	
	.updata {
		margin-top: 2rem;
	}
	
	.updata .van-button {
		background-color: #8271FF;
		color: #fff;
		width: 100%;
	}
	.popupBtn{
		background-color: #8271FF;
		color: #fff;
		position: fixed;
		top: 50%;
    	left: 10px;
    	z-index: 5001;
	}
	.hover{
		background-color: #8271FF;
		color: white;
	}
	.member_remark_box .van-popup {
		width: 80%;
		height: 100%;
	}
	
	.member_remark_box .popup ul {
		text-align: left;
		margin: 0.5rem;
	}
</style>