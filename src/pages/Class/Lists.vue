<template>
	<div class="class_list">
		<van-search placeholder="请输入减肥营名称" v-model="value" @search="onSearch" />
		<van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10">
			<van-cell v-for="(item,idx) in classInfoist"  :key="idx">
				<div class="item_card_box" style="height: 6rem;background-color: aliceblue;text-align: center;">
					<div class="item_card_info float_l">
						<div class="item_card_title hid">{{item.className}}</div>
						<div id="item_card_time_status">
							<span class="item_card_time">{{item.startDate}}至{{item.endDate}}</span>
							<van-tag class="item_card_status" v-bind:class="item.status" round>{{item.status=="BEFORE_IN"?"待开班":(item.status=="IN"?"开班中":"已结束")}}</van-tag>

						</div>
					</div>
					<div class="item_card_but">
						<div style="position: relative;">
							<van-button class="purple" type="primary" size="small" @click="evaluate(item.classId,item.className)">去打分 </van-button>
							<van-tag class="num" round type="danger">{{item.waitScoreUserForumNum}}</van-tag>
						</div>
						<div>
							<van-button class="blue" type="primary" size="small" @click="getClassUsers(item.classId,item.className)">查看成员</van-button>
						</div>
					</div>
				</div>

			</van-cell>
			<template>

			</template>
		</van-list>
		<div></div>
	</div>

</template>

<script>
	import { getClassInfoService, queryClassInfoService } from '@/api/service';
	import { Search, List, Button, Tag, Cell } from 'vant';

	export default {
		components: {
			[Search.name]: Search,
			[List.name]: List,
			[Button.name]: Button,
			[Tag.name]: Tag,
			[Cell.name]: Cell

		},
		data() {
			return {
				value: "", //搜索值  
				classInfoist: [],
				loading: false,
				finished: false,
				totalRows: 0,
				pot: 1
			}
		},
		created() {
			//this.getClassInfoService();
		},
		methods: {
			onLoad() {
				setTimeout(() => {
					this.kk(this.pot);
					this.pot = this.pot + 1;
				}, 1000);
			},
			async kk(i) {
				console.log(12123);
				const data = {
					params: {
						curPage: i,
						pageSize: 10
					}
				}
				let res = await getClassInfoService(data);
				if(res.success == true) {
					let list = res.data;
					let list2 =this.classInfoist; 
					for(var key in list){
						list2.push(list[key]);
					}
					this.classInfoist=list2;
					this.totalRows = res.totalRows;
					this.loading = false;
					// 数据全部加载完成
					if(this.classInfoist.length >= this.totalRows) {
						this.finished = true;
					}
				} else {
					console.log("获取班级信息失败：" + res);
				}

			},
			async onSearch() { //顶部搜索框
				console.log("搜索值" + this.value);
				const data = {
					params: {
						curPage: 1,
						pageSize: 10,
						className: this.value
					}
				}
				let res = await queryClassInfoService(data);
				if(res.success == true) {
					console.log(res);
					this.classInfoist = res.data;
					//console.log(this.classInfoist);
				} else {
					console.log("获取班级信息失败：" + res);
				}

			},
			evaluate(classId, className) {
				sessionStorage.setItem("classId", classId);
				sessionStorage.setItem("className", className);
				this.$router.push({
					name: 'class_evaluate' //跳转减肥班列表
				});

			},
			getClassUsers(classId, className) {
				sessionStorage.setItem("classId", classId);
				sessionStorage.setItem("className", className);
				this.$router.push({
					name: 'member_list' //跳转减肥班列表
				});

			}
		}
	}
</script>

<style scoped="scoped">
	.item_card_info {
		width: 70%;
		height: 100%;
	}
	
	.item_card_title {
		margin-top: 1rem;
		font-size: 1.2rem;
		height: 2rem;
		line-height: 2rem;
	}
	
	.item_card_time_status {
		height: 2rem;
		line-height: 2rem;
	}
	.hid{
		overflow:hidden;
	    text-overflow:ellipsis;
	    white-space:nowrap;
	}
	.item_card_status {
		color: white;
	}
	
	.IN {
		background-color: #090 !important;
	}
	
	.float_l {
		float: left;
	}
	
	.van-button {
		height: 2rem;
		width: 5rem;
		margin-top: 0.6rem;
	}
	
	.num {
		position: absolute;
		right: .5rem;
		top: .2rem;
		background-color: orangered;
		color: #fff;
	}
	
	.purple {
		background-color: #8271FF;
		border: 1px solid #8271FF;
	}
	
	.blue {
		background-color: #4b0;
		border: 1px solid #4b0;
	}
</style>