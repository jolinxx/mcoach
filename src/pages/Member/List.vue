<template>
	<div class="membeer_list">
		<van-nav-bar :title="title" right-text="首页" @click-right="onClickRight" />
		<van-search placeholder="请输入用户昵称或显示ID" v-model="value" @search="onSearch" />
		<van-list v-model="loading" :finished="finished" :offset="kk" @load="onLoad">
			<!--<van-cell v-for="item in list" :key="item" :title="item" />-->
			<template v-for="item in classUserslist">
				<div class="item_card_box">
					<van-row type="flex" class="item_card_header">
						<van-col span="6" class="item_card_head">
							<img :src="item.headUrl" />
							<span class="flag eatMuch" v-if="item.eatMoreTimes==1" @click="confirmRemoveEatMuch(item.userNickName,item.classId,item.userId)">暴</span>
							<span class="flag shengli" v-if="item.slq=='Y'">生</span>
						</van-col>
						<van-col span="10" class="item_card_name">{{item.userNickName}}</van-col>
						<van-col span="8" class="item_card_id">ID：{{item.userDisplayId}}</van-col>
					</van-row>
					<van-row type="flex" class="item_card_info" justify="space-around">
						<van-col span="2">{{item.sex=='FEMALE'?'女':'男'}}</van-col>
						<van-col span="3">{{item.sr}}岁</van-col>
						<van-col span="3">{{item.height?item.height:'无'}}cm</van-col>
						<van-col class="bmi-color" span="6">BMI：{{item.nowBmi?item.nowBmi.toFixed(1):'无'}}</van-col>
						<van-col span="7">空腹体重
							<van-button size="mini" type="primary" @click="emptyWeight(item.userId)">
								<van-icon name="setting" />
							</van-button>
						</van-col>
					</van-row>
					<van-row class="item_card_but" type="flex" justify="space-around">
						<van-col span="6">
							<van-button round style="background-color: #8271FF;" @click="seeRemark(item.userId,item.userNickName)">查看备注</van-button>
						</van-col>
						<van-col span="6">
							<van-button round style="background-color: #f60;" @click="seeKa(item.userId,item.userNickName)">查看打卡</van-button>
						</van-col>
						<van-col span="6">
							<van-button round style="background-color: #2290FF;" @click="seePlan(item.userId,item.userNickName)">调整计划</van-button>
						</van-col>
						<van-col span="6">
							<van-button round style="background-color: #2290FF;" @click="seeDiet(item.userId,item.userNickName)">查看饮食</van-button>
						</van-col>
					</van-row>
				</div>
			</template>

		</van-list>
		<van-popup v-model="show" position="bottom" :overlay="true">
				<!-- 图表 -->
		    <div class="vol-data">
			    <div class="charts" style="width:'100%',height:'6.54rem'">
			       <!-- <div class="charts-title">
			          24小时内最高：99.99
			       </div>-->
			        <div id="myChart" :style="{width:'130%',height:'300px'}"></div>
			    </div>
			</div>
			<div class="emptyWeightBox">
				<h3>修改空腹体重</h3>
				<div class="input_box">
					<input class="weight_input" type="number" name="weight" id="weight" v-model="weight" placeholder="请填写队员空腹体重" />
					<span class="unit">kg</span>
				</div>
				<van-button round @click="updateEmptyWeight" style="background-color: #2290FF;">提交</van-button>
			</div>
		</van-popup>
		
	</div>

</template>

<script>
	import { getClassUsersService, getEmptyWeightService, updateEmptyWeightService, updataDietStatusService } from '@/api/service';
	import { Row, Col, Icon, Button, Tag, NavBar, Search, List, Popup, Toast, Dialog } from 'vant';
	
	import echarts from 'echarts';
	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[Button.name]: Button,
			[Tag.name]: Tag,
			[NavBar.name]: NavBar,
			[Search.name]: Search,
			[List.name]: List,
			[Popup.name]: Popup,
			[Toast.name]: Toast,
			[Dialog.name]: Dialog
		},
		data() {
			return {
				kk: 10,
				title: "",
				value: "", //搜索值  
				list: [],
				loading: false,
				finished: false,
				classUserslist: [],
				classUserslist2: [],
				show: false, //显示修改空腹体重窗口
				weight: '',
				reportId: '', //修改体重时的参数
				totalRows: 100 //列表数据数量值
			}
		},
		mounted () {
	    
	
	  },
		methods: {
			onLoad() {
				console.log(this.totalRows);
				this.getMemberList(1);
				this.loading = false;
			},
			async getMemberList(i) {
				this.title = sessionStorage.getItem('className');
				let classId = sessionStorage.getItem('classId');
				try {
					const data = {
						classId: classId,
						params: {
							xh: 'undefined',
							curPage: i,
							pageSize: 100
						}
					}
					let res = await getClassUsersService(data);
					if(res.success == true) {
						console.log(res);
						this.totalRows = res.totalRows;
						var transition = res.data;
						for(var item in transition) {
							//console.log(transition[item]);
							if(!transition[item].headUrl) {
								transition[item].headUrl = "http://www.12sporting.com/resall/dlweb/sport/live/img/default_photo@2x.png"
							}
							if(transition[item].sr) {
								let year = transition[item].sr;
								year = year.split("-")[0];
								var date = new Date();
								let age = date.getFullYear();
								age = age - year;
								transition[item].sr = age;
							} else {
								transition[item].sr = '无';
							}
						}
						this.classUserslist = transition;
						this.finished = true;
					} else {
						console.log("获取班级成员列表失败：" + res);
					}
				} catch(e) {
					console.log(e);
				}
			},
			onClickRight() {
				this.$router.push({
					name: 'class_list' //跳转减肥班列表
				});
			},
			onSearch() { //顶部搜索框
				if(this.isAllNum(this.value)) { //全数字，搜索昵称和id
					console.log("全数字");
					this.searchId();
					this.searchNickname();
					let list1 = this.classUserslist; //nickname
					let list2 = this.classUserslist2;
					for(let key in list2) {
						list1.push(list2[key]);
					}
					this.classUserslist = list1;

				} else { //非全数字，搜索昵称
					console.log("非全数字");
					this.searchNickname();
				}
			},
			confirmRemoveEatMuch(nickName, classId, userId) {
				Dialog.confirm({
					title: '提示',
					message: '确定将用户『' + nickName + '』的暴食状态删除吗？'
				}).then(() => {
					// on confirm
					Toast.loading({
						mask: true,
						message: '加载中...'
					});
					this.removeEatMuch(classId, userId);
				}).catch(() => {
					console.log('否');
				});
			},
			async removeEatMuch(classId, userId) {
				const data = {
					classId: classId,
					userId: userId,
					dietStatus: 0
				}
				let res = await updataDietStatusService(data);
				if(res.success == true) {
					Toast.success("修改成功");
					setTimeout(function() {
						window.location.reload();
					}, 500);
				} else {
					Toast.fail("修改失败");
				}
			},
			async searchId() {
				let classId = sessionStorage.getItem('classId');
				const data = {
					classId: classId,
					params: {
						curPage: 1,
						pageSize: 10,
						userDisplayId: this.value
					}
				}
				let res = await getClassUsersService(data);
				if(res.success == true) {
					console.log(res);
					var transition = res.data;
					for(var item in transition) {
						//console.log(transition[item]);
						if(!transition[item].headUrl) {
							transition[item].headUrl = "http://www.12sporting.com/resall/dlweb/sport/live/img/default_photo@2x.png"
						}
						if(transition[item].sr) {
							let year = transition[item].sr;
							year = year.split("-")[0];
							var date = new Date();
							let age = date.getFullYear();
							age = age - year;
							transition[item].sr = age;
						} else {
							transition[item].sr = '无';
						}
					}
					this.classUserslist2 = transition;
				} else {
					console.log("查询成员失败：" + res);
				}
			},
			async searchNickname() {
				let classId = sessionStorage.getItem('classId');
				const data = {
					classId: classId,
					params: {
						curPage: 1,
						pageSize: 10,
						nickName: this.value
					}
				}
				let res = await getClassUsersService(data);
				if(res.success == true) {

					var transition = res.data;
					for(var item in transition) {
						//console.log(transition[item]);
						if(!transition[item].headUrl) {
							transition[item].headUrl = "http://www.12sporting.com/resall/dlweb/sport/live/img/default_photo@2x.png"
						}
						if(transition[item].sr) {
							let year = transition[item].sr;
							year = year.split("-")[0];
							var date = new Date();
							let age = date.getFullYear();
							age = age - year;
							transition[item].sr = age;
						} else {
							transition[item].sr = '无';
						}
					}

					console.log(transition);
					this.classUserslist = transition;
				} else {
					console.log("查询成员失败：" + res);
				}

			},
			seeRemark(userId, nickName) {
				this.$router.push({
					name: 'member_remark', //跳转减肥班列表
					params: {
						userId: userId,
						nickName: nickName
					}
				});
			},
			seeKa(userId, nickName) {
				this.$router.push({
					name: 'ka_list', //跳转减肥班列表
					params: {
						userId: userId,
						nickName: nickName
					}
				});
			},
			seePlan(userId, nickName) {
				sessionStorage.setItem('userId', userId);
				sessionStorage.setItem('nickName', nickName);
				this.$router.push({
					name: 'adjust_plan', //跳转减肥班列表
				});
			},
			seeDiet(userId, nickName) {
				sessionStorage.setItem('userId', userId);
				this.$router.push({
					name: 'member_diet', //跳转饮食计划
					params: {
						userId: userId,
						nickName: nickName
					}
				});
			},
			async emptyWeight(userId) {
				this.show = true;
				let classId = sessionStorage.getItem('classId');
				const data = {
					classId: classId,
					userId: userId,
					params: {
						curPage: 1,
						pageSize: 7
					}
				}
				let res = await getEmptyWeightService(data);
				if(res.success == true) {
					console.log(res.data);
					if(res.totalRows > 0) {
						let wTable = res.data;
						this.weight = wTable[0].weight;
						this.reportId = wTable[0].reportId;
						let dTable = [];
						let zTable = [];
						for(let key in wTable){
							//console.log(key);
							dTable.push((wTable[key].recordTime).split(' ')[0]);
							zTable.push(wTable[key].weight);
						}
						dTable = dTable.reverse();
						zTable = zTable.reverse();
						this.showEcharts(dTable,zTable);
					} else {
						this.weight = '';
						this.reportId = '';
					}
				}
				
				
			},
			async updateEmptyWeight() {
				if(this.reportId == '') {
					Toast("reportId");
				} else {
					const data = {
						reportId: this.reportId,
						weight: this.weight
					}
					let res = await updateEmptyWeightService(data);
					if(res.success == true) {
						console.log(res);
						Toast("操作成功！");
						this.show = false;

					} else {
						Toast("修改空腹体重数据失败！");
					}
				}

			},
			isAllNum(str) {
				if(/^[0-9]+$/.test(str)) { //这是用正则表达是检查
					return true;
				} else {
					return false;
				}
			},
			showEcharts(dTable,zTable){
				 /*ECharts图表*/
	   			var myChart = echarts.init(document.getElementById('myChart'));
			    myChart.setOption({
			        title: {
				        text: '体重曲线'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['体重']
				    },
				    toolbox: {
				        show: false,
				        feature: {
				            dataZoom: {
				                yAxisIndex: 'none'
				            },
				            dataView: {readOnly: false},
				            magicType: {type: ['line', 'bar']},
				            restore: {},
				            saveAsImage: {}
				        }
				    },
				    xAxis:  {
				        type: 'category',
				      
				        boundaryGap: true,
				        data: dTable
				    },
				    yAxis: {
				        type: 'value',
				        scale:true,
				        axisLabel: {
				            formatter: '{value}kg'
				        }
				    },
				    series: [
				        {
				            type:'line',
				            data:zTable,
				            markPoint: {
				                data: [
				                    {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}
				                ]
				            },
				            markLine: {
				                data: [
				                    {type: 'average', name: '平均值'}
				                ]
				            }
				        }
				    ]
			    })
			}
		}
	}
</script>

<style>
	.item_card_box {
		height: 9rem;
		background-color: aliceblue;
		margin-bottom: 0.5rem;
	}
	
	.item_card_header {
		padding-top: 0.5rem;
		font-size: 1rem;
	}
	
	.item_card_head {
		position: relative;
	}
	
	.item_card_head img {
		height: 3rem;
		width: 3rem;
		border-radius: 1.5rem;
	}
	
	.flag {
		color: #fff;
		background-color: orangered;
		display: block;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 1rem;
	}
	
	.eatMuch {
		position: absolute;
		top: 0;
		left: 1rem;
	}
	
	.shengli {
		position: absolute;
		top: 0;
		right: 1rem;
	}
	
	.item_card_id,
	.item_card_name {
		line-height: 3rem;
	}
	
	.item_card_info {
		height: 2rem;
		line-height: 2rem;
	}
	
	.bmi-color {
		background-color: #43C2E5;
		color: #fff;
	}
	
	.item_card_info .van-button {
		width: 1.5rem;
		height: 1.5rem;
		line-height: 1.5rem;
	}
	
	.item_card_but {
		margin-top: 0.5rem;
	}
	
	.item_card_but .van-button {
		height: 2rem;
		line-height: 2rem;
		color: #fff;
		font-size: 0.8rem;
	}
	
	.emptyWeightBox {
		height: 12rem;
	}
	
	.input_box {
		width: 60%;
		border: 1px solid #999;
		margin-left: 20%;
		margin-bottom: 1rem;
	}
	
	#weight {
		width: 100%;
		font-size: 16px;
		border: none;
		outline: none;
		height: 40px;
		line-height: 40px;
	}
	
	.unit {
		width: auto;
		max-width: 40px;
		height: 40px;
		line-height: 40px;
		position: absolute;
		right: 20%;
		
		margin-top: -38px;
		text-align: center;
		color: #999;
		font-size: 15px;
	}
	
	.emptyWeightBox .van-button {
		width: 10rem;
		height: 3rem;
		line-height: 3rem;
		color: #fff;
		font-size: 1rem;
	}
</style>