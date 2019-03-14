<template>
	<div class="member_plan_box">
		<van-nav-bar :title="title" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<div>
			<van-tabs @change="getDayPlan(index)" v-model="index">
				<van-tab v-for="(item,index) in planList" :title="'第' + (index+1)+'天'" :key="index">
					<template v-for="(item,k) in dayPlanList">
						<div class="item_card_box">
							<van-row type="flex" justify="space-around" class="item_card_header">
								<van-col span="24" class="item_card_name">{{item.itemName}}</van-col>
							</van-row>
							<van-row type="flex" justify="space-around" style="height:1rem;line-height: 1rem;">
								<van-col span="24" class="item_card_time" style="font-size: 12px;height:1rem;line-height: 1rem;">{{item.exeDate}}</van-col>
							</van-row>
							<van-row type="flex" justify="space-around" class="item_card_header">
								<van-col span="8" class="item_card_time">{{item.duration}}分钟</van-col>
								<van-col span="8" class="item_card_cal">{{item.calorie}}千卡</van-col>
								<van-col span="8" class="item_card_status">{{item.complet=='Y'?'完成':'未完成'}}</van-col>
							</van-row>
							<van-row class="item_card_but" type="flex" justify="space-around">
								<van-col span="8">
									<van-button round style="background-color: #2290FF;" @click="handleSingleAction(item.planType,item.id,index,k)">{{item.planName}}</van-button>
								</van-col>

								<van-col span="6">
									<van-button round style="background-color: #f60;" @click="confirmDeleteAction(item.id,item.itemName,item.planType)">删除</van-button>
								</van-col>
							</van-row>
						</div>
					</template>
				</van-tab>
			</van-tabs>
		</div>
		<div class="item_card_score go_evaluate">
			<van-button round size="normal" @click="confirmRest()" :disabled="disabled">{{restFlag}}</van-button>
			<van-button round size="normal" @click="addSinglePlan(index)">添加单次计划</van-button>
			<van-button round size="normal" @click="addOutdoorPlan(index)">添加室外运动</van-button>
			<van-button round size="normal" @click="addAerobics(index)">添加有氧操</van-button>
		</div>
	</div>
</template>

<script>
	import { getMemberPlanListService, getDayPlanListService, toRestService, deleteAerobicsesService, deleteOutdoorService, deleteIndoorService } from '@/api/service';
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
				title: "",
				index: 0, //当前请求的日计划列表
				planList: [{}],
				dayPlanList: [{}],
				restFlag: '', //休息按钮显示的内容
				disabled:true
			}
		},
		created() {
			this.title = sessionStorage.getItem("nickName") + '的运动计划';
			this.getMemberPlanList();
		},
		mounted(){
			
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
			async getMemberPlanList() {
				const data = {
					classId: sessionStorage.getItem('classId'),
					userId: sessionStorage.getItem("userId"),
					params: {
						xh: 'undefined',
						curPage: 1,
						pageSize: 10
					}
				}
				let res = await getMemberPlanListService(data);
				if(res.success == true) {
					this.planList = res.data;
					let list = res.data;
					for(var key in list) {
						var date = list[(6-key)].exeDate + ':000';
						date = date.substring(0, 19);
						date = date.replace(/-/g, '/');
						var timestamp = new Date(date).getTime();
						//console.log('计划时间' + timestamp);
						var timestamp1 = new Date().getTime(); 
						//console.log('当前时间' + timestamp1);
						if(timestamp<timestamp1){
							this.checkRest(6-key);
							this.getDayPlan(6-key);
							/*this.index = 6-key;*/
							console.log(this.index);
							return;
						}
					}
					console.log(this.index);
				}
			},
			async getDayPlan(i) {
				console.log(i);
				this.checkRest(i);
				const data = {
					id: this.planList[i].id,
					params: {
						curPage: 1,
						pageSize: 10
					}
				}
				let res = await getDayPlanListService(data);
				if(res.success == true) {
					let list = res.data;
					for(let key in list) {
						switch(list[key].planType) {
							case 'INDOOR':
								list[key].planName = '查看动作';
								list[key].exeDate = this.planList[i].exeDate.split(" ")[0];
								break;
							case 'OUTDOOR':
								list[key].planName = '调整时长';
								list[key].exeDate = this.planList[i].exeDate.split(" ")[0];
								break;
							default:
								list[key].planName = '替换有氧操';
								list[key].exeDate = this.planList[i].exeDate.split(" ")[0];
						}
					}
					this.dayPlanList = list;
					console.log(this.dayPlanList);
					this.index = i;
				}
			},
			confirmRest() {
				let day = (this.planList[this.index].exeDate).split(' ')[0];
				Dialog.confirm({
					title: '提示',
					message: '确定将时间为： ' + day + '的计划，调整为休息吗？'
				}).then(() => {
					// on confirm
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
					this.toRest();
				}).catch(() => {
					console.log('否');
				});

			},
			async toRest() {
				//				console.log(this.planList[this.index].id);
				const data = {
					dayId: this.planList[this.index].id,
					way: 0
				}
				let res = await toRestService(data);
				if(res.success == true) {
					Toast.success('修改成功');
					console.log(this.planList[this.index].id);
					this.getMemberPlanList();
				} else {
					console.log("修改为休息失败！");
				}

			},
			checkRest(key) {
				if(this.planList[key].adjustRest == 'N') {
					this.restFlag = '调整为休息';
					this.disabled = false;
				} else {
					this.restFlag = '已调整为休息';
					this.disabled = true;
				}

			},
			handleSingleAction(planType, id, i, k) {
				console.log(planType);
				switch(planType) {
					case 'INDOOR':
						this.$router.push({
							name: 'view_action',
							params: {
								id: id
							}
						});
						break;
					case 'OUTDOOR':
						console.log(id);
						this.$router.push({
							name: 'change_time',
							params: {
								warmTime: this.dayPlanList[k].warmTime,
								relaxTime: this.dayPlanList[k].relaxTime,
								raceTime: this.dayPlanList[k].raceTime,
								calorie: this.dayPlanList[k].calorie,
								id: id
							}

						});
						break;
					default:
						console.log(i);
						sessionStorage.setItem('dayId', this.planList[i].id);
						sessionStorage.setItem('actionType', 'update');
						this.$router.push({
							name: 'aerobics',
							params: {
								id: id
							}
						});
				}
			},
			addSinglePlan(index) {
				console.log(index);
				sessionStorage.setItem('dayId', this.planList[index].id);
				this.$router.push({
					name: 'once_sport'
				});
			},
			addOutdoorPlan(index) {
				sessionStorage.setItem('dayId', this.planList[index].id);
				this.$router.push({
					name: 'outdoor_sport'
				});
			},
			addAerobics(index) {
				console.log(index);
				sessionStorage.setItem('dayId', this.planList[index].id);
				sessionStorage.setItem('actionType', 'add');
				this.$router.push({
					name: 'aerobics'
				});
			},
			confirmDeleteAction(id, itemName, planType) {
				Dialog.confirm({
					title: '提示',
					message: '确认删除运动项目『' + itemName + '』吗？'
				}).then(() => {
					// on confirm
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
					switch(planType) {
						case 'INDOOR':
							this.deleteIndoor(id); //删除室内运动
							break;
						case 'OUTDOOR':
							this.deleteOutdoor(id);
							break;
						default:
							this.deleteAerobicses(id); //删除有氧操
					}
				}).catch(() => {
					console.log('否');
				});
			},
			async deleteIndoor(id) {
				const data = {
					id: id
				}
				let res = await deleteIndoorService(data);
				if(res.success == true) {
					Toast.success("修改成功");
					this.getMemberPlanList();
				} else {
					Toast.fail("修改失败");
				}

			},
			async deleteOutdoor(id) {
				const data = {
					id: id
				}
				let res = await deleteOutdoorService(data);
				if(res.success == true) {
					Toast.success("修改成功");
					this.getMemberPlanList();
				} else {
					Toast.fail("修改失败");
				}

			},
			async deleteAerobicses(id) {
				const data = {
					id: id
				}
				let res = await deleteAerobicsesService(data);
				if(res.success == true) {
					Toast.success("修改成功");
					this.getMemberPlanList();
				} else {
					Toast.fail("修改失败");
				}

			}

		}
	}
</script>

<style scoped="scoped">
	.item_card_box {
		margin: 0.5rem;
		padding: 0.5rem;
		height: 7rem;
		border: 1px solid #8271FF;
	}
	
	.item_card_header {
		height: 2rem;
		margin-top: 0;
		padding-top: 0;
	}
	
	.van-col {
		line-height: 2rem;
		height: 2rem;
	}
	
	.item_card_time,
	.item_card_cal {
		color: #8271FF;
	}
	
	.item_card_status {
		color: #090;
	}
	
	.item_card_but {
		margin-top: 0;
	}
	
	.item_card_but .van-button {
		color: #fff;
		height: 2rem;
		line-height: 2rem;
		border-radius: 1rem;
	}
	
	.item_card_score {
		margin: 0 0.5rem;
		text-align: left;
	}
	
	.go_evaluate {
		margin-top: 1rem;
	}
	
	.go_evaluate .van-button {
		background-color: #8271FF;
		color: #fff;
		width: 100%;
		margin-top: 0.5rem;
	}
</style>